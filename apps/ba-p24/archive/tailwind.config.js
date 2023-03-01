/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',

    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    '../../node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    '!./node_modules',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2fbf9',
          100: '#d3f4ec',
          200: '#a6e9db',
          300: '#72d6c4',
          400: '#45bcaa',
          500: '#2ba192',
          600: '#208176',
          700: '#1e6760',
          800: '#1c534f',
          900: '#1d4a46',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
