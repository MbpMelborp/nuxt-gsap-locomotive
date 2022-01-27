<template>
  <div ref="bkg_home">
    <main>
      <div class="frame">
        <div class="frame__title-wrap">
          <h1 class="frame__title">Infinite WebGL Scrolling Gallery</h1>
          <p class="frame__tagline">
            using <a href="https://github.com/oframe/ogl">OGL</a> with shaders
          </p>
        </div>

        <div class="frame__links">
          <a href="https://tympanus.net/Tutorials/BreathingDots/"
            >Previous Demo</a
          >
          <a href="https://tympanus.net/codrops/?p=52634">Article</a>
          <a
            href="https://github.com/lhbizarro/infinite-webl-gallery"
            target="_blank"
            >GitHub</a
          >
        </div>

        <div class="frame__demos">
          <a href="index.html" class="frame__demo frame__demo--current"
            >Demo 1</a
          >
          <a href="index2.html" class="frame__demo">Demo 2</a>
        </div>
      </div>

      <div class="demo-1">
        <div class="demo-1__header">
          <h1 class="demo-1__title">Business Updaters</h1>
        </div>
        <div class="demo-1__gallery">
          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/1.jpg" />
          </figure>

          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/2.jpg" />
          </figure>

          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/3.jpg" />
          </figure>

          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/4.jpg" />
          </figure>

          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/5.jpg" />
          </figure>

          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/6.jpg" />
          </figure>

          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/7.jpg" />
          </figure>

          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/8.jpg" />
          </figure>

          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/9.jpg" />
          </figure>

          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/10.jpg" />
          </figure>

          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/11.jpg" />
          </figure>

          <figure class="demo-1__gallery__figure">
            <img class="demo-1__gallery__image" src="/proy/12.jpg" />
          </figure>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// import * as Three from 'three'
import { Renderer, Camera, Transform, Plane } from 'ogl'
import NormalizeWheel from 'normalize-wheel'

