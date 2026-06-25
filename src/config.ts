// Central wedding configuration
export const WEDDING = {
  brideFirst: 'Monique Julius',
  groomFirst: 'Dilshad Saifi',
  brideAndGroom: 'Monique Julius & Dilshad Saifi',
  // ISO date-time for the ceremony (SAST, UTC+2)
  dateISO: '2026-07-18T14:00:00+02:00',
  dateLabel: '18 July 2026',
  timeLabel: '2:00 PM',
  venue: 'The Monarch Hotel',
  city: 'Johannesburg, South Africa',
  // Google Maps query
  mapQuery: 'The Monarch Hotel Johannesburg South Africa',
} as const

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  WEDDING.mapQuery,
)}&output=embed`

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  WEDDING.mapQuery,
)}`
