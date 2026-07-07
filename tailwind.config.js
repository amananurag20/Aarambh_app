/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF8A1F',
          strong: '#D95C00',
          soft: '#FFE3C2',
        },
      },
    },
  },
  plugins: [],
};
