/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          '2xl': '1240px',

        },
      },

    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}