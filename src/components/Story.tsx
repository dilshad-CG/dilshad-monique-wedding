import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import Divider from './Divider'

const CHAPTERS = [
  {
    icon: Heart,
    title: 'First Meeting',
    date: '21 October 2024',
    text: 'Two paths crossed at just the right moment, and a single conversation turned into endless ones. From the very first hello, it felt like the beginning of something timeless.',
  },
  {
    icon: Sparkles,
    title: 'Wedding Celebration',
    date: '18 July 2026',
    text: 'And now, with hearts full and families gathered, we invite you to celebrate the next chapter — the day two souls become one, forever.',
  },
]

export default function Story() {
  return (
    <section id="story" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-accent/90">
            Our Journey
          </p>
          <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
            Our Love Story
          </h2>
          <Divider className="my-8" />
        </motion.div>

        {/* Unified, centered timeline */}
        <div className="relative mx-auto mt-4 max-w-xl">
          {/* single connecting line down the centre */}
          <span className="absolute left-1/2 top-2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-emerald/0 via-emerald/60 to-gold/0" />

          <div className="space-y-10">
            {CHAPTERS.map((c) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* node centred on the line */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-emerald/60 bg-ink shadow-[0_0_18px_rgba(31,122,90,0.45)]">
                    <Icon size={20} className="text-gold" />
                  </div>

                  <div className="glass mt-5 w-full rounded-2xl p-6">
                    <p className="text-[0.7rem] uppercase tracking-[0.25em] text-gold">
                      {c.date}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl text-white">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{c.text}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
