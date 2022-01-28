// import Vue from 'vue'
// // Plugin
// import CursorFx from '@luxdamore/vue-cursor-fx'
// import '@luxdamore/vue-cursor-fx/dist/CursorFx.css'

// // Install
// Vue.use(CursorFx)

import Vue from 'vue'

function addClass(cl) {
  const cur = document.getElementsByClassName('cursor')
  if (cur.length > 0) {
    cur[0].classList.add(cl)
  }
}

function removeClasses() {
  const cur = document.getElementsByClassName('cursor')
  if (cur.length > 0) {
    cur[0].classList.remove('cursor-left')
    cur[0].classList.remove('cursor-right')
    cur[0].classList.remove('cursor-down')
    cur[0].classList.remove('cursor-up')
  }
}

Vue.directive('cursor-left', {
  bind: (el) => {
    if (!window.location.search.includes('_storyblok')) el.style.cursor = 'none'
    el.addEventListener('mouseover', () => {
      addClass('cursor-left')
    })
    el.addEventListener('mouseleave', removeClasses)
    el.addEventListener('click', removeClasses)
  },
})

Vue.directive('cursor-right', {
  bind: (el) => {
    if (!window.location.search.includes('_storyblok')) el.style.cursor = 'none'
    el.addEventListener('mouseover', () => {
      addClass('cursor-right')
    })
    el.addEventListener('mouseleave', removeClasses)
    el.addEventListener('click', removeClasses)
  },
})
Vue.directive('cursor-up', {
  bind: (el) => {
    if (!window.location.search.includes('_storyblok')) el.style.cursor = 'none'
    el.addEventListener('mouseover', () => {
      addClass('cursor-up')
    })
    el.addEventListener('mouseleave', removeClasses)
    el.addEventListener('click', removeClasses)
  },
})
Vue.directive('cursor-down', {
  bind: (el) => {
    if (!window.location.search.includes('_storyblok')) el.style.cursor = 'none'
    el.addEventListener('mouseover', () => {
      addClass('cursor-down')
    })
    el.addEventListener('mouseleave', removeClasses)
    el.addEventListener('click', removeClasses)
  },
})
