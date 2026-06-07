import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const counterRef = useRef(null)
  const lineRef = useRef(null)
  const textRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frame = 0
    const total = 100
    const duration = 2600

    const interval = setInterval(() => {
      frame++
      const progress = frame / total
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))

      if (frame >= total) {
        clearInterval(interval)
        setCount(100)

        // Exit animation
        const tl = gsap.timeline({ onComplete })
        tl.to(lineRef.current, { scaleX: 1, duration: 0.5, ease: 'power2.out' })
          .to([counterRef.current, textRef.current], {
            opacity: 0, y: -20, duration: 0.5, stagger: 0.1, ease: 'power2.in'
          }, '-=0.2')
          .to(loaderRef.current, {
            yPercent: -100,
            duration: 1,
            ease: 'expo.inOut'
          }, '-=0.1')
      }
    }, duration / total)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div ref={loaderRef} className="loader-wrap">
      <div style={{ position: 'relative', textAlign: 'center' }}>
        {/* Counter */}
        <div
          ref={counterRef}
          style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            fontWeight: 300,
            color: 'white',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {String(count).padStart(2, '0')}
        </div>

        {/* Line */}
        <div style={{ overflow: 'hidden', marginTop: '1rem' }}>
          <div
            ref={lineRef}
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.3)',
              transformOrigin: 'left',
              transform: `scaleX(${count / 100})`,
              transition: 'transform 0.05s linear',
              width: '200px',
              margin: '0 auto',
            }}
          />
        </div>

        {/* Text */}
        <div
          ref={textRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            marginTop: '1.5rem',
          }}
        >
          Loading experience
        </div>
      </div>
    </div>
  )
}
