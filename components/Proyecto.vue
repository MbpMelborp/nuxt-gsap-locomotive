<template>
  <div class="proyecto" data-scroll-section>
    <Tipo :key="componentKey" :proyecto="proyecto"></Tipo>
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
  data() {
    return { componentKey: 0 }
  },
  created() {},
  destroyed() {
    // window.removeEventListener('resize', this.resizeWindow)
  },
  mounted() {
    // console.log(
    //   'PROYECTO -> mounted',
    //   this.proyecto.content.nombre,
    //   window.innerWidth
    // )
    // window.addEventListener('resize', this.resizeWindow)
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
  methods: {
    // resizeWindow(e) {
    //   console.log(
    //     'PROYECTO -> resizeWindow',
    //     this.proyecto.content.nombre,
    //     window.innerWidth
    //   )
    //   this.componentKey++
    // },
  },
}
</script>
