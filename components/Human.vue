<template>
  <div v-lazy-container="{ selector: 'img' }" class="human">
    <a v-cursor-right href="https://humanld.io/" target="_blank">
      <img
        data-src="~/assets/images/by_human.png"
        class="vlazy"
        alt="HUMAN Living Data"
      />
    </a>
  </div>
</template>
<style lang="postcss" scoped>
.human {
  @apply absolute top-0 lg:right-6 right-1 lg:w-12 w-8 z-10;
  a {
    @apply block;
    img {
      @apply opacity-100;
    }
  }
}
</style>
