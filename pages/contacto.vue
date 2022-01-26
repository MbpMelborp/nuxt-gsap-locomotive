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
      <div data-scroll-section data-scroll-call="contacto" class="min-h-screen">
        <Contacto></Contacto>
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

const cl = process.env.CONSOLE

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
            if (cl) console.log('👌 CONTACTO -> Storyblok', res.data.story)
            return { story: res.data.story }
          })
          .catch((res) => {
            if (!res.response) {
              if (cl) console.error('❌ CONTACTO -> Storyblok', res)
              error({
                statusCode: 404,
                message: 'Failed to receive content form api',
              })
            } else {
              if (cl)
                console.error('❌ CONTACTO -> Storyblok', res.response.data)
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
    // this.observer = new MutationObserver((mutations) => {
    //   for (const m of mutations) {
    //     const newValue = m.target.getAttribute(m.attributeName)
    //     this.$nextTick(() => {
    //       this.onClassChange(newValue, m.oldValue)
    //     })
    //   }
    // })
    // this.observer.observe(this.$refs.proyecto_header, {
    //   attributes: true,
    //   attributeOldValue: true,
    //   attributeFilter: ['class'],
    // })

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
        if (cl)
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
