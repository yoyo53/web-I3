/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./App.vue",
  ],
  theme: {
    extend: {},
    colors: {
      'primary-blue-color': '#163767',
      'secondary-blue-color': '#377fbc',
      'purple-color': '#95569e',
      'tertiary-blue-color': '#3653a0',
      'orange-color': '#e7873b',
      'red-color': '#dd5555',
    },
  },
  plugins: [],
}

