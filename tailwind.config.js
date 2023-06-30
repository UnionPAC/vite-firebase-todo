/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        hind: ["Hind", "sans-serif"],
      },
      colors: {
        "main-txt": "hsl(210, 85%, 5%)",
        "primary-btn": "hsl(239, 87%, 64%)",
        "secondary-btn": "hsl(231, 38%, 33%)",
        accent: "hsl(129, 59%, 62%)",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};
