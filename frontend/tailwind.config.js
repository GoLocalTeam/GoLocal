/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // sky-500
        secondary: '#6366f1', // indigo-500
        accent: '#f59e42', // orange-400
        // Improved dark mode palette
        darkBg: '#23272f',      // main dark background
        darkBgGradientFrom: '#23272f', // for gradients
        darkBgGradientTo: '#1a1d23',   // for gradients
        darkCard: '#2d3340',    // card background
        darkBorder: '#353b48',  // border color
        darkText: '#f8fafc',    // main text
        darkTextSecondary: '#b0b8c1', // secondary text
        lightBg: '#f9fafb',
        lightCard: '#fff',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}