export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            ramadan: {
              gold: '#D4AF37',
              dark: '#0B2447',
              accent: '#19376D',
              light: '#A5D7E8',
            }
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }
