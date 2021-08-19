<template>
  <LocomotiveScroll
    ref="scroller"
    :getted-options="{
      direction: 'vertical',
      smartphone: {
        direction: 'vertical',
      },
      tablet: {
        direction: 'vertical',
      },
    }"
  >
    <div
      :class="'content_interior vertical' + (story != null ? ' loaded' : '')"
    >
      <div
        class="proyecto_top"
        data-scroll-section
        data-scroll-call="section_proyecto"
      >
        <div class="proyecto_info">
          <h3 class="anim_top"><span>/</span> {{ story.content.cliente }}</h3>
          <h2 data-scroll data-scroll-speed="-1">
            <span
              v-for="(palabra, index) in story.content.nombre.split(' ')"
              :key="index"
              class="anim_top"
            >
              {{ palabra + ' ' }}
            </span>
          </h2>
          <div class="regresar">
            <nuxt-link to="/" class="flex items-center md:flex-col flex-row">
              <i class="fal fa-long-arrow-left text-3xl block mr-2"></i>
              <span class="block">Regresar</span>
            </nuxt-link>
          </div>
          <time class="anim_top" data-scroll data-scroll-speed="-5">
            <b>
              {{ $moment(story.created_at).format('MMMM') }}
            </b>
            /
            <strong>
              {{ $moment(story.created_at).format('YY') }}
            </strong>
          </time>
          <div class="intro anim_top" v-html="intro"></div>

          <div class="problem anim_top">
            <h4>Problem</h4>
            <div v-html="problem"></div>
          </div>
          <div class="melborp anim_top">
            <h4>Melborp</h4>
            <div v-html="melborp"></div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-0.5"
            class="body anim_top"
            v-html="cuerpo"
          ></div>

          <div data-scroll data-scroll-speed="0.5" class="resultados anim_top">
            <h4>Resultados</h4>
            <div class="listado">
              <div
                v-for="(resultado, index) in story.content.resultados"
                :key="index"
                class="resultado"
                v-html="$storyapi.richTextResolver.render(resultado.resultado)"
              ></div>
            </div>
          </div>
          <div class="p_foto anim_top">
            <img
              v-lazy-load
              data-scroll
              data-scroll-repeat="true"
              data-scroll-speed="-1"
              data-scroll-position="top"
              :data-src="story.content.home[0].media1.filename"
              :alt="story.name"
            />
          </div>
          <div class="bg"></div>
        </div>
        <div
          ref="proyecto_header"
          data-scroll
          data-scroll-repeat="true"
          data-scroll-speed="-1"
          data-scroll-position="top"
          class="proyecto_header"
        >
          <img
            v-lazy-load
            :data-src="story.content.header.filename"
            :alt="story.name"
          />
        </div>
      </div>

      <Media
        v-for="(media, index) in story.content.bloques"
        :key="index"
        :media="media"
        :locomotive="locomotive"
      >
      </Media>
      <div data-scroll-section class="example-section">
        <div class="example-content">
          <div
            class="example-big-square"
            data-scroll
            data-scroll-speed="-0.5"
          />
          <div
            class="example-small-square"
            data-scroll
            data-scroll-speed="2.5"
          />
        </div>
      </div>
    </div>
  </LocomotiveScroll>
</template>

<script>
import { gsap, Expo } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { mapMutations, mapGetters } from 'vuex'
// COMPONENTES
import Media from '~/components/proyectos/Media.vue'

import { custom } from '~/utils/transitions.js'

gsap.registerPlugin(ScrollTrigger)

