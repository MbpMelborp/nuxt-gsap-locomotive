import { gsap, Power2, Power4, Sine } from 'gsap'
import { mapGetters, mapMutations } from 'vuex'
import Intersect from 'vue-intersect'

export default {
  data() {
    return {
      ready: false,
      tl_images_play: false,
      tl_images: null,
      tl_bkg: null,
      tl_hover: null,
      tl_hover_mobile: null,
    }
  },
  beforeMount() {
    this.tl_images = null
    this.tl_bkg = null
    this.tl_hover = null
    this.tl_hover_mobile = null
  },
  computed: {
    intro() {
      return this.proyecto.content.intro
        ? this.$storyapi.richTextResolver.render(this.proyecto.content.intro)
        : ''
    },
    ...mapGetters({
      home: 'app/getHome',
      proyectoMobile: 'app/getMobileProyecto',
    }),
  },
  components: {
    Intersect,
  },
  mounted() {
    console.log(
      `%c 🗂️ PROYECTOS -> mounted \n ${this.proyecto.name}`,
      `background:${this.proyecto.content.colores[0].fondo.color}; color: ${this.proyecto.content.colores[0].texto.color}`
    )
    this.$Lazyload.$on(
      'loading',
      (
        {
          bindType,
          el,
          naturalHeight,
          naturalWidth,
          $parent,
          src,
          loading,
          error,
        },
        formCache
      ) => {
        if (window) {
          if (el.classList.contains('proyecto-img')) {
            window.dispatchEvent(new Event('resize'))
          }
        }
      }
    )
    this.$Lazyload.$on(
      'loaded',
      (
        {
          bindType,
          el,
          naturalHeight,
          naturalWidth,
          $parent,
          src,
          loading,
          error,
        },
        formCache
      ) => {
        if (window) {
          if (el.classList.contains('proyecto-img')) {
            window.dispatchEvent(new Event('resize'))
          }
        }
      }
    )
    // INICIANDO TIMELINES
    this.tl_images = gsap.timeline({
      paused: true,
      ease: Power4.easeInOut,
      delay: 0.1,
      repeat: 0,
      onStart: () => {
        console.log('🗂️ PROYECTOS -> tl_images -> onStart', this.proyecto.name)
      },
      onComplete: () => {
        console.log(
          '🗂️ PROYECTOS -> tl_images -> onComplete',
          this.proyecto.name
        )
      },
    })
    this.tl_bkg = gsap.timeline({ paused: true, ease: Power4.easeInOut })
    this.tl_hover = gsap.timeline({
      paused: true,
      ease: Power2.easeInOut,
      onStart: () => {},
      onComplete: () => {},
    })
    this.tl_hover_mobile = gsap.timeline({
      paused: true,
      delay: 2,
      ease: Power2.easeInOut,
    })

    // Si el texto no existe
    if (this.home.texto === null) {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'app/setHome') {
          if (window.innerWidth >= 768) {
            console.log(
              `%c PROYECTOS -> initTimeline vuex \n ${this.proyecto.name}`,
              `background:${this.proyecto.content.colores[0].fondo.color}; color: ${this.proyecto.content.colores[0].texto.color}`
            )
            this.initTimelines()
          } else {
            this.initTimelinesMobile()
          }
        }
      })
    } else if (window.innerWidth >= 768) {
      console.log(
        `%c PROYECTOS -> initTimeline normal \n ${this.proyecto.name}`,
        `background:${this.proyecto.content.colores[0].fondo.color}; color: ${this.proyecto.content.colores[0].texto.color}`
      )
      this.initTimelines()
    } else {
      this.initTimelinesMobile()
    }

    this.observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        const newValue = m.target.getAttribute(m.attributeName)
        this.$nextTick(() => {
          this.onClassChange(newValue, m.oldValue)
        })
      }
    })

    const elemt = document.getElementById('proyecto_' + this.proyecto.slug)

    this.observer.observe(elemt, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class'],
    })

    this.onClassChange(elemt.getAttribute('class'))
  },
  // beforeMount() {
  //   console.log('PROYECTOS -> beforeMount', this.tl_hover)
  //   this.tl_hover.play(0).pause()
  // },
  destroyed() {},
  beforeDestroy() {
    console.log('PROYECTOS -> destroyed', this.proyecto.slug)
    this.tl_hover.kill()
    this.tl_hover_mobile.kill()
    this.tl_images.kill()
    this.observer.disconnect()
  },
  methods: {
    ...mapMutations({
      setMobileProyecto: 'app/setMobileProyecto',
    }),
    testload() {
      console.log('LOADED IMAGE')
    },
    onClassChange(classAttrValue) {
      // const classList = classAttrValue.split(' ')
      // console.log(
      //   '🗂️ PROYECTOS -> onClassChange',
      //   this.proyecto.content.nombre,
      //   classList
      // )
      // if (classList.includes('is-inview')) {
      //   if (this.ready) {
      //     return
      //   }
      //   this.ready = true
      //   if (!this.tl_images_play) {
      //     this.tl_images.play()
      //     this.tl_images_play = true
      //   }
      // }
    },
    showProy() {
      const el = document.getElementById(
        `proyecto_${this.proyecto.slug}_media_1`
      )
      const opacity = el.style.opacity
      const played = el.dataset.played

      console.log(
        '🗂️ PROYECTOS -> showProy',
        this.proyecto.content.nombre,
        opacity,
        played
      )
      if (opacity === '0' && played === '0') {
        el.dataset.played = '1'
        this.tl_images.restart()
      }
    },
    hoverProyecto(e, est) {
      console.log(
        '🗂️ PROYECTOS -> hoverProyecto',
        this.proyecto.name,
        Math.random(),
        est,
        e.target
      )
      // this.tl_hover.reversed() ? this.tl_hover.timeScale(1).play() : this.tl_hover.timeScale(2).reverse()
      if (est) {
        this.tl_hover.timeScale(1).play()
      } else {
        this.tl_hover.pause().timeScale(2).reverse()
      }
    },
    hoverMobileProyecto(est) {
      if (window.innerWidth < 768) {
        console.log('🗂️ PROYECTOS -> hoverMobileProyecto', this.proyecto.name)
        if (est) {
          this.tl_hover_mobile.timeScale(1).play()
          this.setMobileProyecto(this.proyecto.name)
        } else {
          this.tl_hover_mobile.pause().timeScale(2).reverse()
        }
      }
    },
    hoverFinish() {
      this.tl_hover.restart().kill()
      this.tl_images.kill()
    },
    initTimelinesMobile() {
      console.log('🗂️ PROYECTOS -> initTimelinesMobile', this.proyecto.slug)

      gsap.set('#proyecto_' + this.proyecto.slug + ' .bg', {
        background: this.proyecto.content.colores[0].fondo.color,
      })
      gsap.set('#proyecto_' + this.proyecto.slug, {
        color: this.proyecto.content.colores[0].texto.color,
      })
      gsap.set(
        '#proyecto_' + this.proyecto.slug + ' .proyecto_data .anim_proy',
        {
          color: this.proyecto.content.colores[0].texto.color,
        }
      )
      gsap.set('#proyecto_' + this.proyecto.slug + ' .proyecto_arrow ', {
        stroke: this.proyecto.content.colores[0].texto.color,
      })
      gsap.set(
        '#proyecto_' +
          this.proyecto.slug +
          ' .proyecto_title .proyecto_title_int span',
        {
          color: this.proyecto.content.colores[0].nombre.color,
        }
      )
      gsap.set(
        '#proyecto_' +
          this.proyecto.slug +
          ' .proyecto_title .proyecto_title_int',
        {
          color: this.proyecto.content.colores[0].nombre.color,
        }
      )

      // this.tl_hover_mobile.fromTo(
      //   '#proyecto_' + this.proyecto.slug + ' .proyecto_media',
      //   {
      //     opacity: 1,
      //     y: 0,
      //     x: 0,
      //     scale: 1,
      //   },
      //   {
      //     opacity: 0.2,
      //     x: '60vw',
      //     y: '5vh',
      //     scale: 0.8,

      //     duration: 0.7,
      //     ease: Sine.easeInOut,
      //     stagger: {
      //       each: 0.1,
      //       from: 'center',
      //     },
      //   },
      //   '-=0.2'
      // )

      // this.tl_hover_mobile.fromTo(
      //   '#proyecto_' + this.proyecto.slug + ' .proyecto_data',
      //   {
      //     clipPath: 'inset(0% 100% 0% 0%)',
      //     // webkitClipPath: 'inset(0% 100% 0% 0%)',
      //   },

      //   {
      //     clipPath: 'inset(0% 0% 0% 0%)',
      //     // webkitClipPath: 'inset(0% 0% 0% 0%)',
      //   },
      //   '-=0.4'
      // )

      // ANIMANDO LA INFO
      // this.tl_hover_mobile.fromTo(
      //   '#proyecto_' + this.proyecto.slug + ' .proyecto_data .anim_proy',
      //   { y: '50vh' },
      //   {
      //     y: 0,
      //     duration: 0.4,
      //     stagger: {
      //       // from: 'random',
      //       each: 0.1,
      //     },
      //   },
      //   '-=0.4'
      // )

      // ANIMANDO EL TITULO
      // this.tl_hover_mobile.fromTo(
      //   '#proyecto_' +
      //     this.proyecto.slug +
      //     ' .proyecto_title .proyecto_title_int span',
      //   {
      //     // '--font-width': 80,
      //     scaleY: 1,
      //     autoAlpha: 0,
      //   },
      //   {
      //     // '--font-width': 120,
      //     scaleY: 1,
      //     autoAlpha: 1,
      //     duration: 0.5,

      //     stagger: {
      //       // from: 'random',
      //       each: 0.1,
      //     },
      //   },
      //   '-=0.3'
      // )

      this.tl_images.fromTo(
        '#proyecto_' + this.proyecto.slug + ' .proyecto_media',
        {
          // clipPath: 'inset(0% 0% 100% 0%)',
          scaleY: 1.1,
          autoAlpha: 0,
        },
        {
          // clipPath: 'inset(0% 0% 0% 0%)',
          // webkitClipPath: 'inset(0% 0% 0% 0%)',
          scaleY: 1,
          autoAlpha: 1,
          duration: 1,
          stagger: {
            each: 0.2,
            // from: 'edges',
          },
          ease: Power2.easeInOut,
          onComplete: () => {
            this.observer.disconnect()
          },
        }
      )
      this.tl_images.fromTo(
        '#proyecto_' + this.proyecto.slug + ' .proyecto_data_int',
        {
          y: -10,
          autoAlpha: 0,
          // clipPath: 'inset(0% 100% 0% 0%)',
          // webkitClipPath: 'inset(0% 100% 0% 0%)',
        },
        {
          y: 0,
          autoAlpha: 1,
          // clipPath: 'inset(0% 0% 0% 0%)',
          // webkitClipPath: 'inset(0% 0% 0% 0%)',
        },
        '-=0.4'
      )
    },
    initTimelines() {
      console.log(
        '🗂️ PROYECTOS -> initTimelines',
        this.proyecto.name,
        this.home.fondo
      )
      gsap.set('body', { background: this.home.fondo })
      this.tl_hover.fromTo(
        'body',
        {
          background: this.home.fondo,
        },
        {
          background: this.proyecto.content.colores[0].fondo.color,
          duration: 0.4,
        }
      )

      this.tl_hover.fromTo(
        '#proyecto_' + this.proyecto.slug + ' .proyecto_media',
        {
          opacity: 1,
          y: 30,
          x: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
          rotationY: 0,
          rotation: 0,
        },
        {
          opacity: 0.2,
          y: '10vh',
          x: '30vw',
          scale: 0.8,
          skewX: 0,
          skewY: 0,
          rotationY: 0,
          rotation: 0,
          duration: 0.7,

          ease: Sine.easeInOut,

          stagger: {
            each: 0.1,
            from: 'center',
          },
        },
        '-=0.2'
      )

      this.tl_hover.fromTo(
        '#proyecto_' + this.proyecto.slug + ' .proyecto_data .anim_proy',
        { color: this.home.texto, x: 0 },
        {
          color: this.proyecto.content.colores[0].texto.color,
          x: 20,
          duration: 0.4,
          stagger: {
            // from: 'random',
            each: 0.1,
          },
        },
        '-=0.4'
      )
      this.tl_hover.fromTo(
        '#proyecto_' + this.proyecto.slug + ' .proyecto_arrow ',
        { stroke: 'transparent', opacity: 0, x: '20vw', y: '20vh' },
        {
          stroke: this.proyecto.content.colores[0].texto.color,
          x: 0,
          y: 0,
          opacity: 0.4,
          duration: 0.4,
          stagger: {
            // from: 'random',
            each: 0.02,
          },
        },
        '-=0.4'
      )
      this.tl_hover.fromTo(
        '#proyecto_' +
          this.proyecto.slug +
          ' .proyecto_title .proyecto_title_int_cliente',
        {
          // '--font-width': 80,
          clipPath: 'inset(0% 100% 0% 0%)',
          // webkitClipPath: 'inset(0% 100% 0% 0%)',
          scaleY: 1.2,
          autoAlpha: 0,
          color: this.home.fondo,
        },
        {
          // '--font-width': 120,
          clipPath: 'inset(0% 0% 0% 0%)',
          // webkitClipPath: 'inset(0% 0% 0% 0%)',
          scaleY: 1,
          autoAlpha: 1,
          duration: 0.5,
          color: this.proyecto.content.colores[0].nombre.color,
        },
        '-=0.3'
      )
      this.tl_hover.fromTo(
        '#proyecto_' +
          this.proyecto.slug +
          ' .proyecto_title .proyecto_title_int span',
        {
          // '--font-width': 80,
          clipPath: 'inset(0% 100% 0% 0%)',
          // webkitClipPath: 'inset(0% 100% 0% 0%)',
          scaleY: 1.2,
          autoAlpha: 0,
          color: this.home.fondo,
        },
        {
          // '--font-width': 120,
          clipPath: 'inset(0% 0% 0% 0%)',
          // webkitClipPath: 'inset(0% 0% 0% 0%)',
          scaleY: 1,
          autoAlpha: 1,
          duration: 0.5,
          color: this.proyecto.content.colores[0].nombre.color,

          stagger: {
            // from: 'random',
            each: 0.1,
          },
        },
        '-=0.3'
      )
      // gsap.set('#proyecto_' + this.proyecto.slug + ' .proyecto_media', {
      //   clipPath: 'inset(0% 0% 100% 0%)',
      //   // webkitClipPath: 'inset(0% 0% 100% 0%)',
      //   scaleY: 1.1,
      //   autoAlpha: 0,
      // })
      // IMAGENES
      this.tl_images.fromTo(
        '#proyecto_' + this.proyecto.slug + ' .proyecto_media',
        {
          // clipPath: 'inset(0% 0% 100% 0%)',

          scaleY: 1.1,
          autoAlpha: 0,
        },
        {
          // clipPath: 'inset(0% 0% 0% 0%)',
          // webkitClipPath: 'inset(0% 0% 0% 0%)',
          scaleY: 1,
          autoAlpha: 1,
          duration: 1,
          stagger: {
            each: 0.2,
            // from: 'edges',
          },
          ease: Power2.easeInOut,
          onComplete: () => {
            this.observer.disconnect()
          },
        }
      )
      this.tl_images.fromTo(
        '#proyecto_' + this.proyecto.slug + ' .proyecto_data_int',
        {
          y: -10,
          autoAlpha: 0,
          // clipPath: 'inset(0% 100% 0% 0%)',
          // webkitClipPath: 'inset(0% 100% 0% 0%)',
        },
        {
          y: 0,
          autoAlpha: 1,
          // clipPath: 'inset(0% 0% 0% 0%)',
          // webkitClipPath: 'inset(0% 0% 0% 0%)',
        },
        '-=0.4'
      )
    },
    loaded(e) {
      if (window) {
        if (
          !e.target.classList.contains('isLoaded') &&
          !e.target.classList.contains('isLoading')
        ) {
          const parent = e.target.parentElement
          gsap.set(parent, {
            autoAlpha: 0,
          })
        } else {
          window.dispatchEvent(new Event('resize'))
        }
      }
    },
  },
}
