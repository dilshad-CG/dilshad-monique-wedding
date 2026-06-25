import { Heart } from 'lucide-react'
import { WEDDING } from '../config'

export default function Footer() {
  return (
    <footer className="relative px-6 py-14 text-center">
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
