import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  IMAGES                                                             */
/*  Drop your project cover images into: src/assets/works/             */
/*  Recommended size: 1000 x 1250px (4:5 portrait), JPG, ~70-80%       */
/*  quality, under ~400KB each. Object-fit: cover is used, so keep     */
/*  the subject centered — edges may get cropped on narrow screens.    */
/*  Rename the files below to match whatever you drop in, or keep      */
/*  these names and just add the four files.                           */
/* ------------------------------------------------------------------ */
import imgBowlBite from '../../assets/works/02-bowl-and-bite.png'
import imgInkFlow from '../../assets/works/03-inkflow.jpg.jpg'
import imgBondly from '../../assets/works/04-bondly.jpg'

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
    stack: ['In progress'],
    image: null,
    demo: '#',
    github: '#',
  },
  {
    id: '02',
    title: 'Bowl & Bite',
    category: 'Food E-Commerce',
    subtitle: 'Full-Stack Food E-Commerce Platform',
    description:
      'Bowl & Bite is a modern full-stack food e-commerce application that allows users to browse food products, create accounts, securely log in, manage carts, place orders, and track purchases through an intuitive user interface. The platform includes role-based authentication, protected routes, order management, product catalog management, and a responsive shopping experience designed to simulate a real-world online food ordering system.',
    challenge:
      'One of the biggest challenges during development was building and integrating the backend architecture — API development, JWT authentication, database modeling with MongoDB, protected routes, connecting frontend and backend services, handling CORS during deployment, and shipping across multiple cloud platforms.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Axios', 'Render', 'Vercel'],
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
      'InkFlow is a feature-rich blogging platform that enables users to write, publish, and manage articles through a clean, responsive interface. Built with a modern full-stack architecture, it offers secure authentication, image uploads, blog interactions, and a seamless writing experience.',
    challenge:
      'Building a scalable architecture while implementing secure JWT authentication with refresh tokens, Cloudinary image uploads, role-based access control, CRUD operations, and smooth communication between the Next.js frontend and Express backend.',
    stack: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'Cloudinary', 'JWT', 'Tailwind CSS', 'Render', 'Vercel'],
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
      'Bondly is a fun social media platform where you can connect with friends, share your thoughts, post memorable moments, and start meaningful conversations. Express yourself, discover new people, and build genuine connections — all in one place.',
    challenge:
      'Building a scalable architecture while implementing secure JWT authentication with refresh tokens, Cloudinary image uploads, role-based access control, CRUD operations, and smooth communication between the Next.js frontend and Express backend.',
    stack: ['React', 'Vite', 'JavaScript', 'MongoDB', 'Cloudinary', 'JWT', 'Tailwind CSS', 'Render', 'Vercel'],
    image: imgBondly,
    demo: 'https://bondly-one.vercel.app/login',
    github: 'https://github.com/Navaneeth-Mahesh/Bondly',
  },
]

const GOLD = '#c9a869'

export default function Works() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const navRef = useRef(null)
  const panelRef = useRef(null)

  const [hovered, setHovered] = useState(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )

      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          delay: 0.15,
          scrollTrigger: { trigger: navRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!panelRef.current) return
    gsap.to(panelRef.current, {
      height: active !== null ? 'auto' : 0,
      opacity: active !== null ? 1 : 0,
      duration: 0.7,
      ease: 'expo.out',
    })
  }, [active])

  const activeProject = active !== null ? projects[active] : null

  return (
    <section
      id="works"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#060606',
        padding: '10rem 0 8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background number */}
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 3rem', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '5rem', opacity: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.4em',
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            03 — Selected Works
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-hero)',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'white',
              lineHeight: 0.9,
            }}
          >
            The Work.
          </h2>
        </div>

        {/* Numbered nav — hover reveals a cover image above each number */}
        <div
          ref={navRef}
          className="works-nav"
          style={{
            opacity: 0,
            display: 'grid',
            gridTemplateColumns: `repeat(${projects.length}, 1fr)`,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {projects.map((project, i) => {
            const isHovered = hovered === i
            const isActive = active === i
            const lit = isHovered || isActive

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setActive(active === i ? null : i)}
                data-cursor
                style={{
                  position: 'relative',
                  padding: '0 0.75rem',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  cursor: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {/* Image curtain — slides up from behind the number */}
                <div
                  style={{
                    position: 'absolute',
                    left: '10%',
                    right: '10%',
                    bottom: '7.5rem',
                    height: lit ? 'clamp(180px, 24vw, 300px)' : 0,
                    borderRadius: '2px 2px 0 0',
                    overflow: 'hidden',
                    transition: 'height 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: lit ? '0 30px 60px -20px rgba(0,0,0,0.7)' : 'none',
                    background: project.image ? '#111' : `linear-gradient(160deg, #151515, #0a0a0a)`,
                  }}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: 'clamp(180px, 24vw, 300px)',
                        objectFit: 'cover',
                        display: 'block',
                        filter: 'grayscale(0.15) contrast(1.05)',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: 'clamp(180px, 24vw, 300px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.2)',
                      }}
                    >
                      In progress
                    </div>
                  )}
                </div>

                {/* Big number */}
                <span
                  style={{
                    fontFamily: 'var(--font-hero)',
                    fontWeight: 300,
                    fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                    lineHeight: 1,
                    padding: '2.5rem 0 1rem',
                    color: lit ? GOLD : 'rgba(255,255,255,0.5)',
                    transition: 'color 0.4s ease',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {project.id}
                </span>

                {/* Title + category */}
                <div style={{ paddingBottom: '1.75rem', position: 'relative', zIndex: 2 }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-hero)',
                      fontSize: '0.95rem',
                      fontWeight: 400,
                      color: lit ? 'white' : 'rgba(255,255,255,0.65)',
                      marginBottom: '0.35rem',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {project.title}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {project.category}
                  </p>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '0.6rem',
                      fontSize: '0.85rem',
                      color: lit ? GOLD : 'rgba(255,255,255,0.25)',
                      transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.4s ease, color 0.4s ease',
                    }}
                  >
                    ↗
                  </span>
                </div>

                {/* Underline that grows when lit */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '2px',
                    width: lit ? '100%' : '0%',
                    background: GOLD,
                    transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Expanded detail panel */}
        <div ref={panelRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
          {activeProject && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: '4rem',
                padding: '3.5rem 0 1rem',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
              className="works-detail"
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: GOLD,
                    marginBottom: '1.25rem',
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
                    marginBottom: '2rem',
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
                  }}
                >
                  {activeProject.challenge}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.25)',
                    marginBottom: '1rem',
                  }}
                >
                  Stack
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
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

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noreferrer"
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
                    onMouseEnter={(e) => (e.target.style.filter = 'brightness(1.15)')}
                    onMouseLeave={(e) => (e.target.style.filter = 'brightness(1)')}
                  >
                    Live Demo ↗
                  </a>
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noreferrer"
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
                      e.target.style.color = 'white'
                      e.target.style.borderColor = 'rgba(255,255,255,0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'rgba(255,255,255,0.5)'
                      e.target.style.borderColor = 'rgba(255,255,255,0.15)'
                    }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .works-nav { grid-template-columns: repeat(2, 1fr) !important; }
          .works-detail { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .works-nav { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
