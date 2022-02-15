// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-hooks
// eslint-disable-next-line import/no-absolute-path
// import Seo from '/static/seo.json'
const defaults = {
  title: 'Inicio',
  description:
    'Somos un Bussines Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
  og_title: 'MELBORP - Business Updaters',
  og_image: 'https://melborp.art/fb.png?v=1',
  og_description:
    'Somos un Bussines Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',

  twitter_image: 'https://melborp.art/fb.png?v=1',
  twitter_title: 'MELBORP - Business Updaters',

  twitter_description:
    'Somos un Bussines Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
}
const axios = require('axios')
export default {
  hooks: {
    'generate:page': async (page) => {
      const token =
        process.env.NODE_ENV === 'production'
          ? process.env.STORYBLOK_PROD
          : process.env.STORYBLOK_DEV
      let seoInfo = defaults
      const cacheVersion = 0
      const slug = page.route === '/' ? '/home' : page.route
      const url = `https://api.storyblok.com/v2/cdn/stories${slug}?cv=${cacheVersion}&token=${token}&version=published`
      // console.log('📄 PAGE HOOK ->', page.route, url)
      const seo = await axios.get(url)

      // eslint-disable-next-line prefer-regex-literals
      const descReg = new RegExp('{%d}', 'g')
      const desc = descReg

      // eslint-disable-next-line prefer-regex-literals
      const imageReg = new RegExp('{%og_image}', 'g')
      const image = imageReg

      // eslint-disable-next-line prefer-regex-literals
      const titleReg = new RegExp('{%og_title}', 'g')
      const title = titleReg

      // eslint-disable-next-line prefer-regex-literals
      const titleUrl = new RegExp('{%og_url}', 'g')
      const urlc = titleUrl

      try {
        console.log(
          '✔ 📄 Header generate ->',
          seo.data.story.content.seo.title,
          url
        )
        seoInfo = seo.data.story.content.seo
        page.html = page.html
          .replace('%s', seoInfo.title || defaults.title)
          .replace(urlc, slug)
          .replace(desc, seoInfo.description || defaults.description)
          .replace(title, seoInfo.og_title || defaults.og_title)
          .replace(image, seoInfo.og_image || defaults.og_image)
        // .replace(/ data-n-head=".*?"/gi, '')
        // .replace(/ data-hid=".*?"/gi, '')
      } catch (e) {
        console.error('✖ 📄 Header generate ->', e, url)
        page.html = page.html
          .replace('%s', defaults.title)
          .replace(urlc, slug)
          .replace(desc, defaults.description)
          .replace(title, defaults.og_title)
          .replace(image, defaults.og_image)
        // .replace(/ data-n-head=".*?"/gi, '')
        // .replace(/ data-hid=".*?"/gi, '')
      }
    },
  },
}
