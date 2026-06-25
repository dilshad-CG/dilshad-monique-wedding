import { motion } from 'framer-motion'
import { Navigation as NavIcon, MapPin } from 'lucide-react'
import { WEDDING, mapsEmbedUrl, mapsDirectionsUrl } from '../config'

export default function VenueMap() {
  return (
    <section className="relative px-6 pb-24 sm:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl glass"
      >
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.4em] text-accent/90">
              Find Your Way
            </p>
            <h3 className="mt-3 flex items-center gap-2 font-serif text-3xl text-white sm:text-4xl">
              <MapPin className="text-gold" size={26} />
              {WEDDING.venue}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {WEDDING.city}
              <br />
              We look forward to welcoming you. Tap below for turn-by-turn
              directions to the venue.
            </p>
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-accent hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
            >
              <NavIcon size={16} />
              Get Directions
            </a>
          </div>

          <div className="relative min-h-[300px] border-t border-white/10 md:border-l md:border-t-0">
            <iframe
              title="Venue location map"
              src={mapsEmbedUrl}
              className="absolute inset-0 h-full w-full grayscale-[0.3] contrast-[1.1]"
              style={{ border: 0, filter: 'invert(0.06)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
