<template>
  <LocomotiveScroll
    ref="scroller"
    :getted-options="{
      smooth: true,
      direction: 'vertical',
      smartphone: {
        smooth: true,
        direction: 'vertical',
      },
      tablet: {
        smooth: true,
        direction: 'vertical',
      },
    }"
  >
    <div class="example vertical">
      <header data-scroll-section>
        <h1 class="bg- text-red text-5xl mb-40">
          <span
            class="
              font-extrabold
              decoration-clone
              bg-gradient-to-b
              from-yellow-400
              to-red-500
              text-transparent
              bg-clip-text
              text-5xl
            "
          >
            on Call<br />
            Function
          </span>
        </h1>
        <p class="text-xs text-h-melborp-900">lipspskl slkslsk</p>
      </header>
      <div class="example-section" data-scroll-section>
        <div class="example-content">
          <div
            class="example-big-square bg-h-melborp-100"
            data-scroll
            data-scroll-speed="-0.5"
          />
          <div
            class="example-small-square"
            data-scroll
            data-scroll-speed="2.5"
          />
        </div>
      </div>
      <div class="example-section" data-scroll-section>
        <div class="example-content">
          <div
            class="example-small-square"
            data-scroll
            data-scroll-speed="2.5"
          />
          <div
            class="example-big-square"
            data-scroll
            data-scroll-speed="-0.5"
          />
        </div>
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
          <div
            class="example-big-square"
            data-scroll
            data-scroll-speed="-0.5"
          />
          <div
            class="example-small-square"
            data-scroll
            data-scroll-speed="2.5"
          />
        </div>
      </div>
      <footer data-scroll-section>
        <nuxt-link to="/"> Go to Vertical Scroll </nuxt-link>
      </footer>
    </div>
  </LocomotiveScroll>
</template>

<script>
import gsap from 'gsap'

export default {
  mounted() {
    const locomotive = this.$refs.scroller.locomotive
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
}
</script>

<style lang="scss">
@import '~assets/scss/global.scss';
</style>
