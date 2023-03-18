/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true, 
      padding: '1.25', 
      screens: {
        xl: '1200px',
        '2xl': '1200px'
      }
    }
  },
  plugins: [require('daisyui')],
};
