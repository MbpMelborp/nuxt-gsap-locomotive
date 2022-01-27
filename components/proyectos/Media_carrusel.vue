<template>
  <div class="media_carrusel">
    <vue-flux
      ref="slider"
      :options="vfOptions"
      :images="vfImages"
      :transitions="vfTransitions"
    >
      <template #controls>
        <flux-controls />
      </template>

      <template #pagination>
        <flux-pagination />
      </template>
    </vue-flux>
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
    return {
      vfOptions: {
        autoplay: true,
      },
      vfImages: this.media.imagenes.map((x) => {
        return x.filename
      }),
      vfTransitions: [
        {
          name: 'swipe',
          options: {
            totalDuration: 800,
            easing: 'ease-in-out',
          },
        },
      ],
    }
  },
  mounted() {
    if (window) {
      window.dispatchEvent(new Event('resize'))
    }
  },
}
</script>
<style lang="postcss">
.media_carrusel {
  @apply w-full;
}

.flux-pagination {
  li {
    display: block;
    margin: 0 1% 1.5% 1%;
    cursor: pointer;
    width: 1% !important;
    height: 0;
    min-width: 5px !important;
    min-height: 5px !important;
    padding-bottom: 1% !important;
    position: relative;
    box-sizing: border-box;
    .pagination-item {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      box-sizing: border-box;
      border: 1px solid #fff;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.7);
      transition: background-color 0.2s ease-in, border 0.2s ease-in;
      &.active {
        border-color: #fff;
        background-color: #fff;
      }
    }
  }
}
</style>
