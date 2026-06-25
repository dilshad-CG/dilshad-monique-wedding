import { motion } from 'framer-motion'

/** Elegant decorative divider — twin gold lines flanking a diamond. */
export default function Divider({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.6 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden
    >
      <span className="divider-line h-px w-14 sm:w-24" />
      {/* left leaf sprig */}
      <svg viewBox="0 0 24 24" width="16" height="16" className="text-emerald">
        <path
          d="M21 4C13 4 5 8 4 16c0 0 0 2 1 3 3-9 11-12 16-15z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
      <span className="relative flex h-3 w-3 rotate-45 items-center justify-center">
        <span className="absolute inset-0 rotate-0 border border-gold/80" />
        <span className="h-1 w-1 bg-gold" />
      </span>
      {/* right leaf sprig (mirrored) */}
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        className="text-emerald"
        style={{ transform: 'scaleX(-1)' }}
      >
        <path
          d="M21 4C13 4 5 8 4 16c0 0 0 2 1 3 3-9 11-12 16-15z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
      <span className="divider-line h-px w-14 sm:w-24" />
    </motion.div>
  )
}
