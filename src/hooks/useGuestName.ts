import { useParams } from 'react-router-dom'

/**
 * Derives a friendly display name from the /invite/:guest URL segment.
 * e.g. /invite/abdul -> "Abdul"  ·  /invite/guest123 -> "Guest123"
 *      /invite/fatima-bibi -> "Fatima Bibi"
 */
export function useGuestName(): string | null {
  const { guest } = useParams<{ guest: string }>()
  if (!guest) return null

  const cleaned = decodeURIComponent(guest)
    .replace(/[-_+]+/g, ' ')
    .trim()

  if (!cleaned) return null

  return cleaned
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
