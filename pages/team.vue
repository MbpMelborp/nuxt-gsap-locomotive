<template>
  <LocomotiveScroll
    id="melborp-team"
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
      <div class="team_top" data-scroll-section data-scroll-call="section_team">
        <div class="team_header">
          <h2>
            <span v-if="story.content.titulo[0].titulo1" class="title_1"
              >{{ story.content.titulo[0].titulo1 }}
            </span>
            <span v-if="story.content.titulo[0].titulo2" class="title_2"
              >{{ story.content.titulo[0].titulo2 }}
            </span>
            <span v-if="story.content.titulo[0].titulo3" class="title_3">{{
              story.content.titulo[0].titulo3
            }}</span>
          </h2>
        </div>
      </div>
      <div class="team_people" data-scroll-section>
        <div class="team_people_grid">
          <Team
            v-for="(team, i) in story.content.teams"
            :key="i"
            :media="team"
          ></Team>
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
import Team from '~/components/team/Team_broken.vue'

import { custom } from '~/utils/transitions.js'
import loaderm from '~/mixins/loader.js'
import head from '~/mixins/head.js'

gsap.registerPlugin(ScrollTrigger)

export default {
  components: {
    Team,
  },
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
          route.path === '/' || route.path === '' ? 'team' : route.path
        return app.$storyapi
          .get(`cdn/stories/${fullSlug}`, {
            version: 'published',
          })
          .then((res) => {
            console.log('👌 TEAM -> Storyblok', res.data.story)
            return { story: res.data.story }
          })
          .catch((res) => {
            if (!res.response) {
              console.error('❌ TEAM -> Storyblok', res)
              error({
                statusCode: 404,
                message: 'Failed to receive content form api',
              })
            } else {
              console.error('❌ TEAM -> Storyblok', res.response.data)
              error({
                statusCode: res.response.status,
                message: res.response.data,
              })
            }
          })
      }
    } catch (e) {
      console.error('ERROR Team', e)
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

    // this.setHome({
    //   fondo: this.story.content.fondo.color,
    //   texto: this.story.content.texto.color,
    //   texto_home: this.story.content.texto_home.color,
    //   texto_home_hover: this.story.content.texto_home_hover.color,
    //   nav: this.story.content.navegacion.color,
    // })
    // gsap.set('body', {
    //   background: this.story.content.fondo.color,
    //   color: this.story.content.texto.color,
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

    animateHome() {
      gsap.from('.home_top', {
        autoAlpha: 0,
        duration: 2,
        delay: 1,
        ease: 'expo.out',
        opacity: 0.1,
      })
    },

    setStyles() {
      setTimeout(() => {
        console.log(
          '👌 TEAM -> setTimeout',
          document.getElementById('nav_site'),
          this.story.content.colores[0]
        )
        document.getElementById('nav_site').classList.remove('dif')
        gsap.set('#nav_site #logo_melborp', {
          fill: this.story.content.colores[0].nombre.color,
        })
        gsap.set('#nav_site a', {
          color: this.story.content.colores[0].nombre.color,
        })
      }, 1000)
      gsap.set('body, .content_interior', {
        background: this.story.content.colores[0].fondo.color,
        color: this.story.content.colores[0].texto.color,
      })

      this.setPage({
        fondo: this.story.content.colores[0].fondo.color,
        texto: this.story.content.colores[0].texto.color,
        nav: this.story.content.colores[0].nombre.color,
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
        // webkitClipPath: 'inset(100% 0% 0% 0%)',
        ease: 'none',
      })
    },
  },
}
</script>

<style lang="postcss">
.team_top {
  @apply pt-44 w-full max-w-9xl mx-auto leading-none select-none;
  .team_header {
    h2 {
      @apply text-6xl mx-4 md:mx-0 md:grid md:grid-cols-12 md:grid-rows-3 md:gap-x-4 md:gap-y-0 md:text-7xl;
      span {
        @apply md:block leading-none;
        &.title_1 {
          font-variation-settings: 'wght' var(--font-weight, 200),
            'wdth' var(--font-width, 130), 'ital' 0;
          @apply col-span-1 md:col-span-6 md:col-start-4 row-start-1 row-span-1;
        }
        &.title_2 {
          font-variation-settings: 'wght' var(--font-weight, 400),
            'wdth' var(--font-width, 130), 'ital' 0;
          @apply md:col-span-6 md:col-start-6 row-start-2 row-span-1 uppercase;
        }
        &.title_3 {
          font-variation-settings: 'wght' var(--font-weight, 400),
            'wdth' var(--font-width, 130), 'ital' 0;
          @apply md:col-span-6 md:col-start-5 row-start-3 row-span-1 uppercase;
        }
      }
    }
  }
}
.team_people {
  @apply pt-44 w-full max-w-9xl mx-auto;
}
</style>
