import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { included } from '../constants'

gsap.registerPlugin(ScrollTrigger)

const icons = [
  // Search
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/><path d="M8.5 11h5M11 8.5v5"/></svg>,
  // Users
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4"/><circle cx="12" cy="9" r="3"/><path d="M5 18c0-1.7 1-3.1 2.5-3.7M19 18c0-1.7-1-3.1-2.5-3.7"/></svg>,
  // Edit
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M14 5h-7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="m13 13 6.5-6.5a1.4 1.4 0 0 0-2-2L11 11l-.5 2.5Z"/></svg>,
  // Music
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></svg>,
  // Mic
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"/></svg>,
  // Video
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></svg>,
]

export default function Included() {
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
          y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="included"
      className="bg-[var(--color-cream)] text-[var(--color-ink)] round-top py-20 md:py-28"
    >
      <div className="w-full max-w-[1180px] mx-auto px-5 md:px-8">
        <div ref={headRef} className="mb-12">
          <p className="text-[0.72rem] font-bold tracking-[3px] text-[var(--color-teal)] uppercase mb-3">
            מה כלול
          </p>
          <h2
            className="font-rubik font-black leading-[1.12] tracking-tight text-[var(--color-ink)]"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}
          >
            חבילה אחת מקצה לקצה, בלי עומס על הצוות שלכם
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {included.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 bg-white rounded-2xl border border-black/5 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal)] flex items-center justify-center">
                {icons[i]}
              </div>
              <div>
                <h3 className="font-rubik font-bold text-[1rem] text-[var(--color-ink)] mb-1">{item.title}</h3>
                <p className="text-[var(--color-ink)]/60 text-[0.88rem] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
