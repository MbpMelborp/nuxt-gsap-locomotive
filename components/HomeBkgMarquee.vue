<template>
  <div class="marquee">
    <div class="text_home">
      <div class="text_home_int">
        <span class="anim">Somos</span>
        <h2 class="anim">Bussines Updaters</h2>
        <span class="anim">
          y nuestro objetivo es usar la creatividad para transformar negocios
          que puedan cambiar el mundo </span
        >.
      </div>
    </div>
    <div class="marquee_top"></div>
    <div class="marquee_int">
      <vue-marquee
        :show-progress="false"
        :duration="story.content.proyectos.length * 8000"
      >
        <vue-marquee-slide v-for="(proyecto, index) in proyectos" :key="index">
          <img
            v-lazy-load
            class="gallery"
            :data-src="proyecto.content.home[0].media1.filename"
            :src="
              proyecto.content.home[0].media1.filename +
              '/m/filters:quality(10)'
            "
            alt="Melborp"
            @load="loaded"
          />
        </vue-marquee-slide>
      </vue-marquee>
    </div>
    <div class="marquee_int2">
      <vue-marquee
        :show-progress="false"
        direction="right"
        :duration="story.content.proyectos.length * 8000"
      >
        <vue-marquee-slide
          v-for="(proyecto, index2) in proyectos2"
          :key="index2"
        >
          <img
            v-lazy-load
            class="gallery"
            :data-src="proyecto.content.home[0].media1.filename"
            :src="
              proyecto.content.home[0].media1.filename +
              '/m/filters:quality(10)'
            "
            alt="Melborp"
            @load="loaded"
          />
        </vue-marquee-slide>
      </vue-marquee>
    </div>
  </div>
</template>

<script>
import { gsap, Power2 } from 'gsap'

const chunk = function (arr) {
  const half = Math.floor(arr.length / 2)
  return arr.slice(0, half)
}
const chunk2 = function (arr) {
  const half = Math.floor(arr.length / 2)
  return arr.slice(half, arr.length)
}

export default {
  props: {
    story: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      proyectos: chunk(this.story.content.proyectos),
      proyectos2: chunk2(this.story.content.proyectos),
      transY1: [-4, 8],
      transY2: [-8, 4],
      scale: [0.6, 1.1],
    }
  },
  mounted() {
    console.log('SCALESP', this.proyectos, this.proyectos2)
    gsap.set('.marquee_int img', {
      y: () => {
        const sc = (
          Math.random() * (this.transY1[1] - this.transY1[0]) +
          this.transY1[0]
        ).toFixed(4)
        return sc
      },
      scale: () => {
        const sc = (
          Math.random() * (this.scale[1] - this.scale[0]) +
          this.scale[0]
        ).toFixed(4)
        return sc
      },
    })
    gsap.set('.marquee_int2 img', {
      y: () => {
        const sc = (
          Math.random() * (this.transY2[1] - this.transY2[0]) +
          this.transY2[0]
        ).toFixed(4)
        return sc
      },
      scale: () => {
        const sc = (
          Math.random() * (this.scale[1] - this.scale[0]) +
          this.scale[0]
        ).toFixed(4)
        return sc
      },
    })
    gsap.set('.text_home_int .anim', {
      clipPath: 'inset(0% 0% 100% 0%)',
      y: '5vh',
    })

    gsap.set('.marquee_int2, .marquee_int', {
      y: '-5vh',
      autoAlpha: 0,
    })
    gsap.to('.text_home_int .anim', {
      clipPath: 'inset(0% 0% 0% 0%)',
      delay: 3,
      duration: 0.8,
      stagger: 0.2,
      y: 0,
      ease: Power2.easeInOut,
    })
    gsap.to('.marquee_int2, .marquee_int', {
      duration: 0.4,
      stagger: 0.2,
      y: 0,
      autoAlpha: 1,
      delay: 2,
      ease: Power2.easeInOut,
    })
    // this.$store.subscribe((mutation, state) => {
    //   if (
    //     mutation.type === 'app/setPreload' ||
    //     mutation.type === 'app/setSection'
    //   ) {

    //   }
    // })
  },
  methods: {
    loaded(e) {
      if (window) {
        if (
          !e.target.classList.contains('isLoaded') &&
          !e.target.classList.contains('isLoading')
        ) {
          gsap.set(e.target, {
            autoAlpha: 0,
          })
        } else {
          gsap.to(e.target, {
            autoAlpha: 1,
            duration: 0.5,
            ease: Power2.easeInOut,
            onComplete: () => {
              window.dispatchEvent(new Event('resize'))
            },
          })
        }
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.marquee {
  display: grid;
  grid-gap: 0;
  grid-template-columns: [l1] auto [r1];
  grid-template-rows: [t1] auto 45vh 2vh 45vh auto [b1];
  grid-template-areas:
    '.'
    'marquee'
    '.'
    'marquee2'
    '.';
  @apply h-screen w-screen select-none overflow-hidden;
  .text_home {
    grid-column-start: l1;
    grid-column-end: r1;
    grid-row-start: t1;
    grid-row-end: b1;
    background-color: rgba(0, 0, 0, 0.5);
    @apply z-30 flex items-center justify-center;
    .text_home_int {
      @apply text-white text-center w-full md:max-w-9xl mx-auto;
      h2 {
        font-variation-settings: 'wght' var(--font-weight, 500),
          'wdth' var(--font-width, 180), 'ital' 0;
        @apply text-5xl md:text-9xl leading-none my-1;
      }
      span {
        font-variation-settings: 'wght' var(--font-weight, 150),
          'wdth' var(--font-width, 80), 'ital' 0;
        @apply block text-xl md:text-4xl w-full max-w-sm md:max-w-4xl mx-auto;
      }
    }
  }
  .marquee_top {
    grid-column-start: l1;
    grid-column-end: r1;
    grid-row-start: t1;
    grid-row-end: b1;
    background-color: rgba(0, 0, 0, 0.5);
    @apply z-20;
  }
  .marquee_int {
    grid-area: marquee;
    @apply z-10;
    .marquee-slide {
      @apply px-6;
    }
  }
  .marquee_int2 {
    grid-area: marquee2;
    @apply z-10;
    .marquee-slide {
      @apply px-6;
    }
  }
  img {
    width: calc(42vh * 0.9);
    height: 42vh;
    filter: blur(4px);
    @apply object-cover mx-8 block;
  }
}
</style>
