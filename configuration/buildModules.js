// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-modules#buildmodules
export default {
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/dotenv',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    [
      'storyblok-nuxt-routes',
      {
        accessToken: process.env.STORYBLOK_PROD,
        resolveLinks: 'url', // optional
        resolveRelations: 'page.proyectos,page.destacado', // optional
        exclude: [], // optional
      },
    ],
    [
      '@nuxtjs/moment',
      {
        locales: ['es'],
      },
    ],
  ],
  generate: {
    fallback: true,
    interval: 100,
  },
}
