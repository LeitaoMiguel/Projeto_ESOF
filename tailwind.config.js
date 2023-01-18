module.exports = {
  purge: ['./src/common/components/**/*.tsx', './src/pages/**/*.tsx','./public/**/*.html'], //add this line
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'authenticationbg': "url('/images/authentication_bg.jpg')",
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary': '#1373E5',
        'primary-hover': '#0D66D0',
        'lpi-gray': '#292E32',
        'lpi-gray-dark': '#1D2123',
        'lpi-gray-light': '#E9EDED',
        'lpi-red': '#D10910',
        'lpi-red-dark': '#b7070d'
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      maxWidth: {
        '8xl': '100rem',
      },
      animation: {
        fade: 'fadeOut 1s ease-in-out',
      },

      // that is actual animation
      keyframes: {
        fadeOut: {
          '0%': { opacity: 0, transform: "translateY(20px)" },
          '100%': { opacity : 100, transform: "translateY(0)" },
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}