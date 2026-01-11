import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0a1628',
        'cyan-accent': '#00d9ff',
        'cyan-glow': '#00d9ff40',
        'role-top': '#ff6b35',
        'role-jungle': '#4ade80',
        'role-mid': '#a78bfa',
        'role-adc': '#f472b6',
        'role-support': '#60a5fa',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom, #1a0a2e, #000000)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
