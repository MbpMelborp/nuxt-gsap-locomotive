// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-plugins
export default {
  plugins: [
    { src: '~/plugins/both.js' },
    { src: '~/plugins/client.js', mode: 'client' },
    { src: '~/plugins/server.js', mode: 'server' },
    { src: '~/plugins/cursor.js', mode: 'client' },
    // { src: '~/plugins/viewport.js', mode: 'client' },
    { src: '~/plugins/marquee.js', mode: 'client' },
    // { src: '~/plugins/textresponsive.js', mode: 'client' },
  ],
  // plugins: ['~/plugins/url-helpers.js']
}
