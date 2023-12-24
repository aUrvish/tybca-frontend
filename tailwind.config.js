/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      colors : {
        "primary" : "#ff6347",
        "primary-200" : "#ff634733",
        "primary-100" : "#ff63471a"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}