<template>
  <main :class="{ cursor: !editor && !$isMobile() }">
    <Cursorfx v-if="!editor && !$isMobile()"></Cursorfx>
    <Preload v-if="!preload && !editor"></Preload>
    <PreloadInterior></PreloadInterior>
    <Nav></Nav>
    <delay-hydration><nuxt /></delay-hydration>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import Nav from '~/components/Nav.vue'
import Preload from '~/components/Preload.vue'
import PreloadInterior from '~/components/PreloadInterior.vue'
import Cursorfx from '~/components/CursorMouse.vue'

export default {
  components: {
    Nav,
    Preload,
    PreloadInterior,
    Cursorfx,
  },
  data() {
    return {
      editor: window.location.search.includes('_storyblok'),
    }
  },
  computed: {
    ...mapGetters({
      activePage: 'getActivePage',
      preload: 'app/getPreload',
    }),
  },
  mounted() {
    if (this.editor) {
      this.setLoad(true)
    }
  },
  methods: {
    ...mapMutations({
      setLoad: 'app/setLoad',
    }),
  },
}
</script>

<style lang="scss">
@import '~assets/scss/global.scss';
</style>

<style lang="postcss">
body {
  @apply m-0 font-normal font-extralight;
}
.tmp {
  @apply mix-blend-difference;
}
</style>
