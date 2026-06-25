import { useEffect, useRef } from 'react'

/** A soft gold glow that follows the cursor (desktop only). */
export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef<number>()

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let cx = x
    let cy = y

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const loop = () => {
      cx += (x - cx) * 0.12
      cy += (y - cy) * 0.12
      el.style.transform = `translate3d(${cx - 250}px, ${cy - 250}px, 0)`
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[500px] w-[500px] rounded-full"
      aria-hidden
      style={{
        background:
          'radial-gradient(circle, rgba(52,201,139,0.12) 0%, rgba(212,175,55,0.08) 38%, rgba(31,122,90,0) 66%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}
