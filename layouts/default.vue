<template>
  <main>
    <!-- <cursor-fx color="#fff" color-hover="#fff"></cursor-fx> -->
    <Preload></Preload>
    <Nav></Nav>
    <nuxt />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

import Nav from '~/components/Nav.vue'
import Preload from '~/components/Preload.vue'
export default {
  components: {
    Nav,
    Preload,
  },
  computed: {
    ...mapGetters({ activePage: 'getActivePage' }),
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
