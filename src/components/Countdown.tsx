import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WEDDING } from '../config'
import Divider from './Divider'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function diff(target: number): TimeLeft {
  const total = Math.max(0, target - Date.now())
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

function Unit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="glass-strong relative flex h-24 w-20 flex-col items-center justify-center rounded-2xl sm:h-32 sm:w-28">
      <div className="relative h-10 overflow-hidden sm:h-14">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -28, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="block font-serif text-4xl text-white sm:text-6xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-gold sm:text-xs">
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const target = useMemo(() => new Date(WEDDING.dateISO).getTime(), [])
  const [time, setTime] = useState<TimeLeft>(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const isPast =
    time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0

  return (
    <section id="countdown" className="relative px-6 py-24 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-accent/90">
          Counting Down To Forever
        </p>
        <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
          {isPast ? 'Today We Celebrate' : 'The Big Day Awaits'}
        </h2>
        <Divider className="my-8" />

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <Unit value={time.days} label="Days" />
          <Unit value={time.hours} label="Hours" />
          <Unit value={time.minutes} label="Minutes" />
          <Unit value={time.seconds} label="Seconds" />
        </div>
      </motion.div>
    </section>
  )
}
