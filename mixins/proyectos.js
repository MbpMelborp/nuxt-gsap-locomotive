import { gsap, Power2, Power4, Sine } from 'gsap'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      ready: false,
      tl_images: gsap.timeline({ paused: true, ease: Power4.easeInOut }),
      // tl_bkg: gsap.timeline({ paused: true, ease: Power4.easeInOut }),
      tl_hover: gsap.timeline({ paused: true, ease: Power2.easeInOut }),
    }
  },
  computed: {
    intro() {
      return this.proyecto.content.intro
        ? this.$storyapi.richTextResolver.render(this.proyecto.content.intro)
        : ''
    },
    ...mapGetters({ home: 'app/getHome' }),
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  beforeMounut() {
    this.tl_hover.kill()
  },
  mounted() {
    console.log('PROYECTOS -> mounted', this.proyecto.slug, window.innerWidth)
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'app/setHome') {
        if (window.innerWidth >= 768) this.initTimelines()
      }
    })
    if (this.home.texto != null && window.innerWidth >= 768) {
      this.initTimelines()
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

    // gsap.set('#proyecto_' + this.proyecto.slug, {
    //   color: this.proyecto.content.colores[0].texto.color,
    // })

    this.tl_images.to('#proyecto_' + this.proyecto.slug + ' .proyecto_media', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.5,
      delay: 0,
      scaleY: 1,
      y: 30,
      stagger: {
        each: 0.2,
        from: 'edges',
      },
      onComplete: () => {
        this.observer.disconnect()
      },
    })
  },
  // beforeMount() {
  //   console.log('PROYECTOS -> beforeMount', this.tl_hover)
  //   this.tl_hover.play(0).pause()
  // },
  destroyed() {
    console.log('PROYECTOS -> destroyed', this.proyecto.slug)
    this.tl_hover.kill()
    this.tl_images.kill()
  },
  methods: {
    onClassChange(classAttrValue) {
      const classList = classAttrValue.split(' ')
      // console.log('classList', classList.includes('is-inview'))
      if (classList.includes('is-inview')) {
        // document.getElementById('nav_site').classList.add('dif')
        if (this.ready) {
          return
        }
        // this.tl_bkg.play()

        console.log('INVIEW ->', this.proyecto.content.nombre)
        this.ready = true
        this.tl_images.play()
      }
    },
    hoverProyecto(est) {
      if (est) {
        this.tl_hover.timeScale(1).play()
      } else {
        this.tl_hover.pause().timeScale(2).reverse()
      }
    },
    hoverFinish() {
      this.tl_hover.restart().kill()
      this.tl_images.kill()
    },
    initTimelines() {
      console.log('PROYECTOS -> initTimelines', this.proyecto.slug)
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
          // filter: 'blur(0px)',
        },
        {
          opacity: 0.2,
          y: '10vh',
          x: '30vw',
          skewX: 5,
          skewY: 5,

          scale: 0.8,
          // filter: 'blur(1px)',
          duration: 0.7,

          ease: Sine.easeInOut,

          stagger: {
            each: 0.1,
            from: 'center',
          },
        },
        '-=0.2'
      )
      // gsap.set('#proyecto_' + this.proyecto.slug, {
      //   color: this.proyecto.content.colores[0].texto.color,
      // })
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
          ' .proyecto_title .proyecto_title_int span',
        {
          // '--font-width': 80,
          clipPath: 'inset(0% 100% 0% 0%)',
          scaleY: 1.2,
          autoAlpha: 0,
          color: this.home.fondo,
        },
        {
          // '--font-width': 120,
          clipPath: 'inset(0% 0% 0% 0%)',
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
    },
  },
}
