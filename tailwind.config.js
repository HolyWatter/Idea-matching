/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    //경로
  ],
  theme: {
    extend: {
      colors: {
        origin: "#ECA985",
        bg: "#f1f5f9",
      },
    },
    screens: {
      "2xl-m": { max: "1535px" },
      "xl-m": { max: "1279px" },
      "lg-m": { max: "1023px" },
      "md-m": { max: "883px" },
      "sm-m": { max: "639px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