export default {
  components: {
    Media,
  },
  transition: {
    ...custom,
  },
  asyncData({ route, payload, app, error, store }) {
    try {
      if (payload) {
        // store.commit('app/setLoad', true)
        return { story: payload }
      } else {
        const fullSlug =
          route.path === '/' || route.path === '' ? 'home' : route.path
        return app.$storyapi
          .get(`cdn/stories${fullSlug}`, {
            version: 'published',
          })
          .then((res) => {
            console.log('PROYECTO -> Storyblok', res.data.story.content)
            return { story: res.data.story }
          })
          .catch((res) => {
            if (!res.response) {
              console.error(res)
              error({
                statusCode: 404,
                message: 'Failed to receive content form api',
              })
            } else {
              console.error(res.response.data)
              error({
                statusCode: res.response.status,
                message: res.response.data,
              })
            }
          })
      }
    } catch (e) {
      console.error('ERROR Home', e)
    }
  },
  data() {
    return {
      cargado: false,
      weight: [100, 900, 5],
      width: [20, 160, 10],
      observer: null,
      locomotive: null,
      tl_home: gsap.timeline({
        paused: true,
        delay: this.$store.getters['app/getLoad'] == null ? 3 : 0,
        ease: Expo.easeOut,
      }),
    }
  },
  computed: {
    ...mapGetters({
      section: 'app/getSection',
      home: 'app/getHome',
      load: 'app/getLoad',
    }),
    intro() {
      return this.story.content.intro
        ? this.$storyapi.richTextResolver.render(this.story.content.intro)
        : ''
    },
    cuerpo() {
      return this.story.content.cuerpo
        ? this.$storyapi.richTextResolver.render(this.story.content.cuerpo)
        : ''
    },
    problem() {
      return this.story.content.problem
        ? this.$storyapi.richTextResolver.render(this.story.content.problem)
        : ''
    },
    melborp() {
      return this.story.content.melborp
        ? this.$storyapi.richTextResolver.render(this.story.content.melborp)
        : ''
    },
  },
  beforeCreate() {
    if (this.load != null) {
      this.setLoad(false)
    }
  },
  mounted() {
    this.observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        const newValue = m.target.getAttribute(m.attributeName)
        this.$nextTick(() => {
          this.onClassChange(newValue, m.oldValue)
        })
      }
    })
    this.observer.observe(this.$refs.proyecto_header, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class'],
    })

    // const elements = document.querySelectorAll('.proyecto_top h2 span')
    // elements.forEach((element) => this.setText(element))

    this.initScrolltrigger()
    this.$nextTick(() => {
      const elements = document.querySelectorAll('[data-scroll-trigger]')
      elements.forEach((element) => this.elementAnimation(element))

      const elementText = document.querySelectorAll(
        '[data-scroll-trigger-text]'
      )
      elementText.forEach((element) => this.elementAnimationText(element))
    })

    this.setLoad(true)
    this.setStyles()
    this.initHomeAnimation()
  },
  methods: {
    ...mapMutations({
      setSection: 'app/setSection',
      setHome: 'app/setHome',
      setLoad: 'app/setLoad',
    }),
    initScrolltrigger() {
      const locomotive = this.$refs.scroller.locomotive
      locomotive.on('scroll', ScrollTrigger.update)
      ScrollTrigger.scrollerProxy(locomotive.el, {
        scrollTop(value) {
          return arguments.length
            ? locomotive.scrollTo(value, 0, 0)
            : locomotive.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        },
      })
      locomotive.on('call', (value, way, obj) => {
        this.setSection(value)
        switch (value) {
          default:
            break
        }
      })
    },
    animateHome() {
      gsap.from('.home_top', {
        autoAlpha: 0,
        duration: 2,
        delay: 1,
        ease: 'expo.out',
        opacity: 0.1,
      })
    },

    elementAnimation(element) {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          scroller: this.$refs.scroller.locomotive.el,
          scrub: true,
          start: 'top bottom',
          end: 'center center',
        },
        clipPath: 'inset(100% 0% 0% 0%)',
        ease: 'none',
      })
    },
    elementAnimationText(element) {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          scroller: this.$refs.scroller.locomotive.el,
          scrub: true,
          start: 'top bottom',
          end: 'bottom center',
        },
        '--font-weight': 200,
        '--font-width': 150,
        ease: 'none',
      })
    },
    onClassChange(classAttrValue) {
      const classList = classAttrValue.split(' ')
      if (classList.includes('is-inview')) {
        document.getElementById('nav_site').classList.remove('dif')
        gsap.set('#nav_site #logo_melborp', { fill: this.home.nav })
        gsap.set('#nav_site a', { color: this.home.nav })
      } else {
        document.getElementById('nav_site').classList.add('dif')
        gsap.set('#nav_site #logo_melborp', { fill: 'white' })
        gsap.set('#nav_site a', { color: 'white' })
      }
    },
    setText(element) {
      const fontWeight = gsap.utils.random(
        this.weight[0],
        this.weight[1],
        this.weight[2]
      )
      const fontWidth = gsap.utils.random(
        this.width[0],
        this.width[1],
        this.width[2]
      )

      gsap.set(element, {
        fontVariationSettings:
          '"wght" var(--font-weight, ' +
          fontWeight +
          '), "wdth" var(--font-width, ' +
          fontWidth +
          '), "ital" 0',
        '--font-weight': fontWeight,
        '--font-width': fontWidth,
      })
    },
    setStyles() {
      gsap.set('body', {
        background: this.story.content.colores[0].fondo.color,
        color: this.story.content.colores[0].texto.color,
      })

      gsap.set('.proyecto_info h2, .resultado b, .regresar', {
        color: this.story.content.colores[0].nombre.color,
      })
      gsap.set('.proyecto_info h2, .resultado', {
        borderColor: this.story.content.colores[0].nombre.color,
      })

      gsap.set('.proyecto_info h3, .proyecto_info time', {
        color: this.story.content.colores[0].fondo.color,
      })
      gsap.set('.bg, .body', {
        background: this.story.content.colores[0].fondo.color,
      })

      this.setHome({
        fondo: this.story.content.colores[0].fondo.color,
        texto: this.story.content.colores[0].texto.color,
        nav: this.story.content.colores[0].nombre.color,
      })
    },
    initHomeAnimation() {
      const timer = 0.8
      this.tl_home.fromTo(
        '.proyecto_info .bg',
        {
          clipPath: 'inset(0% 100% 0% 0%)',
          y: '50vw',
          scale: 1.2,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          scale: 1,
          duration: 0.5,
        }
      )
      this.tl_home.fromTo(
        '.proyecto_header img',
        {
          clipPath: 'inset(0% 100% 0% 0%)',
          x: '-10vw',
          scale: 1.2,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          x: 0,
          scale: 1,
          duration: 0.5,
        },
        '-=' + timer * 0.2
      )
      this.tl_home.fromTo(
        '.proyecto_top .anim_top',
        {
          clipPath: 'inset(0% 100% 0% 0%)',
          x: '-10vw',
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          x: 0,
          duration: timer,
          stagger: timer * 0.2,
        },
        '-=' + timer * 0.9
      )
      // this.tl_home.fromTo(
      //   '.proyecto_top .bg',
      //   {
      //     clipPath: 'inset(0% 0% 100% 0%)',
      //     y: '10vh',
      //   },
      //   {
      //     clipPath: 'inset(0% 0% 0% 0%)',
      //     y: 0,
      //     duration: timer,
      //   },
      //   '-=' + timer * 0.9
      // )

      this.tl_home.play()
    },
  },
}
</script>

