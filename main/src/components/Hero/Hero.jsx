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
  const [typedGreeting, setTypedGreeting] = useState('')

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

  // Typing animation for "Hello, I'm"
  useEffect(() => {
    const text = "Hello, I'm"
    let index = 0
    setTypedGreeting('')
    const timer = setInterval(() => {
      index++
      setTypedGreeting(text.slice(0, index))
      if (index >= text.length) {
        clearInterval(timer)
      }
    }, 110)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(
      bgWordRef.current,
      { opacity: 0, scale: 1.08, letterSpacing: '0.1em' },
      { opacity: 0.4, scale: 1, letterSpacing: '0.01em', duration: 1.8, ease: 'power3.out' }
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
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        resumeRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
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

      {/* Giant Background Text: PORTFOLIO */}
      <div
        ref={bgWordRef}
        className="hero-bg-word"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          fontFamily: "var(--font-dorsa), 'Dorsa', sans-serif",
          fontWeight: 550,
          fontSize: 'clamp(13rem, 30vw, 36rem)',
          lineHeight: 0.8,
          letterSpacing: '0.06em',
          background: 'linear-gradient(180deg, #FF0000 0%, #AA0000 50%, #990000 60%, #000000 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          opacity: 0.3,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        PORTFOLIO
      </div>

      {/* Center Portrait Cutout */}
      <div
        ref={portraitRef}
        className="hero-portrait"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          transformOrigin: 'bottom center',
          zIndex: 5,
          height: '125vh',
          width: '200rem',
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
            maxHeight: '100%',
            objectFit: 'contain',
            transform: 'scale(0.92)',
            transformOrigin: 'center bottom',
            filter: 'grayscale(100%) contrast(1) brightness(0.98)',
            maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
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
          paddingTop: '2rem',
        }}
      >
        {/* Hello, I'm - Ephesis Font with Typing Animation */}
        <p
          ref={greetRef}
          className="hero-greet-text"
          style={{
            fontFamily: "var(--font-script), 'Ephesis', cursive",
            fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
            fontWeight: 400,
            color: '#ffffff',
            marginBottom: '0.1rem',
            lineHeight: 1.1,
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span>{typedGreeting}</span>
          <span className="typing-cursor" style={{ marginLeft: '4px', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>|</span>
        </p>

        {/* NAVANEETH - Dotted LED Font with Flickering Animation */}
        <div ref={nameRef} className="hero-name-container" style={{ marginBottom: '1.2rem', display: 'block' }}>
          <DottedText text="NAVANEETH" dotSize={4.5} gap={3.5} letterGap={14} flicker={true} />
        </div>

        {/* Role Subtitle - Bold Crimson Red */}
        <p
          ref={roleRef}
          className="hero-role-text"
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

        {/* Bio Paragraph with SlideUp Animation */}
        <p
          ref={descRef}
          className="hero-bio-text"
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: 'clamp(0.82rem, 1vw, 0.94rem)',
            lineHeight: 1.7,
            color: 'rgba(230,230,230,0.85)',
            marginBottom: '2rem',
            maxWidth: '410px',
            fontWeight: 300,
          }}
        >
          A CSE student and aspiring Full Stack &amp; AI Developer. I love building
          modern, scalable web applications and exploring AI, automation, and
          emerging technologies. Always learning, building, and turning ideas
          into real-world projects.
        </p>
      </div>

      {/* Right Side: RESUME */}
      <div
        className="hero-resume-container"
        style={{
          position: 'absolute',
          right: 'clamp(2.5rem, 6vw, 6rem)',
          bottom: '24%',
          zIndex: 10,
        }}
      >
        <a
          ref={resumeRef}
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-resume-btn"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-accent), var(--font-hero), serif',
            fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
            fontWeight: 400,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textDecoration: 'none',
            position: 'relative',
            padding: '0.4rem 0',
            transition: 'color 0.3s ease, opacity 0.3s ease',
          }}
        >
          RESUME
        </a>
      </div>

      {/* Bottom Center: scroll down */}
      <div
        ref={scrollHintRef}
        className="hero-scroll-hint"
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
            fontFamily: "var(--font-script), 'Ephesis', cursive",
            fontSize: '1.8rem',
            color: 'rgba(255,255,255,0.7)',
            animation: 'floatBounce 2.4s ease-in-out infinite',
          }}
        >
          scroll down
        </span>
      </div>

      {/* Far Right Edge Border Line */}
      <div
        className="hero-right-line"
        style={{
          position: 'absolute',
          right: '2rem',
          top: '18%',
          bottom: '12%',
          width: '1.5px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.4) 80%, transparent 100%)',
          zIndex: 20,
        }}
      />

      <style>{`
        .hero-resume-btn:hover {
          color: #a81313 !important;
        }

        .typing-cursor {
          animation: blinkCursor 0.8s infinite;
        }

        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes floatBounce {
          0%, 100% { transform: translateY(0); opacity: 0.65; }
          50% { transform: translateY(8px); opacity: 0.95; }
        }

        @media (max-width: 900px) {
          #home {
            min-height: 100vh !important;
            height: 100vh !important;
            height: 100dvh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-end !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .hero-bg-word {
            font-size: clamp(6.8rem, 28vw, 11.5rem) !important;
            top: 28% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            opacity: 0.75 !important;
            background: linear-gradient(180deg, #ff2222 0%, #cc1111 50%, #990000 85%, #440000 100%) !important;
            -webkit-background-clip: text !important;
            background-clip: text !important;
            letter-spacing: 0.05em !important;
          }
          .hero-portrait {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            top: 8% !important;
            bottom: auto !important;
            height: 56vh !important;
            width: 100% !important;
            max-width: 480px !important;
            margin: 0 !important;
            z-index: 5 !important;
          }
          .hero-portrait img {
            mask-image: linear-gradient(to bottom, black 65%, transparent 100%) !important;
            -webkit-mask-image: linear-gradient(to bottom, black 65%, transparent 100%) !important;
            transform: scale(1) !important;
          }
          .hero-content {
            position: absolute !important;
            left: 0 !important;
            bottom: 4rem !important;
            top: auto !important;
            padding-left: 1.25rem !important;
            padding-right: 0.5rem !important;
            padding-top: 0 !important;
            text-align: left !important;
            max-width: 72% !important;
            z-index: 10 !important;
          }
          .hero-greet-text {
            font-size: clamp(1.8rem, 5.5vw, 2.5rem) !important;
            margin-bottom: 0.1rem !important;
          }
          .hero-name-container {
            margin-bottom: 0.6rem !important;
            max-width: 100% !important;
          }
          .hero-role-text {
            font-size: clamp(0.68rem, 2.4vw, 0.8rem) !important;
            margin-bottom: 0.6rem !important;
            line-height: 1.3 !important;
          }
          .hero-bio-text {
            font-size: clamp(0.65rem, 2.2vw, 0.76rem) !important;
            line-height: 1.45 !important;
            margin-bottom: 0 !important;
            max-width: 100% !important;
            color: rgba(230,230,230,0.85) !important;
          }
          .hero-resume-container {
            position: absolute !important;
            right: 1.2rem !important;
            bottom: 10rem !important;
            top: auto !important;
            margin: 0 !important;
            text-align: right !important;
            z-index: 15 !important;
          }
          .hero-resume-btn {
            font-size: clamp(0.95rem, 3.2vw, 1.2rem) !important;
            letter-spacing: 0.18em !important;
          }
          .hero-scroll-hint {
            bottom: 1.2rem !important;
            z-index: 10 !important;
          }
          .hero-scroll-hint span {
            font-size: 1.4rem !important;
          }
          .hero-right-line {
            right: 0.7rem !important;
            top: 10% !important;
            bottom: 6% !important;
          }
        }
      `}</style>
    </section>
  )
}