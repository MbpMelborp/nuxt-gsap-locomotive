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
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'app/setHome') {
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
          '#proyecto_' + this.proyecto.id + ' .proyecto_media',
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
          },
          {
            opacity: 0.2,
            y: '10vh',
            x: '30vw',
            scale: 0.8,
            filter: 'blur(1px)',
            duration: 0.7,

            ease: Sine.easeInOut,

            stagger: {
              each: 0.1,
              from: 'center',
            },
          },
          '-=0.2'
        )
        // gsap.set('#proyecto_' + this.proyecto.id, {
        //   color: this.proyecto.content.colores[0].texto.color,
        // })
        this.tl_hover.fromTo(
          '#proyecto_' + this.proyecto.id + ' .proyecto_data .anim_proy',
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
          '#proyecto_' + this.proyecto.id + ' .proyecto_arrow ',
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
            this.proyecto.id +
            ' .proyecto_title .proyecto_title_int span',
          {
            scaleY: 1.2,
            autoAlpha: 0,
            color: this.home.fondo,
          },
          {
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.1,
            color: this.proyecto.content.colores[0].nombre.color,

            stagger: {
              // from: 'random',
              each: 0.02,
            },
          },
          '-=0.3'
        )
      }
    })

    this.observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        const newValue = m.target.getAttribute(m.attributeName)
        this.$nextTick(() => {
          this.onClassChange(newValue, m.oldValue)
        })
      }
    })
    const elemt = document.getElementById('proyecto_' + this.proyecto.id)
    this.observer.observe(elemt, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class'],
    })

    this.onClassChange(elemt.getAttribute('class'))

    // gsap.set('#proyecto_' + this.proyecto.id, {
    //   color: this.proyecto.content.colores[0].texto.color,
    // })

    this.tl_images.to('#proyecto_' + this.proyecto.id + ' .proyecto_media', {
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
  methods: {
    onClassChange(classAttrValue) {
      const classList = classAttrValue.split(' ')
      // console.log('classList', classList.includes('is-inview'))
      if (classList.includes('is-inview')) {
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
  },
}
