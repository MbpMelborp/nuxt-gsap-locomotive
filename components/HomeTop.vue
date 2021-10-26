<template>
  <div class="home_top" data-scroll-section data-scroll-call="section_home">
    <div class="home_top_welcome">
      <div class="home_top_welcome_nav">
        <div class="nav_home">
          <div
            v-cursor-down
            data-scroll=""
            data-scroll-speed="3"
            data-scroll-position="top"
            class="dest nav_home_home"
            @mouseover="textHover('home')"
            @mouseleave="textLeave('home')"
          >
            <div v-split-characters>WORK</div>
          </div>
          <div
            v-cursor-right
            data-scroll=""
            data-scroll-speed="2"
            data-scroll-position="top"
            class="dest nav_home_work"
            @mouseover="textHover('work')"
            @mouseleave="textLeave('work')"
          >
            <div v-split-characters>ABOUT</div>
          </div>
          <div
            v-cursor-right
            data-scroll=""
            data-scroll-speed="1"
            data-scroll-position="top"
            class="dest nav_home_about"
            @mouseover="textHover('about')"
            @mouseleave="textLeave('about')"
          >
            <div v-split-characters>STAFF</div>
          </div>
          <h2 class="home_top_welcome_title">
            <div class="title1">Business</div>
            <div class="title2">Updaters</div>
          </h2>
        </div>
      </div>
    </div>
    <div
      ref="bkg_home"
      data-scroll
      data-scroll-call="index_home"
      data-scroll-repeat="true"
      data-scroll-speed="-1"
      data-scroll-position="top"
      class="image_back"
    >
      <HomeBkg v-if="animacion"></HomeBkg>
      <HomeBkgImage v-else></HomeBkgImage>
    </div>
  </div>
</template>

<script>
import { gsap, Expo, Power4 } from 'gsap'

import { mapGetters } from 'vuex'

// COMPONENS
import HomeBkg from '~/components/HomeBkg.vue'
import HomeBkgImage from '~/components/HomeBkgImage.vue'

