<template>
  <LocomotiveScroll
    ref="scroller"
    :getted-options="{
      direction: 'vertical',
      smartphone: {
        direction: 'vertical',
      },
      tablet: {
        direction: 'vertical',
      },
    }"
  >
    <div class="content_interior vertical">
      <HomeTop></HomeTop>

      <header data-scroll-section>
        <h1 ref="headerH1">Gsap Scroll Trigger</h1>
      </header>

      <div class="example-section" data-scroll-section>
        <div class="example-content">
          <div class="example-big-square" />
          <div class="example-small-square" data-scroll-trigger />
        </div>
      </div>
      <div class="example-section" data-scroll-section>
        <BoxComponent />
      </div>
      <!-- Block with function -->
      <div class="example-section" data-scroll-section>
        <div
          ref="texti"
          class="example-fade-text"
          data-scroll
          data-scroll-call="fadeText"
        >
          <h2>When I'm triggered... I disappear</h2>
        </div>
      </div>
      <!-- ./Block with function -->
      <div class="example-section" data-scroll-section>
        <div class="example-content">
          <div class="example-big-square" />
          <div class="example-small-square" data-scroll-trigger />
        </div>
      </div>
      <footer data-scroll-section>
        <nuxt-link to="/image-loads/"> Go to Image Loads </nuxt-link>
      </footer>
    </div>
  </LocomotiveScroll>
</template>

<script>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// COMPONENS
import HomeTop from '~/components/HomeTop.vue'

gsap.registerPlugin(ScrollTrigger)

export default {
  components: {
    BoxComponent: () =>
      import(/* webpackPrefetch: true */ '@/components/box-component.vue'),
    HomeTop,
  },
  mounted() {
    this.initScrolltrigger()
    this.$nextTick(() => {
      const elements = document.querySelectorAll('[data-scroll-trigger]')
      elements.forEach((element) => this.elementAnimation(element))

      const homeH1 = this.$refs.headerH1 // document.querySelectorAll('header h1')
      this.homeH1Animation(homeH1)
      // this.homeH1Animation(homeH1)
    })
  },
  methods: {
    initScrolltrigger() {
      const locomotive = this.$refs.scroller.locomotive
      locomotive.on('scroll', ScrollTrigger.update)
      ScrollTrigger.scrollerProxy(locomotive.el, {
        scrollTop(value) {
          return arguments.length
            ? locomotive.scrollTo(value, 0, 0)
            : locomotive.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        },
      })
      locomotive.on('call', (value, way, obj) => {
        switch (value) {
          case 'fadeText': {
            const child = this.$refs.texti /// /obj.el.firstChild
            gsap.to(child, {
              duration: 2,
              ease: 'expo.out',
              opacity: 0.1,
            })
            break
          }
          default:
            break
        }
      })
    },
    elementAnimation(element) {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          scroller: this.$refs.scroller.locomotive.el,
          scrub: true,
          start: 'top bottom',
          end: 'bottom center',
        },
        scaleY: 0,
        ease: 'none',
      })
    },
    homeH1Animation(element) {
      const tlInicial = gsap.timeline({
        // yes, we can add it to an entire timeline!
        scrollTrigger: {
          trigger: element,
          scroller: this.$refs.scroller.locomotive.el,
          scrub: true,
          start: 'top center',
          end: 'bottom top',
          markers: process.env.NODE_ENV !== 'production', // default,
        },
      })

      // add animations and labels to the timeline
      tlInicial.addLabel('start').from('header h1', {
        fontStretch: '120%',
        fontWeight: 900,
        y: 600,
        // autoAlpha: 0,
      })
      // .addLabel('color')
      // .from('.box', { backgroundColor: '#28a92b' })
      // .addLabel('spin')
      // .to('.box', { rotation: 360 })
      // .addLabel('end')
    },
  },
}
</script>

<style lang="postcss">
header {
  align-items: center;
  padding: 0 12.5vw;
  display: flex;
  @apply h-screen;
}
</style>
