<template>
  <div class="preload_inner">
    <div class="capa_1"></div>
    <div class="capa_2">
      <img src="~/assets/images/melborp.svg" alt="Melborp" />
      <h3>Business Updaters</h3>
      <img class="arrow" src="~/assets/images/arrow.png" alt="Melborp" />
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="postcss">
.preload_inner {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  display: none;
  @apply fixed justify-center items-center w-screen h-screen;
  .capa_1 {
    top: 0;
    left: 0;
    clip-path: inset(0% 0% 0% 100%);
    z-index: 1;
    @apply flex fixed justify-center items-center w-screen h-screen bg-white;
  }
  .capa_2 {
    top: 0;
    left: 0;
    clip-path: inset(0% 0% 0% 100%);
    z-index: 2;
    background: #000;
    @apply flex fixed flex-col justify-center items-center w-screen h-screen;
    svg,
    img {
      width: 150px;
    }
    h3 {
      font-variation-settings: 'wght' var(--font-weight, 400),
        'wdth' var(--font-width, 90), 'ital' 0;
      @apply mt-0 text-white text-lg text-center;
    }
  }
}
</style>
