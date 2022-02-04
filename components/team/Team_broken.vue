<template>
  <div class="media_broken">
    <template v-for="(item, i) in media.team">
      <div
        :id="'team-' + item._uid"
        :key="media._uid + '_' + i"
        class="item"
        :data-scroll="!$isMobile() ? item.parallax != 0 : null"
        :data-scroll-speed="
          !$isMobile() ? (item.parallax === 0 ? 0 : item.parallax * 0.6) : 0
        "
        :class="item.classText"
        @mouseover="hoverTeam('team-' + item._uid, i, true)"
        @mouseleave="hoverTeam('team-' + item._uid, i, false)"
      >
        <div class="item_int">
          <!-- <div
            v-if="item.hv != ''"
            class="hv anim"
            v-html="$storyapi.richTextResolver.render(item.hv)"
          ></div> -->
          <div class="info anim">
            <svg class="arrow-team" viewBox="0 0 45 45">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(1.000000, 1.000000)"
                  stroke="#000"
                  stroke-width="1.46"
                >
                  <g id="arrw">
                    <line
                      x1="42.748"
                      y1="42.748"
                      x2="0"
                      y2="0"
                      transform="translate(21.374000, 21.374000) scale(-1, 1) translate(-21.374000, -21.374000) "
                    ></line>
                    <polyline
                      transform="translate(21.373800, 21.374200) scale(-1, 1) translate(-21.373800, -21.374200) "
                      points="42.3738 0.3742 0.3738 0.3742 0.3738 42.3742"
                    ></polyline>
                  </g>
                </g>
              </g>
            </svg>
            <h3>{{ item.nombre }}</h3>
            <h4>{{ item.cargo }}</h4>
          </div>
          <intersect @enter="clipToRight">
            <div v-lazy-container="{ selector: 'img' }" class="foto">
              <img
                :data-src="item.foto.filename + '/m/'"
                :data-loading="item.foto.filename + '/m/filters:quality(10)'"
                :data-error="item.foto.filename + '/m/filters:quality(10)'"
                :alt="item.nombre"
                class="vlazy"
              />

              <!-- <img
                v-if="item.foto.filename != ''"
                v-lazy-load
                :data-src="
                  item.foto.filename +
                  (item.alto == 'half'
                    ? '/m/996x600/filters:focal(0x150:150x600)'
                    : '')
                "
                alt="Melborp"
                @load="loaded"
              /> -->
            </div>
          </intersect>
          <!-- <intersect @enter="clipToRight">
          <div
            v-if="item.descripcion != ''"
            :style="`font-variation-settings: 'wght' var(--font-weight, ${item.wght}), 'wdth' var(--font-width, ${item.wdth}), 'ital' 0;`"
            v-html="$storyapi.richTextResolver.render(item.descripcion)"
          ></div>
        </intersect> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import { gsap, Power2, Sine } from 'gsap'
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
      tl_hover: [],
    }
  },
  beforeMount() {
    this.media.team.forEach((item) => {
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
        item.classes.push(`pm-${item.abajo}`)
      }
      if (item.arriba !== '') {
        item.classes.push(`pti-${item.arriba}`)
      }
      if (item.alto !== '') {
        item.classes.push(`${item.alto}`)
      }
      if (item.fuente !== '') {
        item.classes.push(`${item.fuente}`)
      }
      if (item.ubicacion_texto !== '') {
        item.classes.push(`x-${item.ubicacion_texto}`)
      }
      if (item.ubicacion_texto2 !== '') {
        item.classes.push(`y-${item.ubicacion_texto2}`)
      }
      item.classText = item.classes.join(' ')
    })
  },
  mounted() {
    this.initTimelines()
  },
  methods: {
    initTimelines() {
      console.log('🗂️ TEAM -> initTimelines', this.media)

      // this.media.team.forEach((item, i) => {
      //   this.tl_hover[i] = gsap.timeline({
      //     paused: true,
      //     ease: Power2.easeInOut,
      //     onStart: () => {},
      //     onComplete: () => {},
      //   })
      //   const id = '#team-' + item._uid
      //   // gsap.set(id + ' .anim, ' + id + ' .info ', {
      //   //   opacity: 0,
      //   // })
      //   this.tl_hover[i].fromTo(
      //     id + ' .anim',
      //     {
      //       opacity: 0,
      //       y: 0,
      //       x: 10,
      //       scale: 1,
      //     },
      //     {
      //       opacity: 1,
      //       x: 0,
      //       y: 0,
      //       scale: 1,
      //       duration: 0.7,
      //       ease: Sine.easeInOut,
      //       stagger: {
      //         each: 0.1,
      //         from: 'center',
      //       },
      //     },
      //     '+=0'
      //   )
      //   this.tl_hover[i].fromTo(
      //     id + ' .foto img',
      //     {
      //       scale: 1,
      //       opacity: 1,
      //     },
      //     {
      //       opacity: 1,
      //       scale: 1.1,
      //       duration: 0.3,
      //       ease: Sine.easeInOut,
      //     },
      //     '-=0.6'
      //   )
      // })
    },
    hoverTeam(id, i, bool) {
      // if (bool) {
      //   this.tl_hover[i].play()
      // } else {
      //   this.tl_hover[i].reverse()
      // }
    },
  },
}
</script>

