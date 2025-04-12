/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {},
    darkMode: 'class',
      screens: {
        'ss': {'min': '360px', 'max': '390px'},
        'xs':{'min': '390px', 'max': '400px'},
        'xxs':{'min': '400px', 'max': '420px'},
        'sm': '640px',  
        'md': '768px',
  
        'lg': '1024px',
  
        'xl': '1280px',
  
        '2xl': '1536px',

      }
  },
  plugins: [],
}