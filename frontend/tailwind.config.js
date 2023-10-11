/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      maxWidth : {
        'custom-sm': '20rem',  // Your custom small max-width
        'custom-md': '30rem',  // Your custom medium max-width
        'custom-lg': '40rem',
        'custom-xl': '50rem',
        'custom-2xl': '60rem',
      },
      minWidth : {
        'custom-sm': '20rem',  // Your custom small max-width
        'custom-md': '30rem',  // Your custom medium max-width
        'custom-lg': '40rem',
        'custom-xl': '50rem',
        'custom-2xl': '60rem',
      }
    },
  },
  plugins: [],
}




