import { useMemo } from 'react'

interface ParticlesProps {
  count?: number
}

/** Floating gold bokeh / dust particles drifting upward. */
export default function Particles({ count = 26 }: ParticlesProps) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 6
        // ~1 in 3 particles glow emerald, the rest gold
        const emerald = i % 3 === 0
        return {
          id: i,
          left: Math.random() * 100,
          size,
          delay: Math.random() * 16,
          duration: 14 + Math.random() * 16,
          opacity: 0.15 + Math.random() * 0.5,
          blur: Math.random() > 0.6 ? 2 : 0,
          glow: emerald
            ? 'radial-gradient(circle, rgba(155,224,194,0.95) 0%, rgba(31,122,90,0.7) 45%, rgba(31,122,90,0) 70%)'
            : 'radial-gradient(circle, rgba(245,230,200,0.95) 0%, rgba(212,175,55,0.7) 45%, rgba(212,175,55,0) 70%)',
        }
      }),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute bottom-[-10vh] rounded-full"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            filter: d.blur ? `blur(${d.blur}px)` : undefined,
            background: d.glow,
            animation: `drift ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
