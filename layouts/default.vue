<template>
  <main :class="{ cursor: !$isMobile() }">
    <!-- <cursor-fx color="#fff" color-hover="#fff"></cursor-fx> -->
    <Cursorfx></Cursorfx>
    <Preload v-if="!preload"></Preload>
    <Nav></Nav>
    <nuxt />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

import Nav from '~/components/Nav.vue'
import Preload from '~/components/Preload.vue'
import Cursorfx from '~/components/CursorMouse.vue'

export default {
  components: {
    Nav,
    Preload,
    Cursorfx,
  },

  computed: {
    ...mapGetters({ activePage: 'getActivePage', preload: 'app/getPreload' }),
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
.cursor {
  cursor: none;
}
</style>
