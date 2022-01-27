// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-modules
export default {
  modules: [
    // 'nuxt-i18n',
    '@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // '@nuxtjs/apollo',
    '@nuxtjs/sitemap',
    '@nuxtjs/gtm',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // 'storyblok-nuxt',
    '@nuxtjs/svg-sprite',
    [
      'storyblok-nuxt',
      {
        accessToken:
          process.env.NODE_ENV === 'production'
            ? process.env.STORYBLOK_PROD
            : process.env.STORYBLOK_DEV,
        cacheProvider: 'none',
      },
    ],
    [
      'nuxt-lazy-load',
      {
        // These are the default values
        images: true,
        videos: false,
        audios: false,
        iframes: false,
        native: false,
        polyfill: true,
        directiveOnly: true,

        // Default image must be in the static folder
        defaultImage: '/dot.png',

        // To remove class set value to false
        loadingClass: 'isLoading',
        loadedClass: 'isLoaded',
        appendClass: 'lazyLoad',

        observerConfig: {
          // See IntersectionObserver documentation
        },
      },
    ],
  ],
}
