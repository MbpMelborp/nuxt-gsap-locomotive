import { gsap, Power4 } from 'gsap'

const cerradoToRight = {
  webkitClipPath: 'inset(0% 100% 0% 0%)',
  clipPath: 'inset(0% 100% 0% 0%)',
}

const abierto = {
  webkitClipPath: 'inset(0% 0% 0% 0%)',
  clipPath: 'inset(0% 0% 0% 0%)',
}
const tiempoEntrada = 1

const tlPreload = gsap.timeline({
  paused: true,
  ease: Power4.easeInOut,
  onUpdate: (val) => {},
  onComplete: () => {
    // gsap.set('.preloadp', { display: 'none' })
    // tlPreload_salida.play()
  },
})
tlPreload.addLabel('entrada')
tlPreload.set('.capa_2, capa_1', cerradoToRight)
tlPreload.set('.preloadp', { display: 'block' })
tlPreload.fromTo(
  '.capa_2',
  cerradoToRight,
  { ...abierto, duration: tiempoEntrada },
  '+=0'
)
tlPreload.fromTo(
  '.capa_1',
  cerradoToRight,
  { ...abierto, duration: tiempoEntrada },
  `-=${tiempoEntrada * 0.25}`
)

export const custom = {
  name: 'custom',
  appear: true,
  //   beforeEnter(el) {
  //     console.log('TRANSITION -> beforeEnter', el)
  //     tlPreload.restart()
  //     // gsap.set('.capa_2, capa_1', cerradoToRight)
  //     // gsap.set(el.children, {
  //     //   clipPath: 'inset(0% 0% 0% 100%)',
  //     //   //   scale: 0.5,
  //     //   //   opacity: 0,
  //     // })
  //   },
  //   enter(el) {
  //     console.log('TRANSITION -> enter', el)
  //     // tlPreload.play()
  //     // gsap.to(el.children, {
  //     //   clipPath: 'inset(0% 0% 0% 0%)',
  //     //   duration: 0.5,
  //     //   //   scale: 1,
  //     //   //   opacity: 1,
  //     //   // ease: 'linear',
  //     //   // stagger: 0.2,
  //     // })
  //   },
  /* leave(el, done) {
    gsap.fromTo(
      el.children,
      {
        clipPath: 'inset(0% 0% 0% 0%)',
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.5,
        delay: 0.5,
        //   scale: 0.5,
        //   opacity: 0,
      }
    )
  }, */

  beforeEnter(el) {
    // ...
  },
  // el callback done es opcional cuando
  // es usado junto a CSS
  enter(el, done) {
    // ...
    done()
  },
  afterEnter(el) {
    // ...
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
