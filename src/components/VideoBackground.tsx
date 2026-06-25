import { useEffect, useRef } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4'

const FADE = 0.5 // seconds of fade in / out

/**
 * Fullscreen looping hero video with a custom cinematic loop:
 *  - fade in over the first 0.5s
 *  - fade out during the final 0.5s
 *  - on ended: opacity 0 → wait 100ms → reset to start → play
 * Uses requestAnimationFrame to drive the opacity envelope.
 */
export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.playsInline = true

    const tick = () => {
      const { currentTime, duration } = video
      if (duration && !Number.isNaN(duration)) {
        let opacity = 1
        if (currentTime < FADE) {
          opacity = currentTime / FADE
        } else if (currentTime > duration - FADE) {
          opacity = Math.max(0, (duration - currentTime) / FADE)
        }
        video.style.opacity = String(opacity)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const handleEnded = () => {
      video.style.opacity = '0'
      window.setTimeout(() => {
        video.currentTime = 0
        void video.play()
      }, 100)
    }

    const startPlayback = () => {
      void video.play().catch(() => {
        /* autoplay may be blocked until interaction; ignore */
      })
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('loadeddata', startPlayback)
    startPlayback()
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('loadeddata', startPlayback)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0, transition: 'opacity 120ms linear' }}
        src={VIDEO_URL}
        muted
        playsInline
        autoPlay
        preload="auto"
        // Note: `loop` is intentionally omitted — we drive the loop manually.
      />

      {/* Cinematic depth overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
      {/* emerald colour-grade for a botanical luxury mood */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 10%, rgba(31,122,90,0.35), rgba(7,18,13,0.65) 75%)',
        }}
      />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  )
}
