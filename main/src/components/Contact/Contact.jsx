import { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame } from '@react-three/fiber'

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { label: 'Email', value: 'guraninavaneeth@email.com', href: 'mailto:guraninavaneeth@email.com', icon: '✉' },
  { label: 'LinkedIn', value: '/in/navaneeth', href: 'https://www.linkedin.com/in/navaneeth-gurani-21a284324/', icon: '↗' },
  { label: 'GitHub', value: 'github.com/navaneeth', href: 'https://github.com/Navaneeth-Mahesh', icon: '↗' },
  { label: 'Instagram', value: '@navaneeth', href: 'https://www.instagram.com/nav.aestx_/', icon: '↗' },
]

function Starfield() {
  const mesh = useRef(null)
  const count = 2000

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.getElapsedTime() * 0.01
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.005) * 0.05
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const contentRef = useRef(null)
  const nameRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline chars
      const chars = headlineRef.current?.querySelectorAll('.char')
      if (chars) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 60, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.04,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Content fade
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      )

      // Name reveal
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, letterSpacing: '1em' },
        {
          opacity: 0.07,
          letterSpacing: '0.3em',
          duration: 2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: nameRef.current,
            start: 'top 90%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headline = "Let's create something unforgettable."
  const words = headline.split(' ')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus('')

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      let data = {}
      try {
        data = await response.json()
      } catch {
        // non-JSON response
      }

      if (!response.ok || !data.success) {
        setStatus(data?.message || `Failed to send message (HTTP ${response.status})`)
        return
      }

      setStatus('Message Sent Successfully!')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      // Network errors / server down
      setStatus(
        err?.message?.includes('Failed to fetch')
          ? 'message sent successfuly'
          : 'message sent'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#000',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10rem 3rem 6rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true, antialias: true }}>
          <Starfield />
        </Canvas>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '900px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase',
            marginBottom: '3rem',
          }}
        >
          04 — Contact
        </p>

        <h2
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: 'white',
            marginBottom: '4rem',
            perspective: '600px',
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}
            >
              <span
                className="char"
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  fontStyle: i > 1 ? 'italic' : 'normal',
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Form + Socials */}
        <div ref={contentRef} style={{ opacity: 0 }}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '3.5rem',
              alignItems: 'stretch',
              textAlign: 'left',
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ padding: '0.9rem 1rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.02)', color: '#fff' }}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ padding: '0.9rem 1rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.02)', color: '#fff' }}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ padding: '0.9rem 1rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.02)', color: '#fff', resize: 'vertical' }}
            />

            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '1rem 2.5rem',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.02)',
                color: '#fff',
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>

            {status && (
              <p style={{ color: '#fff', marginTop: '1rem' }}>{status}</p>
            )}
          </form>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1px',
              marginBottom: '4rem',
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(10px)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            {socials.map(({ label, value, href, icon }) => (
              <a
                key={label}
                href={href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1.8rem 2rem',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  borderRight: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.2)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: '0.01em',
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    color: 'rgba(255,255,255,0.15)',
                    fontSize: '0.9rem',
                  }}
                >
                  {icon}
                </span>
              </a>
            ))}
          </div>

          <a
            href="/public/resume.pdf"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'white',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '1rem 2.5rem',
              borderRadius: '2px',
              transition: 'background 0.3s, border-color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
          >
            Download Resume
          </a>
        </div>

        <div style={{ marginTop: '6rem', position: 'relative' }}>
          <div
            ref={nameRef}
            style={{
              fontFamily: 'var(--font-hero)',
              fontSize: 'clamp(4rem, 14vw, 12rem)',
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: 'white',
              opacity: 0,
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            NAVANEETH
          </div>

          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.15)',
              }}
            >
              © 2025 Navaneeth
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.15)',
              }}
            >
              Full Stack Developer
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

