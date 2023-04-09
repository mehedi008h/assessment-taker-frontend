/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        merriweather: ["Merriweather", "sans-serif"],
        righteous: ["Righteous", "cursive"],
      },
    },
  },
  plugins: [],
};