<style lang="postcss" scoped>
.media_broken {
  @apply w-full grid lg:gap-4 grid-cols-1 lg:grid-cols-12 lg:grid-rows-1 my-0 lg:my-16 px-4;

  &.pgap-1 {
    @apply gap-1;
  }
  &.pgap-2 {
    @apply gap-2;
  }
  &.pgap-3 {
    @apply gap-3;
  }
  &.pgap-4 {
    @apply gap-4;
  }
  &.pgap-5 {
    @apply gap-5;
  }
  &.pgap-6 {
    @apply gap-6;
  }
  &.pgap-7 {
    @apply gap-7;
  }
  &.pgap-8 {
    @apply gap-8;
  }
  &.pgap-9 {
    @apply gap-9;
  }
  &.pgap-10 {
    @apply gap-10;
  }
  &.pgap-11 {
    @apply gap-11;
  }
  &.pgap-12 {
    @apply gap-12;
  }
  .item {
    @apply lg:row-span-full lg:mb-4;
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
      @apply lg:col-start-1;
    }
    &.s-2 {
      @apply lg:col-start-2;
    }
    &.s-3 {
      @apply lg:col-start-3;
    }
    &.s-4 {
      @apply lg:col-start-4;
    }
    &.s-5 {
      @apply lg:col-start-5;
    }
    &.s-6 {
      @apply lg:col-start-6;
    }
    &.s-7 {
      @apply lg:col-start-7;
    }
    &.s-8 {
      @apply lg:col-start-8;
    }
    &.s-9 {
      @apply lg:col-start-9;
    }
    &.s-10 {
      @apply lg:col-start-10;
    }
    &.s-11 {
      @apply lg:col-start-11;
    }
    &.s-12 {
      @apply lg:col-start-12;
    }

    &.e-1 {
      @apply lg:col-end-1;
    }
    &.e-2 {
      @apply lg:col-end-2;
    }
    &.e-3 {
      @apply lg:col-end-3;
    }
    &.e-4 {
      @apply lg:col-end-4;
    }
    &.e-5 {
      @apply lg:col-end-5;
    }
    &.e-6 {
      @apply lg:col-end-6;
    }
    &.e-7 {
      @apply lg:col-end-7;
    }
    &.e-8 {
      @apply lg:col-end-8;
    }
    &.e-9 {
      @apply lg:col-end-9;
    }
    &.e-10 {
      @apply lg:col-end-10;
    }
    &.e-11 {
      @apply lg:col-end-11;
    }
    &.e-12 {
      @apply lg:col-end-12;
    }
    &.e-13 {
      @apply lg:col-end-13;
    }

    &.sp-1 {
      @apply lg:col-span-1;
    }
    &.sp-2 {
      @apply lg:col-span-2;
    }
    &.sp-3 {
      @apply lg:col-span-3;
    }
    &.sp-4 {
      @apply lg:col-span-4;
    }
    &.sp-5 {
      @apply lg:col-span-5;
    }
    &.sp-6 {
      @apply lg:col-span-6;
    }
    &.sp-7 {
      @apply lg:col-span-7;
    }
    &.sp-8 {
      @apply lg:col-span-8;
    }
    &.sp-9 {
      @apply lg:col-span-9;
    }
    &.sp-10 {
      @apply lg:col-span-10;
    }
    &.sp-11 {
      @apply lg:col-span-11;
    }
    &.sp-12 {
      @apply lg:col-span-12;
    }
    &.pm-0 {
      @apply lg:mb-0;
    }
    &.pm-2 {
      @apply lg:mb-6;
    }
    &.pm-4 {
      @apply lg:mb-8;
    }
    &.pm-6 {
      @apply lg:mb-10;
    }
    &.pm-8 {
      @apply lg:mb-12;
    }
    &.pm-10 {
      @apply lg:mb-14;
    }
    &.pm-12 {
      @apply lg:mb-16;
    }
    &.pm-14 {
      @apply lg:mb-20;
    }
    &.pm-16 {
      @apply lg:mb-24;
    }
    &.pm-18 {
      @apply lg:mb-28;
    }
    &.pm-20 {
      @apply lg:mb-32;
    }

    &.pti-0 {
      @apply lg:mt-0;
    }
    &.pti-2 {
      @apply lg:mt-6;
    }
    &.pti-4 {
      @apply lg:mt-8;
    }
    &.pti-6 {
      @apply lg:mt-10;
    }
    &.pti-8 {
      @apply lg:mt-12;
    }
    &.pti-10 {
      @apply lg:mt-14;
    }
    &.pti-12 {
      @apply lg:mt-16;
    }
    &.pti-14 {
      @apply lg:mt-20;
    }
    &.pti-16 {
      @apply lg:mt-24;
    }
    &.pti-18 {
      @apply lg:mt-28;
    }
    &.pti-20 {
      @apply lg:mt-32;
    }
    .item_int {
      @apply grid grid-cols-6 grid-rows-6 gap-2 mb-12 lg:mb-0;
      .hv {
        font-variation-settings: 'wght' var(--font-weight, 100),
          'wdth' var(--font-width, 130), 'ital' 0;
        @apply hidden text-sm col-start-1 col-end-5 row-start-1 row-end-6 z-30 p-8 leading-tight;
      }
      .foto {
        @apply col-start-1 col-end-7 row-start-1 row-end-7 z-10 overflow-hidden;
      }
      .info {
        @apply z-20;
        .arrow-team {
          @apply w-6 h-6 mb-2 mx-auto;
        }
        h3 {
          line-height: 1em !important;
          font-variation-settings: 'wght' var(--font-weight, 400),
            'wdth' var(--font-width, 130), 'ital' 0;
          @apply uppercase mb-2;
        }
        h4 {
          line-height: 1em !important;
          font-variation-settings: 'wght' var(--font-weight, 200),
            'wdth' var(--font-width, 130), 'ital' 0;
        }
      }
    }
    &.x-left {
      .info {
        @apply col-start-1 col-end-4 ml-4 lg:ml-0;
      }
    }
    &.x-right {
      .info {
        @apply col-start-4 col-end-7 text-right mr-4 lg:mr-0;
        .arrow-team {
          @apply ml-auto;
        }
      }
    }
    &.y-up {
      .info {
        @apply row-start-1 row-end-3 self-start pt-4;
      }
    }
    &.y-down {
      .info {
        @apply row-start-4 row-end-7 self-end pb-4;
      }
    }

    &.grande {
      .info {
        h3 {
          @apply lg:text-xl mb-2;
        }
        h4 {
          @apply lg:text-lg;
        }
      }
    }
    &.pequeno {
      .info {
        h3 {
          @apply lg:text-lg;
        }
        h4 {
          @apply lg:text-sm;
        }
      }
    }

    &.x-left.grande {
      .info {
        @apply lg:-translate-x-10;
        h4 {
          @apply lg:ml-4;
        }
      }
    }
    &.x-right.grande {
      .info {
        @apply lg:translate-x-10;
        h4 {
          @apply lg:mr-4;
        }
      }
    }
    &.x-left.pequeno {
      .info {
        @apply pl-4;
      }
    }
    &.x-right.pequeno {
      .info {
        @apply pr-4;
      }
    }
    &.y-up.grande {
      .info {
        @apply lg:pt-10;
      }
    }
    &.y-down.grande {
      .info {
        @apply lg:pb-10;
      }
    }
    &.y-up.pequeno {
      .info {
        @apply lg:pt-4;
      }
    }
    &.y-down.pequeno {
      .info {
        @apply lg:pb-4;
      }
    }

    &.full {
      /* .item_int {
        .foto {
          img {
            @apply block object-cover h-full w-full;
          }
        }
        .info {
          @apply col-start-3 col-end-7 row-start-5 row-end-7 z-20;
        }
      } */
    }
    &.half {
      /* .item_int {
        @apply h-3/5;
        .foto {
          img {
            @apply block object-cover h-full w-full;
          }
        }
        .info {
          @apply col-start-5 col-end-7 row-start-5 row-end-7 z-20;
        }
      } */
    }
  }
}
</style>
