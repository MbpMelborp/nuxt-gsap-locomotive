<template>
  <div :class="`media_broken pgap-${media.gap}`">
    <template v-for="(item, i) in media.broken_item">
      <div
        :key="media._uid + '_' + i"
        v-lazy-container="{ selector: 'img' }"
        class="item"
        :data-scroll="!$isMobile() ? item.parallax != 0 : null"
        :data-scroll-speed="
          !$isMobile() ? (item.parallax === 0 ? 0 : item.parallax) : null
        "
        :class="item.classText"
      >
        <img
          v-if="item.imagen.filename"
          :data-src="item.imagen.filename"
          :data-loading="item.imagen.filename + '/m/filters:quality(10)'"
          :data-error="item.imagen.filename + '/m/filters:quality(10)'"
          class="vlazy"
          alt="Melborp"
        />
        <intersect @enter="clipToRight">
          <div
            v-if="item.descripcion != ''"
            :style="`font-variation-settings: 'wght' var(--font-weight, ${item.wght}), 'wdth' var(--font-width, ${item.wdth}), 'ital' 0;`"
            v-html="$storyapi.richTextResolver.render(item.descripcion)"
          ></div>
        </intersect>
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
  beforeMount() {
    this.media.broken_item.forEach((item) => {
      item.classes = []
      if (item.inicio !== '') {
        item.classes.push(`s-${item.inicio}`)
      }
      if (item.fin !== '') {
        item.classes.push(`e-${item.fin}`)
      }
      if (item.ancho !== '') {
        item.classes.push(`sp-${item.ancho}`)
      }
      if (item.z_index !== '') {
        item.classes.push(`p${item.z_index}`)
      }
      if (item.ubicacion !== '') {
        item.classes.push(`${item.ubicacion}`)
      }
      if (item.size !== '') {
        item.classes.push(`${item.size}`)
      }
      if (item.abajo !== '') {
        if (!this.$isMobile()) item.classes.push(`pm-${item.abajo}`)
      }
      if (item.arriba !== '') {
        if (!this.$isMobile()) item.classes.push(`pt-${item.arriba}`)
      }
      item.classText = item.classes.join(' ')
    })
    console.log(this.media.broken_item)
  },
  mounted() {
    console.log('BROKEN', this.media)
  },
}
</script>

