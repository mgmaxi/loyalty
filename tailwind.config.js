/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        macro: {
          blue: '#0038FF',
          'blue-light': '#4A8CFF',
          'blue-dark': '#002AD4',
          pink: '#EC4899',
          'pink-dark': '#DB2777',
          dark: '#1A1A2E',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
