import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Heart } from 'lucide-react'
import Divider from './Divider'
import { fetchAttendees, type Attendee } from '../lib/supabase'

export default function AttendeeList() {
  const [guests, setGuests] = useState<Attendee[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const data = await fetchAttendees()
        if (active) setGuests(data)
      } catch {
        /* ignore — list simply stays empty */
      } finally {
        if (active) setLoaded(true)
      }
    }

    load()
    // Refresh the moment someone submits an RSVP.
    const onSubmit = () => load()
    window.addEventListener('rsvp:submitted', onSubmit)
    return () => {
      active = false
      window.removeEventListener('rsvp:submitted', onSubmit)
    }
  }, [])

  const totalGuests = guests.reduce((sum, g) => sum + (g.guests || 1), 0)

  return (
    <section id="guests" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-accent/90">
          With Joy
        </p>
        <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
          Who&apos;s Celebrating
        </h2>
        <Divider className="my-8" />

        {!loaded ? (
          <p className="text-sm text-muted">Loading the guest list…</p>
        ) : guests.length === 0 ? (
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted">
            No responses just yet — be the first to{' '}
            <button
              onClick={() =>
                document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-gold underline-offset-4 hover:underline"
            >
              RSVP
            </button>{' '}
            and your name will appear here.
          </p>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-center gap-2 text-sm text-emerald">
              <Users size={16} />
              <span className="text-muted">
                <span className="font-semibold text-accent">{totalGuests}</span>{' '}
                {totalGuests === 1 ? 'guest is' : 'guests are'} joyfully joining
              </span>
            </div>

            <motion.ul
              layout
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <AnimatePresence>
                {guests.map((g, i) => (
                  <motion.li
                    layout
                    key={`${g.full_name}-${g.created_at}-${i}`}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.6) }}
                    className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white"
                  >
                    <Heart size={13} className="text-gold" fill="#d4af37" />
                    {g.full_name}
                    {g.guests > 1 && (
                      <span className="text-xs text-muted">+{g.guests - 1}</span>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </>
        )}
      </div>
    </section>
  )
}