export default {
  components: {
    HomeBkg,
    HomeBkgImage,
  },
  props: {
    story: {
      type: Object,
      default: null,
    },
    init: {
      type: Object,
      default: null,
    },
    animacion: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    console.log('HOMETOP -> data', this.$store.getters['app/getLoad'])
    return {
      tl_home: gsap.timeline({ paused: true, ease: Expo.easeOut }),
      tl_work: gsap.timeline({ paused: true, ease: Expo.easeOut }),
      tl_about: gsap.timeline({ paused: true, ease: Expo.easeOut }),
      tl_init: gsap.timeline({
        paused: false,
        delay: this.$store.getters['app/getLoad'] == null ? 3 : 0,
        ease: Power4.easeInOut,
      }),
      weight: [100, 900, 5],
      width: [20, 160, 10],
      observer: null,
    }
  },
  computed: {
    getSection() {
      return this.$store.getters.getSection
    },
    ...mapGetters({ home: 'app/getHome' }),
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
    this.observer.observe(this.$refs.bkg_home, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class'],
    })
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'app/setHome') {
        gsap.set('.home_top_welcome_title, .dest span', {
          color: this.home.texto_home,
        })

        this.tl_home.to('.nav_home_home span', {
          '--font-weight': gsap.utils.random(
            this.weight[0],
            this.weight[1],
            this.weight[2]
          ),
          '--font-width': gsap.utils.random(
            this.width[0],
            this.width[1],
            this.width[2]
          ),

          color: this.home.texto_home_hover,
          duration: 0.2,

          stagger: {
            each: 0.05,
            from: 'edges',
          },
        })

        this.tl_work.to('.nav_home_work span', {
          '--font-weight': gsap.utils.random(
            this.weight[0],
            this.weight[1],
            this.weight[2]
          ),
          '--font-width': gsap.utils.random(
            this.width[0],
            this.width[1],
            this.width[2]
          ),

          color: this.home.texto_home_hover,
          duration: 0.2,

          stagger: {
            each: 0.05,
            from: 'edges',
          },
        })
        this.tl_about.to('.nav_home_about span', {
          '--font-weight': gsap.utils.random(
            this.weight[0],
            this.weight[1],
            this.weight[2]
          ),
          '--font-width': gsap.utils.random(
            this.width[0],
            this.width[1],
            this.width[2]
          ),

          color: this.home.texto_home_hover,
          duration: 0.2,

          stagger: {
            each: 0.05,
            from: 'edges',
          },
        })
      }
    })
    this.$nextTick(() => {
      this.tl_init.from('.nav_home_home', {
        x: '-100vw',
        scaleX: 2,
        duration: 1,
      })
      this.tl_init.from(
        '.nav_home_work',
        {
          x: '150vw',
          scaleX: 2,
          duration: 1,
        },
        '-=0.6'
      )
      this.tl_init.from(
        '.nav_home_about',
        {
          x: '-100vw',
          scaleX: 2,
          duration: 1,
        },
        '-=1'
      )
      this.tl_init.from(
        '.home_top_welcome_title',
        {
          autoAlpha: 0,
          y: '40vh',
          scaleY: 2,
          duration: 1,
        },
        '-=0.5'
      )

      const elements = document.querySelectorAll('.nav_home span')
      elements.forEach((element) => this.setText(element))

      // this.Box.to('.title1 span', 1, { fontWeight: 600 })
      //   .call(this.randomDelay)
      //   .play()
      // this.$nextTick(() => {
      //   const  = { opacity: 0 }
      //   const from_s = {
      //     opacity: 1,
      //     stagger: 0.1,
      //     duration: 1,
      //     //rotation: 0,
      //   }
      //   this.tl_1 = $gsap
      //     .timeline({ defaults: { ease: 'linear.easeInOut' } })
      //     .fromTo('.reserva .to_hide', from, to)
      //     .fromTo('.reserva .to_show', from_s, to_s, '-=1')
      //     .paused(true)
      // })
    })
  },
  destroyed() {
    this.tl_init.kill()
  },
  methods: {
    setText(element) {
      const fontWeight = gsap.utils.random(
        this.weight[0],
        this.weight[1],
        this.weight[2]
      )
      const fontWidth = gsap.utils.random(
        this.width[0],
        this.width[1],
        this.width[2]
      )

      gsap.set(element, {
        fontVariationSettings:
          '"wght" var(--font-weight, ' +
          fontWeight +
          '), "wdth" var(--font-width, ' +
          fontWidth +
          '), "ital" 0',
        '--font-weight': fontWeight,
        '--font-width': fontWidth,
      })
    },
    textHover(evt) {
      if (evt === 'home') {
        this.tl_home.play()
      }
      if (evt === 'work') {
        this.tl_work.play()
      }
      if (evt === 'about') {
        this.tl_about.play()
      }
    },
    textLeave(evt) {
      if (evt === 'home') {
        this.tl_home.pause().reverse()
      }
      if (evt === 'work') {
        this.tl_work.pause().reverse()
      }
      if (evt === 'about') {
        this.tl_about.pause().reverse()
      }
    },
    onClassChange(classAttrValue) {
      const classList = classAttrValue.split(' ')
      if (classList.includes('is-inview')) {
        document.getElementById('nav_site').classList.remove('dif')
        gsap.set('#nav_site #logo_melborp', { fill: this.home.nav })
        gsap.set('#nav_site a', { color: this.home.nav })
      } else {
        document.getElementById('nav_site').classList.add('dif')
        gsap.set('#nav_site #logo_melborp', { fill: 'white' })
        gsap.set('#nav_site a', { color: 'white' })
      }
    },
  },
}
</script>

<style lang="postcss">
.home_top {
  @apply w-screen h-screen;
}
.home_top_welcome {
  @apply w-full max-w-10xl mx-auto;
}
.dest {
  span {
    /* @apply text-m-yellow-100; */
  }
}
.home_top_welcome_title {
  /* @apply text-m-yellow-100; */
}
.image_back {
  img {
    @apply h-screen;
  }
}
.nav_home {
  * {
    @apply select-none;
  }
}
</style>
