<template>
  <img
    v-lazy-load
    :src="story.content.imagen.filename + '/m/filters:quality(10)'"
    :data-src="story.content.imagen.filename"
    alt="Melborp"
    @load="loaded"
  />
</template>

<script>
import { gsap, Power2 } from 'gsap'
export default {
  props: {
    story: {
      type: Object,
      default: null,
    },
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
            // webkitClipPath: 'inset(0% 0% 100% 0%)',
            scaleY: 1.1,
            autoAlpha: 0,
          })
        } else {
          gsap.to(e.target, {
            clipPath: 'inset(0% 0% 0% 0%)',
            // webkitClipPath: 'inset(0% 0% 0% 0%)',
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
  },
}
</script>
<style lang="postcss" scoped>
img {
  clip-path: inset(0% 0% 100% 0%);
  @apply opacity-0;
}
</style>
