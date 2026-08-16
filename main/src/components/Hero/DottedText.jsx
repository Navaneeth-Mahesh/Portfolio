import React from 'react'

// 5x7 dot grid patterns for letters N, A, V, E, T, H
const LETTER_PATTERNS = {
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
}

export default function DottedText({ text = 'NAVANEETH', dotSize = 4, gap = 3, letterGap = 12, flicker = true }) {
  const letters = text.toUpperCase().split('')

  // Calculate width for SVG canvas
  let totalWidth = 0
  const letterWidths = letters.map((char) => {
    const pattern = LETTER_PATTERNS[char]
    const cols = pattern ? pattern[0].length : 5
    const w = cols * dotSize + (cols - 1) * gap
    totalWidth += w
    return w
  })

  totalWidth += (letters.length - 1) * letterGap
  const totalHeight = 7 * dotSize + 6 * gap

  let currentX = 0

  return (
    <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
      <style>{`
        @keyframes navaneethFlicker {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 6px rgba(255,255,255,0.8)); }
          3% { opacity: 0.3; filter: drop-shadow(0 0 1px rgba(255,255,255,0.1)); }
          6% { opacity: 1; filter: drop-shadow(0 0 9px rgba(255,255,255,0.9)); }
          12% { opacity: 0.75; }
          15% { opacity: 1; }
          38% { opacity: 0.95; }
          40% { opacity: 0.2; filter: drop-shadow(0 0 1px rgba(255,255,255,0.1)); }
          42% { opacity: 1; filter: drop-shadow(0 0 7px rgba(255,255,255,0.7)); }
          68% { opacity: 0.95; }
          70% { opacity: 0.4; }
          72% { opacity: 1; }
          85% { opacity: 0.85; }
          87% { opacity: 0.25; filter: drop-shadow(0 0 1px rgba(255,255,255,0.1)); }
          89% { opacity: 1; filter: drop-shadow(0 0 8px rgba(255,255,255,0.8)); }
        }

        @keyframes dotMicroFlicker {
          0%, 100% { opacity: 0.95; }
          48% { opacity: 0.95; }
          50% { opacity: 0.25; }
          52% { opacity: 0.95; }
        }

        .dotted-flicker-svg {
          animation: ${flicker ? 'navaneethFlicker 3.5s infinite ease-in-out' : 'none'};
        }
      `}</style>
      <svg
        className="dotted-flicker-svg"
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '72px',
          display: 'block',
          filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))',
        }}
      >
        {letters.map((char, letterIdx) => {
          const pattern = LETTER_PATTERNS[char]
          if (!pattern) {
            currentX += letterWidths[letterIdx] + letterGap
            return null
          }

          const startX = currentX
          currentX += letterWidths[letterIdx] + letterGap

          return (
            <g key={`${char}-${letterIdx}`}>
              {pattern.map((row, rIdx) =>
                row.map((val, cIdx) => {
                  if (!val) return null
                  const cx = startX + cIdx * (dotSize + gap) + dotSize / 2
                  const cy = rIdx * (dotSize + gap) + dotSize / 2
                  const delay = ((letterIdx * 7 + rIdx * 5 + cIdx * 3) % 17) * 0.2

                  return (
                    <circle
                      key={`${rIdx}-${cIdx}`}
                      cx={cx}
                      cy={cy}
                      r={dotSize / 2}
                      fill="#ffffff"
                      opacity={0.95}
                      style={{
                        animation: flicker ? `dotMicroFlicker 2.8s infinite ease-in-out ${delay.toFixed(2)}s` : 'none',
                      }}
                    />
                  )
                })
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
