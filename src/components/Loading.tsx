import { motion } from 'framer-motion'

/**
 * Luxury loading screen: an intertwined gold monogram (M & R) draws itself in,
 * then the whole screen fades away. Controlled by the parent (2.5s).
 */
export default function Loading({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
    >
      {/* faint radial backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(212,175,55,0.10), rgba(15,15,15,1) 65%)',
        }}
      />

      <svg
        width="170"
        height="170"
        viewBox="0 0 200 200"
        className="relative"
        style={{ animation: 'softGlow 2.4s ease-in-out infinite' }}
      >
        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke="#d4af37"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="528"
          strokeDashoffset="528"
          style={{ animation: 'drawStroke 2.2s ease forwards' }}
        />
        <text
          x="78"
          y="120"
          fontFamily="'Instrument Serif', Georgia, serif"
          fontSize="86"
          fill="none"
          stroke="#f5e6c8"
          strokeWidth="1.1"
          strokeDasharray="240"
          strokeDashoffset="240"
          style={{ animation: 'drawStroke 1.8s ease 0.2s forwards' }}
        >
          D
        </text>
        <text
          x="104"
          y="146"
          fontFamily="'Instrument Serif', Georgia, serif"
          fontSize="86"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1.1"
          strokeDasharray="240"
          strokeDashoffset="240"
          style={{ animation: 'drawStroke 1.8s ease 0.5s forwards' }}
        >
          M
        </text>
      </svg>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.9 }}
        className="relative mt-6 font-serif text-xl tracking-[0.35em] text-accent"
      >
        D &nbsp;&amp;&nbsp; M
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.6, duration: 0.9 }}
        className="relative mt-3 text-[0.7rem] uppercase tracking-[0.4em] text-muted"
      >
        A Celebration of Love
      </motion.p>
    </motion.div>
  )
}
