import { useEffect, useState } from 'react'
import Loading from './components/Loading'
import VideoBackground from './components/VideoBackground'
import MouseGlow from './components/MouseGlow'
import LightRays from './components/LightRays'
import Particles from './components/Particles'
import Leaves from './components/Leaves'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Story from './components/Story'
import EventDetails from './components/EventDetails'
import VenueMap from './components/VenueMap'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
import { useGuestName } from './hooks/useGuestName'

export default function App() {
  const [loading, setLoading] = useState(true)
  const guestName = useGuestName()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [])

  // Lock scroll during the loading sequence
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      <Loading visible={loading} />

      {/* Cinematic background layers */}
      <VideoBackground />
      <MouseGlow />

      <main className="relative z-10">
        <Navigation />

        {/* Hero sits over the video with floating FX */}
        <div className="relative">
          <LightRays />
          <Leaves count={9} />
          <Particles count={22} />
          <Hero guestName={guestName} />
        </div>

        {/* Content sits on a soft emerald veil so text stays legible */}
        <div className="relative bg-gradient-to-b from-forest/40 via-ink/90 to-ink">
          <Leaves count={7} />
          <Particles count={14} />
          <Countdown />
          <Story />
          <EventDetails />
          <VenueMap />
          <RSVP guestName={guestName} />
          <Footer />
        </div>
      </main>
    </>
  )
}
