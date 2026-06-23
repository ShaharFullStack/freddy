/**
 * Contact section: Freddy's contact info + lead form + footer marquee.
 * Form submits to /api/leads (same endpoint as index2.html).
 * Section id="contact" is the target for nav scroll links.
 */
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { contactInfo, logoImg } from "../constants";
import gsap from "gsap";

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

const Contact = () => {
  const text = `השאירו פרטים ופרדי יחזור אליכם
עם כל המידע והצעת מחיר מותאמת
אפשר גם פשוט להרים טלפון`;

  const [formData, setFormData] = useState({
    name: "", org: "", phone: "", evtype: "", msg: "", website: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const footerItems = [
    "חיים שכאלה",
    "ברק הפקות",
    "פרדי ברק",
    "חיים שכאלה",
    "ברק הפקות",
  ];

  useGSAP(() => {
    gsap.from(".contact-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: { trigger: ".contact-link" },
    });
  }, []);

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
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-[#241f1c]"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"בואו נדבר"}
          title={"צור קשר"}
          text={text}
          textColor={"text-[#fcf9ea]"}
          withScrollTrigger={true}
        />

        {/* Contact links + form */}
        <div className="px-10 mb-16 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Left: contact links */}
          <div className="flex flex-col gap-8 text-[#fcf9ea] font-light lg:text-[32px] text-[26px] leading-none flex-shrink-0">
            <div className="contact-link">
              <h2 className="text-[#fcf9ea]/50 text-sm tracking-wider uppercase mb-2">וואטסאפ / טלפון</h2>
              <div className="w-full h-px my-2 bg-[#fcf9ea]/20" />
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl lg:text-3xl tracking-wider hover:text-[#ffa4a4] transition-colors duration-200"
              >
                {contactInfo.phone}
              </a>
            </div>
            <div className="contact-link">
              <h2 className="text-[#fcf9ea]/50 text-sm tracking-wider uppercase mb-2">חייגו ישירות</h2>
              <div className="w-full h-px my-2 bg-[#fcf9ea]/20" />
              <a
                href={contactInfo.phoneHref}
                className="text-xl md:text-2xl lg:text-3xl lowercase hover:text-[#ffa4a4] transition-colors duration-200"
              >
                חייגו לפרדי
              </a>
            </div>
            <div className="contact-link">
              <h2 className="text-[#fcf9ea]/50 text-sm tracking-wider uppercase mb-2">אתר</h2>
              <div className="w-full h-px my-2 bg-[#fcf9ea]/20" />
              <a
                href={contactInfo.websiteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl lg:text-3xl lowercase hover:text-[#ffa4a4] transition-colors duration-200"
              >
                {contactInfo.website}
              </a>
            </div>
          </div>

          {/* Right: lead form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex-1 bg-[#fffef8] text-[#241f1c] rounded-3xl p-8 lg:p-10 flex flex-col gap-4"
          >
            <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "Rubik, sans-serif" }}>
              קבלת הצעת מחיר
            </h3>
            <p className="text-sm text-[#4a413b] mb-2">פרדי יחזור אליכם בהקדם עם כל הפרטים.</p>

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

            {/* Honeypot */}
            <input
              type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={formData.website} onChange={handleChange}
              style={{ position: "absolute", left: "-9999px", opacity: 0 }}
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
        </div>
      </div>

      {/* Footer marquee */}
      <div>
        <Marquee items={footerItems} className="text-[#fcf9ea] bg-transparent" />
        <div className="text-center py-6 text-[#fcf9ea]/40 text-sm">
          © {new Date().getFullYear()} ברק הפקות · כל הזכויות שמורות
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href={contactInfo.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שלחו הודעה בוואטסאפ"
        className="fixed bottom-5 left-5 z-50 flex items-center bg-[#25d366] text-white rounded-full overflow-hidden"
        style={{ boxShadow: "0 14px 30px -10px rgba(37,211,102,0.6)" }}
      >
        <span className="w-14 h-14 grid place-items-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="#fff" width="26" height="26">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.515zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-semibold text-sm transition-all duration-300 hover:max-w-[210px] hover:pl-4">
          דברו עם פרדי בוואטסאפ
        </span>
      </a>
    </section>
  );
};

export default Contact;
