// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build
export default {
  build: {
    transpile: ['gsap'],
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-import': true,
        'postcss-url': false,
        'postcss-responsive-type': true,
        'postcss-responsive-font': true,
        'postcss-nested': {},
        'postcss-pseudo-elements-content': {},
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
        },
      },
    },
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
      config.module.rules.push({
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/,
      })
      config.module.rules.push({
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/,
      })
    },
  },
}
