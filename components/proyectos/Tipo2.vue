<template>
  <div
    :id="`proyecto_${proyecto.id}`"
    data-scroll
    data-scroll-speed="-1"
    data-scroll-repeat="true"
    data-scroll-position="top"
    :data-scroll-call="`proyecto_${proyecto.id}`"
    :class="`proyecto_tipo ${proyecto.content.tipo_home}`"
  >
    <div class="proyecto_data">
      <div class="proyecto_data_content">
        <nuxt-link :to="proyecto.full_slug">
          <h4>
            {{ proyecto.content.titular }}
          </h4>
          <div class="proyecto_body" v-html="intro"></div>
          <h5>{{ proyecto.content.nombre }}</h5>
        </nuxt-link>
      </div>
    </div>

    <div class="proyecto_media proyecto_media_1">
      <img
        v-lazy-load
        data-scroll
        data-scroll-speed="-1"
        data-scroll-repeat="true"
        data-scroll-position="top"
        class="proy_img"
        :data-src="proyecto.content.home[0].media1.filename"
        alt="No width hegiht image"
      />
    </div>
    <div class="proyecto_media proyecto_media_2">
      <img
        v-lazy-load
        data-scroll
        data-scroll-speed="0.5"
        data-scroll-repeat="true"
        data-scroll-position="top"
        class="proy_img"
        :data-src="proyecto.content.home[0].media2.filename"
        alt="No width hegiht image"
      />
    </div>
    <div class="proyecto_media proyecto_media_3">
      <img
        v-lazy-load
        data-scroll
        data-scroll-speed="1"
        data-scroll-repeat="true"
        data-scroll-position="top"
        class="proy_img"
        :data-src="proyecto.content.home[0].media3.filename"
        alt="No width hegiht image"
      />
    </div>
  </div>
</template>

<script>
import { gsap, Power4 } from 'gsap'
export default {
  props: {
    proyecto: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      ready: false,
      tl_images: gsap.timeline({ paused: true, ease: Power4.easeInOut }),
    }
  },
  computed: {
    intro() {
      return this.proyecto.content.intro
        ? this.$storyapi.richTextResolver.render(this.proyecto.content.intro)
        : ''
    },
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  mounted() {
    this.observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        const newValue = m.target.getAttribute(m.attributeName)
        this.$nextTick(() => {
          this.onClassChange(newValue, m.oldValue)
        })
      }
    })
    const elemt = document.getElementById('proyecto_' + this.proyecto.id)
    this.observer.observe(elemt, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class'],
    })

    this.onClassChange(elemt.getAttribute('class'))

    this.tl_images.to('#proyecto_' + this.proyecto.id + ' .proyecto_media', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.5,
      delay: 0,
      scaleY: 1,
      y: 30,
      stagger: {
        each: 0.6,
        from: 'edges',
      },
      onComplete: () => {
        this.observer.disconnect()
      },
    })
  },
  methods: {
    onClassChange(classAttrValue) {
      const classList = classAttrValue.split(' ')
      console.log('classList', classList.includes('is-inview'))
      if (classList.includes('is-inview')) {
        if (this.ready) {
          return
        }
        this.ready = true
        console.log('INVIEW ->', this.proyecto.nombre)
        this.tl_images.play()
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.proyecto_data {
  @apply z-10;
  .proyecto_data_content {
    @apply md:-mt-24;

    h3 {
      @apply text-5xl md:ml-1;
    }
    h4 {
      @apply text-3xl md:ml-4;
    }
    p {
      @apply text-xs;
    }
    h5 {
      @apply text-xs;
    }
  }
}
.proyecto_media {
  clip-path: inset(100% 0% 0% 0%);
  transform: scaleY(1.2);
  @apply z-0;
}

/* .tipo_1 {
  @apply w-screen h-screen grid grid-cols-12 items-center border border-black px-24;
  .proyecto_data {
    @apply col-span-4 col-start-3 mt-32 z-10;
  }
  .proyecto_media {
    @apply col-span-full h-full flex justify-between items-start -mt-16 z-0 h-5/6;
    &_1 {
      @apply w-5/12 h-4/6;
    }
    &_2 {
      @apply mt-16 w-6/12 h-5/6;
    }
    img {
      @apply object-cover h-full w-full;
    }
  }
} */
</style>