<style lang="postcss" scoped>
.media_broken {
  @apply w-full grid grid-cols-1 md:grid-cols-12 md:grid-rows-1;

  &.pgap-1 {
    @apply md:gap-1 gap-0;
  }
  &.pgap-2 {
    @apply md:gap-2 gap-0;
  }
  &.pgap-3 {
    @apply md:gap-3 gap-0;
  }
  &.pgap-4 {
    @apply md:gap-4 gap-0;
  }
  &.pgap-5 {
    @apply md:gap-5 gap-0;
  }
  &.pgap-6 {
    @apply md:gap-6 gap-0;
  }
  &.pgap-7 {
    @apply md:gap-7 gap-0;
  }
  &.pgap-8 {
    @apply md:gap-8 gap-0;
  }
  &.pgap-9 {
    @apply md:gap-9 gap-0;
  }
  &.pgap-10 {
    @apply md:gap-10 gap-0;
  }
  &.pgap-11 {
    @apply md:gap-11 gap-0;
  }
  &.pgap-12 {
    @apply md:gap-12 gap-0;
  }
  .item {
    @apply row-auto md:row-span-full mb-8;
    &.pz-0 {
      @apply z-0;
    }
    &.pz-10 {
      @apply z-10;
    }
    &.pz-20 {
      @apply z-20;
    }
    &.pz-30 {
      @apply z-30;
    }
    &.pz-40 {
      @apply z-40;
    }
    &.pz-50 {
      @apply z-50;
    }

    &.s-1 {
      @apply md:col-start-1 col-start-1;
    }
    &.s-2 {
      @apply md:col-start-2 col-start-1;
    }
    &.s-3 {
      @apply md:col-start-3 col-start-1;
    }
    &.s-4 {
      @apply md:col-start-4 col-start-1;
    }
    &.s-5 {
      @apply md:col-start-5 col-start-1;
    }
    &.s-6 {
      @apply md:col-start-6 col-start-1;
    }
    &.s-7 {
      @apply md:col-start-7 col-start-1;
    }
    &.s-8 {
      @apply md:col-start-8 col-start-1;
    }
    &.s-9 {
      @apply md:col-start-9 col-start-1;
    }
    &.s-10 {
      @apply md:col-start-10 col-start-1;
    }
    &.s-11 {
      @apply md:col-start-11 col-start-1;
    }
    &.s-12 {
      @apply md:col-start-12 col-start-1;
    }

    &.e-1 {
      @apply md:col-end-1 col-end-2;
    }
    &.e-2 {
      @apply md:col-end-2 col-end-2;
    }
    &.e-3 {
      @apply md:col-end-3 col-end-2;
    }
    &.e-4 {
      @apply md:col-end-4 col-end-2;
    }
    &.e-5 {
      @apply md:col-end-5 col-end-2;
    }
    &.e-6 {
      @apply md:col-end-6 col-end-2;
    }
    &.e-7 {
      @apply md:col-end-7 col-end-2;
    }
    &.e-8 {
      @apply md:col-end-8 col-end-2;
    }
    &.e-9 {
      @apply md:col-end-9 col-end-2;
    }
    &.e-10 {
      @apply md:col-end-10 col-end-2;
    }
    &.e-11 {
      @apply md:col-end-11 col-end-2;
    }
    &.e-12 {
      @apply md:col-end-12 col-end-2;
    }
    &.e-13 {
      @apply md:col-end-13 col-end-2;
    }

    &.sp-1 {
      @apply col-span-1;
    }
    &.sp-2 {
      @apply col-span-2;
    }
    &.sp-3 {
      @apply col-span-3;
    }
    &.sp-4 {
      @apply col-span-4;
    }
    &.sp-5 {
      @apply col-span-5;
    }
    &.sp-6 {
      @apply col-span-6;
    }
    &.sp-7 {
      @apply col-span-7;
    }
    &.sp-8 {
      @apply col-span-8;
    }
    &.sp-9 {
      @apply col-span-9;
    }
    &.sp-10 {
      @apply col-span-10;
    }
    &.sp-11 {
      @apply col-span-11;
    }
    &.sp-12 {
      @apply col-span-12;
    }
    &.pm-0 {
      @apply md:mb-0;
    }
    &.pm-2 {
      @apply md:mb-6;
    }
    &.pm-4 {
      @apply md:mb-8;
    }
    &.pm-6 {
      @apply md:mb-10;
    }
    &.pm-8 {
      @apply md:mb-12;
    }
    &.pm-10 {
      @apply md:mb-14;
    }
    &.pm-12 {
      @apply md:mb-16;
    }
    &.pm-14 {
      @apply md:mb-20;
    }
    &.pm-16 {
      @apply md:mb-24;
    }
    &.pm-18 {
      @apply md:mb-28;
    }
    &.pm-20 {
      @apply md:mb-32;
    }

    &.pt-0 {
      @apply md:mt-0;
    }
    &.pt-2 {
      @apply md:mt-6;
    }
    &.pt-4 {
      @apply md:mt-8;
    }
    &.pt-6 {
      @apply md:mt-10;
    }
    &.pt-8 {
      @apply md:mt-12;
    }
    &.pt-10 {
      @apply md:mt-14;
    }
    &.pt-12 {
      @apply md:mt-16;
    }
    &.pt-14 {
      @apply md:mt-20;
    }
    &.pt-16 {
      @apply md:mt-24;
    }
    &.pt-18 {
      @apply md:mt-28;
    }
    &.pt-20 {
      @apply md:mt-32;
    }
  }
}
</style>
