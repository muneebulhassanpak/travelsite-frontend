/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      fontFamily: {
        "lufga-medium": "url('/fonts/LufgaMedium.ttf') format('truetype')",
        // birth: "'Birthstone Bounce', cursive",
      },
      colors: {
        lightBlue: "#0079c1",
        moderateBlue: "#00457c",
        extremeBlue: "#012169",
      },
      backgroundColors: {
        lightBlue: "#0079c1",
        moderateBlue: "#00457c",
        extremeBlue: "#012169",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
