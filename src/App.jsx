import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Events from './sections/Events'
import Process from './sections/Process'
import Gallery from './sections/Gallery'
import Included from './sections/Included'
import Trust from './sections/Trust'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Marquee from './components/Marquee'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Marquee dark={true} />
      <About />
      <Events />
      <Process />
      <Gallery />
      <Included />
      <Trust />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
