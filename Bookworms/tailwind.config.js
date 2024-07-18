/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bglight: "#B2906B",
        bgdark: "#1B0B01",
        plight: "#9B0808",
        slight: "#670A0A",
        pdark: "#9B0808",
        sdark: "#E15B5B",
        accentlight: "#1B0B01",
        accentdark: "#E9DCD0",
      },
      fontFamily: {
        bodoni: ["Bodoni", "sans-serif"],
        bodonibold: ["Bodoni-Bold", "sans-serif"],
        bodoniitalic: ["Bodoni-Italic", "sans-serif"],
        inknut: ["Inknut", "sans-serif"],
        inknutthin: ["Inknut-Light", "sans-serif"],
        inknutbold: ["Inknut-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}

