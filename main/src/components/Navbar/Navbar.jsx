import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 3.5 }
    )

    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
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
        padding: '1rem clamp(1rem, 4vw, 3rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.5s ease, padding 0.3s ease',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}
    >
      {/* Logo */}
      <a
        href="#home"
        onClick={(e) => handleNav(e, '#home')}
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: '1.1rem',
          fontWeight: 400,
          letterSpacing: '0.15em',
          color: 'white',
          textDecoration: 'none',
        }}
      >
        N.
      </a>

      {/* Desktop Links */}
      <ul
        style={{
          display: 'flex',
          gap: 'clamp(1rem, 3vw, 2.5rem)',
          listStyle: 'none',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}
      >
        {navLinks.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              onClick={(e) => handleNav(e, href)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'white')}
              onMouseLeave={(e) =>
                (e.target.style.color = 'rgba(255,255,255,0.5)')
              }
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
        }}
        className="mobile-menu-btn"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(0,0,0,0.95)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNav(e, href)}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}