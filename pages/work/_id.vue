<template>
  <LocomotiveScroll
    id="melborp-proyecto"
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
      :class="'content_interior vertical ' + (story != null ? ' loaded' : '')"
    >
      <div
        class="proyecto_top"
        data-scroll-section
        data-scroll-call="section_proyecto"
      >
        <div class="proyecto_info" :class="story.content.tipo_interior">
          <h3>
            <b
              v-editable="story.content.cliente"
              class="anim"
              :class="
                clienteChars < 10
                  ? 'psmall'
                  : clienteChars >= 10 && clienteChars < 20
                  ? 'pmid'
                  : clienteChars >= 20
                  ? 'plarge'
                  : ''
              "
              >{{ story.content.cliente }},</b
            >
            <time class="anim">
              <span>
                {{ $moment(story.first_published_at).format('MM') }}
              </span>
              <strong>
                .{{ $moment(story.first_published_at).format('YY') }}
              </strong>
            </time>
          </h3>
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

          <div class="regresar">
            <nuxt-link v-cursor-left :to="`/?w=${story.slug}`">
              <i class="fal fa-long-arrow-left text-3xl block mr-2"></i>
            </nuxt-link>
          </div>
          <div class="info" :class="story.content.tipo_interior">
            <div v-if="story.content.tipo" class="anim tipo">
              <span>
                {{ story.content.tipo }}
              </span>
            </div>
            <div class="anim intro2" v-html="intro2"></div>
            <div class="anim intro3" v-html="intro3"></div>

            <div
              data-scroll
              data-scroll-speed="-0.5"
              class="anim body"
              v-html="cuerpo"
            ></div>
          </div>

          <div class="problem animpm">
            <h4>Problem</h4>
            <div v-html="problem"></div>
          </div>

          <div class="melborp animpm">
            <h4>Melborp</h4>
            <div v-html="melborp"></div>
          </div>

          <div
            v-if="resultadoc && resultadoc.replace(/(<([^>]+)>)/gi, '') != ''"
            class="resultadoc animpm"
            :class="story.content.resultados.length == 0 ? 'nresultados' : ''"
            v-html="resultadoc"
          ></div>
          <div
            v-if="story.content.resultados.length > 0"
            data-scroll
            data-scroll-speed="0.5"
            class="resultados animpm"
          >
            <div class="listado">
              <!-- <div
                v-for="(resultado, index) in story.content.resultados"
                :key="index"
                class="resultado"
                v-html="$storyapi.richTextResolver.render(resultado.resultado)"
              > -->
              <div
                v-for="(resultado, index) in story.content.resultados"
                :key="index"
                class="resultado"
              >
                <div
                  v-for="(resultado_int, index2) in resultado.resutado"
                  :key="`r${index2}`"
                >
                  <div
                    v-if="resultado_int.contenido != ''"
                    class="res_contenido"
                    v-html="
                      $storyapi.richTextResolver.render(resultado_int.contenido)
                    "
                  ></div>
                  <div v-else class="res_cifra">
                    <small v-if="resultado_int.prefijo">{{
                      resultado_int.prefijo
                    }}</small>
                    <b>{{ resultado_int.valor }}</b>
                    <small v-if="resultado_int.sufijo">{{
                      resultado_int.sufijo
                    }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref="proyecto_header"
            v-lazy-container="{ selector: 'img' }"
            data-scroll
            data-scroll-repeat="true"
            data-scroll-speed="1"
            data-scroll-position="top"
            class="imagen"
          >
            <img
              :data-src="story.content.header[0].filename + '/m/'"
              :data-loading="
                story.content.header[0].filename + '/m/filters:quality(10)'
              "
              :data-error="
                story.content.header[0].filename + '/m/filters:quality(10)'
              "
              :alt="story.name"
              class="vlazy"
            />
          </div>
        </div>
      </div>
      <Media
        v-for="(media, index) in story.content.bloques"
        :key="index"
        :media="media"
      >
      </Media>
      <div
        data-scroll-section
        class="w-full"
        :style="`background: ${next_project.content.colores[0].fondo.color}; color: ${next_project.content.colores[0].texto.color}`"
      >
        <div class="next-project">
          <div class="next-project-wrap">
            <nuxt-link
              v-cursor-right
              class="next-project-wrap-fl"
              :to="next_project.slug"
            >
              <div class="next-project-wrap-fl-title">
                <h4 class="next-project-title">Siguiente proyecto</h4>
                <h4>
                  {{ next_project.content.cliente }},
                  {{ next_project.content.nombre }}
                </h4>
                <h3>
                  {{ next_project.content.titular }}
                </h3>
                <div class="next-project-wrap-fl-title-intro">
                  <div class="tipo">
                    {{ next_project.content.tipo }}
                  </div>
                  <div
                    v-html="
                      $storyapi.richTextResolver.render(
                        next_project.content.intro
                      )
                    "
                  ></div>
                  <div class="pmel nproblem">
                    <h5>Problem</h5>
                    <div
                      v-html="
                        $storyapi.richTextResolver.render(
                          next_project.content.problem
                        )
                      "
                    ></div>
                  </div>
                  <div class="pmel nmelborp">
                    <h5>Melborp</h5>
                    <div
                      v-html="
                        $storyapi.richTextResolver.render(
                          next_project.content.melborp
                        )
                      "
                    ></div>
                  </div>
                </div>
              </div>

              <div
                v-lazy-container="{ selector: 'img' }"
                class="next-project-wrap-fl-content"
              >
                <img
                  v-if="
                    next_project.content.home[0].media1.filename
                      .split('.')
                      .pop() != 'mp4'
                  "
                  :data-src="
                    next_project.content.home[0].media1.filename + '/m/'
                  "
                  :data-loading="
                    next_project.content.home[0].media1.filename +
                    '/m/filters:quality(10)'
                  "
                  :data-error="
                    next_project.content.home[0].media1.filename +
                    '/m/filters:quality(10)'
                  "
                  :alt="next_project.content.nombre"
                  class="img_1 vlazy"
                />
                <video
                  v-else
                  muted
                  playsinline
                  loop
                  preload
                  autoplay
                  class="img_1"
                >
                  <source
                    :src="next_project.content.home[0].media1.filename"
                    type="video/mp4"
                  />
                </video>
                <img
                  v-if="
                    next_project.content.home[0].media2.filename
                      .split('.')
                      .pop() != 'mp4'
                  "
                  :data-scroll="!$isMobile() ? true : false"
                  :data-scroll-speed="!$isMobile() ? 0.5 : 0"
                  :data-src="
                    next_project.content.home[0].media2.filename + '/m/'
                  "
                  :data-loading="
                    next_project.content.home[0].media2.filename +
                    '/m/filters:quality(10)'
                  "
                  :data-error="
                    next_project.content.home[0].media2.filename +
                    '/m/filters:quality(10)'
                  "
                  :alt="next_project.content.nombre"
                  class="img_2 vlazy"
                />
                <video
                  v-else
                  muted
                  playsinline
                  loop
                  preload
                  autoplay
                  class="img_2"
                >
                  <source
                    :src="next_project.content.home[0].media2.filename"
                    type="video/mp4"
                  />
                </video>
                <img
                  v-if="
                    next_project.content.home[0].media3.filename
                      .split('.')
                      .pop() != 'mp4'
                  "
                  :data-scroll="!$isMobile() ? true : false"
                  :data-scroll-speed="!$isMobile() ? -0.5 : 0"
                  :data-src="
                    next_project.content.home[0].media3.filename + '/m/'
                  "
                  :data-loading="
                    next_project.content.home[0].media3.filename +
                    '/m/filters:quality(10)'
                  "
                  :data-error="
                    next_project.content.home[0].media3.filename +
                    '/m/filters:quality(10)'
                  "
                  :alt="next_project.content.nombre"
                  class="img_3 vlazy"
                />
                <video
                  v-else
                  muted
                  playsinline
                  loop
                  preload
                  autoplay
                  class="img_3"
                >
                  <source
                    :src="next_project.content.home[0].media3.filename"
                    type="video/mp4"
                  />
                </video>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </LocomotiveScroll>
</template>

<script>
import { gsap, Expo, Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { mapMutations, mapGetters } from 'vuex'
// COMPONENTES
import Media from '~/components/proyectos/Media.vue'

import { custom } from '~/utils/transitions.js'
import loaderm from '~/mixins/loader.js'
import head from '~/mixins/head.js'

gsap.registerPlugin(ScrollTrigger)

export default {
  components: {
    Media,
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
          route.path === '/' || route.path === '' ? 'home' : route.path
        return app.$storyapi
          .get(`cdn/stories${fullSlug}`, {
            version: 'published',
          })
          .then(async (res) => {
            const clienteChars = res.data.story.content.cliente.split('').length
            const tituloChars = res.data.story.content.nombre.split('').length
            const tituloArray = res.data.story.content.nombre.split(' ')
            const tituloSize = tituloArray.length
            const tituloHalf = Math.ceil(tituloSize / 2)

            const tituloParts = []
            for (let i = tituloHalf; i > 0; i--) {
              tituloParts.push(
                tituloArray.splice(0, Math.ceil(tituloArray.length / i))
              )
            }
            const proyectos = await app.$storyapi.get(`cdn/stories`, {
              starts_with: 'work/',
              version: 'published',
              excluding_ids: res.data.story.id,
            })

            // console.log(
            //   'PROYECTO -> Storyblok',
            //   res.data.story,
            //   proyectos.data.stories
            // )

            return {
              story: res.data.story,
              tituloParts,
              tituloHalf,
              tituloSize,
              tituloChars,
              clienteChars,
              next_project:
                proyectos.data.stories[
                  Math.floor(Math.random() * proyectos.data.stories.length)
                ],
            }
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
    intro2() {
      return this.story.content.intro2
        ? this.$storyapi.richTextResolver.render(this.story.content.intro2)
        : ''
    },
    intro3() {
      return this.story.content.intro3
        ? this.$storyapi.richTextResolver.render(this.story.content.intro3)
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
    resultadoc() {
      return this.story.content.resultadoc
        ? this.$storyapi.richTextResolver.render(this.story.content.resultadoc)
        : ''
    },
  },
  beforeCreate() {
    if (this.load != null) {
      this.setLoad(false)
    }
  },
  mounted() {
    if (window) {
      window.dispatchEvent(new Event('resize'))
    }
    if (window.location.search.includes('_storyblok')) {
      this.$storybridge(
        () => {
          const { StoryblokBridge } = window
          const storyblokInstance = new StoryblokBridge()

          storyblokInstance.on(['input', 'published', 'change'], (event) => {
            if (event.action === 'input') {
              if (event.story.id === this.story.id) {
                this.story.content = event.story.content
              }
            } else {
              this.$nuxt.$router.go({
                path: this.$nuxt.$router.currentRoute,
                force: true,
              })
            }
          })
        },
        (error) => {
          console.error(error)
        }
      )
    }

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
      setPage: 'app/setPage',
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
        // clipPath: 'inset(0% 100% 0% 0%)',
        y: 100,
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
        gsap.set('#nav_site #logo_melborp', {
          fill: this.story.content.colores[0].nombre.color,
        })
        gsap.set('#nav_site a', {
          color: this.story.content.colores[0].nombre.color,
        })
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
      gsap.set('body, .content_interior', {
        background: this.story.content.colores[0].fondo.color,
        color: this.story.content.colores[0].texto.color,
      })
      gsap.set(
        '.proyecto_info h2, .resultado b, .regresar, .media_video_poster, .proyecto_info h3, .proyecto_info time, .proyecto_info h2, .resultado, .tipo, .descripcion, .to-color',
        {
          color: this.story.content.colores[0].nombre.color,
        }
      )
      gsap.set('.bg, .body', {
        background: this.story.content.colores[0].fondo.color,
      })

      this.setPage({
        fondo: this.story.content.colores[0].fondo.color,
        texto: this.story.content.colores[0].texto.color,
        nav: this.story.content.colores[0].nombre.color,
      })
    },
    initHomeAnimation() {
      const timer = 0.8
      // this.tl_home.fromTo(
      //   '.proyecto_header img',
      //   {
      //     clipPath: 'inset(0% 100% 0% 0%)',
      //     x: '-10vw',
      //     scale: 1.2,
      //   },
      //   {
      //     clipPath: 'inset(0% 0% 0% 0%)',
      //     x: 0,
      //     scale: 1,
      //     duration: 0.5,
      //   },
      //   '-=' + timer * 0.2
      // )

      this.tl_home.fromTo(
        '.proyecto_top h3 .anim',
        {
          clipPath: 'inset(0% 0% 0% 100%)',
          // webkitClipPath: 'inset(0% 0% 0% 100%)',
          x: 40,
          '--font-width': 80,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          // webkitClipPath: 'inset(0% 0% 0% 0%)',
          x: 0,
          '--font-width': 120,
          duration: timer,
          stagger: 0.2,
          ease: Power2.easeInOut,
        },
        '+=0.5'
      )

      this.tl_home.fromTo(
        '.proyecto_top h2 span',
        {
          clipPath: 'inset(0% 100% 0% 0%)',
          // webkitClipPath: 'inset(0% 100% 0% 0%)',
          x: -40,
          '--font-weight': 100,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          // webkitClipPath: 'inset(0% 0% 0% 0%)',
          x: 0,
          '--font-weight': 400,
          duration: timer * 0.8,
          stagger: 0.2,
          ease: Power2.easeInOut,
        },
        '-=0.5'
      )

      this.tl_home.fromTo(
        '.proyecto_top .info .anim',
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          // webkitClipPath: 'inset(0% 0% 100% 0%)',
          y: 50,
          scaleY: 1.2,
          // '--font-weight': 600,
          // '--font-width': 20,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          // webkitClipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          scaleY: 1,
          // '--font-weight': 150,
          // '--font-width': 80,
          duration: 0.5,
          stagger: 0.1,
          ease: Power2.easeInOut,
        },
        '-=1'
      )

      this.tl_home.fromTo(
        '.proyecto_top .animpm',
        {
          clipPath: 'inset(0% 100% 0% 0%)',
          // webkitClipPath: 'inset(0% 100% 0% 0%)',
          x: -40,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          // webkitClipPath: 'inset(0% 0% 0% 0%)',
          x: 0,
          duration: timer,
          stagger: timer * 0.2,
          ease: Power2.easeInOut,
        },
        '-=1'
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
.next-project {
  min-height: 50vh;
  @apply pt-8 pb-8 md:pt-44 md:pb-32 w-full max-w-9xl mx-auto overflow-hidden 2xl:mb-12;
  hr {
    @apply mx-4 md:mx-14 mb-8;
  }
  &-wrap {
    @apply mx-8 md:mx-20;
    .next-project-title {
      font-variation-settings: 'wght' var(--font-weight, 400),
        'wdth' var(--font-width, 80), 'ital' 0;
      @apply mb-8 text-sm;
    }
    p {
      @apply mb-4;
    }
    &-fl {
      @apply flex justify-between flex-col-reverse md:flex-row items-center transition-all duration-1000 ease-in-out;
      &-title {
        @apply w-full md:w-4/12 text-sm;
        p {
          @apply text-base;
        }
        h4 {
          font-variation-settings: 'wght' var(--font-weight, 600),
            'wdth' var(--font-width, 120), 'ital' 0;
          @apply text-3xl mb-2 uppercase;
        }
        h3 {
          @apply text-2xl mb-6;
        }
        &-intro {
          .tipo {
            font-variation-settings: 'wght' var(--font-weight, 500),
              'wdth' var(--font-width, 130), 'ital' 0;
            @apply opacity-50 mb-4;
          }
        }
        .pmel {
          @apply mb-4;
          h5 {
            font-variation-settings: 'wght' var(--font-weight, 600),
              'wdth' var(--font-width, 120), 'ital' 0;
            @apply text-xl mb-2 uppercase;
          }
          &.nproblem {
            p {
              @apply line-through;
            }
          }
        }
      }
      &-content {
        @apply w-full mb-8 mt-16 md:mb-0 md:mt-0 md:w-7/12 text-sm md:grid md:grid-cols-12 md:grid-rows-6;
        .img_1 {
          transition: all 0.5s ease-in-out;
          @apply block md:col-start-1 md:col-span-7 md:row-start-1 md:row-span-5;
        }
        .img_2 {
          transition: all 0.5s ease-in-out;
          @apply delay-75 hidden md:block md:col-start-7 md:col-span-6 md:row-start-3 md:row-span-4;
        }
        .img_3 {
          transition: all 0.5s ease-in-out;
          @apply delay-100 hidden md:block md:col-start-2 md:col-span-4 md:row-start-4 md:row-span-3;
        }
        img {
          @apply w-full object-cover;
        }
      }
    }
    &-fl:hover {
      @media (min-width: 768px) {
        .img_1 {
          transform: scale(0.8) !important;
        }
        .img_2 {
          transform: scale(1.1) !important;
        }
        .img_3 {
          transform: scale(1.3) !important;
        }
      }
    }
  }
}
.proyecto_top {
  display: grid;
  grid-gap: 0;
  grid-template-columns: [l1] auto [r1];
  grid-template-rows: [t1] auto [b1] auto;
  grid-template-areas:
    'info'
    'info';
  user-select: none;
  overflow: hidden;
  @apply pt-24 md:pt-44 w-full max-w-9xl mx-auto leading-none;
  @media (max-width: 768px) {
    grid-template-rows: [t1] 100px [b1] auto;
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
    grid-template-columns: [l1] 5% 23% 22% 22% 22% 6% [r1];
    grid-template-rows: [t1] 5vh auto [m1] auto [pt] auto auto [pb] auto [b1];
    grid-template-areas:
      '. regresar . . . .'
      '. cliente cliente cliente cliente .'
      '. nombre nombre nombre nombre .'
      '. info info imagen imagen .'
      '. info info problem melborp .'
      '. resultado resultado resultados resultados .';
    z-index: 2;
    font-variation-settings: 'wght' var(--font-weight, 150),
      'wdth' var(--font-width, 80), 'ital' 0;
    @apply self-start gap-0 grid w-full min-h-screen;
    @media (max-width: 768px) {
      grid-template-columns: [l1] 5% auto auto 5% [r1];
      grid-template-rows: [t1] auto auto auto auto auto auto auto auto auto [b1];
      grid-template-areas:
        '. regresar regresar .'
        '. cliente cliente .'
        '. nombre nombre .'
        '. imagen imagen .'
        '. info info .'
        '. problem problem .'
        '. melborp melborp .'
        '. resultado resultado .'
        '. resultados resultados .' !important;
    }
    &.left {
      grid-template-areas:
        '. regresar . . . .'
        '. cliente cliente cliente cliente .'
        '. nombre nombre nombre nombre .'
        '. imagen imagen info info .'
        '. problem melborp info info .'
        '. resultado resultado resultados resultados .';
    }
    .regresar {
      grid-area: regresar;
      @apply leading-none self-start md:self-start z-0;
      a {
        i {
          @apply font-light;
        }
      }
    }

    h3 {
      grid-area: cliente;
      @apply leading-none self-end mb-2 z-20 text-center mt-8 md:mt-0;
      b {
        font-variation-settings: 'wght' var(--font-weight, 200),
          'wdth' var(--font-width, 120), 'ital' 0;
      }
      .psmall {
        @apply md:text-8xl text-3xl;
      }
      .pmid {
        @apply md:text-6xl text-3xl;
      }
      .plarge {
        @apply md:text-4xl text-3xl;
      }
      span {
        font-variation-settings: 'wght' var(--font-weight, 200),
          'wdth' var(--font-width, 60), 'ital' 0;
        @apply mr-2;
      }
      time {
        font-variation-settings: 'wght' var(--font-weight, 200),
          'wdth' var(--font-width, 120), 'ital' 0;
        @apply leading-none md:self-start self-center z-0 md:justify-self-center justify-self-end text-right text-sm;
      }
    }
    h2 {
      grid-area: nombre;
      line-height: 0.65em;

      /* flex-wrap flex justify-center */
      @apply leading-none self-end z-20 w-full md:w-11/12 lg:w-10/12 2xl:w-9/12 mx-auto text-center;

      div {
        @apply block;
        &.titulo_1 {
          @apply text-right md:mr-36;
        }
        span {
          font-variation-settings: 'wght' var(--font-weight, 400),
            'wdth' var(--font-width, 130), 'ital' 0;
          @apply inline-block uppercase;
          &.ibr {
            @apply block md:ml-12;
          }
          &.psmall {
            @apply md:text-6xl text-4xl;
          }
          &.pmid {
            @apply md:text-7xl text-4xl;
          }
          &.plarge {
            @apply md:text-5xl text-4xl;
          }
        }
      }
    }
    .imagen {
      grid-area: imagen;
      @apply self-center md:-mt-6 mt-8;
      img {
        max-width: 45vw;
        @apply object-cover w-full block;
        @media (max-width: 768px) {
          max-width: 90vw;
        }
      }
    }
    .info {
      grid-area: info;
      @apply grid grid-cols-1 place-content-around gap-8 z-20 md:pl-24 md:pr-16 leading-tight;
      .intro2 {
        font-variation-settings: 'wght' var(--font-weight, 150),
          'wdth' var(--font-width, 80), 'ital' 0;
        @apply md:w-10/12 place-self-end md:mt-8;
        p {
          @apply mb-4;
        }
      }
      .intro3 {
        font-variation-settings: 'wght' var(--font-weight, 150),
          'wdth' var(--font-width, 80), 'ital' 0;
        @apply md:w-10/12 place-self-start;
        p {
          @apply mb-4;
        }
      }
      .tipo {
        font-variation-settings: 'wght' var(--font-weight, 500),
          'wdth' var(--font-width, 130), 'ital' 0;
        @apply md:w-8/12 place-self-start text-lg opacity-50 md:mt-20 mt-8 md:mb-8;
      }
      .body {
        font-variation-settings: 'wght' var(--font-weight, 150),
          'wdth' var(--font-width, 80), 'ital' 0;
        @apply self-center md:mb-28 mb-8 text-lg;
        p {
          @apply mb-4;
        }
      }
      &.left {
        .intro2 {
          @apply place-self-start md:mt-8;
        }
        .intro3 {
          @apply place-self-end;
        }
      }
    }

    .problem {
      grid-area: problem;
      @apply z-20  py-0 px-0 self-start leading-tight mt-0 md:pt-8 line-through mb-8;

      h4 {
        font-variation-settings: 'wght' var(--font-weight, 400),
          'wdth' var(--font-width, 80), 'ital' 0;
        @apply text-2xl font-bold;
      }
    }
    .melborp {
      grid-area: melborp;
      @apply z-20  py-0 px-0 self-start leading-tight pt-8 md:ml-10 mb-8;

      h4 {
        font-variation-settings: 'wght' var(--font-weight, 400),
          'wdth' var(--font-width, 80), 'ital' 0;
        @apply text-2xl font-bold;
      }
    }
    .resultadoc {
      grid-area: resultado;
      font-variation-settings: 'wght' var(--font-weight, 400),
        'wdth' var(--font-width, 90), 'ital' 0;
      @apply md:pl-24 md:pr-16 md:text-5xl text-4xl self-center leading-md mt-8 md:mt-0 mb-8;
      &.nresultados {
        grid-area: resultados;
      }
    }
    .resultados {
      grid-area: resultados;
      @apply mt-10 z-20 py-8 md:py-12 md:px-8 p-0 self-start md:mb-0;
      h4 {
        font-variation-settings: 'wght' var(--font-weight, 400),
          'wdth' var(--font-width, 90), 'ital' 0;
        @apply text-4xl mb-4;
      }
      .listado {
        @apply flex flex-wrap justify-between items-baseline;
        .resultado {
          @apply flex-initial pr-4 mb-6 text-base leading-md self-baseline md:w-1/2;
          i {
            max-width: 10rem;
            @apply block;
          }
          b {
            font-variation-settings: 'wght' var(--font-weight, 400),
              'wdth' var(--font-width, 80), 'ital' 0;
            line-height: 0.8em;
            @apply block mt-2 text-4xl md:text-6xl tracking-tighter;
            u {
              @apply text-lg;
            }
          }
          .res_contenido {
            @apply text-lg leading-none;
          }
          .res_cifra {
            @apply flex items-end space-x-3;
            small {
              @apply text-lg md:text-xl;
            }
          }
        }
      }
    }
  }
}
</style>
