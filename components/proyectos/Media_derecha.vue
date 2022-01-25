<template>
  <div class="media_derecha" :class="`p${media.ubicacion}`">
    <template v-if="media.ubicacion == 'right'">
      <div
        v-lazy-container="{ selector: 'img' }"
        :class="`p${media.ancho}`"
        class="flex-shrink-0"
      >
        <img
          data-scroll
          data-scroll-speed="1"
          :data-src="media.imagen.filename"
          :data-loading="media.imagen.filename + '/m/filters:quality(10)'"
          :data-error="media.imagen.filename + '/m/filters:quality(10)'"
          class="w-full vlazy"
          alt="Melborp"
        />
      </div>
      <intersect @enter="clipToRight">
        <div
          v-if="media.descripcion"
          class="descripcion"
          v-html="descripcion"
        ></div>
      </intersect>
    </template>
    <template v-else>
      <intersect @enter="clipToRight">
        <div
          v-if="media.descripcion"
          class="descripcion"
          v-html="descripcion"
        ></div>
      </intersect>
      <div
        v-lazy-container="{ selector: 'img' }"
        :class="`p${media.ancho}`"
        class="flex-shrink-0"
      >
        <img
          data-scroll
          data-scroll-speed="1"
          :data-src="media.imagen.filename"
          :data-loading="media.imagen.filename + '/m/filters:quality(10)'"
          :data-error="media.imagen.filename + '/m/filters:quality(10)'"
          class="w-full vlazy"
          alt="Melborp"
        />
      </div>
    </template>
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
  computed: {
    descripcion() {
      return this.media.descripcion
        ? this.$storyapi.richTextResolver.render(this.media.descripcion)
        : ''
    },
  },
}
</script>
<style lang="postcss" scoped>
.media_derecha {
  @apply w-full flex flex-col md:flex-row-reverse items-center;
  &.pleft {
    .descripcion {
      @apply flex-shrink md:ml-24;
    }
  }
  &.pright {
    .descripcion {
      @apply flex-shrink md:mr-24;
    }
  }
  .p80 {
    @apply md:w-4/5;
  }
  .p60 {
    @apply md:w-3/5;
  }
  .p50 {
    @apply md:w-2/4;
  }
  .p40 {
    @apply md:w-2/5;
  }
  .p20 {
    @apply md:w-1/5;
  }
}
</style>
