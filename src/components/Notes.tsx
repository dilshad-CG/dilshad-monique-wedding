import { motion } from 'framer-motion'
import { Shirt, Gift } from 'lucide-react'
import Divider from './Divider'

const NOTES = [
  {
    icon: Shirt,
    title: 'Dress Code',
    text: 'There is no specific theme — simply come dressed to celebrate with us.',
  },
  {
    icon: Gift,
    title: 'Your Presence & Presents',
    text: 'Your presence is the greatest gift of all. Should you wish to honour us with something more, we would warmly appreciate a contribution towards our future together.',
  },
]

export default function Notes() {
  return (
    <section className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-accent/90">
            A Gentle Note
          </p>
          <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
            With Love &amp; Gratitude
          </h2>
          <Divider className="my-8" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {NOTES.map((n, i) => {
            const Icon = n.icon
            return (
              <motion.div
                key={n.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="glass-strong group rounded-3xl p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/5 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="text-gold" size={24} />
                </div>
                <h3 className="font-serif text-2xl text-white">{n.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{n.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