import { lerp } from '~/utils/math'
import Media from '~/utils/Media'
export default {
  props: {
    story: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      speed: 2,
      gallery: null,
      screen: null,
      renderer: null,
      camera: null,
      scene: null,
      gl: null,
      mediasElements: null,
      planeGeometry: null,
      medias: null,
      isDown: null,
      start: null,
      viewport: null,
      direction: null,
      galleryBounds: null,
      galleryHeight: null,
      scroll: {
        ease: 0.05,
        current: 0,
        target: 0,
        last: 0,
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy() {},
  methods: {
    init() {
      this.createRenderer()
      this.createCamera()
      this.createScene()
      this.createGallery()

      this.onResize()

      // this.createGeometry()
      // this.createMedias()

      // this.update()

      // this.addEventListeners()
    },
    createGallery() {
      this.gallery = document.querySelector('.demo-1__gallery')
    },
    createRenderer() {
      this.renderer = new Renderer({
        alpha: true,
      })

      this.gl = this.renderer.gl
      document.body.appendChild(this.gl.canvas)
    },
    createCamera() {
      this.camera = new Camera(this.gl)
      this.camera.fov = 45
      this.camera.position.z = 5
    },

    createScene() {
      this.scene = new Transform()
    },

    createGeometry() {
      this.planeGeometry = new Plane(this.gl, {
        heightSegments: 10,
      })
    },

    createMedias() {
      this.mediasElements = document.querySelectorAll(
        '.demo-1__gallery__figure'
      )
      this.medias = Array.from(this.mediasElements).map((element) => {
        const media = new Media({
          element,
          geometry: this.planeGeometry,
          gl: this.gl,
          height: this.galleryHeight,
          scene: this.scene,
          screen: this.screen,
          viewport: this.viewport,
        })

        return media
      })
      console.log('📷 MEDIA -> createMedias', this.medias)
    },

    /**
     * Events.
     */
    onTouchDown(event) {
      this.isDown = true

      this.scroll.position = this.scroll.current
      this.start = event.touches ? event.touches[0].clientY : event.clientY
    },

    onTouchMove(event) {
      if (!this.isDown) return

      const y = event.touches ? event.touches[0].clientY : event.clientY
      const distance = (this.start - y) * 2

      this.scroll.target = this.scroll.position + distance
    },

    onTouchUp(event) {
      this.isDown = false
    },

    onWheel(event) {
      const normalized = NormalizeWheel(event)
      const speed = normalized.pixelY

      this.scroll.target += speed * 0.5
    },

    /**
     * Resize.
     */
    onResize() {
      this.screen = {
        height: window.innerHeight,
        width: window.innerWidth,
      }

      this.renderer.setSize(this.screen.width, this.screen.height)
      try {
        this.camera.perspective({
          aspect: this.gl.canvas.width / this.gl.canvas.height,
        })
      } catch (error) {
        console.error('📷 MEDIA -> error', error)
      }
      const fov = this.camera.fov * (Math.PI / 180)
      const height = 2 * Math.tan(fov / 2) * this.camera.position.z
      const width = height * this.camera.aspect

      this.viewport = {
        height,
        width,
      }

      this.galleryBounds = this.gallery.getBoundingClientRect()
      this.galleryHeight =
        (this.viewport.height * this.galleryBounds.height) / this.screen.height

      if (this.medias) {
        this.medias.forEach((media) =>
          media.onResize({
            height: this.galleryHeight,
            screen: this.screen,
            viewport: this.viewport,
          })
        )
      }
    },

    /**
     * Update.
     */
    update() {
      this.scroll.target += this.speed

      this.scroll.current = lerp(
        this.scroll.current,
        this.scroll.target,
        this.scroll.ease
      )

      if (this.scroll.current > this.scroll.last) {
        this.direction = 'down'
        this.speed = 2
      } else if (this.scroll.current < this.scroll.last) {
        this.direction = 'up'
        this.speed = -2
      }

      if (this.medias) {
        this.medias.forEach((media) =>
          media.update(this.scroll, this.direction)
        )
      }

      this.renderer.render({
        scene: this.scene,
        camera: this.camera,
      })

      this.scroll.last = this.scroll.current

      window.requestAnimationFrame(this.update.bind(this))
    },
    addEventListeners() {
      window.addEventListener('resize', this.onResize.bind(this))

      window.addEventListener('mousewheel', this.onWheel.bind(this))
      window.addEventListener('wheel', this.onWheel.bind(this))

      window.addEventListener('mousedown', this.onTouchDown.bind(this))
      window.addEventListener('mousemove', this.onTouchMove.bind(this))
      window.addEventListener('mouseup', this.onTouchUp.bind(this))

      window.addEventListener('touchstart', this.onTouchDown.bind(this))
      window.addEventListener('touchmove', this.onTouchMove.bind(this))
      window.addEventListener('touchend', this.onTouchUp.bind(this))
    },
  },
}
</script>
<style lang="postcss" scoped>
body {
  font-size: 15px;
  margin: 0;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  overscroll-behavior-y: none;

  &::after {
    animation: grain 6s steps(10) infinite;
    background-repeat: repeat;
    content: '';
    height: 300%;
    left: -100%;
    opacity: 0;
    pointer-events: none;
    position: fixed;
    top: -100%;
    transition: opacity 0.4s ease;
    width: 300%;
    will-change: transform;
    z-index: 3;
  }

  .loaded &::after {
    opacity: 0.06;
  }
}

body #cdawrap {
  --cda-bottom: 3rem;
  --cda-left: 3rem;
  --cda-width: 400px;
  --cda-footer-fontsize: initial;
  --cda-footer-color: rgba(255, 255, 255, 0.5);
}

body #cdawrap a:hover {
  text-decoration: none;
  opacity: 0.7;
}

img {
  display: block;
}

@keyframes grain {
  0% {
    transform: translate(20%, -15%);
  }
  10% {
    transform: translate(-20%, -15%);
  }
  20% {
    transform: translate(20%, -5%);
  }
  30% {
    transform: translate(-20%, -5%);
  }
  40% {
    transform: translate(20%, 5%);
  }
  50% {
    transform: translate(-20%, 5%);
  }
  60% {
    transform: translate(20%, 15%);
  }
  70% {
    transform: translate(-20%, 15%);
  }
  80% {
    transform: translate(20%, 5%);
  }
  90% {
    transform: translate(-20%, 5%);
  }
  100% {
    transform: translate(20%, -5%);
  }
}

