import { useMemo } from 'react'

interface LeavesProps {
  count?: number
}

/**
 * Botanical emerald leaves drifting upward with a gentle sway — adds an
 * organic, garden-wedding layer beneath the gold dust.
 */
export default function Leaves({ count = 10 }: LeavesProps) {
  const leaves = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 14 + Math.random() * 20
        const greens = ['#1f7a5a', '#2e8b66', '#34c98b', '#0f5138']
        return {
          id: i,
          left: Math.random() * 100,
          size,
          delay: Math.random() * 18,
          duration: 18 + Math.random() * 18,
          opacity: 0.18 + Math.random() * 0.35,
          color: greens[i % greens.length],
          flip: Math.random() > 0.5 ? -1 : 1,
        }
      }),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {leaves.map((l) => (
        <svg
          key={l.id}
          viewBox="0 0 24 24"
          width={l.size}
          height={l.size}
          className="absolute top-[-12vh]"
          style={{
            left: `${l.left}%`,
            opacity: l.opacity,
            transform: `scaleX(${l.flip})`,
            animation: `leafDrift ${l.duration}s linear ${l.delay}s infinite`,
          }}
        >
          {/* simple leaf with a centre vein */}
          <path
            d="M12 2C6 6 4 12 5 20c8 1 14-3 17-9-3 0-6-1-8-3 3 0 5-1 6-3-3 1-6 0-8-3z"
            fill={l.color}
          />
          <path
            d="M7 18C9 12 11 7 15 4"
            stroke="rgba(245,230,200,0.5)"
            strokeWidth="0.6"
            fill="none"
          />
        </svg>
      ))}
    </div>
  )
}
