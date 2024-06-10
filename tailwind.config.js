/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        cardHeight: '580px',
        dividerHeight: '2px'
      }
    },
  },
  plugins: [],
}