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
        main: "#262a37",
        light: "#424657",
        contrast: {
          bg: "#1d91f5",
          text: "#ffffff"
        },
        neutral: "#323445",
        text: "#cdd1db",
      },
    },
  },
  plugins: [require("daisyui")],
};
