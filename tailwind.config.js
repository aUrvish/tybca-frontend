/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // "primary": "#ff6347",
        // "primary-50": "#ff634715",
        // "primary-200": "#ff634733",
        // "primary-100": "#ff63471a",
        "primary": "#00adfd",
        "primary-50": "#00adfd15",
        "primary-200": "#00adfd33",
        "primary-100": "#00adfd1a",
        "blue": "#026DEB",
        "warning": "#ffc107",
        "warning-100": "#ffc1071a",
        "success": "#2AC869",
        "success-100": "#2AC8691a",
      },
      screens : {
        '5xl' : '1694px',
        '2mac' : '1480px',
        '3lg' : '1380px',
        '2lg' : '1152px',
        '2md' : '880px',
        'xsm' : '480px'
      }
    },
  },
  variants: {
    extend: {},
  },
}