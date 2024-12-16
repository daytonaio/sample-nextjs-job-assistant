/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f2f0ea', // Replace this with your desired primary color
        secondary_g: '#1b2f27',
        secondary_prpl: '#ada4ff'
      },
    },
  },
  plugins: [],
}