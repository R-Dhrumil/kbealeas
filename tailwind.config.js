/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kb: {
          green: '#1B4D3E',
          'green-dark': '#113429',
          'green-light': '#2D6A56',
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          cream: '#FAF8F5',
          sand: '#F4EFE6',
          charcoal: '#1A1D20',
          muted: '#6C757D'
        },
        vrinda: {
          primary: '#2D5A27',
          dark: '#1B4318',
          light: '#E8F5E9',
          accent: '#A5D6A7'
        },
        sangam: {
          primary: '#0277BD',
          dark: '#01579B',
          light: '#E1F5FE',
          accent: '#81D4FA'
        },
        urban: {
          primary: '#4A2C2A',
          dark: '#2C1810',
          light: '#F5F0EB',
          accent: '#D7CCC8'
        },
        coco: {
          primary: '#C2185B',
          dark: '#880E4F',
          light: '#FCE4EC',
          accent: '#F48FB1'
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'kb-soft': '0 4px 20px -2px rgba(27, 77, 62, 0.08)',
        'kb-hover': '0 12px 30px -4px rgba(27, 77, 62, 0.15)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
      }
    },
  },
  plugins: [],
}
