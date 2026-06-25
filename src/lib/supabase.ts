import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Supabase is optional at build time. If env vars are absent the site still
 * runs — RSVPs and the public guest list fall back to this browser's
 * localStorage so the experience is fully demonstrable. Add credentials to
 * sync RSVPs across every guest's device.
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
  message: string | null
}

export interface Attendee {
  full_name: string
  guests: number
  attending: boolean
  created_at: string
}

const LOCAL_KEY = 'rsvp_guests_local'

function readLocal(): Attendee[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]') as Attendee[]
  } catch {
    return []
  }
}

function writeLocal(list: Attendee[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list))
}

export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  if (!supabase) {
    await new Promise((r) => setTimeout(r, 700))
    const list = readLocal()
    list.push({
      full_name: payload.full_name,
      guests: payload.guests,
      attending: payload.attending,
      created_at: new Date().toISOString(),
    })
    writeLocal(list)
    return
  }

  const { error } = await supabase.from('rsvp_guests').insert(payload)
  if (error) throw error
}

/** Public list of guests who have responded (attending only). */
export async function fetchAttendees(): Promise<Attendee[]> {
  if (!supabase) {
    return readLocal()
      .filter((a) => a.attending)
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
  }

  const { data, error } = await supabase
    .from('public_attendees')
    .select('full_name, guests, attending, created_at')
    .eq('attending', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as Attendee[]) ?? []
}
