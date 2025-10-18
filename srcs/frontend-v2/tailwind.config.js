/** @type {import('tailwindcss').Config} */

import animations from "@midudev/tailwind-animations";

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        background: "#E5E7EB",
        background_dark: "#070F2B",
        navbar: "#E5E7EB",
        navbar_dark: "#070F2B",
        panel: "#FFFFFF",
        panel_dark: "#535C91",
        google: {
          "text-gray": "#3c4043",
          "button-blue": "#1a73e8",
          "button-blue-hover": "#5195ee",
          "button-dark": "#202124",
          "button-dark-hover": "#555658",
          "button-border-light": "#dadce0",
          "logo-blue": "#4285f4",
          "logo-green": "#34a853",
          "logo-yellow": "#fbbc05",
          "logo-red": "#ea4335",
        },
      },
      backgroundImage: {
        primary: "linear-gradient(to right, #34D399, #22D3EE)",
        primary_dark: "linear-gradient(to right, #1B1A55, #9290C3)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), animations],
};
