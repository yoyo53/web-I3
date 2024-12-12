/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./App.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#163767', // Text
        'primary-hover': '#010f3b', //1e4885 040c3c

        'secondary': '#3653a0',
        'tertiary': '#377fbc',

        'delete': '#d11a2a',

        'red-50': "#FEF2F2",
        'red-100': "#FEE2E2",
        'red-500': "#EF4444",
        'red-700': "#B91C1C",

        'transparent': '#edf3f8',
        'transparent-hover': '#e2eaf1',

        'light-blue': '#9dc0f9',

        'electric-blue': '#2566e8',
        'purple-color': '#95569e',
        'orange-color': '#e7873b',
        'red-color': '#f0625f',
      },
    }
  },
  plugins: [],
}

