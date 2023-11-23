/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    colors: {
      primary: "#FFB635",
      secondary: "#434040",
      accent: "#02073e",
      manz: {
        100: "#f6fac7",
        200: "#66D36E",
        300: "#f2f152",
        400: "#ece223",
        500: "#ddca15",
        600: "#bea010",
        700: "#987510",
        800: "#7e5d15",
        900: "#6b4c18",
      },
      masala: "#434040",
      stratos: "#02073e",
      astronaut: "#283C7C",
      oxford: "#343d48",
    },
  }
    ,
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["forest"],
  },
};
