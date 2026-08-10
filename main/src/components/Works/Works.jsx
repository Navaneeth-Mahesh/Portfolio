import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import imgNeuralos  from '../../assets/works/neuralos.png'
import imgBowlBite from '../../assets/works/02-bowl-and-bite.png'
import imgInkFlow from '../../assets/works/03-inkflow.jpg'
import imgBondly from '../../assets/works/04-bondly.jpg'
import imgSpiceBox from '../../assets/works/05-SpiceBox.png'
import imgAIAgent from '../../assets/works/06-AI-Agent.png'

/* ---------------------------------------------------------------- */
/* Data                                                               */
/* ---------------------------------------------------------------- */

const CATEGORY_META = {
  'AI Operating System': { label: 'AI / Systems', accent: '#9B8CE0' },
  'Food E-Commerce': { label: 'E-Commerce', accent: '#E2915F' },
  'Blogging Platform': { label: 'Publishing', accent: '#C9A869' },
  'Social Media': { label: 'Social', accent: '#D890A6' },
}

const projects = [
  {
    id: '01',
    title: 'Neural OS',
    category: 'AI Operating System',
    subtitle: 'The AI Operating System',
    description:
      'A full-stack AI platform that orchestrates intelligent agents across workflows, translating natural language into system commands. Built to replace traditional UX paradigms.',
    challenge:
      'Training a multi-agent system to understand context across thousands of user sessions without hallucination.',
    stack: ['React, Node, Express, js'],
    image: imgNeuralos,
    demo: null,
    github: 'https://github.com/Navaneeth-Mahesh/NeuralOS-AI',
    status: 'Frontend Developed, Backend still in progress..',
  },
  {
    id: '02',
    title: 'Bowl & Bite',
    category: 'Food E-Commerce',
    subtitle: 'Full-Stack Food E-Commerce Platform',
    description:
      'A modern full-stack food e-commerce app: browse products, create accounts, log in securely, manage carts, place orders, and track purchases through an intuitive interface — with role-based auth, protected routes, and full order management.',
    challenge:
      'The heaviest lift was the backend: API design, JWT auth, MongoDB modeling, protected routes, wiring frontend to backend, taming CORS in production, and shipping across two cloud platforms.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Axios'],
    image: imgBowlBite,
    demo: 'https://bowl-and-bite-ecommerce-store.vercel.app/',
    github: 'https://github.com/Navaneeth-Mahesh/bowl-and-bite-ecommerce-store',
  },
  {
    id: '03',
    title: 'InkFlow',
    category: 'Blogging Platform',
    subtitle: 'Modern Full-Stack Blogging Platform',
    description:
      'A feature-rich blogging platform for writing, publishing, and managing articles through a clean, responsive interface — with secure auth, image uploads, and a genuinely smooth writing experience.',
    challenge:
      'Getting the architecture to scale while shipping JWT auth with refresh tokens, Cloudinary uploads, role-based access, full CRUD, and clean Next.js ↔ Express communication.',
    stack: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'Cloudinary', 'JWT', 'Tailwind CSS'],
    image: imgInkFlow,
    demo: 'https://ink-flow-blog-platform-three.vercel.app/',
    github: 'https://github.com/Navaneeth-Mahesh/InkFlow-BlogPlatform',
  },
  {
    id: '04',
    title: 'Bondly',
    category: 'Social Media',
    subtitle: 'Modern Social Media Platform',
    description:
      'A social platform for connecting with friends, sharing thoughts, posting moments, and starting real conversations — built to feel personal, not performative.',
    challenge:
      'Same architectural bar as InkFlow: refresh-token auth, Cloudinary uploads, role-based access control, full CRUD, and a tight Next.js-style frontend to Express backend handshake.',
    stack: ['React', 'Vite', 'MongoDB', 'Cloudinary', 'JWT', 'Tailwind CSS'],
    image: imgBondly,
    demo: 'https://bondly-one.vercel.app/login',
    github: 'https://github.com/Navaneeth-Mahesh/Bondly',
  },
    {
    id: '05',
    title: 'SpiceBox',
    category: 'Food E-Commerce',
    subtitle: '',
    description:
      'A modern full-stack food e-commerce app: browse products, create accounts, log in securely, manage carts, place orders, and track purchases through an intuitive interface — with role-based auth, protected routes, and full order management.',
    challenge:
      'The heaviest lift was the backend: API design, JWT auth, MongoDB modeling, protected routes, wiring frontend to backend, taming CORS in production, and shipping across two cloud platforms.',
    stack: ['React', 'Vite', 'MongoDB', 'Cloudinary', 'JWT', 'Tailwind CSS'],
    image: imgSpiceBox,
    demo: 'https://code-alpha-spice-box.vercel.app/',
    github: 'https://github.com/Navaneeth-Mahesh/SpiceBox',
  },
  {
    id: '06',
    title: 'Local-AI-Agent',
    category: 'AI Operating System',
    subtitle: 'Private AI. Your Machine. Your Rules.',
    description:'A production-grade self-hosted AI agent that runs locally on your own machine. It combines conversational AI, long-term memory, semantic search, local file indexing, browser access, coding assistance, and permission-based system tools — giving users a private, extensible AI assistant without relying on a centralized cloud platform.',
    challenge:'The biggest challenge was designing the agent as a real software system rather than a simple chatbot: building JWT authentication and user isolation, integrating LLM providers, managing conversations and memory, designing a modular Tool Registry, implementing RAG and semantic search, safely exposing local system capabilities through permissions, and maintaining a clean architecture that can scale with new tools and AI providers.',
    stack: ['React','TypeScript','Python','FastAPI','Gemini API','Ollama','RAG',],
    image: imgAIAgent,
    demo: 'No-Demo',
    github: 'https://github.com/Navaneeth-Mahesh/Local-AI-Agent',
  },
]

