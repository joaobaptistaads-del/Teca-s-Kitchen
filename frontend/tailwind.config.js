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
          DEFAULT: '#D97706',
          50: '#FEF3E2',
          100: '#FDE8CC',
          200: '#FBD199',
          300: '#F9BA66',
          400: '#F7A333',
          500: '#D97706',
          600: '#B25F05',
          700: '#7F4404',
          800: '#4C2902',
          900: '#190D01',
        },
        secondary: {
          DEFAULT: '#059669',
          50: '#D1FAE5',
          100: '#A7F3D0',
          200: '#6EE7B7',
          300: '#34D399',
          400: '#10B981',
          500: '#059669',
          600: '#047857',
          700: '#065F46',
          800: '#064E3B',
          900: '#022C22',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
