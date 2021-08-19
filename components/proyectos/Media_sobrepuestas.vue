<template>
  <div class="media_sobrepuestas">
    <div
      v-for="(imagen, index) in media.imagen"
      :key="index"
      :class="`img-wrapper ${
        index === 0
          ? `md:flex-shrink-0  ${media.ancho}`
          : 'md:flex-grow md:w-auto'
      }`"
    >
      <img
        data-scroll
        :data-scroll-speed="`${index === 0 ? -1 : 0.3}`"
        class="block w-full"
        :src="imagen.filename"
        alt="Melborp"
      />
    </div>
  </div>
</template>

<script>
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
}
</script>
<style lang="postcss" scoped>
.media_sobrepuestas {
  @apply w-full flex md:flex-row flex-col items-center;
  .img-wrapper {
    @apply md:px-8 px-0 mb-8;
  }
}
</style>
