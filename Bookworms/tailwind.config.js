/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js, jsx}", "./components/**/*.{js, jsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        "bodoni": ["Bodoni", "sans-serif"],
        "bodoni-bold": ["Bodoni-Bold", "sans-serif"],
        "bodoni-italic": ["Bodoni-Italic", "sans-serif"],
        "inknut": ["Inknut", "sans-serif"],
        "inknut-thin": ["Inknut-Light", "sans-serif"],
        "inknut-bold": ["Inknut-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}

