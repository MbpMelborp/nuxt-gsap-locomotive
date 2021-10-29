const cons = false
export default {
  getSection: (state) => {
    if (cons) console.log('🟢  | STORE -> getLoad', state.load)
    return state.section
  },
  getHome: (state) => {
    if (cons) console.log('🟢  | STORE -> getLoad', state.load)
    return state.home
  },
  getPage: (state) => {
    if (cons) console.log('🟢  | STORE -> getLoad', state.load)
    return state.page
  },
  getLoad: (state) => {
    if (cons) console.log('🟢  | STORE -> getLoad', state.load)
    return state.load
  },
  getMobileProyecto: (state) => {
    if (cons)
      console.log('🟢  | STORE -> getMobileProyecto', state.mobileProyecto)
    return state.mobileProyecto
  },
  getPreload: (state) => {
    if (cons) console.log('🟢  | STORE -> getPreload', state.preload)
    return state.preload
  },
  getPreloadInner: (state) => {
    if (cons) console.log('🟢  | STORE -> getPreloadInner', state.preloadInner)
    return state.preloadInner
  },
}
