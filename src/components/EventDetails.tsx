import { motion } from 'framer-motion'
import { CalendarHeart, Clock, MapPin, GlassWater } from 'lucide-react'
import { WEDDING } from '../config'
import Divider from './Divider'

export default function EventDetails() {
  return (
    <section id="details" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-accent/90">
            Join Us
          </p>
          <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
            The Celebration
          </h2>
          <Divider className="my-8" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Ceremony */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="glass-strong group rounded-3xl p-8 text-center"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/5 transition-transform duration-500 group-hover:scale-110">
              <CalendarHeart className="text-gold" size={28} />
            </div>
            <h3 className="font-serif text-3xl text-white">Ceremony</h3>
            <div className="mt-6 space-y-4 text-muted">
              <Row icon={CalendarHeart} label={WEDDING.dateLabel} />
              <Row icon={Clock} label={WEDDING.timeLabel} />
              <Row icon={MapPin} label={`${WEDDING.venue}, ${WEDDING.city}`} />
            </div>
          </motion.div>

          {/* Reception */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="glass-strong group rounded-3xl p-8 text-center"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/5 transition-transform duration-500 group-hover:scale-110">
              <GlassWater className="text-gold" size={28} />
            </div>
            <h3 className="font-serif text-3xl text-white">Reception</h3>
            <div className="mt-6 space-y-4 text-muted">
              <Row icon={Clock} label="Immediately Following Ceremony" />
              <Row icon={MapPin} label={`${WEDDING.venue}, ${WEDDING.city}`} />
              <p className="pt-2 font-serif text-xl italic text-accent">
                Dinner, Toasts &amp; Dancing
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Row({
  icon: Icon,
  label,
}: {
  icon: typeof Clock
  label: string
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Icon size={16} className="flex-shrink-0 text-gold/80" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
