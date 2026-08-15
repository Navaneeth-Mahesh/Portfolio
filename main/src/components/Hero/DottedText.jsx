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

export default function DottedText({ text = 'NAVANEETH', dotSize = 4, gap = 3, letterGap = 12 }) {
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
      <svg
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

                  return (
                    <circle
                      key={`${rIdx}-${cIdx}`}
                      cx={cx}
                      cy={cy}
                      r={dotSize / 2}
                      fill="#ffffff"
                      opacity={0.95}
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
