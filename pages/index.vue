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
      <HomeTop
        :story="story"
        :init="story.content.proyectos[0]"
        :animacion="story.content.animacion"
      ></HomeTop>
      <ProyectosCont
        v-for="(proyecto, index) in story.content.proyectos"
        :key="index"
        :proyecto="proyecto"
      ></ProyectosCont>

      <!-- Block with function -->
      <!-- <div class="example-section" data-scroll-section>
        <div
          ref="texti"
          class="example-fade-text"
          data-scroll
          data-scroll-call="fadeText"
        >
          <h2>When I'm triggered... I disappear</h2>
        </div>
      </div> -->
      <footer data-scroll-section>
        <nuxt-link to="/image-loads/"> Go to Image Loads </nuxt-link>
      </footer>
    </div>
  </LocomotiveScroll>
</template>

<script>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { mapMutations, mapGetters } from 'vuex'

// COMPONENTES
import HomeTop from '~/components/HomeTop.vue'
import ProyectosCont from '~/components/Proyecto.vue'

import { custom } from '~/utils/transitions.js'

gsap.registerPlugin(ScrollTrigger)

export default {
  components: {
    HomeTop,
    ProyectosCont,
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
          .get(`cdn/stories/${fullSlug}`, {
            version: 'published',
            resolve_relations: 'page.proyectos,page.destacado',
          })
          .then((res) => {
            console.log('HOME -> Storyblok', res.data.story)
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
    this.initScrolltrigger()
    this.$nextTick(() => {
      const elements = document.querySelectorAll('[data-scroll-trigger]')
      elements.forEach((element) => this.elementAnimation(element))
    })
    this.setHome({
      fondo: this.story.content.fondo.color,
      texto: this.story.content.texto.color,
      texto_home: this.story.content.texto_home.color,
      texto_home_hover: this.story.content.texto_home_hover.color,
      nav: this.story.content.navegacion.color,
    })
    gsap.set('body', {
      background: this.story.content.fondo.color,
      color: this.story.content.texto.color,
    })
    this.setLoad(true)
  },
  methods: {
    ...mapMutations({
      setSection: 'app/setSection',
      setHome: 'app/setHome',
      setLoad: 'app/setLoad',
    }),

    animateHome() {
      gsap.from('.home_top', {
        autoAlpha: 0,
        duration: 2,
        delay: 1,
        ease: 'expo.out',
        opacity: 0.1,
      })
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
        switch (value) {
          case 'fadeText': {
            // console.log('FadeText')
            // const child = this.$refs.texti /// /obj.el.firstChild
            // gsap.to(child, {
            //   duration: 2,
            //   ease: 'expo.out',
            //   opacity: 0.1,
            // })
            break
          }
          case 'index_home': {
            break
          }
          default:
            break
        }
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
        ease: 'none',
      })
    },
  },
}
</script>

<style lang="postcss">
header {
  align-items: center;
  padding: 0 12.5vw;
  display: flex;
  @apply h-screen;
}
</style>
