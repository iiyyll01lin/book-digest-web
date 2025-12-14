import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#113A7A',
          pink: '#FFA6C3',
          yellow: '#FFDD57',
          navy: '#0F2E66',
        },
      },
      spacing: {
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
      },
      fontFamily: {
        // Outfit for CTAs and headings (uppercase, increased letter spacing)
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
        // Display font for hero sections
        display: ['Outfit', 'system-ui', 'sans-serif'],
        // Body text
        body: ['system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wider: '0.1em',
        widest: '0.15em',
      },
      transitionDuration: {
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
export default config
