import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Send, PartyPopper, HeartCrack } from 'lucide-react'
import Divider from './Divider'
import SuccessModal from './SuccessModal'
import { submitRsvp, supabaseEnabled } from '../lib/supabase'

interface FormValues {
  full_name: string
  email: string
  phone: string
  guests: number
  attending: 'yes' | 'no' | ''
  dietary_requirements: string
  message: string
}

const fieldBase =
  'w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-gold/70 focus:bg-white/[0.07] focus:ring-1 focus:ring-gold/40'

function ErrorMsg({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 text-xs text-rose-300/90"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export default function RSVP({ guestName }: { guestName: string | null }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      full_name: guestName ?? '',
      email: '',
      phone: '',
      guests: 1,
      attending: '',
      dietary_requirements: '',
      message: '',
    },
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const attending = watch('attending')

  const onSubmit = async (data: FormValues) => {
    setServerError(null)
    try {
      await submitRsvp({
        full_name: data.full_name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        attending: data.attending === 'yes',
        guests: data.attending === 'yes' ? Number(data.guests) : 0,
        dietary_requirements: data.dietary_requirements.trim() || null,
        message: data.message.trim() || null,
      })
      setShowSuccess(true)
      reset({ ...data, message: '', dietary_requirements: '' })
    } catch (err) {
      setServerError(
        'Something went wrong while sending your RSVP. Please try again in a moment.',
      )
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  const isAttending = attending === 'yes'

  return (
    <section id="rsvp" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-accent/90">
            Kindly Respond
          </p>
          <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">RSVP</h2>
          <p className="mt-4 text-sm text-muted">
            {guestName ? `${guestName}, we` : 'We'} would be honoured by your
            presence. Please reply by{' '}
            <span className="text-accent">1 July 2026</span>.
          </p>
          <Divider className="my-8" />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass-strong rounded-3xl p-7 sm:p-9"
          noValidate
        >
          {/* Attending toggle */}
          <div className="mb-6">
            <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-gold">
              Will You Attend?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { v: 'yes', label: 'Joyfully Accept', Icon: PartyPopper },
                  { v: 'no', label: 'Regretfully Decline', Icon: HeartCrack },
                ] as const
              ).map(({ v, label, Icon }) => {
                const active = attending === v
                const accept = v === 'yes'
                const activeClass = accept
                  ? 'border-emerald bg-emerald/20 text-white shadow-[0_0_22px_rgba(31,122,90,0.4)]'
                  : 'border-gold bg-gold/15 text-white shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                const hoverClass = accept
                  ? 'hover:border-emerald/50 hover:text-white'
                  : 'hover:border-gold/40 hover:text-white'
                return (
                  <button
                    type="button"
                    key={v}
                    onClick={() =>
                      setValue('attending', v, { shouldValidate: true })
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-4 text-sm transition-all duration-300 ${
                      active
                        ? activeClass
                        : `border-white/10 bg-white/[0.03] text-muted ${hoverClass}`
                    }`}
                  >
                    <Icon
                      size={16}
                      className={active ? (accept ? 'text-emerald' : 'text-gold') : ''}
                    />
                    {label}
                  </button>
                )
              })}
            </div>
            {/* hidden registration for validation */}
            <input
              type="hidden"
              {...register('attending', { required: 'Please let us know if you can join us' })}
            />
            <ErrorMsg msg={errors.attending?.message} />
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold">
                Full Name
              </label>
              <input
                className={`${fieldBase} ${errors.full_name ? 'border-rose-400/60' : 'border-white/10'}`}
                placeholder="Your full name"
                {...register('full_name', {
                  required: 'Your name is required',
                  minLength: { value: 2, message: 'Please enter your full name' },
                })}
              />
              <ErrorMsg msg={errors.full_name?.message} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold">
                  Email Address
                </label>
                <input
                  type="email"
                  className={`${fieldBase} ${errors.email ? 'border-rose-400/60' : 'border-white/10'}`}
                  placeholder="you@email.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email',
                    },
                  })}
                />
                <ErrorMsg msg={errors.email?.message} />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className={`${fieldBase} ${errors.phone ? 'border-rose-400/60' : 'border-white/10'}`}
                  placeholder="+27 ..."
                  {...register('phone', {
                    required: 'Phone number is required',
                    minLength: { value: 7, message: 'Please enter a valid number' },
                  })}
                />
                <ErrorMsg msg={errors.phone?.message} />
              </div>
            </div>

            {/* Guests — only when attending */}
            <AnimatePresence initial={false}>
              {isAttending && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold">
                    Number Of Guests
                  </label>
                  <select
                    className={`${fieldBase} border-white/10 appearance-none`}
                    {...register('guests', { valueAsNumber: true })}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className="bg-ink text-white">
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold">
                Dietary Requirements{' '}
                <span className="text-muted/60">(optional)</span>
              </label>
              <input
                className={`${fieldBase} border-white/10`}
                placeholder="Halal, vegetarian, allergies…"
                {...register('dietary_requirements')}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold">
                Message To The Couple{' '}
                <span className="text-muted/60">(optional)</span>
              </label>
              <textarea
                rows={4}
                className={`${fieldBase} resize-none border-white/10`}
                placeholder="Share your wishes and blessings…"
                {...register('message')}
              />
            </div>
          </div>

          {serverError && (
            <p className="mt-5 rounded-lg border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-accent hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
                Send RSVP
              </>
            )}
          </button>

          {!supabaseEnabled && (
            <p className="mt-4 text-center text-[0.7rem] text-muted/60">
              Demo mode — add Supabase credentials to store responses.
            </p>
          )}
        </motion.form>
      </div>

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        attending={isAttending}
      />
    </section>
  )
}
