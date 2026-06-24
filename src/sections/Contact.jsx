import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WHATSAPP_PHONE } from '../constants'

gsap.registerPlugin(ScrollTrigger)

const WA_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('היי פרדי! הגעתי דרך האתר ואשמח לפרטים על אירוע חיים שכאלה.')}`

function isValidPhone(v) {
  const c = v.replace(/[\s().-]/g, '')
  return /^(?:\+972|972|0)(?:[23489]\d{7}|5\d{8})$/.test(c)
}
function normalizePhone(v) {
  const c = v.replace(/[\s().-]/g, '')
  if (c.startsWith('+')) return c
  if (c.startsWith('972')) return `+${c}`
  if (c.startsWith('0')) return `+972${c.slice(1)}`
  return c
}

export default function Contact() {
  const sectionRef = useRef(null)
  const infoRef = useRef(null)
  const formRef = useRef(null)

  const [fields, setFields] = useState({ name: '', org: '', phone: '', evtype: '', msg: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(infoRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const validate = (data) => {
    const e = {}
    if (data.name.length < 2) e.name = 'אנא הזינו שם מלא.'
    if (!isValidPhone(data.phone)) e.phone = 'אנא הזינו מספר טלפון תקין.'
    if (!data.evtype) e.evtype = 'אנא בחרו סוג אירוע.'
    if (data.msg.length > 700) e.msg = 'ההודעה ארוכה מדי. עד 700 תווים.'
    return e
  }

  const getWaUrl = () => {
    const text = `היי פרדי! הגעתי דרך האתר.\nשם: ${fields.name}\n${fields.org ? `ארגון: ${fields.org}\n` : ''}טלפון: ${fields.phone}\n${fields.evtype ? `סוג אירוע: ${fields.evtype}\n` : ''}${fields.msg ? `הערות: ${fields.msg}` : ''}`
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    setStatus(null)
    const payload = {
      name: fields.name.trim(),
      organization: fields.org.trim(),
      phone: normalizePhone(fields.phone.trim()),
      eventType: fields.evtype,
      message: fields.msg.trim(),
      source: 'freddybarak-landing',
      page: location.href,
      submittedAt: new Date().toISOString(),
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      })
      if (!res.ok) throw new Error('failed')
      setFields({ name: '', org: '', phone: '', evtype: '', msg: '' })
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (name) =>
    `w-full px-4 py-3 rounded-xl bg-[var(--color-cream)] border text-[var(--color-ink)] font-heebo text-[0.97rem] outline-none transition-colors duration-200 focus:border-[var(--color-rose)] ${errors[name] ? 'border-[var(--color-rose)]' : 'border-black/15'}`

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-dark text-primary py-20 md:py-28"
    >
      <div className="w-full max-w-[1180px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Info */}
          <div ref={infoRef}>
            <p className="text-[0.72rem] font-bold tracking-[3px] text-gold uppercase mb-3">
              בואו נדבר
            </p>
            <h2
              className="font-rubik font-black leading-[1.12] tracking-tight text-primary mb-5"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              פרדי ישמח לבנות לכם את הערב הבא
            </h2>
            <p className="text-sage leading-relaxed mb-8">
              השאירו פרטים ופרדי יחזור אליכם עם כל המידע והצעת מחיר מותאמת. אפשר גם פשוט להרים טלפון או לכתוב בוואטסאפ.
            </p>

            <div className="flex flex-col gap-0">
              {[
                { href: WA_URL, icon: '💬', label: 'וואטסאפ 052-8818148', external: true },
                { href: 'tel:+972528818148', icon: '📞', label: 'חייגו לפרדי 052-8818148' },
                { href: 'https://freddybarak.com', icon: '🌐', label: 'freddybarak.com', external: true },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 py-4 border-b border-white/10 text-[0.97rem] hover:text-gold transition-colors duration-200"
                >
                  <span className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="bg-cream text-ink rounded-3xl p-7 md:p-9"
          >
            <h3 className="font-rubik font-bold text-xl text-ink mb-1">קבלת הצעת מחיר</h3>
            <p className="text-ink/55 text-sm mb-6">פרדי יחזור אליכם בהקדם עם כל הפרטים.</p>

            {[
              { id: 'name', label: 'שם מלא', type: 'text', placeholder: 'שם הפונה', required: true, autoComplete: 'name' },
              { id: 'org', label: 'ארגון / חברה', type: 'text', placeholder: 'שם הארגון', autoComplete: 'organization' },
              { id: 'phone', label: 'טלפון', type: 'tel', placeholder: 'מספר טלפון', required: true, autoComplete: 'tel', inputMode: 'tel' },
            ].map(f => (
              <div key={f.id} className="mb-3">
                <label className="block text-xs font-medium mb-1.5" htmlFor={f.id}>{f.label}</label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  placeholder={f.placeholder}
                  required={f.required}
                  autoComplete={f.autoComplete}
                  inputMode={f.inputMode}
                  value={fields[f.id]}
                  onChange={handleChange}
                  className={inputClass(f.id)}
                />
                {errors[f.id] && <span className="text-rose text-xs mt-1 block">{errors[f.id]}</span>}
              </div>
            ))}

            <div className="mb-3">
              <label className="block text-xs font-medium mb-1.5" htmlFor="evtype">סוג האירוע</label>
              <select
                id="evtype"
                name="evtype"
                required
                value={fields.evtype}
                onChange={handleChange}
                className={inputClass('evtype')}
              >
                <option value="" disabled>בחירה</option>
                <option value="פרישה">פרישה</option>
                <option value="קידום">קידום</option>
                <option value="הוקרה">הוקרה</option>
                <option value="אחר">אחר</option>
              </select>
              {errors.evtype && <span className="text-rose text-xs mt-1 block">{errors.evtype}</span>}
            </div>

            <div className="mb-5">
              <label className="block text-xs font-medium mb-1.5" htmlFor="msg">פרטים נוספים</label>
              <textarea
                id="msg"
                name="msg"
                placeholder="הערות נוספות"
                rows={3}
                value={fields.msg}
                onChange={handleChange}
                className={`${inputClass('msg')} resize-y min-h-[78px]`}
              />
              {errors.msg && <span className="text-rose text-xs mt-1 block">{errors.msg}</span>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-full bg-rose text-white font-bold text-[1rem] hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 shadow-[0_14px_30px_-10px_rgba(197,71,74,0.6)]"
            >
              {submitting ? 'שולח...' : 'שליחת הפרטים'}
            </button>

            {status === 'success' && (
              <div className="mt-4 p-4 rounded-xl bg-teal/20 text-teal text-sm font-medium text-center">
                תודה! הפרטים התקבלו ופרדי יחזור אליכם בהקדם.
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 p-4 rounded-xl bg-rose/10 text-rose text-sm font-medium text-center">
                לא הצלחנו לשלוח את הפרטים.{' '}
                <a href={getWaUrl()} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                  שלחו בוואטסאפ
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
