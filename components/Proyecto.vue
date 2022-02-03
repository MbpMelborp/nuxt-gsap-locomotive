<template>
  <div :id="proyecto.slug" class="proyecto" data-scroll-section>
    <Tipo :key="componentKey" :par="par" :proyecto="proyecto"></Tipo>
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
    par: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return { componentKey: 0 }
  },
  created() {},
  destroyed() {},
  mounted() {},
  methods: {},
}
</script>
