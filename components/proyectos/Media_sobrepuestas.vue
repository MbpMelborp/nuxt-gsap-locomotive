<template>
  <div :class="`media_sobrepuestas p-${media.alinear}`">
    <div
      v-for="(imagen, index) in media.imagen"
      :key="index"
      data-scroll
      :data-scroll-speed="`${index === 0 ? -1 : 0.3}`"
      :class="`img-wrapper ${
        index === 0 ? `md:${media.ancho}` : 'md:flex-shrink'
      }`"
    >
      <img
        v-lazy-load
        :data-src="imagen.filename"
        alt="Melborp"
        @load="loaded"
      />
    </div>
  </div>
</template>

<script>
import loaderm from '~/mixins/loader.js'
export default {
  mixins: [loaderm],
  props: {
    media: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="postcss" scoped>
.media_sobrepuestas {
  @apply w-full flex md:flex-row flex-col;
  &.p-items-center {
    @apply items-center;
  }
  &.p-items-baseline {
    @apply items-baseline;
  }
  &.p-items-start {
    @apply items-start;
  }
  .img-wrapper {
    @apply md:px-8 px-0 mb-8;
    img {
      @apply my-8 block w-full;
    }
  }
}
</style>
