/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.06)',
        'card-press': '0 4px 16px rgba(0,0,0,0.08)',
        'score-glow': '0 0 24px rgba(126, 191, 179, 0.25)',
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        primary: {
          50: '#F0FDFB',
          100: '#E0FBF7',
          200: '#B8E6DD',
          300: '#9FD8CB',
          400: '#7EBFB3',
          500: '#5FA89C',
          600: '#4A8B82',
          700: '#3D7169',
          800: '#2C5F5D',
          900: '#1E3F3D',
        },
        seafoam: {
          50: '#F8FFFE',
          100: '#E0FBF7',
          200: '#B8E6DD',
          300: '#9FD8CB',
          400: '#7EBFB3',
          500: '#5FA89C',
          600: '#4A8B82',
          700: '#3D7169',
          800: '#2C5F5D',
          900: '#1E3F3D',
        },
        sage: {
          50: '#F0FDFB',
          100: '#E0FBF7',
          200: '#B8E6DD',
          300: '#9FD8CB',
          400: '#7EBFB3',
          500: '#5FA89C',
          600: '#4A8B82',
          700: '#3D7169',
          800: '#2C5F5D',
          900: '#1E3F3D',
        },
      },
    },
  },
  plugins: [],
}
