<template>
  <intersect @enter="showProy">
    <div
      :id="`proyecto_${proyecto.slug}`"
      :key="Math.random() * 1000 + proyecto.slug"
      data-scroll
      :data-scroll-speed="!$isMobile() ? 0.1 : 0"
      data-scroll-repeat="true"
      data-scroll-position="top"
      :data-scroll-call="`proyecto_${proyecto.slug}`"
      :class="`proyecto_tipo ${proyecto.content.tipo_home}`"
    >
      <h2 class="proyecto_title">
        <intersect
          @enter="hoverMobileProyecto(true)"
          @leave="hoverMobileProyecto(false)"
        >
          <div class="proyecto_title_int">
            <div class="proyecto_title_int_cliente">
              {{ proyecto.content.cliente }},
            </div>
            <div class="proyecto_title_int_nom">
              <span
                v-for="(palabra, index) in proyecto.content.nombre.split(' ')"
                :key="index"
              >
                {{ palabra }}
              </span>
            </div>
          </div>
        </intersect>
      </h2>
      <div class="proyecto_arrow">
        <svg viewBox="0 0 45 45">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              class="chang"
              stroke-width="1.46"
              :stroke="proyecto.content.colores[0].texto.color"
            >
              <line x1="42.748" y1="42.748" x2="0" y2="0"></line>
              <polyline
                id="arr"
                points="42.3738 0.3742 0.3738 0.3742 0.3738 42.3742"
              ></polyline>
            </g>
          </g>
        </svg>
      </div>
      <div
        data-scroll
        :data-scroll-speed="!$isMobile() ? 0.2 : 0"
        data-scroll-repeat="true"
        data-scroll-position="center"
        class="proyecto_data"
      >
        <!-- <div class="proyecto_data_content" @click="hoverFinish()"> -->
        <div class="proyecto_data_int">
          <div class="proyecto_data_content">
            <nuxt-link v-cursor-right :to="proyecto.full_slug">
              <h4
                class="anim_proy"
                @mouseover="hoverProyecto($event, true)"
                @mouseleave="hoverProyecto($event, false)"
              >
                {{ proyecto.content.titular }}
              </h4>
              <div
                class="proyecto_body anim_proy"
                @mouseover="hoverProyecto($event, true)"
                @mouseleave="hoverProyecto($event, false)"
                v-html="intro"
              ></div>

              <div
                class="proyecto_ver anim_proy"
                @mouseover="hoverProyecto($event, true)"
                @mouseleave="hoverProyecto($event, false)"
              >
                Ver proyecto <i class="fal fa-long-arrow-right"></i>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div
        :id="`proyecto_${proyecto.slug}_media_1`"
        v-lazy-container="{ selector: 'img' }"
        data-played="0"
        class="proyecto_media proyecto_media_1"
      >
        <img
          :data-src="proyecto.content.home[0].media1.filename + '/m/'"
          :data-loading="
            proyecto.content.home[0].media1.filename + '/m/filters:quality(10)'
          "
          :data-error="
            proyecto.content.home[0].media1.filename + '/m/filters:quality(10)'
          "
          class="vlazy proyecto-img"
        />
      </div>
      <div
        :id="`proyecto_${proyecto.slug}_media_2`"
        v-lazy-container="{ selector: 'img' }"
        class="proyecto_media proyecto_media_2"
      >
        <img
          :data-src="proyecto.content.home[0].media2.filename + '/m/'"
          :data-loading="
            proyecto.content.home[0].media2.filename + '/m/filters:quality(10)'
          "
          :data-error="
            proyecto.content.home[0].media2.filename + '/m/filters:quality(10)'
          "
          class="vlazy proyecto-img"
        />
      </div>
      <div
        :id="`proyecto_${proyecto.slug}_media_3`"
        v-lazy-container="{ selector: 'img' }"
        class="proyecto_media proyecto_media_3"
      >
        <img
          :data-src="proyecto.content.home[0].media3.filename + '/m/'"
          :data-loading="
            proyecto.content.home[0].media3.filename + '/m/filters:quality(10)'
          "
          :data-error="
            proyecto.content.home[0].media3.filename + '/m/filters:quality(10)'
          "
          class="vlazy proyecto-img"
        />
      </div>

      <div class="bg"></div>
    </div>
  </intersect>
</template>

<script>
import proyectos from '~/mixins/proyectos.js'
export default {
  mixins: [proyectos],
  props: {
    proyecto: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="postcss" scoped>
.proyecto_tipo {
  @apply w-full max-w-10xl mx-auto;
}
.proyecto_data {
  @apply z-30;
  .proyecto_data_int {
    @apply opacity-0;
    .proyecto_data_content {
      @apply -mt-12;
      h4 {
        font-variation-settings: 'wght' var(--font-weight, 850),
          'wdth' var(--font-width, 140), 'ital' 0;
        @apply uppercase text-3xl  mb-4 leading-none;
        @media (max-width: 768px) {
          font-variation-settings: 'wght' var(--font-weight, 600),
            'wdth' var(--font-width, 120), 'ital' 0;
          @apply text-2xl leading-tight normal-case;
        }
      }
      .proyecto_body {
        @apply text-sm lg:ml-16 lg:mr-3 font-thin mb-8 leading-5;
        @media (max-width: 768px) {
          @apply text-lg;
        }
        p {
          @apply mb-2;
        }
      }
      .proyecto_ver {
        @apply lg:ml-2 text-lg font-light uppercase tracking-widest;
        @media (max-width: 768px) {
          @apply ml-0;
        }
        svg {
          width: 45px;
          height: 45px;
          @apply mt-2 ml-4;
        }
      }
    }
  }
}
.proyecto_media {
  /* clip-path: inset(0% 0% 100% 0%); */
  @apply z-0 opacity-0;
}
.proyecto_title {
  @apply z-10;

  .proyecto_title_int {
    .proyecto_title_int_cliente {
      font-size: calc(3vw + 3vh + 0.5vmin);
      font-variation-settings: 'wght' var(--font-weight, 200),
        'wdth' var(--font-width, 120), 'ital' 0;
      @apply leading-none;
    }
    .proyecto_title_int_nom {
      font-size: calc(4vw + 4vh + 0.5vmin);
      line-height: 0.8em;
      @media (max-width: 768px) {
        font-size: 2em;
      }
      span {
        /* font-variation-settings: 'wght' var(--font-weight, 400),
        'wdth' var(--font-width, 180), 'ital' 0; */

        font-variation-settings: 'wght' var(--font-weight, 400),
          'wdth' var(--font-width, 130), 'ital' 0;
        transition: font-variation-settings 0.5 ease-in-out;
        @media (max-width: 768px) {
          --font-weight: 650;
        }
      }
    }
  }
}
</style>
