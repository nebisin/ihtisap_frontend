const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: (theme) => ({
        "screen-50": "50vh",
        "screen-80": "calc(100vh / 5 * 4)",
      }),
      fontFamily: {
        display: ["Roboto", "sans-serif"],
        title: ["Nunito", "sans-serif"],
      },
      colors: {
        brandPrimary: colors.pink[700],
        brandSecondary: colors.pink[800],
        accentPrimary: colors.blue[600],
        accentSecondary: colors.blue[300],
        normalGray: colors.gray[600],
        lightGray: colors.gray[400],
        darkGray: colors.gray[900],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
