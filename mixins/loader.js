import { gsap, Power2 } from 'gsap'
import Intersect from 'vue-intersect'
export default {
  components: {
    Intersect,
  },

  mounted() {
    if (window) {
      window.dispatchEvent(new Event('resize'))
    }
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
          window.dispatchEvent(new Event('resize'))
        }
        if (el.classList.contains('vlazy')) {
          if (this.$isMobile()) {
            gsap.set(el, {
              clipPath: 'inset(0% 0% 100% 0%)',
              scaleY: 1.1,
              autoAlpha: 0,
            })
          } else {
            gsap.set(el, {
              clipPath: 'inset(0% 0% 0% 0%)',
              scaleY: 1,
              autoAlpha: 0,
            })
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
          if (el.classList.contains('vlazy')) {
            if (el.classList.contains('vlazy')) {
              gsap.to(el, {
                clipPath: 'inset(0% 0% 0% 0%)',
                scaleY: 1,
                autoAlpha: 1,
                duration: 0.5,
                ease: Power2.easeInOut,
                onStart: () => {
                  window.dispatchEvent(new Event('resize'))
                },
              })
            } else {
              gsap.to(el, {
                clipPath: 'inset(0% 0% 0% 0%)',
                scaleY: 1,
                autoAlpha: 1,
                duration: 0.8,
                ease: Power2.easeInOut,
                onStart: () => {
                  window.dispatchEvent(new Event('resize'))
                },
              })
            }
          }
        }
      }
    )
  },
  methods: {
    loaded(e) {
      if (window) {
        if (
          !e.target.classList.contains('isLoaded') &&
          !e.target.classList.contains('isLoading')
        ) {
          gsap.set(e.target, {
            // clipPath: 'inset(0% 0% 100% 0%)',
            // webkitClipPath: 'inset(0% 0% 100% 0%)',
            scaleY: 1,
            autoAlpha: 0,
          })
        } else {
          gsap.to(e.target, {
            // clipPath: 'inset(0% 0% 0% 0%)',
            // webkitClipPath: 'inset(0% 0% 0% 0%)',
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.5,
            ease: Power2.easeInOut,
            onStart: () => {
              window.dispatchEvent(new Event('resize'))
            },
          })
        }
      }
    },
    clipToRight(e) {
      e.forEach(function (entry, i) {
        if (
          entry.target.loaded === false ||
          entry.target.loaded === undefined
        ) {
          entry.target.loaded = true
          gsap.fromTo(
            entry.target,
            {
              clipPath: 'inset(0% 100% 0% 0%)',
              y: 10,
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              y: 0,
              duration: 0.5,
              delay: 1,
              stagger: i * 0.2,
              overwrite: false,
              ease: Power2.easeInOut,
              onStart: () => {},
              onComplete: () => {
                gsap.killTweensOf(entry.target)
              },
            }
          )
        }
      })
    },
  },
}
