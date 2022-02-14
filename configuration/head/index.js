// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-head

// import fonts from './fonts.js'
// url dev https://development.d1lqtgc1tjoxsq.amplifyapp.com/
export default {
  head: {
    htmlAttrs: { lang: 'es' },
    link: [
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
    title: 'MELBORP - Business Updaters | cargando ...',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Somos un business Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
      },
      {
        hid: 'abstract',
        name: 'abstract',
        content:
          'Somos un business Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Agencia de Publicidad, Agencia Creativa, Publicidad, Agencia de Publicidad, Diseño de Marcas, Campañas, Logotipos, Diseño de empaques, Imagen Corporativa, redes sociales, digital, sitios web, branding, planeación de marcas, investigación de mercados, sura, argos, dislicores, ruta n, medellin, colombia, bogota, experiencias de marca',
      },

      {
        hid: 'geo.position"',
        name: 'geo.position"',
        content: '6.1554102,-75.5317308,',
      },
      {
        hid: 'geo.placename"',
        name: 'geo.placename"',
        content: 'Melborp',
      },

      { hid: 'og:site_name', property: 'og:site_name', content: 'MELBORP' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://melborp.art/',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'MELBORP - Business Updaters' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Somos un business Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://melborp.art/fb.png?v=1',
      },
      {
        hid: 'og:image:url',
        property: 'og:image:url',
        content: 'https://melborp.art/fb.png?v=1',
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://melborp.art/fb.png?v=1',
      },
      {
        hid: 'og:latitude',
        property: 'og:latitude',
        content: '6.2095861',
      },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { property: 'og:longitude', content: '6.2095861' },
      { name: 'twitter:site', content: '@melborpco' },
      {
        hid: 'og:street_address',
        property: 'og:street_address',
        content:
          ' Envigado, Colombia Km 17 Vía Las Palmas Parque La Reserva Piso 4 ',
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://melborp.art/',
      },
      { hid: 'og:locality', property: 'og:locality', content: 'Medellín' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'MELBORP' },
      { hid: 'og:region', property: 'og:region', content: 'Medellín' },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Somos un business Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
      },
      {
        hid: 'og:country_name',
        property: 'og:country_name',
        content: 'Colombia',
      },
      {
        hid: 'og:email',
        property: 'og:email',
        content: 'info@melborp.co',
      },
      {
        hid: 'og:phone_number',
        property: 'og:phone_number',
        content: '(4) 3119826',
      },
      { hid: 'dcterms.title', name: 'dcterms.title', content: 'MELBORP' },
      {
        hid: 'dcterms.description',
        name: 'dcterms.description',
        content:
          'Somos un business Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
      },
      {
        hid: 'dcterms.identifier',
        name: 'dcterms.identifier',
        content: 'https://melborp.art/',
      },
    ],
  },
}
