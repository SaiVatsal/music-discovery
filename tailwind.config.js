/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discovery: {
          darkest: '#0e0720',
          dark: '#1e1035',
          card: '#291849',
          purple: '#7e22ce',
          glow: '#a855f7',
          pink: '#d946ef',
          accent: '#c084fc',
          surface: '#3b1c6e',
          textMuted: '#c4b5fd'
        }
      },
      fontFamily: {
        sans: ['"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
