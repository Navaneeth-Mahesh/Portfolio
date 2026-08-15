import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleField from '../../three/Particles/ParticleField'
import DottedText from './DottedText'
import rawPic from '../../assets/pic/pic.png'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const bgWordRef = useRef(null)
  const portraitRef = useRef(null)
  const greetRef = useRef(null)
  const nameRef = useRef(null)
  const roleRef = useRef(null)
  const descRef = useRef(null)
  const resumeRef = useRef(null)
  const scrollHintRef = useRef(null)

  const [processedPic, setProcessedPic] = useState(rawPic)

  // Canvas background removal for pic.png (removes pure white background)
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = rawPic
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imgData.data

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          if (r > 230 && g > 230 && b > 230) {
            data[i + 3] = 0
          }
        }

        ctx.putImageData(imgData, 0, 0)
        setProcessedPic(canvas.toDataURL('image/png'))
      } catch (err) {
        console.warn('Canvas processing fallback:', err)
      }
    }
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(
      bgWordRef.current,
      { opacity: 0, scale: 1.08, letterSpacing: '0.1em' },
      { opacity: 1, scale: 1, letterSpacing: '0.02em', duration: 1.8, ease: 'power3.out' }
    )
      .fromTo(
        portraitRef.current,
        { opacity: 0, y: 60, filter: 'grayscale(100%) contrast(1.1) brightness(0.7)' },
        { opacity: 1, y: 0, filter: 'grayscale(100%) contrast(1.15) brightness(1)', duration: 1.5, ease: 'power2.out' },
        '-=1.2'
      )
      .fromTo(
        greetRef.current,
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=1.0'
      )
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(
        roleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        resumeRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.35'
      )
      .fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      )

    if (!reduceMotion) {
      // Subtle mouse parallax depth
      const xTo = gsap.quickTo(portraitRef.current, 'x', { duration: 0.9, ease: 'power3.out' })
      const yTo = gsap.quickTo(portraitRef.current, 'y', { duration: 0.9, ease: 'power3.out' })
      const bgXTo = gsap.quickTo(bgWordRef.current, 'x', { duration: 1.3, ease: 'power3.out' })

      const handleMouseMove = (e) => {
        const relX = e.clientX / window.innerWidth - 0.5
        const relY = e.clientY / window.innerHeight - 0.5
        xTo(relX * 18)
        yTo(relY * 10)
        bgXTo(relX * -14)
      }
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      {/* Background Subtle Particle Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.3, pointerEvents: 'none' }}>
        <ParticleField />
      </div>

      {/* Giant Background Text: PORTFOLIO centered with exact user linear gradient stops */}
      <div
        ref={bgWordRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '0%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          fontFamily: "var(--font-dorsa), 'Dorsa', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(13rem, 34vw, 36rem)',
          lineHeight: 0.68,
          letterSpacing: '0.01em',
          background: 'linear-gradient(180deg, #ff0000 0%, #d90000 22%, #a00000 45%, #650000 65%, #280000 82%, #000000 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255, 0, 0, 0.35)',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          width: '120vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        PORTFOLIO
      </div>

      {/* Center Portrait Cutout (pic.png centered horizontally) */}
      <div
        ref={portraitRef}
        className="hero-portrait"
        style={{
          position: 'absolute',
          left: '48%',
          bottom: 0,
          transform: 'translateX(-50%)',
          transformOrigin: 'bottom center',
          zIndex: 5,
          height: '120vh',
          width: 'auto',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <img
          src={processedPic}
          alt="Navaneeth"
          style={{
            height: '100%',
            width: 'auto',
            maxHeight: 'none',
            objectFit: 'contain',
            transform:  'scale(0.9)',
            transformOrigin: 'center',

            filter: 'grayscale(100%) contrast(1.0) brightness(0.99)',
            maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
          }}
        />
      </div>

      {/* Left Content Area */}
      <div
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '480px',
          paddingLeft: 'clamp(2rem, 6vw, 6rem)',
          paddingRight: '1rem',
          paddingTop: '3rem',
        }}
      >
        {/* Hello, I'm - Cursive Script Font */}
        <p
          ref={greetRef}
          style={{
            fontFamily: 'var(--font-script), cursive',
            fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
            fontWeight: 400,
            color: '#ffffff',
            marginBottom: '0.1rem',
            lineHeight: 1.1,
            letterSpacing: '0.02em',
          }}
        >
          Hello, I'm
        </p>

        {/* NAVANEEETH - LED Dot Matrix Styled Name */}
        <div ref={nameRef} style={{ marginBottom: '1.2rem', display: 'block' }}>
          <DottedText text="NAVANEETH" dotSize={4.5} gap={3.5} letterGap={14} />
        </div>

        {/* Role Subtitle - Bold Crimson Red */}
        <p
          ref={roleRef}
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#a81313',
            marginBottom: '1.3rem',
            lineHeight: 1.3,
          }}
        >
          FULL STACK DEVELOPER &amp; AI ENGINEER
        </p>

        {/* Bio Paragraph */}
        <p
          ref={descRef}
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: 'clamp(0.82rem, 1vw, 0.94rem)',
            lineHeight: 1.7,
            color: 'rgba(230,230,230,0.85)',
            marginBottom: '2.5rem',
            maxWidth: '410px',
            fontWeight: 300,
          }}
        >
          A CSE student and aspiring Full Stack &amp; AI Developer. I love building
          modern, scalable web applications and exploring AI, automation, and
          emerging technologies. Always learning, building, and turning ideas
          into real-world projects.
        </p>

        {/* RESUME Button */}
        <div>
          <a
            ref={resumeRef}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-resume-btn"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-accent), var(--font-hero), serif',
              fontSize: '1.1rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textDecoration: 'none',
              position: 'relative',
              padding: '0.4rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.45)',
              transition: 'color 0.3s ease, border-color 0.3s ease',
            }}
          >
            RESUME
          </a>
        </div>
      </div>

      {/* Bottom Center: scroll down (Script Font) */}
      <div
        ref={scrollHintRef}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-script), cursive',
            fontSize: '1.7rem',
            color: 'rgba(255,255,255,0.7)',
            animation: 'floatBounce 2.4s ease-in-out infinite',
          }}
        >
          scroll down
        </span>
      </div>

      {/* Right Edge Border Line */}
      <div
        style={{
          position: 'absolute',
          right: '2rem',
          top: '18%',
          bottom: '12%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)',
          zIndex: 20,
        }}
      />

      <style>{`
        .hero-resume-btn:hover {
          color: #a81313 !important;
          border-color: #a81313 !important;
        }

        @keyframes floatBounce {
          0%, 100% { transform: translateY(0); opacity: 0.65; }
          50% { transform: translateY(8px); opacity: 0.95; }
        }

        @media (max-width: 900px) {
          #home {
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 6.5rem;
          }
          .hero-portrait {
            position: relative !important;
            left: auto !important;
            transform: none !important;
            height: 42vh !important;
            margin: 0 auto;
          }
          .hero-content {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
            text-align: center;
            max-width: 100% !important;
          }
          .hero-content p {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  )
}