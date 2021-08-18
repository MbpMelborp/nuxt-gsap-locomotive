<template>
  <div
    :id="`proyecto_${proyecto.slug}`"
    data-scroll
    data-scroll-speed="-1"
    data-scroll-repeat="true"
    data-scroll-position="top"
    :data-scroll-call="`proyecto_${proyecto.slug}`"
    :class="`proyecto_tipo ${proyecto.content.tipo_home}`"
  >
    <h2 class="proyecto_title">
      <div class="proyecto_title_int">
        <span
          v-for="(palabra, index) in proyecto.content.nombre.split(' ')"
          :key="index"
        >
          {{ palabra }}
        </span>
      </div>
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
      data-scroll-speed="0.2"
      data-scroll-repeat="true"
      data-scroll-position="center"
      class="proyecto_data"
    >
      <div
        class="proyecto_data_content"
        @mouseover="hoverProyecto(true)"
        @mouseleave="hoverProyecto(false)"
      >
        <nuxt-link :to="proyecto.full_slug" @click="hoverFinish()">
          <h4 class="anim_proy">
            {{ proyecto.content.titular }}
          </h4>
          <div class="proyecto_body anim_proy" v-html="intro"></div>
          <div class="proyecto_ver anim_proy">
            Ver proyecto <i class="fal fa-long-arrow-right"></i>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="proyecto_media proyecto_media_1">
      <img
        v-lazy-load
        data-scroll
        data-scroll-speed="1"
        data-scroll-repeat="true"
        data-scroll-position="top"
        class="proy_img"
        :data-src="proyecto.content.home[0].media1.filename"
        :alt="proyecto.content.nombre"
      />
    </div>
    <div class="proyecto_media proyecto_media_2">
      <img
        v-lazy-load
        data-scroll
        data-scroll-speed="-0.5"
        data-scroll-repeat="true"
        data-scroll-position="top"
        class="proy_img"
        :data-src="proyecto.content.home[0].media2.filename"
        :alt="proyecto.content.nombre"
      />
    </div>
    <div
      v-if="proyecto.content.tipo_home == 'tipo_2'"
      class="proyecto_media proyecto_media_3"
    >
      <img
        v-lazy-load
        data-scroll
        data-scroll-speed="0.5"
        data-scroll-repeat="true"
        data-scroll-position="top"
        class="proy_img"
        :data-src="proyecto.content.home[0].media3.filename"
        :alt="proyecto.content.nombre"
      />
    </div>
  </div>
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
.proyecto_data {
  @apply z-30;
  .proyecto_data_content {
    @apply -mt-12;
    h4 {
      font-variation-settings: 'wght' var(--font-weight, 850),
        'wdth' var(--font-width, 140), 'ital' 0;
      @apply uppercase text-3xl  mb-4 leading-none;
      @media (max-width: 768px) {
        @apply text-2xl;
      }
    }
    .proyecto_body {
      @apply text-sm lg:ml-16 lg:mr-3 font-thin mb-8 leading-5;
      @media (max-width: 768px) {
        @apply text-lg;
      }
    }
    .proyecto_ver {
      @apply lg:ml-2 text-lg font-light uppercase tracking-widest;
      @media (max-width: 768px) {
        @apply ml-8;
      }
      svg {
        width: 45px;
        height: 45px;
        @apply mt-2 ml-4;
      }
    }
  }
}
.proyecto_media {
  clip-path: inset(100% 0% 0% 0%);
  transform: scaleY(1.2);
  @apply z-0;
  @media (max-width: 768px) {
    clip-path: inset(0% 0% 0% 0%);
  }
}
.proyecto_title {
  @apply z-10;
  .proyecto_title_int {
    font-size: calc(5vw + 5vh + 0.5vmin);
    line-height: 0.8em;
    @media (max-width: 768px) {
      font-size: 2em;
    }
    span {
      font-variation-settings: 'wght' var(--font-weight, 400),
        'wdth' var(--font-width, 180), 'ital' 0;
      transition: font-variation-settings 0.5 ease-in-out;
      @media (max-width: 768px) {
        --font-weight: 650;
      }
    }
  }
}
</style>
