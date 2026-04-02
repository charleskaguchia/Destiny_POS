/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005050',
          container: '#006a6a',
          on: '#ffffff',
        },
        secondary: {
          DEFAULT: '#535e7e',
          container: '#ced9ff',
        },
        tertiary: {
          DEFAULT: '#94000a',
          container: '#bb1b1b',
          error: '#ffdad6',
        },
        surface: {
          low: '#f1f4f3',
          DEFAULT: '#f7faf9',
          high: '#e6e9e8',
        },
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Public Sans', 'sans-serif'],
        label: ['Public Sans', 'sans-serif'],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #005050 0%, #006a6a 100%)',
      },
    },
  },
  plugins: [],
}
