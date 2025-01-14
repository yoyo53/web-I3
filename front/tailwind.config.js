/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./App.vue",
  ],
  theme: {
    extend: {
      colors: {
        'efrei-blue': {
          50: '#edf3f8',
          100: '#e5f6fd',
          200: '#cde9f7',
          300: '#a9d6f1',
          400: '#6cb5e8',
          500: '#377fbc',
          600: '#2d689b',
          700: '#163767',
          800: '#0d244c',
          900: '#081636',
          950: '#00103c',
        },
        'primary': '#163767', // Text
        'primary-hover': '#010f3b', //1e4885 040c3c

        'transparent': '#edf3f8',
        'transparent-hover': '#e2eaf1',
      },
    }
  },
  plugins: [],
}

