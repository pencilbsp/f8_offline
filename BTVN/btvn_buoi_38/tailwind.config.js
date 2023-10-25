/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {},
    screens: {
      sm: "718px",
      // => @media (min-width: 718px) { ... }

      md: "1018px",
      // => @media (min-width: 1018px) { ... }

      lg: "1108px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
