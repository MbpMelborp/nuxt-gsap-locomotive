<template>
  <div v-lazy-container="{ selector: 'img' }" class="media_full">
    <img
      :data-src="media.imagen.filename"
      :data-loading="media.imagen.filename + '/m/filters:quality(10)'"
      :data-error="media.imagen.filename + '/m/filters:quality(10)'"
      alt="Melborp"
      class="vlazy media-full"
    />
  </div>
</template>

<script>
import { gsap, Power2 } from 'gsap'
export default {
  props: {
    media: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {}
  },
  mounted() {
    if (window) {
      window.dispatchEvent(new Event('resize'))
    }
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
          if (el.classList.contains('media-full')) {
            gsap.to(el, {
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
      }
    )
  },
  methods: {
    loaded() {
      if (window) {
        window.dispatchEvent(new Event('resize'))
      }
    },
  },
}
</script>
<style lang="postcss" scoped>
.media_full {
  @apply w-full flex md:flex-row flex-col items-center;
  .img-wrapper {
    @apply md:px-8 px-0 mb-8;
  }
}
</style>
