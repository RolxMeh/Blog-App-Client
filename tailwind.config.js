/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    boxShadow: {
      custom: "5px 5px 15px -5px #ffffff",
    },
    extend: {
      colors: {
        egg: "#FFDF6C",
      },
    },
  },
  plugins: [],
};
