const cons = false
export default {
  setLoad: (state, payload) => {
    if (cons) console.log('Ⓜ️ | MUTATION -> setLoad', payload)
    state.load = payload
  },
  setScroll: (state, payload) => {
    if (cons) console.log('Ⓜ️ | MUTATION -> setScroll', payload)
    state.scroll = Object.assign({}, state.scroll, payload)
  },
  setSection: (state, payload) => {
    if (cons) console.log('Ⓜ️ | MUTATION -> setSection', payload)
    state.section = payload
  },
  setHome: (state, payload) => {
    if (cons) console.log('Ⓜ️ | MUTATION -> setHome', payload)
    state.home = { ...payload }
  },
  setPage: (state, payload) => {
    if (cons) console.log('Ⓜ️ | MUTATION -> setPage', payload)
    state.page = { ...payload }
  },
  setMobileProyecto: (state, payload) => {
    if (cons) console.log('Ⓜ️ | MUTATION -> setMobileProyecto', payload)
    state.mobileProyecto = payload
  },
  setPreload: (state, payload) => {
    if (cons) console.log('Ⓜ️ | MUTATION -> setPreload', payload)
    state.preload = payload
  },
  setLoaderInner: (state, payload) => {
    if (cons) console.log('Ⓜ️ | MUTATION -> setLoaderInner', payload)
    state.preloadInner = payload
  },
}
