<template>
  <client-only>
    <main :class="{ cursor: !editor && !mobile }">
      <Cursorfx v-if="!editor && !mobile"></Cursorfx>
      <Preload v-if="!preload && !editor"></Preload>
      <PreloadInterior></PreloadInterior>
      <Nav></Nav>
      <delay-hydration><nuxt /></delay-hydration>
    </main>
  </client-only>
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
      editor: process.client
        ? window
          ? window.location.search.includes('_storyblok')
          : false
        : null,
      mobile: process.client ? this.$isMobile() : false,
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
  @apply m-0 font-extralight;
}
.tmp {
  @apply mix-blend-difference;
}
</style>
