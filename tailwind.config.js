const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--noto-sans-tc)', 'var(--work-sans)', fontFamily.sans]
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
