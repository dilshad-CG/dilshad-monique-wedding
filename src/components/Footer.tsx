import { Heart } from 'lucide-react'
import { WEDDING } from '../config'
import Divider from './Divider'

export default function Footer() {
  return (
    <footer className="relative px-6 py-14 text-center">
      {/* Sunnah wedding du'a for the newlyweds */}
      <p
        dir="rtl"
        lang="ar"
        className="font-arabic shimmer-text mx-auto max-w-2xl text-2xl leading-loose sm:text-3xl"
      >
        بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
      </p>
      <p className="mx-auto mt-3 max-w-md text-xs italic leading-relaxed text-muted">
        “May Allah bless you both, and shower His blessings upon you, and unite
        you both in goodness.”
      </p>

      <Divider className="my-8" />

      <p className="font-serif text-4xl text-accent">
        {WEDDING.groomFirst} <span className="text-gold">&amp;</span>{' '}
        {WEDDING.brideFirst}
      </p>
      <p className="mt-3 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
        {WEDDING.dateLabel} <Heart size={12} className="text-gold" fill="#d4af37" />{' '}
        {WEDDING.venue}
      </p>
      <p className="mt-6 text-[0.7rem] tracking-[0.2em] text-muted/50">
        Made with love · We can’t wait to celebrate with you
      </p>
    </footer>
  )
}
