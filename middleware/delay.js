import { gsap, Power2 } from 'gsap'
const abierto = {
  webkitClipPath: 'inset(0% 0% 0% 0%)',
  clipPath: 'inset(0% 0% 0% 0%)',
}
// const cerradoToLeft = {
//   webkitClipPath: 'inset(0% 0% 0% 100%)',
//   clipPath: 'inset(0% 0% 0% 100%)',
// }
const cerradoToRight = {
  webkitClipPath: 'inset(0% 100% 0% 0%)',
  clipPath: 'inset(0% 100% 0% 0%)',
}
export default ({ isServer }) => {
  // Don't use the middleware on server-side
  if (isServer) return

  return new Promise((resolve) => {
    // Wait 1 second between each route
    gsap.set('.preload_inner', { display: 'block' })
    gsap.fromTo('.preload_inner .capa_1', cerradoToRight, {
      ...abierto,
      duration: 0.5,
      ease: Power2.easeInOut,
    })
    gsap.fromTo('.preload_inner .capa_2', cerradoToRight, {
      ...abierto,
      delay: 0.2,
      duration: 0.5,
      ease: Power2.easeInOut,
    })
    gsap.fromTo('.preload_inner .capa_2 svg', cerradoToRight, {
      ...abierto,
      delay: 0,
      duration: 0.6,
      ease: Power2.easeInOut,
    })
    setTimeout(resolve, 500)
  })
}