<style lang="postcss">
.proyecto_top {
  display: grid;
  grid-gap: 0;
  grid-template-columns: [l1] auto [r1];
  grid-template-rows: [t1] 6vh 50vh [b1] auto;
  grid-template-areas:
    '.'
    'info'
    'info';
  user-select: none;
  overflow: hidden;
  width: 100vw;
  min-height: 100vh;
  @media (max-width: 768px) {
    grid-template-rows: [t1] 100px 50vh [b1] auto;
  }
  .proyecto_header {
    grid-column-start: l1;
    grid-column-end: r1;
    grid-row-start: t1;
    grid-row-end: b1;
    z-index: 1;
    img {
      min-height: 50vh;
      @apply object-cover w-full block;
    }
  }
  .proyecto_info {
    grid-area: info;
    display: grid;
    grid-gap: 0;
    grid-template-columns: [l1] 5vw 130px auto [pr] auto auto 5vw [r1];
    grid-template-rows: [t1] auto 25vh 25vh [m1] auto [pt] auto auto [pb] auto [b1];
    grid-template-areas:
      '. . cliente cliente cliente .'
      '. regresar nombre nombre nombre .'
      '. fecha nombre nombre nombre .'
      '. . intro intro . .'
      '. . . problem melborp .'
      '. . . body body .'
      '. . . resultados resultados .';
    width: 100%;
    min-height: 100vh;
    z-index: 2;
    @apply self-start;
    @media (max-width: 768px) {
      grid-template-columns: [l1] 5vw auto auto 5vw [r1];
      grid-template-rows: [t1] auto 12vh 25vh auto auto auto auto [b1];
      grid-template-areas:
        '. regresar fecha .'
        '. cliente cliente .'
        '. nombre nombre .'
        '. intro intro .'
        '. problem problem .'
        '. melborp melborp .'
        '. body body .'
        '. resultados resultados .';
    }
    .bg {
      grid-column-start: l1;
      grid-column-end: r1;
      grid-row-start: m1;
      grid-row-end: b1;
      @apply z-0 md:-mt-12;
      @media (max-width: 768px) {
        display: none;
      }
    }
    h3 {
      grid-area: cliente;
      font-size: calc(1vw + 1vh + 0.5vmin);
      font-variation-settings: 'wght' var(--font-weight, 600),
        'wdth' var(--font-width, 100), 'ital' 0;
      @apply leading-none self-end mb-8 z-20;
      span {
        font-variation-settings: 'wght' var(--font-weight, 200),
          'wdth' var(--font-width, 60), 'ital' 0;
        @apply mr-2;
      }
    }
    h2 {
      grid-area: nombre;
      line-height: 0.65em;
      @apply leading-none self-end z-20;
      span {
        font-size: clamp(3.5rem, 8.5vw, 22rem);
        font-variation-settings: 'wght' var(--font-weight, 400),
          'wdth' var(--font-width, 180), 'ital' 0;
        @apply inline;
      }
    }
    .regresar {
      grid-area: regresar;
      @apply leading-none self-center z-0;
    }
    time {
      grid-area: fecha;
      @apply leading-none md:self-start self-center z-0 justify-self-end text-right;
      b {
        @apply block text-sm;
      }
      strong {
        @apply text-xl;
      }
    }
    .intro {
      grid-area: intro;
      @apply text-4xl z-20 md:py-8 py-4 mb-8;
    }

    .problem {
      grid-area: problem;
      @apply line-through z-20 text-lg py-0 md:py-6 md:px-8 px-0 self-start md:mb-8 mb-8;
      h4 {
        font-variation-settings: 'wght' var(--font-weight, 400),
          'wdth' var(--font-width, 180), 'ital' 0;
        @apply text-2xl mb-4;
      }
    }
    .melborp {
      grid-area: melborp;
      @apply z-20  text-lg py-0 md:py-6 md:px-8 px-0 self-start md:mb-8 mb-8;
      h4 {
        font-variation-settings: 'wght' var(--font-weight, 400),
          'wdth' var(--font-width, 180), 'ital' 0;
        @apply text-2xl mb-4;
      }
    }
    .body {
      grid-area: body;
      @apply z-20 md:p-8 p-0 text-lg self-center md:-ml-16 mb-16;
      &::before {
        content: '-';
      }
    }
    .resultados {
      grid-area: resultados;
      @apply z-20 md:p-8 p-0 self-center mb-8 md:mb-0;
      h4 {
        font-variation-settings: 'wght' var(--font-weight, 400),
          'wdth' var(--font-width, 180), 'ital' 0;
        @apply text-2xl mb-8;
      }
      .listado {
        @apply grid grid-cols-2 md:grid-cols-4;
        .resultado {
          @apply p-4 text-lg md:border-none border-l mb-2;
          b {
            font-variation-settings: 'wght' var(--font-weight, 800),
              'wdth' var(--font-width, 90), 'ital' 0;
            @apply text-xl;
          }
        }
      }
    }
    .p_foto {
      grid-column-start: l1;
      grid-column-end: pr;
      grid-row-start: pt;
      grid-row-end: b1;
      @apply z-10 md:block hidden;
      img {
        @apply object-cover w-full h-full block;
      }
    }
  }
}
</style>
