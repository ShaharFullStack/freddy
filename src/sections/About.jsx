import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path reveal on image
      gsap.fromTo(imgRef.current,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 80%',
          },
        }
      )

      // Text fade up
      gsap.fromTo(textRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[var(--color-cream)] text-[var(--color-ink)] round-top py-20 md:py-28"
    >
      <div className="w-full max-w-[1180px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <div ref={textRef}>
            <p className="text-[0.72rem] font-bold tracking-[3px] text-[var(--color-teal)] uppercase mb-3">
              מה זה "חיים שכאלה"
            </p>
            <h2
              className="font-rubik font-black leading-[1.12] tracking-tight text-[var(--color-ink)] mb-6"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}
            >
              אירוע שבו כל המשתתפים מרגישים כמו משפחה
            </h2>
            <p className="text-[var(--color-ink)]/70 leading-[1.8] mb-4">
              מעל 20 שנה אני מלווה ארגונים, מוסדות, רשויות וחברות ביצירת תוכן לאירועים משמעותיים. ב"חיים שכאלה" אני{' '}
              <strong className="text-[var(--color-ink)] font-bold">מפיק ומנחה</strong> אירועי פרישה, קידום בתפקיד וימי הוקרה בצורה חמה, אישית ומכובדת.
            </p>
            <p className="text-[var(--color-ink)]/70 leading-[1.8] mb-8">
              בכל אירוע משולבים סיפורים אישיים מהלב, וידאו מרגש, מצגת ושירי ארץ ישראל בשירה בציבור. התוצאה היא חוויה בלתי נשכחת שמעניקה כבוד לעובד.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-ink)] text-[var(--color-cream)] font-bold text-[0.95rem] hover:bg-[var(--color-rose)] transition-colors duration-200"
            >
              לשיחת ייעוץ חינם
            </a>
          </div>

          {/* Image */}
          <div
            ref={imgRef}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ height: 'clamp(340px, 55vw, 520px)' }}
          >
            <img
              src="/freddy/images/freddy2.png"
              alt="פרדי ברק – מנחה ומפיק אירועים"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 45%' }}
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent pt-16 pb-5 px-6">
              <p className="text-white font-rubik font-bold text-base leading-snug">
                הנחיה חמה ומקצועית, מהרגע הראשון ועד אחרון השירים
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
