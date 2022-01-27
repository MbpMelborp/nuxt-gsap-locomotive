// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render
export default {
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      },
    },
    /* bundleRenderer: {
      directives: {
        custom1(el, dir) {
          // something ...
        }
      }
    } */
  },
}
