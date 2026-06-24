import { useState } from "react";

const whatsappPhone = "972528818148";

function isValidPhone(value) {
  const compact = value.replace(/[\s().-]/g, "");
  return /^(?:\+972|972|0)(?:[23489]\d{7}|5\d{8})$/.test(compact);
}

function normalizePhone(value) {
  const compact = value.replace(/[\s().-]/g, "");
  if (compact.startsWith("+")) return compact;
  if (compact.startsWith("972")) return `+${compact}`;
  if (compact.startsWith("0")) return `+972${compact.slice(1)}`;
  return compact;
}

function buildWhatsappUrl(payload) {
  const text = encodeURIComponent(
    `היי פרדי! הגעתי דרך האתר.\n` +
      `שם: ${payload.name}\n` +
      (payload.organization ? `ארגון: ${payload.organization}\n` : "") +
      `טלפון: ${payload.phone}\n` +
      (payload.eventType ? `סוג אירוע: ${payload.eventType}\n` : "") +
      (payload.message ? `הערות: ${payload.message}` : "")
  );
  return `https://wa.me/${whatsappPhone}?text=${text}`;
}

const LeadForm = ({ title = "קבלת הצעת מחיר", subtitle = "פרדי יחזור אליכם בהקדם עם כל הפרטים.", className = "" }) => {
  const [formData, setFormData] = useState({
    name: "", org: "", phone: "", evtype: "", msg: "", website: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validators = {
    name: (v) => (v.trim().length >= 2 ? "" : "אנא הזינו שם מלא."),
    org: (v) => (v.length <= 80 ? "" : "שם הארגון ארוך מדי."),
    phone: (v) => (isValidPhone(v) ? "" : "אנא הזינו מספר טלפון תקין."),
    evtype: (v) => (v ? "" : "אנא בחרו סוג אירוע."),
    msg: (v) => (v.length <= 700 ? "" : "ההודעה ארוכה מדי. עד 700 תווים."),
  };

  const validateAll = (data) => {
    const errs = {};
    errs.name = validators.name(data.name);
    errs.org = validators.org(data.org);
    errs.phone = validators.phone(data.phone);
    errs.evtype = validators.evtype(data.evtype);
    errs.msg = validators.msg(data.msg);
    setErrors(errs);
    return !Object.values(errs).some(Boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validators[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.website) return; // honeypot
    if (!validateAll(formData)) return;

    const payload = {
      name: formData.name.trim(),
      organization: formData.org.trim(),
      phone: normalizePhone(formData.phone.trim()),
      eventType: formData.evtype,
      message: formData.msg.trim(),
      source: "freddybarak-landing",
      page: window.location.href,
      submittedAt: new Date().toISOString(),
    };

    setSubmitting(true);
    setStatus(null);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : null;
      if (!res.ok || (body && body.ok === false)) throw new Error((body && body.message) || "failed");
      setFormData({ name: "", org: "", phone: "", evtype: "", msg: "", website: "" });
      setErrors({});
      setStatus("success");
      setStatusMsg("תודה! הפרטים התקבלו ופרדי יחזור אליכם בהקדם.");
    } catch {
      setStatus("error");
      setStatusMsg(buildWhatsappUrl(payload));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-black/20 rounded-xl text-base bg-[#fcf9ea] transition-colors duration-200 focus:outline-none focus:border-[#c5474a] font-[Heebo,sans-serif]";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`bg-[#fffef8] text-[#241f1c] rounded-3xl p-8 lg:p-10 flex flex-col gap-4 ${className}`}
    >
      <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "Rubik, sans-serif" }}>
        {title}
      </h3>
      {subtitle && <p className="text-sm text-[#4a413b] mb-2">{subtitle}</p>}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="f-name">שם מלא</label>
        <input
          id="f-name" name="name" type="text" placeholder="שם הפונה"
          required autoComplete="name" value={formData.name} onChange={handleChange}
          className={inputClass}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-xs text-[#c5474a] mt-1">{errors.name}</p>}
      </div>

      {/* Org */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="f-org">ארגון / חברה</label>
        <input
          id="f-org" name="org" type="text" placeholder="שם הארגון"
          autoComplete="organization" value={formData.org} onChange={handleChange}
          className={inputClass}
        />
        {errors.org && <p className="text-xs text-[#c5474a] mt-1">{errors.org}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="f-phone">טלפון</label>
        <input
          id="f-phone" name="phone" type="tel" placeholder="מספר טלפון"
          required autoComplete="tel" inputMode="tel" value={formData.phone} onChange={handleChange}
          className={inputClass}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="text-xs text-[#c5474a] mt-1">{errors.phone}</p>}
      </div>

      {/* Event type */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="f-evtype">סוג האירוע</label>
        <select
          id="f-evtype" name="evtype" required value={formData.evtype} onChange={handleChange}
          className={inputClass}
          aria-invalid={!!errors.evtype}
        >
          <option value="" disabled>בחירה</option>
          <option value="פרישה">פרישה</option>
          <option value="קידום">קידום</option>
          <option value="הוקרה">הוקרה</option>
          <option value="אחר">אחר</option>
        </select>
        {errors.evtype && <p className="text-xs text-[#c5474a] mt-1">{errors.evtype}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="f-msg">פרטים נוספים</label>
        <textarea
          id="f-msg" name="msg" placeholder="הערות נוספות"
          rows={3} value={formData.msg} onChange={handleChange}
          className={`${inputClass} resize-vertical min-h-[78px]`}
        />
        {errors.msg && <p className="text-xs text-[#c5474a] mt-1">{errors.msg}</p>}
      </div>

      {/* Honeypot – hidden from bots but doesn't extend document width */}
      <input
        type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        value={formData.website} onChange={handleChange}
        style={{ position: "absolute", top: "-1px", height: "1px", width: "1px", overflow: "hidden", opacity: 0, pointerEvents: "none" }}
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-full bg-[#c5474a] text-white font-medium text-base mt-2 hover:-translate-y-1 transition-transform duration-200 disabled:opacity-60"
        style={{ boxShadow: "0 14px 30px -12px rgba(197,71,74,0.7)" }}
      >
        {submitting ? "שולח..." : "שליחת הפרטים"}
      </button>

      {status === "success" && (
        <div className="p-4 rounded-xl bg-[#badfdb] text-[#241f1c] text-center font-medium text-sm">
          {statusMsg}
        </div>
      )}
      {status === "error" && (
        <div className="p-4 rounded-xl bg-[#fff0ec] text-[#c5474a] text-center text-sm border border-[#c5474a]/20">
          לא הצלחנו לשלוח את הפרטים כרגע. אפשר לנסות שוב בעוד רגע או{" "}
          <a
            href={statusMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            לשלוח בוואטסאפ
          </a>
          .
        </div>
      )}
    </form>
  );
};

export default LeadForm;
