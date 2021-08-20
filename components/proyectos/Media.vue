<template>
  <div :id="`media_${media._uid}`" class="media" data-scroll-section>
    <div class="media_int">
      <Video
        v-if="media.component == 'video'"
        :media="media"
        data-scroll-trigger
      ></Video>
      <Carrusel
        v-if="media.component == 'carrusel'"
        :media="media"
        data-scroll-trigger
      ></Carrusel>
      <Sobrepuestas
        v-if="media.component == 'Imagenes sobrepuestas'"
        :media="media"
        data-scroll-trigger
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
  },
  mounted() {},
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
  height: 105vh;
  overflow: hidden;
  @media (max-width: 768px) {
    min-height: 20vh;
    height: auto;
  }

  .media_int {
    grid-area: media;
    align-self: center;
    @apply md:py-32 py-8;
  }
}
</style>
