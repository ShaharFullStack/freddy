import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { navLinks, WHATSAPP_URL } from '../constants'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overlayRef = useRef(null)
  const linksRef = useRef([])
  const tlRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ paused: true })
        .to(overlayRef.current, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 0.6,
          ease: 'power3.inOut',
        })
        .fromTo(linksRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: 'power2.out' },
          '-=0.25'
        )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (tlRef.current) {
      open ? tlRef.current.play() : tlRef.current.reverse()
    }
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-5 md:px-8 lg:px-10 transition-all duration-300 ${
          scrolled
            ? 'py-2 bg-[#0f0f0e]/95 backdrop-blur-md shadow-lg'
            : 'py-4 bg-transparent'
        }`}
      >
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 z-50" onClick={close}>
          <img src="/logo.png" alt="לוגו" className="w-10 h-10 object-contain" />
          <span className="font-rubik font-black text-[1.15rem] leading-none text-[var(--color-primary)]">
            חיים שכאלה
            <small className="block font-heebo font-normal text-[0.52rem] tracking-[2.5px] text-[var(--color-sage)] mt-0.5">
              ברק הפקות · פרדי ברק
            </small>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-[var(--color-sage)] hover:text-[var(--color-primary)] transition-colors duration-200 text-sm font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-[var(--color-gold)] text-[var(--color-dark)] font-bold text-sm hover:bg-[var(--color-gold-light)] transition-colors duration-200"
          >
            לשיחת ייעוץ
          </a>
        </div>

        {/* Burger */}
        <button
          className="lg:hidden z-50 flex flex-col gap-1.5 p-1.5 cursor-pointer"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'סגור תפריט' : 'פתח תפריט'}
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 bg-[var(--color-primary)] transition-all duration-300 origin-center ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[var(--color-primary)] transition-all duration-300 origin-center ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Full-screen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-[var(--color-dark2)] flex flex-col justify-center px-10"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', pointerEvents: open ? 'all' : 'none' }}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              ref={el => linksRef.current[i] = el}
              onClick={close}
              className="text-4xl md:text-5xl font-rubik font-black text-[var(--color-primary)] py-3 border-b border-white/10 hover:text-[var(--color-gold)] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            ref={el => linksRef.current[navLinks.length] = el}
            onClick={close}
            className="mt-6 inline-block self-start px-8 py-4 rounded-full bg-[var(--color-gold)] text-[var(--color-dark)] font-bold text-xl"
          >
            לשיחת ייעוץ
          </a>
        </div>
        <div className="mt-12 text-[var(--color-sage)] text-sm">
          052-8818148
        </div>
      </div>
    </>
  )
}
