const MAX_MESSAGE_LENGTH = 700;
const MAX_ORG_LENGTH = 80;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);

  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 20000) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function normalize(value) {
  return String(value || '').trim();
}

function isValidPhone(value) {
  const compact = normalize(value).replace(/[\s().-]/g, '');
  return /^(?:\+972|972|0)(?:[23489]\d{7}|5\d{8})$/.test(compact);
}

function validateLead(body) {
  const lead = {
    name: normalize(body.name),
    organization: normalize(body.organization),
    phone: normalize(body.phone),
    eventType: normalize(body.eventType),
    message: normalize(body.message),
    source: normalize(body.source),
    page: normalize(body.page),
    submittedAt: normalize(body.submittedAt)
  };

  const errors = {};
  if (normalize(body.website)) errors.website = 'Spam submission rejected.';
  if (lead.name.length < 2) errors.name = 'Name is required.';
  if (!isValidPhone(lead.phone)) errors.phone = 'Valid phone is required.';
  if (!lead.eventType) errors.eventType = 'Event type is required.';
  if (lead.organization.length > MAX_ORG_LENGTH) errors.organization = 'Organization is too long.';
  if (lead.message.length > MAX_MESSAGE_LENGTH) errors.message = 'Message is too long.';

  return { lead, errors };
}

function textSummary(lead) {
  return [
    'New lead from freddybarak.com',
    '',
    `Name: ${lead.name}`,
    lead.organization ? `Organization: ${lead.organization}` : null,
    `Phone: ${lead.phone}`,
    `Event type: ${lead.eventType}`,
    lead.message ? `Message: ${lead.message}` : null,
    '',
    `Source: ${lead.source || 'landing'}`,
    `Page: ${lead.page || 'unknown'}`,
    `Submitted at: ${lead.submittedAt || new Date().toISOString()}`
  ].filter(Boolean).join('\n');
}

async function sendToWebhook(lead) {
  const response = await fetch(process.env.LEADS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lead, text: textSummary(lead) })
  });

  if (!response.ok) {
    throw new Error(`Webhook delivery failed with ${response.status}`);
  }
}

async function sendWithResend(lead) {
  const from = process.env.LEADS_FROM_EMAIL || 'Leads <onboarding@resend.dev>';
  const to = process.env.LEADS_TO_EMAIL;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New event lead: ${lead.name}`,
      text: textSummary(lead),
      reply_to: from
    })
  });

  if (!response.ok) {
    throw new Error(`Email delivery failed with ${response.status}`);
  }
}

async function deliverLead(lead) {
  if (process.env.LEADS_WEBHOOK_URL) {
    await sendToWebhook(lead);
    return;
  }

  if (process.env.RESEND_API_KEY && process.env.LEADS_TO_EMAIL) {
    await sendWithResend(lead);
    return;
  }

  throw new Error('Lead delivery is not configured.');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, message: 'Method not allowed.' });
  }

  try {
    const body = await parseBody(req);
    const { lead, errors } = validateLead(body);

    if (Object.keys(errors).length) {
      return json(res, 422, { ok: false, message: 'Please check the form fields.', errors });
    }

    await deliverLead(lead);
    return json(res, 200, { ok: true });
  } catch (err) {
    console.error(err);
    return json(res, 500, { ok: false, message: 'Lead submission failed.' });
  }
};
