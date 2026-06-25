/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        accent: '#F5E6C8',
        // Emerald & forest greens for the botanical luxury palette
        emerald: '#1f7a5a',
        forest: '#0c3326',
        sage: '#9bc2af',
        // Near-black with a deep green undertone
        ink: '#07120d',
        muted: '#c4d2c9',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
