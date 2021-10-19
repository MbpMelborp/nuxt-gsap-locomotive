<template>
  <div class="media_full">
    <img
      v-lazy-load
      class="block w-full"
      :data-src="media.imagen.filename"
      alt="Melborp"
      @load="loaded"
    />
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
  mounted() {
    if (window) {
      window.dispatchEvent(new Event('resize'))
    }
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
