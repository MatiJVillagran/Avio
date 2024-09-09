/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a8f97',
        secondary: '#8c8ca4',
        tertiary: '#80391e'
      }
    },
  },
  plugins: [],
}