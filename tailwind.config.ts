import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slateBrand: '#0f172a',
        accent: '#2563eb'
      }
    },
  },
  plugins: [],
} satisfies Config;
