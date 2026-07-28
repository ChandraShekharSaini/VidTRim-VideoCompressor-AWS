/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        'Montserrat': ['Montserrat', 'sans-serif'],
        'Boldonse':['Boldonse','sans-serif'],
        'Oswald':['Oswald','sans-serif'],
        'Karma':['Karma','sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },

      colors: {
        primary: '#0f73ff',
      },

      animation: {
        'slow-spin': 'spin 4s linear infinite',
        'fast-spin': 'spin 0.5s linear infinite',
      },
      screens: {
        'min-mobile': '150px',
        'max-mobile': '300px',

        
      },

       transitionDuration: {
        '2000': '60000ms',
      }
    },
  },
  plugins: [],
}