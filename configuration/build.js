// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build
export default {
  build: {
    transpile: ['gsap'],
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-url': false,
        'postcss-nested': {},
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
        },
      },
    },
    extend(config, ctx) {},
  },
}
