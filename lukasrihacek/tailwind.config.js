/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        portrait: {
          "9/16": "9 / 16",
        },
      },
      colors: {
        black: "#333333",
        white: "#eeeeee",
      },
      screens: {
        landscape: { raw: "(max-height:400px)" },
      },
    },
  },
  plugins: [],
};
