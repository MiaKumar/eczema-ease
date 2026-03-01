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
        score: {
          good: '#22c55e',
          moderate: '#eab308',
          challenging: '#f97316',
        },
      },
      borderRadius: {
        card: '16px',
        button: '12px',
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0,0,0,0.06)',
        soft-lg: '0 4px 20px rgba(0,0,0,0.08)',
      },
      transitionDuration: {
        250: '250ms',
        300: '300ms',
      },
      minHeight: {
        touch: '44px',
      },
    },
  },
  plugins: [],
}
