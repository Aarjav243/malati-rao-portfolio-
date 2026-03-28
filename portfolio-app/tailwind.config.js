/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,ax}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#F7F4F0',
        charcoal: '#1A1110',
        sunrise: '#E97C4A',
        beige: {
          light: '#FBF9F7',
          DEFAULT: '#F7F4F0',
          dark: '#E9E4DF',
        }
      },
      letterSpacing: {
        widest: '0.2em',
      }
    },
  },
  plugins: [],
}
