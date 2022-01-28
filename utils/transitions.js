import { gsap } from 'gsap'

const abierto = {
  // webkitClipPath: 'inset(0% 0% 0% 0%)',
  clipPath: 'inset(0% 0% 0% 0%)',
}
const tiempoEntrada = 1

const cerradoToLeft = {
  // webkitClipPath: 'inset(0% 0% 0% 100%)',
  clipPath: 'inset(0% 0% 0% 100%)',
}

export const custom = {
  name: 'custom',
  appear: true,
  css: false,

  beforeEnter(el) {
    console.log('🏁 TRANSITION -> beforeEnter', el)
  },
  enter(el, done) {
    console.log('🏁 TRANSITION -> enter', el)
    gsap.fromTo(
      el,
      { x: -10, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: tiempoEntrada,
        onComplete: () => {
          gsap.set('.preload_inner', { display: 'none' })
        },
      }
    )
    done()
  },
  afterEnter(el) {
    console.log('🏁 TRANSITION -> afterEnter', el)
  },
  enterCancelled(el) {
    console.log('🏁 TRANSITION -> enterCancelled', el)
  },

  // --------
  // SALIDA
  // --------

  beforeLeave(el) {
    console.log('🏁 TRANSITION -> beforeLeave', el)
    gsap.fromTo('.preload_inner .capa_2', abierto, {
      ...cerradoToLeft,
      delay: 0.5,
      duration: 0.5,
    })
    gsap.fromTo('.preload_inner .capa_1', abierto, {
      ...cerradoToLeft,
      duration: 0.5,
      delay: 0.7,
    })
  },
  leave(el, done) {
    console.log('🏁 TRANSITION -> leave', el)
    done()
  },
  afterLeave(el) {
    console.log('🏁 TRANSITION -> afterLeave', el)
  },
  leaveCancelled(el) {
    console.log('🏁 TRANSITION -> leaveCancelled', el)
  },
}
