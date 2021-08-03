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
  section: null,
})

export const mutations = {
  setScroll: (state, payload) => {
    state.scroll = Object.assign({}, state.scroll, payload)
  },
  setSection: (state, payload) => {
    console.log('STORE -> setSection', payload)
    state.section = payload
  },
}
export const getters = {
  getSection: (state) => {
    return state.section
  },
}
