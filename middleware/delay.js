import { gsap } from 'gsap'
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
  // Return a promise to tell nuxt.js to wait for the end of it
  return new Promise((resolve) => {
    // Wait 1 second between each route
    console.log('🏁 TRANSITION -> delay')
    gsap.fromTo('.preload_inner .capa_1', cerradoToRight, {
      ...abierto,
      duration: 0.5,
    })
    gsap.fromTo('.preload_inner .capa_2', cerradoToRight, {
      ...abierto,
      duration: 0.5,
      delay: 0.2,
    })
    setTimeout(resolve, 500)
  })
}