const FILTERS = ['All', ...new Set(projects.map((p) => CATEGORY_META[p.category].label))]

const GOLD = '#c9a869'
const BG = '#000000'
const BONE = '#f3eee4'

/* ---------------------------------------------------------------- */
/* Pin marker                                                        */
/* ---------------------------------------------------------------- */

function PinMark({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ display: 'block' }}>
      <circle cx="9" cy="6.5" r="4.5" fill={color} />
      <rect x="8.1" y="10.5" width="1.8" height="6.5" rx="0.9" fill={color} opacity="0.85" />
    </svg>
  )
}

/* ---------------------------------------------------------------- */
/* Component                                                         */
/* ---------------------------------------------------------------- */

export default function Works() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const chipsRef = useRef(null)
  const gridRef = useRef(null)

  const [filter, setFilter] = useState('All')
  const [activeProject, setActiveProject] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) => CATEGORY_META[p.category].label === filter)
  }, [filter])

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* Entrance animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: prefersReducedMotion ? 0.01 : 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )

      gsap.fromTo(
        chipsRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: prefersReducedMotion ? 0.01 : 0.9,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: { trigger: chipsRef.current, start: 'top 88%' },
        }
      )

      const cards = gsap.utils.toArray('.work-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: prefersReducedMotion ? 0.01 : 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Re-stagger the board when the filter changes */
  useEffect(() => {
    const cards = gsap.utils.toArray('.work-card')
    if (!cards.length) return
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: prefersReducedMotion ? 0.01 : 0.55, ease: 'power2.out', stagger: 0.05 }
    )
    ScrollTrigger.refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  /* Modal open/close lifecycle */
  const openProject = (project) => {
    setActiveProject(project)
    requestAnimationFrame(() => setModalOpen(true))
  }

  const closeProject = () => {
    setModalOpen(false)
    setTimeout(() => setActiveProject(null), 320)
  }

  useEffect(() => {
    if (!activeProject) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeProject()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject])

  return (
    <section
      id="works"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: BG,
        padding: '10rem 0 8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* faint radial wash so the board doesn't sit on flat black */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'transparent',
          pointerEvents: 'none',
        }}
      />

      {/* background section index — page-level structural marker, not project numbering */}
      <div
        style={{
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
        }}
      >
        03
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 3rem', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '3rem', opacity: 0, maxWidth: '640px' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.4em',
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            03 — The Board
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-hero)',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'white',
              lineHeight: 0.95,
              marginBottom: '1.1rem',
            }}
          >
            Things I've built.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            A board of shipped products, sorted by kind. Pin a card open for the full build story.
          </p>
        </div>

        {/* Filter chips */}
        <div
          ref={chipsRef}
          style={{
            opacity: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginBottom: '3.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {FILTERS.map((f) => {
            const isActive = filter === f
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '999px',
                  border: `1px solid ${isActive ? GOLD : 'rgba(255,255,255,0.14)'}`,
                  background: isActive ? GOLD : 'transparent',
                  color: isActive ? '#0a0910' : 'rgba(255,255,255,0.55)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
                  if (!isActive) e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                  if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                }}
              >
                {f}
              </button>
            )
          })}
        </div>

        {/* Masonry board */}
        <div ref={gridRef} className="works-masonry">
          {filteredProjects.map((project) => {
            const meta = CATEGORY_META[project.category]
            return (
              <div
                key={project.id}
                className="work-card"
                onClick={() => openProject(project)}
                data-cursor
                style={{
                  breakInside: 'avoid',
                  WebkitColumnBreakInside: 'avoid',
                  marginBottom: '1.5rem',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'none',
                  background: '#121018',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* pin marker */}
                <div
                  className="work-card-pin"
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    zIndex: 3,
                    transform: 'rotate(-14deg)',
                    opacity: 0,
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                  }}
                >
                  <PinMark color={meta.accent} />
                </div>

                {project.image ? (
                  <div style={{ position: 'relative' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="work-card-img"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        filter: 'grayscale(0.1) contrast(1.05)',
                        transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease',
                      }}
                    />
                    <div
                      className="work-card-overlay"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(6,5,8,0.92) 0%, rgba(6,5,8,0.15) 55%, transparent 75%)',
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '1.4rem',
                      }}
                    >
                      <CardFooter project={project} meta={meta} />
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      minHeight: '340px',
                      padding: '1.4rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background:
                        'radial-gradient(120% 100% at 0% 0%, rgba(155,140,224,0.14), transparent 55%), linear-gradient(160deg, #16131d, #0d0b12)',
                    }}
                  >
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: meta.accent,
                        border: `1px solid ${meta.accent}55`,
                        borderRadius: '999px',
                        padding: '0.3rem 0.7rem',
                      }}
                    >
                      ● {project.status}
                    </span>
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8rem',
                          lineHeight: 1.7,
                          color: 'rgba(255,255,255,0.35)',
                          marginBottom: '1.2rem',
                        }}
                      >
                        {project.description}
                      </p>
                      <CardFooter project={project} meta={meta} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Pin detail modal */}
      {activeProject && (
        <div
          className={`pin-modal ${modalOpen ? 'is-open' : ''}`}
          onClick={closeProject}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'rgba(6,5,8,0.72)',
            backdropFilter: 'blur(14px)',
            opacity: modalOpen ? 1 : 0,
            transition: 'opacity 0.32s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="pin-modal-panel"
            style={{
              width: '100%',
              maxWidth: '1000px',
              maxHeight: '86vh',
              overflowY: 'auto',
              background: '#0f0d13',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '14px',
              display: 'grid',
              gridTemplateColumns: activeProject.image ? '1.05fr 0.95fr' : '1fr',
              transform: modalOpen ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(14px)',
              opacity: modalOpen ? 1 : 0,
              transition: 'transform 0.36s cubic-bezier(0.16,1,0.3,1), opacity 0.32s ease',
              boxShadow: '0 40px 90px -30px rgba(0,0,0,0.8)',
            }}
          >
            {activeProject.image && (
              <div style={{ background: '#000' }}>
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            <div style={{ padding: '2.75rem 2.5rem', position: 'relative' }}>
              <button
                onClick={closeProject}
                aria-label="Close"
                data-cursor
                style={{
                  position: 'absolute',
                  top: '1.4rem',
                  right: '1.4rem',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>

              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: CATEGORY_META[activeProject.category].accent,
                  border: `1px solid ${CATEGORY_META[activeProject.category].accent}55`,
                  borderRadius: '999px',
                  padding: '0.3rem 0.75rem',
                  marginBottom: '1.1rem',
                }}
              >
                {CATEGORY_META[activeProject.category].label}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-hero)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  fontWeight: 400,
                  color: 'white',
                  marginBottom: '0.4rem',
                  lineHeight: 1.05,
                }}
              >
                {activeProject.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-hero)',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: GOLD,
                  marginBottom: '1.5rem',
                }}
              >
                {activeProject.subtitle}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.55)',
                  marginBottom: '1.8rem',
                }}
              >
                {activeProject.description}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                  marginBottom: '0.6rem',
                }}
              >
                The challenge
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.4)',
                  fontStyle: 'italic',
                  marginBottom: '2rem',
                }}
              >
                {activeProject.challenge}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                  marginBottom: '0.9rem',
                }}
              >
                Stack
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.4rem' }}>
                {activeProject.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.06em',
                      color: 'rgba(255,255,255,0.55)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '0.35rem 0.8rem',
                      borderRadius: '2px',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {(activeProject.demo || activeProject.github) && (
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {activeProject.demo && (
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#060606',
                        textDecoration: 'none',
                        background: GOLD,
                        padding: '0.75rem 1.6rem',
                        borderRadius: '2px',
                        transition: 'filter 0.3s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.15)')}
                      onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.5)',
                        textDecoration: 'none',
                        border: '1px solid rgba(255,255,255,0.15)',
                        padding: '0.72rem 1.6rem',
                        borderRadius: '2px',
                        transition: 'color 0.3s, border-color 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                      }}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .works-masonry {
          column-count: 3;
          column-gap: 1.5rem;
        }
        .work-card:hover .work-card-img {
          transform: scale(1.05);
          filter: grayscale(0) contrast(1.05);
        }
        .work-card:hover .work-card-overlay {
          opacity: 1;
        }
        .work-card:hover .work-card-pin {
          opacity: 1;
          transform: rotate(0deg);
        }

        @media (max-width: 1024px) {
          .works-masonry { column-count: 2; }
        }
        @media (max-width: 640px) {
          .works-masonry { column-count: 1; }
          .pin-modal-panel { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .work-card-img, .work-card-overlay, .work-card-pin, .pin-modal-panel, .pin-modal {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Shared card footer (title + category + arrow)                    */
/* ---------------------------------------------------------------- */

function CardFooter({ project, meta }) {
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.75rem' }}>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-hero)',
            fontSize: '1.05rem',
            fontWeight: 400,
            color: BONE,
            marginBottom: '0.3rem',
          }}
        >
          {project.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: meta.accent,
          }}
        >
          {meta.label}
        </p>
      </div>
      <span
        style={{
          flexShrink: 0,
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: `1px solid ${meta.accent}88`,
          color: meta.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.85rem',
        }}
      >
        ↗
      </span>
    </div>
  )
}