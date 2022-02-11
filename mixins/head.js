export default {
  head() {
    const headInfo = {
      title: 'MELBORP - Business Updaters | ' + this.story.content.seo.title,
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

        { hid: 'og:site_name', property: 'og:site_name', content: 'MELBORP' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.story.content.seo.og_image
            ? this.story.content.seo.og_image
            : 'https://melborp.art/',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.story.content.seo.title || 'Melborp - Business Updaters',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.story.content.seo.og_description ||
            this.story.content.seo.title ||
            'Somos un Bussines Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.story.content.seo.og_image
            ? this.story.content.seo.og_image
            : 'https://melborp.art/fb.png?v=1',
        },
        {
          hid: 'og:image:url',
          property: 'og:image:url',
          content: this.story.content.seo.og_image
            ? this.story.content.seo.og_image
            : 'https://melborp.art/fb.png?v=1',
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.story.content.seo.og_image
            ? this.story.content.seo.og_image
            : 'https://melborp.art/fb.png?v=1',
        },
        {
          hid: 'og:latitude',
          property: 'og:latitude',
          content: '6.2095861',
        },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'og:longitude', property: 'og:longitude', content: '6.2095861' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@melborpco' },
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
        {
          hid: 'og:locality',
          property: 'og:locality',
          content: 'Medellín',
        },
        { hid: 'twitter:title', name: 'twitter:title', content: 'MELBORP' },
        {
          hid: 'og:region',
          property: 'og:region',
          content: 'Antioquia',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            this.story.content.seo.twitter_description ||
            this.story.content.seo.description ||
            'Somos un Bussines Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
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
            this.story.content.seo.description ||
            'Somos un Bussines Updaters y nuestro objetivo es usar la creatividad para transformar negocios que puedan cambiar el mundo.',
        },
        {
          hid: 'dcterms.identifier',
          name: 'dcterms.identifier',
          content: 'https://melborp.art/',
        },
      ],
    }
    console.log('🧢  HEAD ->', this.story.content.seo.title, headInfo)
    return headInfo
  },
}
