import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '2007', event: 'A boy was born.' },
  { year: '2024', event: 'Curiosity found its spark.' },
  { year: '2026', event: 'Lines of code became words.' },
  { year: '2028', event: 'Projects became products.' },
  { year: 'Today', event: 'Building digital experiences.' },
  { year: 'Tomorrow', event: 'Something bigger.' },
]

export default function About() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const itemsRef = useRef([])
  const statementRef = useRef(null)
  const bgTextRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin and grow timeline line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'center center',
            scrub: 1,
          },
        }
      )

      // Animate each timeline item
      itemsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Big statement
      const words = statementRef.current?.querySelectorAll('.word')
      if (words) {
        gsap.fromTo(words,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Background text parallax
      gsap.to(bgTextRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const statement = "Every line of code is a step toward the future I'm creating."
  const words = statement.split(' ')

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'var(--near-black)',
        padding: '10rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background large text */}
      <div
        ref={bgTextRef}
        style={{
          position: 'absolute',
          top: '5%',
          left: '-5%',
          fontFamily: 'var(--font-hero)',
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.018)',
          letterSpacing: '-0.05em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        STORY
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 3rem', position: 'relative', zIndex: 2 }}>

        {/* Section label */}
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.6rem',
          letterSpacing: '0.4em',
          color: 'rgba(255,255,255,0.25)',
          textTransform: 'uppercase',
          marginBottom: '5rem',
        }}>
          02 — The story
        </div>

        {/* Timeline */}
        <div className="timeline-container" style={{ position: 'relative', paddingLeft: '2px' }}>
          {/* Growing line */}
          <div
            ref={lineRef}
            className="timeline-line"
            style={{
              position: 'absolute',
              left: '80px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
              transformOrigin: 'top',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {timeline.map(({ year, event }, i) => (
              <div
                key={year}
                ref={el => itemsRef.current[i] = el}
                className="timeline-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3rem',
                  paddingLeft: '0',
                  opacity: 0,
                }}
              >
                {/* Year */}
                <div style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.25)',
                  minWidth: '75px',
                  textAlign: 'right',
                  letterSpacing: '0.05em',
                }}>
                  {year}
                </div>

                {/* Dot */}
                <div style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: i === timeline.length - 1 ? 'white' : 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  flexShrink: 0,
                  marginLeft: '-3px',
                  boxShadow: i === timeline.length - 1 ? '0 0 20px rgba(255,255,255,0.3)' : 'none',
                }} />

                {/* Event */}
                <p style={{
                  fontFamily: 'var(--font-hero)',
                  fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)',
                  fontWeight: 300,
                  color: i === timeline.length - 1 ? 'white' : 'rgba(255,255,255,0.65)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  fontStyle: i === timeline.length - 1 ? 'italic' : 'normal',
                }}>
                  {event}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Statement */}
        <div
          ref={statementRef}
          style={{
            marginTop: '8rem',
            maxWidth: '800px',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)',
            fontWeight: 300,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            color: 'white',
          }}>
            {words.map((word, i) => (
              <span
                key={i}
                className="word"
                style={{
                  display: 'inline-block',
                  marginRight: '0.25em',
                  opacity: 0,
                  color: i < 3 ? 'rgba(255,255,255,0.4)' : 'white',
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Skills */}
        <SkillsRow />
      </div>
    </section>
  )
}

function SkillsRow() {
  const skills = ['Html', 'Css', 'Js','DSA with Java', 'React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Next.js', 'MongoDB']
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current?.querySelectorAll('.skill-item'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      }
    )
  }, [])

  return (
    <div ref={ref} style={{ marginTop: '5rem' }}>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.6rem',
        letterSpacing: '0.3em',
        color: 'rgba(255,255,255,0.2)',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
      }}>
        Stack
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {skills.map(s => (
          <span
            key={s}
            className="skill-item"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.45)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '0.4rem 1rem',
              borderRadius: '2px',
              opacity: 0,
              transition: 'border-color 0.3s, color 0.3s',
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.4)'
              e.target.style.color = 'white'
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.1)'
              e.target.style.color = 'rgba(255,255,255,0.45)'
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
