/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./renderer/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        blue: {
          light: "#979AE8",
          main: "#7678ED",
          dark: "#6B6DD7",
        },
        yellow: "#FAFFD8",
        charcoal: {
          dark: "#273043",
          main: "#313A4C",
          light: "#606D8A",
        },
      },
    },
  },
  plugins: [],
};
