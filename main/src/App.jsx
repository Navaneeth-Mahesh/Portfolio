import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import Cursor from './components/Cursor/Cursor'
import NoiseOverlay from './components/NoiseOverlay/NoiseOverlay'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Works from './components/Works/Works'
import Contact from './components/Contact/Contact'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Init Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <NoiseOverlay />
      <Cursor />
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Works />
          <Contact />
        </main>
      </div>
    </>
  )
}
