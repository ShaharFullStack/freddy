import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gallery } from '../constants'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const gridRef = useRef(null)
  const previewRef = useRef(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const quickX = useRef(null)
  const quickY = useRef(null)

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
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    // Quick setters for smooth cursor follow
    if (previewRef.current) {
      quickX.current = gsap.quickTo(previewRef.current, 'x', { duration: 0.5, ease: 'power3' })
      quickY.current = gsap.quickTo(previewRef.current, 'y', { duration: 0.5, ease: 'power3' })
    }

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      quickX.current?.(e.clientX)
      quickY.current?.(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-dark)] text-[var(--color-primary)] py-20 md:py-28"
    >
      <div className="w-full max-w-[1180px] mx-auto px-5 md:px-8">
        <div ref={headRef} className="mb-12">
          <p className="text-[0.72rem] font-bold tracking-[3px] text-[var(--color-gold)] uppercase mb-3">
            מרגש, מפתיע, מצחיק
          </p>
          <h2
            className="font-rubik font-black leading-[1.12] tracking-tight text-[var(--color-primary)]"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}
          >
            ערב בלתי נשכח
          </h2>
        </div>

        {/* Mobile: 2-col grid. Desktop: masonry */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4"
        >
          {gallery.map((item, i) => {
            const desktopClasses = [
              'md:col-span-7 md:row-span-2',
              'md:col-span-5',
              'md:col-span-4',
              'md:col-span-8',
            ][i]
            const isFirst = i === 0

            return (
              <figure
                key={i}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${isFirst ? 'col-span-2' : ''} ${desktopClasses}`}
                style={{ height: isFirst ? undefined : undefined }}
                onMouseEnter={() => {
                  setHoveredIdx(i)
                  gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.3 })
                }}
                onMouseLeave={() => {
                  setHoveredIdx(null)
                  gsap.to(previewRef.current, { opacity: 0, scale: 0.85, duration: 0.3 })
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{
                    aspectRatio: isFirst ? '16/9' : i === 1 ? '4/3' : '4/3',
                    objectFit: 'cover',
                    objectPosition: item.pos,
                    display: 'block',
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <figcaption className="absolute bottom-3 right-3 left-3 text-white text-xs font-medium text-shadow">
                  {item.label}
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>

      {/* Floating preview – desktop only */}
      <div
        ref={previewRef}
        className="hidden md:block fixed pointer-events-none z-50 w-56 h-36 rounded-xl overflow-hidden shadow-2xl opacity-0"
        style={{ transform: 'translate(-50%, -120%) scale(0.85)', top: 0, left: 0 }}
      >
        {hoveredIdx !== null && (
          <img
            src={gallery[hoveredIdx].image}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: gallery[hoveredIdx].pos }}
          />
        )}
      </div>
    </section>
  )
}
