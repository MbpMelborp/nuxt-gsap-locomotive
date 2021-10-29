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
  },
  methods: {
    loaded(e) {
      if (window) {
        if (
          !e.target.classList.contains('isLoaded') &&
          !e.target.classList.contains('isLoading')
        ) {
          gsap.set(e.target, {
            clipPath: 'inset(0% 0% 100% 0%)',
            scaleY: 1.1,
            autoAlpha: 0,
          })
        } else {
          gsap.to(e.target, {
            clipPath: 'inset(0% 0% 0% 0%)',
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.5,
            ease: Power2.easeInOut,
            onComplete: () => {
              window.dispatchEvent(new Event('resize'))
            },
          })
        }
      }
    },
    clipToRight(e) {
      // console.log('CLIP TO RIGHT ->', e[0].target)
      e.forEach(function (entry, i) {
        if (!entry.target.loaded) {
          gsap.fromTo(
            entry.target,
            {
              clipPath: 'inset(0% 100% 0% 0%)',
              x: -10,
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              x: 0,
              duration: 0.5,
              delay: 1,
              stagger: i * 0.2,
              ease: Power2.easeInOut,
              onComplete: () => {
                entry.target.loaded = true
              },
            }
          )
        }
      })
    },
  },
}
