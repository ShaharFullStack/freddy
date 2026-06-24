import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Trust() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: imgRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(textRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="bg-dark text-primary py-20 md:py-28 overflow-hidden"
    >
      <div className="w-full max-w-[1180px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <div ref={textRef}>
            <p className="text-[0.72rem] font-bold tracking-[3px] text-gold uppercase mb-3">
              למה דווקא פרדי
            </p>
            <h2
              className="font-rubik font-black leading-[1.12] tracking-tight text-primary mb-6"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              ניסיון של מעל 20 שנה, ויד בטוחה ברגעים הכי רגישים
            </h2>
            <p className="text-sage leading-[1.8] mb-5">
              אירוע פרישה הוא לא עוד מסיבה. הוא רגע רגיש שמייצג שנים של עבודה ושייכות. הניסיון מאפשר לי לקרוא נכון את החדר, לדייק את התוכן ולנהל את הערב בביטחון מלא.
            </p>
            <p className="text-sage leading-[1.8] mb-8">
              בשנים 2016–2018 לקחתי חלק כמראיין ומתעד בפרויקט מטעם ההסתדרות הציונית העולמית בשיתוף משרד ראש הממשלה. מאות ראיונות שנשמרים בספרייה הלאומית ע"ש שפילברג.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-dark font-bold text-[0.95rem] hover:bg-gold-light transition-colors duration-200"
            >
              לשיחת ייעוץ חינם
            </a>
          </div>

          {/* Image */}
          <div
            ref={imgRef}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ height: 'clamp(320px, 50vw, 480px)' }}
          >
            <img
              src="/images/freddy.png"
              alt="פרדי ברק – ניסיון ואמינות"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center top' }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
