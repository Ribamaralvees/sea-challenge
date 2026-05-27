import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Apenas os tokens SEA customizados — neutral já existe no Tailwind v3
      colors: {
        sea: {
          50:  '#EBF5FB',
          100: '#D4EBF5',
          200: '#A8D6EB',
          500: '#5B9FC0',
          600: '#4A8FAF',
          700: '#3A7F9E',
        },
      },
      width:    { sidebar: '50px' },
      minWidth: { sidebar: '50px' },
    },
  },
  plugins: [],
} satisfies Config
