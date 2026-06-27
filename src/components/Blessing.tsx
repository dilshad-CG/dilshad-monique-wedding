import { motion } from 'framer-motion'
import Divider from './Divider'

/**
 * A quiet, reverent verse band — Surah Ar-Rum (30:21), on love & mercy
 * between spouses.
 */
export default function Blessing() {
  return (
    <section className="relative px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic mx-auto text-2xl leading-[2.4] text-accent sm:text-3xl"
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا
          إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </p>

        <Divider className="my-7" />

        <p className="mx-auto max-w-xl text-sm italic leading-relaxed text-muted">
          “And among His signs is that He created for you mates from among
          yourselves, that you may find tranquillity in them; and He placed
          between you affection and mercy.”
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold">
          Surah Ar-Rum · 30:21
        </p>
      </motion.div>
    </section>
  )
}
