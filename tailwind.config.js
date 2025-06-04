/ @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src//*.{js,jsx,ts,tsx}", // adjust based on your project structure
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#E11D48',
          600: '#BE123C',
        },
      },
    },
  },
  plugins: [],
};