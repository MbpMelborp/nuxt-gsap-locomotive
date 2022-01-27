import Vue from 'vue'
// import VueSlickCarousel from 'vue-slick-carousel'
// import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// // optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

// Vue.component('VueSlickCarousel', VueSlickCarousel)

import {
  VueFlux,
  FluxCaption,
  FluxControls,
  FluxIndex,
  FluxPagination,
  FluxPreloader,
} from 'vue-flux'

Vue.component('VueFlux', VueFlux)
Vue.component('FluxCaption', FluxCaption)
Vue.component('FluxControls', FluxControls)
Vue.component('FluxIndex', FluxIndex)
Vue.component('FluxPagination', FluxPagination)
Vue.component('FluxPreloader', FluxPreloader)
