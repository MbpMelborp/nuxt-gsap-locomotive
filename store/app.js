// import { gsap, Sine } from 'gsap'
const cons = false
export const state = () => ({
  scroll: {
    isScrolling: false,
    limit: {
      x: 0,
      y: 0,
    },
    x: 0,
    y: 0,
  },
  load: null,
  section: null,
  home: {
    texto: null,
    fondo: null,
    texto_home: null,
    texto_home_hover: null,
    nav: null,
  },
})

export const mutations = {
  setLoad: (state, payload) => {
    if (cons) console.log('STORE -> setLoad', payload)
    state.load = payload
  },
  setScroll: (state, payload) => {
    state.scroll = Object.assign({}, state.scroll, payload)
  },
  setSection: (state, payload) => {
    if (cons) console.log('STORE -> setSection', payload)
    state.section = payload
  },
  setHome: (state, payload) => {
    if (cons) console.log('STORE -> setHome', payload)
    state.home = { ...payload }
    // gsap.to('#__nuxt', {
    //   color: payload.texto,
    //   background: payload.fondo,
    //   duration: 1,
    //   ease: Sine.easeInOut,
    // })
  },
}
export const getters = {
  getSection: (state) => {
    return state.section
  },
  getHome: (state) => {
    return state.home
  },
  getLoad: (state) => {
    if (cons) console.log('STORE -> getLoad', state.load)
    return state.load
  },
}
