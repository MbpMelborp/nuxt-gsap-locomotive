<template>
  <div
    :id="`media_${media._uid}`"
    class="media"
    data-scroll-section
    data-scroll-trigger
  >
    <div class="media_int">
      <Video v-if="media.component == 'video'" :media="media"></Video>
      <Carrusel v-if="media.component == 'carrusel'" :media="media"></Carrusel>
      <Sobrepuestas
        v-if="media.component == 'Imagenes sobrepuestas'"
        :media="media"
      ></Sobrepuestas>
    </div>
  </div>
</template>

<script>
import Video from '~/components/proyectos/Media_video.vue'
import Carrusel from '~/components/proyectos/Media_carrusel.vue'
import Sobrepuestas from '~/components/proyectos/Media_sobrepuestas.vue'
export default {
  components: {
    Video,
    Carrusel,
    Sobrepuestas,
  },
  props: {
    media: {
      type: Object,
      default: null,
    },
    locomotive: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    // gsap.from('.media_video', {
    //   scrollTrigger: {
    //     trigger: '.media_video',
    //     scroller: this.locomotive.el,
    //     scrub: true,
    //     start: 'top bottom',
    //     end: 'bottom center',
    //   },
    //   clipPath: 'inset(100% 0% 0% 0%)',
    //   ease: 'none',
    // })
  },
}
</script>

<style lang="postcss" scoped>
.media {
  display: grid;
  grid-template-columns: [l1] 5vw [m1] auto [m2] 5vw [r1];
  grid-template-rows: [t1] 1em auto 1em [b1];
  grid-gap: 0;
  grid-template-areas:
    '. . .'
    '. media .'
    '. . .';
  width: 100%;
  min-height: 120vh;
  user-select: none;
  overflow: hidden;
  @media (max-width: 768px) {
    min-height: 20vh;
  }

  .media_int {
    grid-area: media;
    align-self: center;
    @apply md:py-32 py-8;
  }
}
</style>
