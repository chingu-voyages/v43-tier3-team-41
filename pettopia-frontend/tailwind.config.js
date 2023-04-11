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
  variants: {
    backgroundColor: ({ after }) => after(['disabled'])
  },
  plugins: [require('daisyui')],
};
