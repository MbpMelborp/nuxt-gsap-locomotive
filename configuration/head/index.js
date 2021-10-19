// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-head

// import fonts from './fonts.js'

export default {
  head: {
    title: 'MELBORP - Business Updaters',
    htmlAttrs: { lang: 'es' },
    meta: [
      { name: 'charset', content: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Agencia de Publicidad y Creativa Medellín - MELBORP THINK COMMUNITY, Branding, Planeación Creativa, Campañas integradas, Contenido digital, Agencia digita',
      },
      {
        hid: 'abstract',
        name: 'abstract',
        content:
          'Agencia de Publicidad y Creativa Medellín - MELBORP THINK COMMUNITY, Branding, Planeación Creativa, Campañas integradas, Contenido digital, Agencia digital',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Agencia de Publicidad, Agencia Creativa, Publicidad, Agencia de Publicidad, Diseño de Marcas, Campañas, Logotipos, Diseño de empaques, Imagen Corporativa, redes sociales, digital, sitios web, branding, planeación de marcas, investigación de mercados, sura, argos, dislicores, ruta n, medellin, colombia, bogota, experiencias de marca',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Agencia de Publicidad Medellín Agencia Creativa Medellín - Melborp THINK COMMUNITY , Branding, Planeación Creativa, Campañas integradas, Contenido digital',
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

      { property: 'og:site_name', content: 'MELBORP' },
      { property: 'og:url', content: 'https://melborp.art/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'MELBORP' },
      {
        property: 'og:description',
        content: 'Agencia de publicidad y creativa Medellín Colombia',
      },
      { property: 'og:image:url', content: 'https://melborp.art/fb.png' },
      {
        property: 'og:image:secure_url',
        content: 'https://melborp.art/fb.png',
      },
      { property: 'og:latitude', content: '6.2095861' },
      { name: 'twitter:card', content: 'summary' },
      { property: 'og:longitude', content: '6.2095861' },
      { name: 'twitter:site', content: '@melborpco' },
      {
        property: 'og:street_address',
        content:
          ' Envigado, Colombia Km 17 Vía Las Palmas Parque La Reserva Piso 4 ',
      },
      { name: 'twitter:url', content: 'https://melborp.art/' },
      { property: 'og:locality', content: 'Medellín' },
      { name: 'twitter:title', content: 'MELBORP' },
      { property: 'og:region', content: 'Medellín' },
      {
        name: 'twitter:description',
        content: 'Agencia de publicidad y creativa Medellín Colombia',
      },
      { property: 'og:country_name', content: 'Colombia' },
      { property: 'og:email', content: 'info@melborp.co' },
      { property: 'og:phone_number', content: '(4) 3119826' },
      { name: 'dcterms.title', content: 'MELBORP' },
      {
        name: 'dcterms.description',
        content: 'Agencia de publicidad y creativa Medellín Colombia',
      },
      { name: 'dcterms.identifier', content: 'https://melborp.art/' },
    ],
    link: [
      // ...fonts,
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
