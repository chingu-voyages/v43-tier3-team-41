/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.25',
      screens: {
        xl: '1400px',
        '2xl': '1400px',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#5784bb",
          "primary-focus": "#456f9e",
          secondary: "#ffc000",
          backgroundColor: '#f2f3f5',
          '.btn:hover': {
            'background-color': '#456f9e',
            'border-color': '#456f9e'
          },
          '.pag-btn:hover': {
            'background-color': '#2f353f',
            'border-color': '#2f353f'
          }
        },
      },
      "dark",
    ],
  },

  variants: {
    backgroundColor: ({ after }) => after(['disabled'])
  },
  plugins: [require('daisyui')],
};
