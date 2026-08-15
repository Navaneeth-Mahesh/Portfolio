import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'H', full: 'Home', href: '#home' },
  { label: 'A', full: 'About', href: '#about' },
  { label: 'W', full: 'Works', href: '#works' },
  { label: 'C', full: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('H')

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Section highlight detector
      const sections = ['#home', '#about', '#works', '#contact']
      const scrollPos = window.scrollY + 200

      sections.forEach((sec, idx) => {
        const el = document.querySelector(sec)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(navLinks[idx].label)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (e, href, label) => {
    e.preventDefault()
    setActiveSection(label)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '2rem clamp(1.5rem, 5vw, 4rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.4s ease, padding 0.3s ease',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        pointerEvents: 'auto',
      }}
    >
      {/* Brand logo N. */}
      <a
        href="#home"
        onClick={(e) => handleNav(e, '#home', 'H')}
        style={{
          fontFamily: 'var(--font-accent), serif',
          fontSize: '1.1rem',
          fontWeight: 400,
          letterSpacing: '0.15em',
          color: '#ffffff',
          textDecoration: 'none',
          opacity: scrolled ? 1 : 0.85,
          transition: 'opacity 0.3s ease',
        }}
      >
        N.
      </a>

      {/* Desktop Links: H  A  W  C */}
      <ul
        style={{
          display: 'flex',
          gap: '2.5rem',
          listStyle: 'none',
          alignItems: 'center',
          margin: 0,
          padding: 0,
        }}
      >
        {navLinks.map(({ label, full, href }) => {
          const isActive = activeSection === label
          return (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => handleNav(e, href, label)}
                title={full}
                style={{
                  fontFamily: 'var(--font-accent), var(--font-hero), serif',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '0.25rem',
                  transition: 'color 0.3s ease',
                }}
              >
                {label}
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '2px',
                    background: '#a81313',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                    transformOrigin: 'center',
                  }}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}