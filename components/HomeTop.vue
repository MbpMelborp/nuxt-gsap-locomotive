<template>
  <div class="home_top" data-scroll-section>
    <div class="home_top_welcome">
      <div class="home_top_welcome_nav">
        <div class="nav_home">
          <div
            class="dest nav_home_home"
            @mouseover="textHover('home')"
            @mouseleave="textLeave('home')"
          >
            <div v-split-characters>HOME</div>
          </div>
          <div
            v-split-characters
            class="dest nav_home_work"
            @mouseover="textHover('work')"
            @mouseleave="textLeave('work')"
          >
            <div v-split-characters>WORK</div>
          </div>
          <div
            v-split-characters
            class="dest nav_home_about"
            @mouseover="textHover('about')"
            @mouseleave="textLeave('about')"
          >
            <div v-split-characters>ABOUT</div>
          </div>
          <h2 class="home_top_welcome_title">
            <div class="title1">Business</div>
            <div class="title2">Updaters</div>
          </h2>
        </div>
      </div>
    </div>
    <div class="image_back">
      <HomeBkg></HomeBkg>
    </div>
  </div>
</template>

<script>
import { gsap, Expo, Power4 } from 'gsap'

// COMPONENS
import HomeBkg from '~/components/HomeBkg.vue'

export default {
  components: {
    HomeBkg,
  },
  data() {
    return {
      tl_home: gsap.timeline({ paused: true, ease: Expo.easeOut }),
      tl_work: gsap.timeline({ paused: true, ease: Expo.easeOut }),
      tl_about: gsap.timeline({ paused: true, ease: Expo.easeOut }),
      tl_init: gsap.timeline({ paused: false, ease: Power4.easeInOut }),
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tl_init.from('.nav_home_home', {
        x: '-100vw',
        scaleX: 2,
        duration: 1,
      })
      this.tl_init.from(
        '.nav_home_work',
        {
          x: '150vw',
          scaleX: 2,
          duration: 1,
        },
        '-=0.6'
      )
      this.tl_init.from(
        '.nav_home_about',
        {
          x: '-100vw',
          scaleX: 2,
          duration: 1,
        },
        '-=1'
      )
      this.tl_init.from(
        '.home_top_welcome_title',
        {
          y: '40vh',
          scaleY: 2,
          duration: 1,
          autoAlpha: 0,
        },
        '-=0.5'
      )

      this.tl_home.to('.nav_home_home span', {
        fontWeight: gsap.utils.random(100, 900, 5),
        fontStretch: gsap.utils.random(60, 120, 10),
        color: 'white',
        duration: 0.3,
        stagger: {
          each: 0.1,
          from: 'edges',
        },
      })
      this.tl_work.to('.nav_home_work span', {
        fontWeight: gsap.utils.random(100, 900, 5),
        fontStretch: gsap.utils.random(60, 120, 10),
        color: 'white',
        duration: 0.3,
        stagger: {
          each: 0.1,
          from: 'edges',
        },
      })
      this.tl_about.to('.nav_home_about span', {
        fontWeight: gsap.utils.random(100, 900, 5),
        fontStretch: gsap.utils.random(60, 120, 10),
        color: 'white',
        duration: 0.3,
        stagger: {
          each: 0.1,
          from: 'edges',
        },
      })

      const elements = document.querySelectorAll('.nav_home span')
      elements.forEach((element) => this.setText(element))

      // this.Box.to('.title1 span', 1, { fontWeight: 600 })
      //   .call(this.randomDelay)
      //   .play()
      // this.$nextTick(() => {
      //   const  = { opacity: 0 }
      //   const from_s = {
      //     opacity: 1,
      //     stagger: 0.1,
      //     duration: 1,
      //     //rotation: 0,
      //   }
      //   this.tl_1 = $gsap
      //     .timeline({ defaults: { ease: 'linear.easeInOut' } })
      //     .fromTo('.reserva .to_hide', from, to)
      //     .fromTo('.reserva .to_show', from_s, to_s, '-=1')
      //     .paused(true)
      // })
    })
  },
  methods: {
    setText(element) {
      const spanWeight = gsap.utils.random(100, 900, 5)
      const spanStretch = gsap.utils.random(60, 120, 10)
      const spanItalic = gsap.utils.random(['normal', 'italic'])
      gsap.set(element, {
        fontWeight: spanWeight,
        fontStretch: spanStretch,
        fontStyle: spanItalic,
      })
    },
    textHover(evt) {
      if (evt === 'home') {
        this.tl_home.play()
      }
      if (evt === 'work') {
        this.tl_work.play()
      }
      if (evt === 'about') {
        this.tl_about.play()
      }
    },
    textLeave(evt) {
      if (evt === 'home') {
        this.tl_home.pause().reverse()
      }
      if (evt === 'work') {
        this.tl_work.pause().reverse()
      }
      if (evt === 'about') {
        this.tl_about.pause().reverse()
      }
    },

    // randomDelay() {
    //   const newDelay = Math.random() * 3
    //   gsap.delayedCall(newDelay, () => {
    //     this.Box.restart()
    //   })
    //   console.log('repeat after: ', newDelay)
    // },
  },
}
</script>

<style lang="postcss">
.home_top {
  @apply w-screen h-screen;
  .title1 {
    /* font-size: 18em; */
  }
}
.image_back {
  img {
    @apply h-screen;
  }
}
</style>
