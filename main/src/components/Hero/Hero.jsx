import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleField from '../../three/Particles/ParticleField'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const portraitRef = useRef(null)
  const greetRef = useRef(null)
  const nameRef = useRef(null)
  const taglineRef = useRef(null)
  const titleRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.8 })

    // Greeting fade in
    tl.fromTo(greetRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
    // Portrait reveal
    .fromTo(portraitRef.current,
      { opacity: 0, scale: 1.05, filter: 'brightness(0)' },
      { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 2.5, ease: 'power2.out' },
      '-=0.5'
    )
    // Greeting fades, name appears
    .to(greetRef.current, { opacity: 0, y: -20, duration: 0.7, ease: 'power2.in' }, '+=0.5')
    .fromTo(nameRef.current,
      { opacity: 0, y: 60, letterSpacing: '0.5em' },
      { opacity: 1, y: 0, letterSpacing: '-0.02em', duration: 1.5, ease: 'expo.out' },
      '-=0.3'
    )
    .fromTo(taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.7'
    )
    .fromTo(scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.3'
    )

    // Parallax on scroll
    gsap.to(portraitRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    gsap.to([nameRef.current, taglineRef.current, titleRef.current], {
      yPercent: -30,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: '60% top',
        end: 'bottom top',
        scrub: 1,
      },
    })
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
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000',
        padding: '0 1rem',
      }}
    >
      {/* Particle field */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <ParticleField />
      </div>

      {/* Portrait */}
      <div
        ref={portraitRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: 0,
          transform: 'scale(1.05)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/portrait.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            filter: 'grayscale(100%) contrast(1.1)',
          }}
        />
        {/* Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.85) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.9) 100%)
            `,
          }}
        />
      </div>

      {/* Greeting */}
      <div
        ref={greetRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          textAlign: 'center',
          opacity: 0,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-hero)',
          fontSize: 'clamp(1.5rem, 4vw, 3rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.05em',
        }}>
          Hello, Stranger.
        </p>
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'absolute',
          bottom: '8vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center',
          width: '100%',
          padding: '0 1rem',
        }}
      >
        {/* Name */}
        <h1
          ref={nameRef}
          className="hero-name"
          style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(4rem, 12vw, 11rem)',
            fontWeight: 500,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: 'white',
            opacity: 0,
            marginBottom: '1rem',
            wordBreak: 'break-word'
          }}
        >
          Navaneeth
        </h1>

        {/* Separator line */}
        <div style={{
          width: 'min(600px, 80%)',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
          margin: '0 auto 1.2rem',
        }} />

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.08em',
            opacity: 0,
            marginBottom: '0.5rem',
          }}
        >
          I don't build websites. I build experiences.
        </p>

        {/* Title */}
        <p
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            fontWeight: 400,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            opacity: 0,
          }}
        >
          Full Stack Developer
        </p>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '3rem',
          zIndex: 10,
          opacity: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}

        className="scroll-hint"
      >
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
        }}>Scroll</span>
        <ScrollArrow />
      </div>
    </section>
  )
}

function ScrollArrow() {
  return (
    <div style={{
      width: '1px',
      height: '50px',
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
      animation: 'scrollPulse 2s ease-in-out infinite',
    }}>
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  )
}
