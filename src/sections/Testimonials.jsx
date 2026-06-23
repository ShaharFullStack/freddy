import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '../constants'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo([...gridRef.current.children],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-[var(--color-cream)] text-[var(--color-ink)] round-top py-20 md:py-28"
    >
      <div className="w-full max-w-[1180px] mx-auto px-5 md:px-8">
        <div ref={headRef} className="mb-12">
          <p className="text-[0.72rem] font-bold tracking-[3px] text-[var(--color-teal)] uppercase mb-3">
            מה אומרים עלינו
          </p>
          <h2
            className="font-rubik font-black leading-[1.12] tracking-tight text-[var(--color-ink)]"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}
          >
            לקוחות ששמחו שבחרו בפרדי
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-black/5 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-[var(--color-rose)] tracking-widest mb-3 text-sm">★★★★★</div>
              <p className="text-[var(--color-ink)]/65 text-[0.95rem] italic leading-relaxed mb-5">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-teal)]/20 text-[var(--color-teal)] flex items-center justify-center font-bold text-[0.9rem] flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-[0.9rem] text-[var(--color-ink)]">{t.name}</div>
                  <div className="text-[var(--color-ink)]/50 text-[0.78rem]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[var(--color-ink)]/40 text-xs mt-8">
          * השמות שונו לפי בקשת הלקוחות
        </p>
      </div>
    </section>
  )
}
