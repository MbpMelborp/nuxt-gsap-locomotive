<template>
  <div class="preload_inner">
    <div class="capa_1"></div>
    <div class="capa_2"></div>
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
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9;
  .capa_1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: inset(0% 0% 0% 100%);
    background: #fff;
    z-index: 1;
  }
  .capa_2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: inset(0% 0% 0% 100%);
    background: #000;
    z-index: 2;
  }
}
</style>
