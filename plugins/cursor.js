// import Vue from 'vue'
// // Plugin
// import CursorFx from '@luxdamore/vue-cursor-fx'
// import '@luxdamore/vue-cursor-fx/dist/CursorFx.css'

// // Install
// Vue.use(CursorFx)

import Vue from 'vue'
// const animateOnScrollObserver = new IntersectionObserver(
//   (entries, animateOnScrollObserver) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('enter')
//         animateOnScrollObserver.unobserve(entry.target)
//       }
//     })
//   }
// )
const cons = false
function addClass(cl) {
  const cur = document.getElementsByClassName('cursor')
  if (cur.length > 0) {
    if (cons)
      console.log(
        'DIRECTIVE CURSOR -> cursor-left',
        document.getElementsByClassName('cursor')
      )
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
    el.style.cursor = 'none'
    el.addEventListener('mouseover', () => {
      addClass('cursor-left')
    })
    el.addEventListener('mouseleave', removeClasses)
    el.addEventListener('click', removeClasses)
  },
})

Vue.directive('cursor-right', {
  bind: (el) => {
    el.style.cursor = 'none'
    el.addEventListener('mouseover', () => {
      addClass('cursor-right')
    })
    el.addEventListener('mouseleave', removeClasses)
    el.addEventListener('click', removeClasses)
  },
})
Vue.directive('cursor-up', {
  bind: (el) => {
    el.style.cursor = 'none'
    el.addEventListener('mouseover', () => {
      addClass('cursor-up')
    })
    el.addEventListener('mouseleave', removeClasses)
    el.addEventListener('click', removeClasses)
  },
})
Vue.directive('cursor-down', {
  bind: (el) => {
    el.style.cursor = 'none'
    el.addEventListener('mouseover', () => {
      addClass('cursor-down')
    })
    el.addEventListener('mouseleave', removeClasses)
    el.addEventListener('click', removeClasses)
  },
})
