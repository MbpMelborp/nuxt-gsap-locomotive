<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div class="text-5xl text-white md:text-7xl lg:text-9xl">
      <h1 v-if="error.statusCode === 404">Página no encontrada</h1>
      <h1 v-else>Ocurrió un error</h1>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'Error',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
