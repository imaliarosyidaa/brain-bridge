const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(breadcrumbs|button|ripple|spinner).js"
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
  plugins: [heroui()],
}

