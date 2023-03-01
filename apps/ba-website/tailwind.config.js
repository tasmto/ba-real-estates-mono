/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './src/app/**/*.{jsx,tsx}',
    './src/components/**/*.{jsx,tsx}',
    './src/pages/**/*.{jsx,tsx}',
    '!./node_modules',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', ...fontFamily.sans],
        display: ['Cardo', ...fontFamily.sans],
      },
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
        accent: {
          50: '#f4f8fb',
          100: '#dbe9f0',
          200: '#cde2ea',
          300: '#a1cad8',
          400: '#6eaec2',
          500: '#4b94ac',
          600: '#397890',
          700: '#2f6175',
          800: '#2a5262',
          900: '#274653',
        },
      },
    },
  },

  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
};
