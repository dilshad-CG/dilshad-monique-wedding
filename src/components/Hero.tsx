import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { WEDDING } from '../config'
import Divider from './Divider'

export default function Hero({ guestName }: { guestName: string | null }) {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <div className="relative z-10 mx-auto max-w-3xl">
        {guestName && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="mb-6 font-serif text-2xl italic text-gold sm:text-3xl"
          >
            Dear {guestName},
          </motion.p>
        )}

        <p className="fade-rise text-xs uppercase tracking-[0.45em] text-accent/90 sm:text-sm">
          Together With Their Families
        </p>

        <h1 className="mt-6 font-serif leading-[0.95]">
          <span className="fade-rise-delay block text-5xl text-white sm:text-7xl md:text-8xl">
            {WEDDING.groomFirst}
          </span>
          <span className="shimmer-emerald fade-rise-delay-2 my-2 block text-4xl italic sm:text-6xl">
            &amp;
          </span>
          <span className="fade-rise-delay-2 block text-5xl text-white sm:text-7xl md:text-8xl">
            {WEDDING.brideFirst}
          </span>
        </h1>

        <p className="fade-rise-delay-3 mt-8 text-sm uppercase tracking-[0.3em] text-muted sm:text-base">
          Invite You To Celebrate Their Wedding
        </p>

        <Divider className="my-8" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="space-y-1"
        >
          <p className="font-serif text-3xl text-accent sm:text-4xl">
            {WEDDING.dateLabel}
          </p>
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            {WEDDING.timeLabel}
          </p>
          <p className="pt-2 font-serif text-2xl text-white sm:text-3xl">
            {WEDDING.venue}
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            {WEDDING.city}
          </p>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() =>
          document.querySelector('#countdown')?.scrollIntoView({ behavior: 'smooth' })
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 z-10 flex flex-col items-center text-muted hover:text-gold"
        aria-label="Scroll down"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="mt-1 animate-bounce" size={20} />
      </motion.button>
    </section>
  )
}
