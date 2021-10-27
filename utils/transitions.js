import { gsap } from 'gsap'

const abierto = {
  webkitClipPath: 'inset(0% 0% 0% 0%)',
  clipPath: 'inset(0% 0% 0% 0%)',
}
const tiempoEntrada = 1

// const cerradoToRight = {
//   webkitClipPath: 'inset(0% 100% 0% 0%)',
//   clipPath: 'inset(0% 100% 0% 0%)',
// }

const cerradoToLeft = {
  webkitClipPath: 'inset(0% 0% 0% 100%)',
  clipPath: 'inset(0% 0% 0% 100%)',
}

export const custom = {
  name: 'custom',
  appear: true,
  css: false,

  beforeEnter(el) {
    // gsap.set(el, { opacity: 0 })
    // gsap.set('.preload_inner', { clipPath: 'inset(0% 100% 0% 0%)' })

    console.log('🏁 TRANSITION -> beforeEnter', el)
  },
  enter(el, done) {
    console.log('🏁 TRANSITION -> enter', el)
    gsap.fromTo(
      el,
      { x: -10, opacity: 0 },
      { x: 0, opacity: 1, duration: tiempoEntrada }
    )
    done()
  },
  afterEnter(el) {
    console.log('🏁 TRANSITION -> afterEnter', el)
  },
  enterCancelled(el) {
    // ...
  },

  // --------
  // SALIDA
  // --------

  beforeLeave(el) {
    console.log('🏁 TRANSITION -> beforeLeave', el)
    gsap.fromTo('.preload_inner .capa_2', abierto, {
      ...cerradoToLeft,
      duration: 0.5,
    })
    gsap.fromTo('.preload_inner .capa_1', abierto, {
      ...cerradoToLeft,
      duration: 0.5,
      delay: 0.2,
    })

    // gsap.fromTo(
    //   el,
    //   { opacity: 1, background: 'red', ...abierto },
    //   { ...cerradoToRight, opacity: 0, delay: 0, duration: tiempoEntrada }
    // )
    // ...
  },
  // el callback done es opcional cuando
  // es usado junto a CSS
  leave(el, done) {
    // ...
    done()
  },
  afterLeave(el) {
    console.log('🏁 TRANSITION -> afterLeave', el)
    // ...
  },
  // leaveCancelled sólo es permitido dentro de un v-show
  leaveCancelled(el) {
    // ...
  },
}
