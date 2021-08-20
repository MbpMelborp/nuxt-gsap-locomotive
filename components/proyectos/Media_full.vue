<template>
  <div class="media_full">
    <img class="block w-full" :src="media.imagen.filename" alt="Melborp" />
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
.media_full {
  @apply w-full flex md:flex-row flex-col items-center;
  .img-wrapper {
    @apply md:px-8 px-0 mb-8;
  }
}
</style>
