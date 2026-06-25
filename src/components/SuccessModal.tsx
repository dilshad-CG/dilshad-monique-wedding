import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
  attending: boolean
}

export default function SuccessModal({ open, onClose, attending }: Props) {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 4 + Math.random() * 4,
        size: 8 + Math.random() * 12,
        hue: ['#f5e6c8', '#d4af37', '#2e8b66', '#34c98b'][i % 4],
      })),
    [],
  )
  const sparkles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        size: 3 + Math.random() * 5,
      })),
    [],
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-ink/90 px-6 backdrop-blur-md"
          onClick={onClose}
        >
          {/* falling petals */}
          {petals.map((p) => (
            <span
              key={`p-${p.id}`}
              className="pointer-events-none absolute top-0"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                borderRadius: '50% 0 50% 50%',
                background: p.hue,
                opacity: 0.85,
                animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
              }}
            />
          ))}
          {/* sparkles */}
          {sparkles.map((s) => (
            <span
              key={`s-${s.id}`}
              className="pointer-events-none absolute rounded-full bg-accent"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                boxShadow: '0 0 8px rgba(245,230,200,0.9)',
                animation: `pulseSoft 1.8s ease-in-out ${s.delay}s infinite`,
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative z-10 w-full max-w-md rounded-3xl px-8 py-12 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* checkmark */}
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle
                  cx="28"
                  cy="28"
                  r="25"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2"
                  strokeDasharray="157"
                  strokeDashoffset="157"
                  style={{ animation: 'checkDraw 0.8s ease forwards' }}
                />
                <path
                  d="M17 29 L25 37 L40 20"
                  fill="none"
                  stroke="#f5e6c8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="44"
                  strokeDashoffset="44"
                  style={{ animation: 'checkDraw 0.5s ease 0.6s forwards' }}
                />
              </svg>
            </div>

            <h3 className="font-serif text-3xl text-white">Thank You For Your RSVP</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {attending
                ? 'We Can’t Wait To Celebrate With You'
                : 'Thank you for letting us know. You will be dearly missed — we hold you in our hearts on our special day.'}
            </p>

            <button
              onClick={onClose}
              className="mt-8 rounded-full border border-gold/50 px-8 py-3 text-sm uppercase tracking-[0.18em] text-accent transition-all duration-300 hover:bg-gold hover:text-ink"
            >
              With Love
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
