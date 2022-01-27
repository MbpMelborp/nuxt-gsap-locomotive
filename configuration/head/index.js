// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-head

// import fonts from './fonts.js'

export default {
  head: {
    title: 'MELBORP - Business Updaters',
    htmlAttrs: { lang: 'es' },
    link: [
      // ...fonts,
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: '//a.storyblok.com' },
    ],
    script: [
      {
        rel: 'preload',
        src: 'https://kit.fontawesome.com/6328404de0.js',
        crossorigin: 'anonymous',
      },
    ],
    bodyAttrs: {
      class:
        process.env.NODE_ENV === 'production'
          ? 'production'
          : 'development debug-screens',
    },
  },
}