#container {
  @apply w-screen h-screen;
}

.demo-1 {
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

.demo-1__header {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;

  .loaded & {
    opacity: 1;
    transition: opacity 0.4s ease;
  }
}

.demo-1__title {
  /* font: 800 20rem/1 'moret', serif; */
  @apply text-white;
}

.demo-1__description {
  font-size: 2rem;
  margin-top: -1rem;
  opacity: 0.75;
}

.demo-1__gallery {
  height: 295rem;
  position: relative;
  visibility: hidden;

  @media (max-width: 1200px) {
    height: 650rem;
  }
}

.demo-1__gallery__figure {
  position: absolute;

  &:nth-child(1) {
    height: 40rem;
    width: 70rem;
  }

  &:nth-child(2) {
    height: 50rem;
    left: 85rem;
    top: 30rem;
    width: 40rem;
  }

  &:nth-child(3) {
    height: 50rem;
    left: 15rem;
    top: 60rem;
    width: 60rem;
  }

  &:nth-child(4) {
    height: 30rem;
    right: 0;
    top: 10rem;
    width: 50rem;
  }

  &:nth-child(5) {
    height: 60rem;
    right: 15rem;
    top: 55rem;
    width: 40rem;
  }

  &:nth-child(6) {
    height: 75rem;
    left: 5rem;
    top: 120rem;
    width: 57.5rem;
  }

  &:nth-child(7) {
    height: 70rem;
    right: 0;
    top: 130rem;
    width: 50rem;
  }

  &:nth-child(8) {
    height: 50rem;
    left: 85rem;
    top: 95rem;
    width: 40rem;
  }

  &:nth-child(9) {
    height: 65rem;
    left: 75rem;
    top: 155rem;
    width: 50rem;
  }

  &:nth-child(10) {
    height: 43rem;
    right: 0;
    top: 215rem;
    width: 30rem;
  }

  &:nth-child(11) {
    height: 50rem;
    left: 70rem;
    top: 235rem;
    width: 80rem;
  }

  &:nth-child(12) {
    left: 0;
    top: 210rem;
    height: 70rem;
    width: 50rem;
  }

  @media (max-width: 1200px) {
    &:nth-child(1) {
      height: 60rem;
      width: 100rem;
    }

    &:nth-child(2) {
      height: 110rem;
      left: auto;
      right: 0;
      top: 25rem;
      width: 70rem;
    }

    &:nth-child(3) {
      height: 80rem;
      left: 12rem;
      top: 80rem;
      width: 89rem;
    }

    &:nth-child(4) {
      height: 60rem;
      right: 0;
      top: 153rem;
      width: 60rem;
    }

    &:nth-child(5) {
      height: 110rem;
      left: 0;
      right: auto;
      top: 180rem;
      width: 70rem;
    }

    &:nth-child(6) {
      height: 135rem;
      left: 95rem;
      top: 230rem;
      width: 87.5rem;
    }

    &:nth-child(7) {
      height: 110rem;
      left: 0;
      right: auto;
      top: 310rem;
      width: 80rem;
    }

    &:nth-child(8) {
      height: 50rem;
      left: auto;
      right: 0;
      top: 385rem;
      width: 80rem;
    }

    &:nth-child(9) {
      height: 100rem;
      left: 110rem;
      top: 450rem;
      width: 70rem;
    }

    &:nth-child(10) {
      height: 50rem;
      left: 20rem;
      right: auto;
      top: 440rem;
      width: 55rem;
    }

    &:nth-child(11) {
      height: 70rem;
      left: auto;
      right: 0;
      top: 570rem;
      width: 70rem;
    }

    &:nth-child(12) {
      left: 0;
      top: 515rem;
      height: 100rem;
      width: 90rem;
    }
  }
}

.demo-1__gallery__image {
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
