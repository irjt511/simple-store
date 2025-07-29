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
          DEFAULT: '#1e40af',
          hover: '#1d4ed8',
          light: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter Variable', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        'container': '0.75rem',
      }
    },
  },
  plugins: [],
}
