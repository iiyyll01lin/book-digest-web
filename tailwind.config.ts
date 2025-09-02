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
      fontFamily: {
        // replace with real fonts later
        display: ['system-ui', 'sans-serif'],
        body: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
