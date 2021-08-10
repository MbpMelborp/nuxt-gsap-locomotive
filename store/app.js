// import { gsap, Sine } from 'gsap'

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
  },
})

export const mutations = {
  setLoad: (state, payload) => {
    console.log('STORE -> setLoad', payload)
    state.load = payload
  },
  setScroll: (state, payload) => {
    state.scroll = Object.assign({}, state.scroll, payload)
  },
  setSection: (state, payload) => {
    console.log('STORE -> setSection', payload)
    state.section = payload
  },
  setHome: (state, payload) => {
    console.log('STORE -> setHome', payload)
    state.home = payload
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
    return state.load
  },
}
