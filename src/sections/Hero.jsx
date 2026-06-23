import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ThreeGlobe from '../components/ThreeGlobe'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const titleRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const metaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(metaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )

      // Parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={sectionRef}
      id="top"
      className="relative min-h-[100svh] flex items-end overflow-hidden text-white"
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/freddy/images/freddy5.jpg"
          alt="פרדי ברק מנחה אירוע פרישה"
          className="absolute w-full h-[115%] object-cover"
          style={{ objectPosition: '88% 10%', top: 0 }}
          loading="eager"
          fetchpriority="high"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/88" />
        {/* Three.js particle globe – desktop only */}
        <div className="hidden md:block absolute inset-0">
          <ThreeGlobe />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-5 md:px-8 pb-16 pt-32">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[2px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse" />
          ברק הפקות · פרדי ברק
        </div>

        <h1
          ref={titleRef}
          className="font-rubik font-black leading-[1.06] tracking-[-1.5px] mb-5 text-white"
          style={{ fontSize: 'clamp(2.4rem, 9vw, 6rem)' }}
        >
          כשמגיע הרגע<br />
          להגיד <span className="text-[var(--color-gold)]">תודה</span><br />
          על כל השנים
        </h1>

        <p
          ref={subRef}
          className="text-white/85 font-light max-w-lg mb-8"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}
        >
          הפקה והנחיה מלאה של אירוע שמעניק כבוד אמיתי לעובד הוותיק.
          פרדי לוקח על עצמו את התחקיר, הכתיבה, הצילום וההנחיה.
        </p>

        <div ref={ctaRef} className="flex gap-3 flex-wrap">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[var(--color-gold)] text-[var(--color-dark)] font-bold text-[0.97rem] hover:bg-[var(--color-gold-light)] transition-colors duration-200 shadow-[0_14px_30px_-10px_rgba(201,162,78,0.6)]"
          >
            לקבלת הצעת מחיר
          </a>
          <a
            href="#process"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/40 text-white font-medium text-[0.97rem] hover:bg-white hover:text-[var(--color-dark)] transition-all duration-200"
          >
            איך זה עובד
          </a>
        </div>

        {/* Stats */}
        <div ref={metaRef} className="flex gap-8 mt-12 flex-wrap">
          {[
            { n: '20+', l: 'שנות ניסיון' },
            { n: '500+', l: 'אירועים מוצלחים' },
            { n: '100%', l: 'שביעות רצון' },
          ].map(s => (
            <div key={s.l}>
              <div className="font-rubik font-black text-[var(--color-gold)] leading-none" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
                {s.n}
              </div>
              <div className="text-white/65 text-xs mt-1 tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
