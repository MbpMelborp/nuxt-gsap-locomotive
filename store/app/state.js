export default () => ({
  scroll: {
    isScrolling: false,
    limit: {
      x: 0,
      y: 0,
    },
    x: 0,
    y: 0,
  },
  load: window.location.search.includes('_storyblok') === true ? true : null,
  section: null,
  home: {
    texto: null,
    fondo: null,
    texto_home: null,
    texto_home_hover: null,
    nav: null,
  },
  page: {
    texto: null,
    fondo: null,
    nav: null,
  },
  mobileProyecto: null,
  preload: false,
  preloadInner: false,
})
