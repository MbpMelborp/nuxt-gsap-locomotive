import { gsap } from 'gsap'

const tiempoEntrada = 1

export const custom = {
  name: 'custom',
  appear: true,

  beforeEnter(el) {
    gsap.set(el, { opacity: 0 })
    console.log('TRANSITION -> beforeEnter', el)
  },
  enter(el, done) {
    console.log('TRANSITION -> enter', el)

    gsap.to(el, {
      opacity: 1,
      duration: tiempoEntrada,
    })

    done()
  },
  afterEnter(el) {
    console.log('TRANSITION -> afterEnter', el)
  },
  enterCancelled(el) {
    // ...
  },

  // --------
  // SALIDA
  // --------

  beforeLeave(el) {
    // ...
  },
  // el callback done es opcional cuando
  // es usado junto a CSS
  leave(el, done) {
    // ...
    done()
  },
  afterLeave(el) {
    // ...
  },
  // leaveCancelled sólo es permitido dentro de un v-show
  leaveCancelled(el) {
    // ...
  },
}
