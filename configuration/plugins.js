// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-plugins
export default {
  plugins: [
    { src: '~/plugins/both.js' },
    { src: '~/plugins/client.js', mode: 'client' },
    { src: '~/plugins/server.js', mode: 'server' },
    { src: '~/plugins/cursor.js', mode: 'client' },
    // { src: '~/plugins/viewport.js', mode: 'client' },
    { src: '~/plugins/marquee.js', mode: 'client' },
    { src: '~/plugins/video.js', mode: 'client' },
    { src: '~/plugins/carousel.js', mode: 'client' },
    { src: '~/plugins/size.js', mode: 'client' },
    { src: '~/plugins/lazyload.js', mode: 'client' },
    { src: '~/plugins/ismobile.js', mode: 'client' },
    { src: '~/plugins/console.js', mode: 'client' },
    { src: '~/plugins/intersect.js', mode: 'client' },
    // { src: '~/plugins/textresponsive.js', mode: 'client' },
  ],
  // plugins: ['~/plugins/url-helpers.js']
}
