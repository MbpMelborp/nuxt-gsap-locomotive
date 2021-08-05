<template>
  <div class="proyecto" data-scroll-section>
    <Tipo v-view :proyecto="proyecto"></Tipo>
  </div>
</template>

<script>
import Tipo from '~/components/proyectos/Tipo.vue'
export default {
  components: {
    Tipo,
  },
  props: {
    proyecto: {
      type: Object,
      default: null,
    },
  },

  mounted() {
    // console.log(this.proyecto)
    // const images = document.querySelectorAll('img')
    // setTimeout(() => {
    //   images.forEach((image) => {
    //     image.onload = () => {
    //       this.$nuxt.$emit('update-locomotive')
    //     }
    //     image.src = image.dataset.src
    //   })
    // }, 2500)
  },
}
</script>
