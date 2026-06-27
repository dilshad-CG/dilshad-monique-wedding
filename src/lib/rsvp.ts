/**
 * RSVP delivery via FormSubmit (https://formsubmit.co) — a free service that
 * emails form submissions, so the site needs no backend and can be hosted as
 * static files in any folder.
 *
 * The couple receive an email for every RSVP. The primary address must confirm
 * once (FormSubmit sends a one-time activation link on the first submission);
 * the CC address receives a copy of every message thereafter.
 */
const PRIMARY_EMAIL = 'dilshad@clickgenius.co.za'
const CC_EMAIL = 'MoniqueErinJulius@gmail.com'

const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(PRIMARY_EMAIL)}`

export interface RsvpPayload {
  full_name: string
  phone: string
  attending: boolean
  guests: number
}

export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  const body = {
    Name: payload.full_name,
    Phone: payload.phone,
    Attending: payload.attending ? 'Joyfully Accepts' : 'Regretfully Declines',
    Guests: payload.attending ? String(payload.guests) : '0',
    _cc: CC_EMAIL,
    _subject: `New Wedding RSVP — ${payload.full_name}`,
    _template: 'table',
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`RSVP failed (${res.status})`)
  }
}
