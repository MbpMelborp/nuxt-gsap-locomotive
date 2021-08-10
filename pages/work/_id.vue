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
        <h1>
          Vertical<br />
          Scroll
        </h1>
      </header>
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
        <nuxt-link to="/horizontal-scroll/">
          Go to Horizontal Scroll
        </nuxt-link>
      </footer>
    </div>
  </LocomotiveScroll>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      section: 'app/getSection',
      home: 'app/getHome',
      load: 'app/getLoad',
    }),
  },
  beforeCreate() {
    if (this.load != null) {
      this.setLoad(false)
    }
  },
  mounted() {
    this.setLoad(true)
  },
  methods: {
    ...mapMutations({
      setSection: 'app/setSection',
      setHome: 'app/setHome',
      setLoad: 'app/setLoad',
    }),
  },
}
</script>

<style lang="scss">
@import '~assets/scss/global.scss';
</style>
