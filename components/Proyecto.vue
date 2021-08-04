<template>
  <div class="proyecto" data-scroll-section>
    <Tipo1
      v-if="proyecto.content.tipo_home == 'tipo_1'"
      v-view
      :proyecto="proyecto"
    ></Tipo1>
    <Tipo2
      v-if="proyecto.content.tipo_home == 'tipo_2'"
      v-view
      :proyecto="proyecto"
    ></Tipo2>
  </div>
</template>

<script>
import Tipo1 from '~/components/proyectos/Tipo1.vue'
import Tipo2 from '~/components/proyectos/Tipo2.vue'
export default {
  components: {
    Tipo1,
    Tipo2,
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
