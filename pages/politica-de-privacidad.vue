<template>
  <LocomotiveScroll
    id="melborp-contacto"
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
        data-scroll-section
        data-scroll-call="pagina-basica"
        class="min-h-screen"
      >
        <div class="pagina-interior">
          <div class="pagina-interior-wrap">
            <h2>
              <div
                v-for="(parte, index) in tituloParts"
                :key="'p_' + index"
                :class="'titulo_' + index"
              >
                <span
                  v-for="(palabra, index2) in parte"
                  :key="'s_' + index + '-' + index2"
                  :class="
                    tituloChars < 10
                      ? 'psmall'
                      : tituloChars >= 10 && tituloChars < 20
                      ? 'pmid'
                      : tituloChars >= 20
                      ? 'plarge'
                      : ''
                  "
                >
                  {{ palabra }}&nbsp;
                </span>
              </div>
            </h2>
            <div
              class="cuerpo"
              v-html="$storyapi.richTextResolver.render(story.content.cuerpo)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </LocomotiveScroll>
</template>

<script>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { mapMutations, mapGetters } from 'vuex'

// COMPONENTES
import { custom } from '~/utils/transitions.js'
import loaderm from '~/mixins/loader.js'
import head from '~/mixins/head.js'

gsap.registerPlugin(ScrollTrigger)

export default {
  mixins: [loaderm, head],
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
          route.path === '/' || route.path === '' ? 'contacto' : route.path
        return app.$storyapi
          .get(`cdn/stories/${fullSlug}`, {
            version: 'published',
          })
          .then((res) => {
            // console.log('👌 PAGINA BASICA -> Storyblok', res.data.story)

            const tituloChars = res.data.story.name.split('').length
            const tituloArray = res.data.story.name.split(' ')
            const tituloSize = tituloArray.length
            const tituloHalf = Math.ceil(tituloSize / 2)
            const tituloParts = []
            for (let i = tituloHalf; i > 0; i--) {
              tituloParts.push(
                tituloArray.splice(0, Math.ceil(tituloArray.length / i))
              )
            }
            return {
              story: res.data.story,
              tituloParts,
              tituloHalf,
              tituloSize,
              tituloChars,
            }
          })
          .catch((res) => {
            if (!res.response) {
              console.error('❌ PAGINA BASICA -> Storyblok', res)
              error({
                statusCode: 404,
                message: 'Failed to receive content form api',
              })
            } else {
              console.error('❌ PAGINA BASICA -> Storyblok', res.response.data)
              error({
                statusCode: res.response.status,
                message: res.response.data,
              })
            }
          })
      }
    } catch (e) {
      console.error('ERROR CONTACTO', e)
    }
  },
  data() {
    return {
      cargado: false,
    }
  },
  computed: {
    ...mapGetters({
      section: 'app/getSection',
      home: 'app/getHome',
      load: 'app/getLoad',
    }),
  },
  beforeCreate() {
    if (this.load != null) {
      this.setLoad(false)
    }
  },
  mounted() {
    this.setLoad(true)
    this.setStyles()
  },
  methods: {
    ...mapMutations({
      setSection: 'app/setSection',
      setPage: 'app/setPage',
      setLoad: 'app/setLoad',
    }),
    setStyles() {
      setTimeout(() => {
        console.log(
          '👌 CONTACTO -> setTimeout',
          document.getElementById('nav_site'),
          this.story.content
        )
        document.getElementById('nav_site').classList.remove('dif')
        gsap.set('#nav_site #logo_melborp', {
          fill: this.story.content.navegacion.color,
        })
        gsap.set('#nav_site a', {
          color: this.story.content.navegacion.color,
        })
      }, 1000)
      gsap.set('body, .content_interior', {
        background: this.story.content.fondo.color,
        color: this.story.content.texto.color,
      })

      this.setPage({
        fondo: this.story.content.fondo.color,
        texto: this.story.content.texto.color,
        nav: this.story.content.navegacion.color,
      })
    },
    onClassChange(classAttrValue) {
      const classList = classAttrValue.split(' ')
      if (classList.includes('is-inview')) {
        document.getElementById('nav_site').classList.remove('dif')
        gsap.set('#nav_site #logo_melborp', {
          fill: this.story.content.nav.color,
        })
        gsap.set('#nav_site a', {
          color: this.story.content.nav.color,
        })
        gsap.set('.body', {
          backgroundColor: this.story.content.fondo.color,
          color: this.story.content.texto.color,
        })
      }
    },
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
      })
    },

    elementAnimation(element) {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          scroller: this.$refs.scroller.locomotive.el,
          scrub: true,
          start: 'top bottom',
          end: 'bottom center',
        },
        clipPath: 'inset(100% 0% 0% 0%)',
        // webkitClipPath: 'inset(100% 0% 0% 0%)',
        ease: 'none',
      })
    },
  },
}
</script>
<style lang="postcss">
.pagina-interior {
  @apply pt-32 md:pt-32 max-w-9xl md:min-h-screen mx-auto flex items-center justify-center;
  &-wrap {
    @apply mx-4 md:mx-10 xl:mx-20 2xl:mx-4;
    h2 {
      font-variation-settings: 'wght' var(--font-weight, 400),
        'wdth' var(--font-width, 120), 'ital' 0;
      @apply text-4xl md:text-6xl xl:text-7xl text-center mb-16;
    }
    .cuerpo {
      p {
        @apply mb-8;
      }
    }
  }
}
</style>
