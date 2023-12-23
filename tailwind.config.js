/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grayPrimary: '#676767',
        blue: 'rgba(58, 184, 235, 1)',
        yellow: 'rgba(253, 191, 15, 1)',
        orange: 'rgba(249, 120, 75, 1)',
      },
      screens: {
        md: '850px',
      }
    },
    container: {
      center: true,
      padding: '1rem'
    }
  },
  plugins: [],
}