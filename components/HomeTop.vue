<template>
  <div class="home_top" data-scroll-section data-scroll-call="section_home">
    <div
      ref="bkg_home"
      data-scroll
      data-scroll-call="index_home"
      data-scroll-repeat="true"
      :data-scroll-speed="!$isMobile() ? -1 : 0"
      :data-scroll-position="!$isMobile() ? 'top' : ''"
      class="image_back"
    >
      <!-- <HomeBkg v-if="animacion" :story="story"></HomeBkg> -->
      <HomeBkgMarquee
        v-if="animacion"
        :story="story"
        @to-scroll-nav="toScrollNav"
      ></HomeBkgMarquee>
      <HomeBkgImage v-else :story="story"></HomeBkgImage>
    </div>
  </div>
</template>

<script>
import { gsap, Expo, Power4 } from 'gsap'

import { mapGetters } from 'vuex'

// COMPONENS
// import HomeBkg from '~/components/HomeBkg.vue'
import HomeBkgImage from '~/components/HomeBkgImage.vue'
// import HomeBkgAnim from '~/components/HomeBkgAnim.vue'
import HomeBkgMarquee from '~/components/HomeBkgMarquee.vue'

export default {
  components: {
    // HomeBkg,
    HomeBkgImage,
    HomeBkgMarquee,
    // HomeBkgAnim,
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
      // if (mutation.type === 'app/setHome') {
      // }
    })
    this.$nextTick(() => {
      const elements = document.querySelectorAll('.nav_home div')
      elements.forEach((element) => this.setText(element))
    })
  },
  destroyed() {
    this.tl_init.kill()
  },
  methods: {
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
    toScrollNav(event) {
      this.$emit('to-scroll-nav', event)
    },
  },
}
</script>

<style lang="postcss">
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
  }
}
</style>
