<template>
  <div class="home_top" data-scroll-section data-scroll-call="section_home">
    <div class="home_top_welcome">
      <div class="home_top_welcome_nav">
        <div class="nav_home">
          <h1>
            <div ref="business" v-split-characters class="h-business">
              Business
            </div>
            <div ref="updaters" v-split-characters class="h-updaters">
              Updaters
            </div>
          </h1>
          <!-- <div
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
          </h2> -->
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
      <HomeBkg v-if="animacion" :story="story"></HomeBkg>
      <HomeBkgImage v-else :story="story"></HomeBkgImage>
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
    // console.log('👌 HOMETOP -> data', this.$store.getters['app/getLoad'])
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

        this.tl_home.to('.nav_home h1 span', {
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
      this.tl_init.from('.h-business', {
        x: '-100vw',
        scaleX: 2,
        duration: 1,
      })
      this.tl_init.from(
        '.h-updaters',
        {
          x: '150vw',
          scaleX: 2,
          duration: 1,
        },
        '-=0.6'
      )
      const elements = document.querySelectorAll('.nav_home div')
      elements.forEach((element) => this.setText(element))
    })
  },
  destroyed() {
    this.tl_init.kill()
  },
  methods: {
    calcTextSize() {
      const text = this.$refs.business

      const parentContainerWidth = text.parentNode.clientWidth
      const currentTextWidth = text.scrollWidth
      const currentFontSize = parseInt(window.getComputedStyle(text).fontSize)

      const newValue = Math.min(
        Math.max(
          16,
          (parentContainerWidth / currentTextWidth) * currentFontSize
        ),
        500
      )

      console.log('FONT_SIZE', currentTextWidth, currentTextWidth, newValue)

      text.style.setProperty('--fontSize', newValue + 'px')
    },
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

.home_top {
  display: grid;
  grid-template-columns: [l1] 5vw [m1] auto auto auto [m2] 5vw [r1];
  grid-template-rows: [t1]5vh auto 1em [b1];
  grid-gap: 0;
  grid-template-areas:
    '. . . . .'
    '. welcome welcome welcome .'
    '. . . . .';
  @apply w-screen h-screen select-none overflow-hidden bg-black-900;

  &_welcome {
    grid-area: welcome;
    display: grid;
    grid-template-columns: [l1] auto auto auto [r1];
    grid-template-rows: [t1] auto auto auto auto [b1];
    grid-gap: 0;
    grid-template-areas:
      '. . . .'
      'welcome welcome welcome welcome'
      'welcome welcome welcome welcome'
      '. . . .';
    z-index: 2;
    @apply w-full max-w-10xl mx-auto items-center self-center justify-self-start;
    &_nav {
      grid-area: welcome;
      .nav_home {
        /* display: grid;
      grid-template-columns: [l1] auto 30% 30% 30% auto [r1];
      grid-template-rows: [t1] auto auto auto [b1];
      grid-gap: 0;
      grid-template-areas:
        '. home home home .'
        'work work work . .'
        'business about about about .';
      width: 100%;
      @media (max-width: 768px) {
        grid-template-columns: [l1] auto [r1];
        grid-template-rows: [t1] auto auto auto auto [b1];
        grid-template-areas:
          'home'
          'work'
          'about'
          'business';
      } */
        @apply w-full;
        h1 {
          @apply w-full block;
          div {
            --fontSize: 78px;

            font-size: var(--fontSize);
            @apply leading-none w-full;
          }
        }
        .dest {
          margin-bottom: 0.5em;
          span {
            line-height: 0.75em;
            letter-spacing: -0.02em;
            @include font-size(10rem !important);
            @media (max-width: 768px) {
              @include font-size(12rem !important);
            }
          }
        }
      }
    }
  }
  .image_back {
    grid-column-start: l1;
    grid-column-end: r1;
    grid-row-start: t1;
    grid-row-end: b1;
    z-index: 1;
    img {
      height: 100vh;
      width: 100vw;
      display: block;
      object-fit: cover;
    }
  }
}
</style>
