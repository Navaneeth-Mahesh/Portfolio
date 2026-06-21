import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: '01',
    title: 'NEURAL OS',
    subtitle: 'The AI Operating System',
    description: 'A full-stack AI platform that orchestrates intelligent agents across workflows, translating natural language into system commands. Built to replace traditional UX paradigms.',
    challenge: 'Training a multi-agent system to understand context across thousands of user sessions without hallucination.',
    stack: ['Still in progress', '----', '------', '-------', '--------'],
    color: '#0a0a0a',
    accent: 'rgba(200,200,200,0.08)',
    demo: '#',
    github: '#',
  },
{
  id: '02',
  title: 'Bowl & Bite',
  subtitle: 'Full-Stack Food E-Commerce Platform',
  description:
    'Bowl & Bite is a modern full-stack food e-commerce application that allows users to browse food products, create accounts, securely log in, manage carts, place orders, and track purchases through an intuitive user interface. The platform includes role-based authentication, protected routes, order management, product catalog management, and a responsive shopping experience designed to simulate a real-world online food ordering system.',
  challenge:
    'One of the biggest challenges during development was building and integrating the backend architecture. I had to learn API development, authentication using JWT, database modeling with MongoDB, handling protected routes, connecting frontend and backend services, managing CORS issues during deployment, and deploying the application across multiple cloud platforms. Through solving these challenges, I gained practical experience in full-stack development and significantly improved my backend engineering skills.',
  stack: [
    'React','Vite','Tailwind CSS','JavaScript','Node.js','Express.js','MongoDB','Mongoose','JWT','Axios','Render','Vercel'],
  color: '#060606',
  accent: 'rgba(180,180,180,0.07)',
  demo: 'https://bowl-and-bite-ecommerce-store.vercel.app/',
  github: 'https://github.com/Navaneeth-Mahesh/bowl-and-bite-ecommerce-store',
},
  {
    id: '03',
    title: '-----',
    subtitle: '----------------------------',
    description: '------------------------------------------------------------------------------------',
    challenge: '----------------------------------------------',
    stack: ['---------', '------------', '-------', '--------', '------'],
    color: '#050505',
    accent: 'rgba(160,160,160,0.06)',
    demo: '#',
    github: '#',
  },
]

export default function Works() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const cardsRef = useRef([])
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      // Cards stagger in
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 80, rotateX: 10 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 1.2, ease: 'expo.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="works"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#050505',
        padding: '10rem 0 8rem',
        position: 'relative',
      }}
    >
      {/* Background number */}
      <div style={{
        position: 'absolute',
        right: '-3%',
        top: '8%',
        fontFamily: 'var(--font-hero)',
        fontSize: 'clamp(12rem, 30vw, 26rem)',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.015)',
        userSelect: 'none',
        pointerEvents: 'none',
        lineHeight: 1,
      }}>
        03
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 3rem', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '5rem', opacity: 0 }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>03 — Selected Works</p>
          <h2 style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'white',
            lineHeight: 0.9,
          }}>
            The Work.
          </h2>
        </div>

        {/* Project list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isActive={active === i}
              onToggle={() => setActive(active === i ? -1 : i)}
              ref={el => cardsRef.current[i] = el}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import { forwardRef } from 'react'

const ProjectCard = forwardRef(function ProjectCard({ project, index, isActive, onToggle }, ref) {
  const expandRef = useRef(null)

  useEffect(() => {
    if (expandRef.current) {
      gsap.to(expandRef.current, {
        height: isActive ? 'auto' : 0,
        opacity: isActive ? 1 : 0,
        duration: 0.7,
        ease: 'expo.out',
      })
    }
  }, [isActive])

  return (
    <div
      ref={ref}
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        opacity: 0,
      }}
    >
      {/* Header row */}
      <div
        onClick={onToggle}
        data-cursor
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2.5rem 0',
          cursor: 'none',
          transition: 'padding 0.3s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {/* Index */}
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.2)',
          }}>
            {project.id}
          </span>

          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
            transition: 'color 0.4s',
            lineHeight: 1,
          }}>
            {project.title}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {/* Stack preview */}
          <div style={{ display: 'flex', gap: '0.5rem', opacity: 0.4 }}>
            {project.stack.slice(0, 2).map(s => (
              <span key={s} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '0.2rem 0.6rem',
                borderRadius: '1px',
              }}>
                {s}
              </span>
            ))}
          </div>

          {/* Toggle */}
          <div style={{
            width: '32px',
            height: '32px',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.4s, border-color 0.3s',
            transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
            borderColor: isActive ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1 }}>+</span>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <div ref={expandRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          padding: '0 0 3.5rem',
          paddingLeft: '5rem',
        }}>
          {/* Left */}
          <div>
            <p style={{
              fontFamily: 'var(--font-hero)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1rem',
            }}>
              {project.subtitle}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '1.5rem',
            }}>
              {project.description}
            </p>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              marginBottom: '0.5rem',
            }}>
              The challenge
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.4)',
              fontStyle: 'italic',
            }}>
              {project.challenge}
            </p>
          </div>

          {/* Right */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              marginBottom: '1rem',
            }}>
              Stack
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
              {project.stack.map(s => (
                <span key={s} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '2px',
                }}>
                  {s}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href={project.demo}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'white',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '2px',
                  transition: 'background 0.3s, border-color 0.3s',
                }}
                onMouseEnter={e => {
                  e.target.style.background = 'rgba(255,255,255,0.08)'
                  e.target.style.borderColor = 'rgba(255,255,255,0.4)'
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'transparent'
                  e.target.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
              >
                Live Demo ↗
              </a>
              <a
                href={project.github}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '2px',
                  transition: 'color 0.3s, border-color 0.3s',
                }}
                onMouseEnter={e => {
                  e.target.style.color = 'white'
                  e.target.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
                onMouseLeave={e => {
                  e.target.style.color = 'rgba(255,255,255,0.4)'
                  e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
