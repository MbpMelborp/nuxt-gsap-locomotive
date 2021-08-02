<template>
  <main>
    <cursor-fx color="#fff" color-hover="#fff"></cursor-fx>
    <Nav></Nav>
    <nuxt />
  </main>
</template>

<script>
import Nav from '~/components/Nav.vue'
export default {
  components: {
    Nav,
  },
}
</script>

<style lang="scss">
@import '~assets/scss/demo.scss';
</style>

<style lang="postcss">
body {
  @apply m-0 font-normal bg-m-yellow-100 font-extralight;
}
.tmp {
  @apply mix-blend-difference;
}
</style>
