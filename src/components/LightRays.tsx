/** Emerald aurora + light rays + bokeh glow layered behind content. */
export default function LightRays() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* breathing emerald aurora */}
      <div
        className="absolute -top-1/4 left-0 h-[120%] w-[70vw]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(52,201,139,0.22), rgba(31,122,90,0) 70%)',
          filter: 'blur(40px)',
          animation: 'aurora 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-1/4 right-0 h-[120%] w-[55vw]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(31,122,90,0.28), rgba(12,51,38,0) 70%)',
          filter: 'blur(50px)',
          animation: 'aurora 24s ease-in-out infinite reverse',
        }}
      />

      {/* warm light rays for contrast */}
      <div
        className="absolute -top-1/3 left-1/4 h-[140%] w-[40vw]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,230,200,0.16), rgba(212,175,55,0) 70%)',
          animation: 'raySweep 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -top-1/3 right-1/4 h-[140%] w-[28vw]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(155,194,175,0.14), rgba(31,122,90,0) 70%)',
          animation: 'raySweep 16s ease-in-out infinite reverse',
        }}
      />

      {/* soft bokeh orbs — alternating emerald & gold */}
      <div className="floating absolute left-[12%] top-[20%] h-40 w-40 rounded-full bg-emerald/20 blur-3xl" />
      <div
        className="floating absolute right-[14%] top-[55%] h-56 w-56 rounded-full bg-gold/12 blur-3xl"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="floating absolute left-[40%] bottom-[8%] h-44 w-44 rounded-full bg-emerald/16 blur-3xl"
        style={{ animationDelay: '4s' }}
      />
    </div>
  )
}
