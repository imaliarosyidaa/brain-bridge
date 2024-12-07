/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#FFA62B',
        'blue': '#48CAE4',
        'pink': '#FAF4E5',
        'yellow': '#FFD60A'
      },
    },
  },
  plugins: [],
}

