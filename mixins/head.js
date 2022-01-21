export default {
  head() {
    return {
      title: 'MELBORP - Business Updaters ' + this.story.content.seo.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.story.content.seo.description ||
            'Somos un Bussines Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
        },
        {
          hid: 'abstract',
          name: 'abstract',
          content:
            this.story.content.seo.description ||
            'Somos un Bussines Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
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

        { property: 'og:site_name', content: 'MELBORP' },
        {
          property: 'og:url',
          content: this.story.content.seo.og_image
            ? this.story.content.seo.og_image
            : 'https://melborp.art/',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: this.story.content.seo.title },
        {
          property: 'og:description',
          content:
            this.story.content.seo.og_description ||
            this.story.content.seo.title ||
            'Agencia de Publicidad, Agencia Creativa, Publicidad, Agencia de Publicidad, Diseño de Marcas, Campañas, Logotipos, Diseño de empaques, Imagen Corporativa, redes sociales, digital, sitios web, branding, planeación de marcas, investigación de mercados, sura, argos, dislicores, ruta n, medellin, colombia, bogota, experiencias de marca',
        },
        {
          property: 'og:image:url',
          content: this.story.content.seo.og_image
            ? this.story.content.seo.og_image
            : 'https://melborp.art/fb.png',
        },
        {
          property: 'og:image:secure_url',
          content: this.story.content.seo.og_image
            ? this.story.content.seo.og_image
            : 'https://melborp.art/fb.png',
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
          content:
            this.story.content.seo.twitter_description ||
            this.story.content.seo.description ||
            'Somos un Bussines Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
        },
        { property: 'og:country_name', content: 'Colombia' },
        { property: 'og:email', content: 'info@melborp.co' },
        { property: 'og:phone_number', content: '(4) 3119826' },
        { name: 'dcterms.title', content: 'MELBORP' },
        {
          name: 'dcterms.description',
          content: this.story.content.seo.description,
        },
        { name: 'dcterms.identifier', content: 'https://melborp.art/' },
      ],
    }
  },
}
