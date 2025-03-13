/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a365d',
        secondary: '#2d3748',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /^text-(blue|green|purple|indigo|pink|yellow)-600$/,
    },
  ],
} 