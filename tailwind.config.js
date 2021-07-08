module.exports = {
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'h-white': '#fff',
        'h-blue': '#192D4D',
        'h-brown': '#826140',
        'h-brownc': '#8f7153',
        'h-bluec': '#00AEE0',
        'h-cream': '#F7EFE4',
        'h-creamc': '#f5eee4',
        'h-melborp': {
          100: '#fdfcfa',
          200: '#fbf8f4',
          300: '#f9f5ef',
          400: '#f7f1e9',
          500: '#f5eee4',
          600: '#c4beb6',
          700: '#938f89',
          800: '#625f5b',
          900: '#31302e',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  experimental: {
    applyComplexClasses: true,
  },
}
