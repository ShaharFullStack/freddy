import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { events } from '../constants'

gsap.registerPlugin(ScrollTrigger)

function EventCard({ ev, index }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: index * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [index])

  const handleMouseEnter = () => gsap.to(imgRef.current, { scale: 1.05, duration: 0.55, ease: 'power2.out' })
  const handleMouseLeave = () => gsap.to(imgRef.current, { scale: 1, duration: 0.55, ease: 'power2.out' })

  return (
    <div
      ref={cardRef}
      className="bg-[var(--color-cream)] rounded-2xl overflow-hidden border border-black/5 shadow-xl group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          ref={imgRef}
          src={ev.image}
          alt={ev.alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center top', transformOrigin: 'center center' }}
          loading="lazy"
        />
        <span className="absolute top-3.5 right-3.5 z-10 bg-[var(--color-cream)]/95 text-[var(--color-rose)] text-[0.7rem] font-bold tracking-wide px-3.5 py-1.5 rounded-full">
          {ev.badge}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-rubik font-bold text-lg text-[var(--color-ink)] mb-2">{ev.title}</h3>
        <p className="text-[var(--color-ink)]/65 text-[0.92rem] leading-relaxed">{ev.desc}</p>
      </div>
    </div>
  )
}

export default function Events() {
  const headRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="events"
      className="bg-[var(--color-dark)] text-[var(--color-primary)] py-20 md:py-28"
    >
      <div className="w-full max-w-[1180px] mx-auto px-5 md:px-8">
        <div ref={headRef} className="mb-12">
          <p className="text-[0.72rem] font-bold tracking-[3px] text-[var(--color-gold)] uppercase mb-3">
            למי זה מתאים
          </p>
          <h2
            className="font-rubik font-black leading-[1.12] tracking-tight text-[var(--color-primary)] mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}
          >
            מותאם לכל אבן דרך, לשותף, לעובד בכיר או לפורש
          </h2>
          <p className="text-[var(--color-sage)] max-w-xl leading-relaxed">
            מבנה התוכן, הנושאים והמרואיינים נבנים תמיד יחד עם מזמין האירוע, כדי שהערב יהיה מדויק לאדם, לארגון ולערכים של החברה.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {events.map((ev, i) => (
            <EventCard key={ev.id} ev={ev} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
