/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary": "#ff6347",
        "primary-50": "#ff634715",
        "primary-200": "#ff634733",
        "primary-100": "#ff63471a"
      },
      screens : {
        '5xl' : '1694px',
        '2lg' : '1152px',
      }
    },
  },
  variants: {
    extend: {},
  },
}