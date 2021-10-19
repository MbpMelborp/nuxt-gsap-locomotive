<template>
  <div :id="`media_${media._uid}`" class="media" data-scroll-section>
    <div class="media_int">
      <Video
        v-if="media.component == 'video'"
        :media="media"
        data-scroll-trigger
      ></Video>
      <ImagenDerecha
        v-if="media.component == 'Imagen derecha'"
        :media="media"
        data-scroll-trigger
      ></ImagenDerecha>
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
      <Full
        v-if="media.component == 'Imagen centro full w'"
        :media="media"
        data-scroll-trigger
      ></Full>
      <div
        v-if="editor && media.component == 'broken'"
        class="flex justify-between"
      >
        <div class="border-l border-grey-200 text-xs px-2">1</div>
        <div class="border-l border-grey-200 text-xs px-2">2</div>
        <div class="border-l border-grey-200 text-xs px-2">3</div>
        <div class="border-l border-grey-200 text-xs px-2">4</div>
        <div class="border-l border-grey-200 text-xs px-2">5</div>
        <div class="border-l border-grey-200 text-xs px-2">6</div>
        <div class="border-r border-grey-200 text-xs px-2">7</div>
        <div class="border-r border-grey-200 text-xs px-2">8</div>
        <div class="border-r border-grey-200 text-xs px-2">9</div>
        <div class="border-r border-grey-200 text-xs px-2">10</div>
        <div class="border-r border-grey-200 text-xs px-2">11</div>
        <div class="border-r border-grey-200 text-xs px-2">12</div>
        <div class="border-r border-grey-200 text-xs px-2">13</div>
      </div>
      <Broken
        v-if="media.component == 'broken'"
        :media="media"
        data-scroll-trigger
      ></Broken>
    </div>
  </div>
</template>

<script>
import Video from '~/components/proyectos/Media_video.vue'
import Carrusel from '~/components/proyectos/Media_carrusel.vue'
import Sobrepuestas from '~/components/proyectos/Media_sobrepuestas.vue'
import ImagenDerecha from '~/components/proyectos/Media_derecha.vue'
import Full from '~/components/proyectos/Media_full.vue'
import Broken from '~/components/proyectos/Media_broken.vue'
export default {
  components: {
    Video,
    Carrusel,
    Sobrepuestas,
    Full,
    ImagenDerecha,
    Broken,
  },

  props: {
    media: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      editor: window.location.search.includes('_storyblok'),
    }
  },
  mounted() {
    if (window) {
      console.log('resize')
      window.dispatchEvent(new Event('resize'))
    }
  },
}
</script>

<style lang="postcss" scoped>
.media {
  display: grid;
  grid-template-columns: [l1] 5% [m1] auto [m2] 5% [r1];
  grid-template-rows: [t1] 1em auto 1em [b1];
  grid-gap: 0;
  grid-template-areas:
    '. . .'
    '. media .'
    '. . .';
  width: 100%;
  overflow: hidden;
  font-variation-settings: 'wght' var(--font-weight, 150),
    'wdth' var(--font-width, 80), 'ital' 0;
  @apply w-full max-w-9xl mx-auto leading-tight;
  @media (max-width: 768px) {
    min-height: 20vh;
    height: auto;
  }
  .media_int {
    grid-area: media;
    align-self: center;
    @apply md:py-16 py-8;
  }
}
</style>
