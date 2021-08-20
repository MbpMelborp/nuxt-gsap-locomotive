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
  load: window.location.search.includes('_storyblok') === true ? true : null,
  section: null,
  home: {
    texto: null,
    fondo: null,
    texto_home: null,
    texto_home_hover: null,
    nav: null,
  },
  page: {
    texto: null,
    fondo: null,
    nav: null,
  },
  mobileProyecto: null,
  preload: false,
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
  },
  setPage: (state, payload) => {
    if (cons) console.log('STORE -> setPage', payload)
    state.page = { ...payload }
  },
  setMobileProyecto: (state, payload) => {
    if (cons) console.log('STORE -> setMobileProyecto', payload)
    state.mobileProyecto = payload
  },
  setPreload: (state, payload) => {
    if (cons) console.log('STORE -> setPreload', payload)
    state.preload = payload
  },
}
export const getters = {
  getSection: (state) => {
    return state.section
  },
  getHome: (state) => {
    return state.home
  },
  getPage: (state) => {
    return state.page
  },
  getLoad: (state) => {
    if (cons) console.log('STORE -> getLoad', state.load)
    return state.load
  },
  getMobileProyecto: (state) => {
    if (cons) console.log('STORE -> getMobileProyecto', state.mobileProyecto)
    return state.mobileProyecto
  },
  getPreload: (state) => {
    if (cons) console.log('STORE -> getPreload', state.preload)
    return state.preload
  },
}
