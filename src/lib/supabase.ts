import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Supabase is optional at build time. If env vars are absent the site still
 * runs in a graceful "demo" mode — RSVP submissions are simulated locally so
 * the experience can be previewed before the database is wired up.
 */
export const supabaseEnabled = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = supabaseEnabled
  ? createClient(url, anonKey)
  : null

export interface RsvpPayload {
  full_name: string
  email: string
  phone: string
  attending: boolean
  guests: number
  dietary_requirements: string | null
  message: string | null
}

export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  if (!supabase) {
    // Demo fallback — pretend to persist.
    await new Promise((r) => setTimeout(r, 900))
    // eslint-disable-next-line no-console
    console.info('[demo] RSVP captured locally:', payload)
    return
  }

  const { error } = await supabase.from('rsvp_guests').insert(payload)
  if (error) throw error
}
