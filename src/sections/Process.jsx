import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { steps } from '../constants'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const stepsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo([...stepsRef.current.children],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-[var(--color-cream)] text-[var(--color-ink)] round-top py-20 md:py-28"
    >
      <div className="w-full max-w-[1180px] mx-auto px-5 md:px-8">
        <div ref={headRef} className="mb-14">
          <p className="text-[0.72rem] font-bold tracking-[3px] text-[var(--color-teal)] uppercase mb-3">
            איך זה עובד
          </p>
          <h2
            className="font-rubik font-black leading-[1.12] tracking-tight text-[var(--color-ink)] mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}
          >
            הסוד הוא בתוכן. וזה מתחיל הרבה לפני הערב
          </h2>
          <p className="text-[var(--color-ink)]/60 max-w-xl leading-relaxed">
            באירוע פרישה הדבר החשוב מכל הוא התוכן. לשם כך פרדי עורך תחקיר אמיתי, מראיין קולגות, חברים ומשפחה, ומתוכם כותב ועורך תסריט שלם.
          </p>
        </div>

        {/* Desktop horizontal / Mobile vertical */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-5 gap-0"
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="py-7 md:py-8 md:px-5 border-t-2 border-[var(--color-ink)]/10 md:first:border-r-0"
            >
              <div
                className="font-rubik font-black leading-none mb-4 text-[var(--color-teal)]"
                style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)' }}
              >
                {step.num}
              </div>
              <h3 className="font-rubik font-bold text-[1.05rem] text-[var(--color-ink)] mb-2">
                {step.title}
              </h3>
              <p className="text-[var(--color-ink)]/55 text-[0.9rem] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
