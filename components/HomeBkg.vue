<template>
  <div ref="bkg_home">
    <div id="container"></div>
  </div>
</template>

<script>
import * as Three from 'three'

export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      geometry: null,
      texture: null,
      img: null,
      bgWidth: null,
      bgHeight: null,
      uniforms: null,
      loader: null,
      fShader: null,
      vShader: null,
      play: true,
      observer: null,
    }
  },
  mounted() {
    // this.$store.subscribe((mutation, state) => {
    //   if (mutation.type === 'app/setSection') {
    //     this.play = mutation.payload === 'index_home'
    //   }
    // })
    this.ShaderLoader(
      './home/v1_vertexShader.vert',
      './home/v1_fragment.frag',
      this.start
    )
    this.observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        const newValue = m.target.getAttribute(m.attributeName)
        this.$nextTick(() => {
          this.onClassChange(newValue, m.oldValue)
        })
      }
    })

    this.observer.observe(this.$refs.bkg_home, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class'],
    })
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  methods: {
    start(vertex, fragment) {
      this.fShader = fragment
      this.vShader = vertex
      this.init()
      this.animate()
    },
    init() {
      const container = document.getElementById('container')

      this.camera = new Three.Camera()
      this.camera.position.z = 1

      this.scene = new Three.Scene()

      const geometry = new Three.PlaneBufferGeometry(2, 2)

      this.uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new Three.Vector2() },
        u_mouse: { type: 'v2', value: new Three.Vector2() },
      }
      const material = new Three.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: this.vShader, // document.getElementById('vertexShader').textContent,
        fragmentShader: this.fShader, // : fragmentShader, // document.getElementById('fragmentShader').textContent,
      })
      material.needsUpdate = true
      const mesh = new Three.Mesh(geometry, material)
      this.scene.add(mesh)

      this.renderer = new Three.WebGLRenderer()
      this.renderer.setPixelRatio(window.devicePixelRatio)

      container.appendChild(this.renderer.domElement)

      this.onWindowResize()
      window.addEventListener('resize', this.onWindowResize, false)
      document.onmousemove = this.mouseMove
    },
    onWindowResize(event) {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.uniforms.u_resolution.value.x = this.renderer.domElement.width
      this.uniforms.u_resolution.value.y = this.renderer.domElement.height
    },
    animate() {
      if (!this.play) return
      requestAnimationFrame(this.animate)
      this.render()
    },
    mouseMove(e) {
      this.uniforms.u_mouse.value.x = e.pageX
      this.uniforms.u_mouse.value.y = e.pageY
    },
    render() {
      this.uniforms.u_time.value +=
        0.05 * (1 + this.uniforms.u_mouse.value.x / 500)
      this.renderer.render(this.scene, this.camera)
    },
    ShaderLoader(vertexUrl, fragmentUrl, onLoad, onProgress, onError) {
      const vertexLoader = new Three.XHRLoader(Three.DefaultLoadingManager)
      vertexLoader.setResponseType('text')
      vertexLoader.load(
        vertexUrl,
        function (vertexText) {
          const fragmentLoader = new Three.XHRLoader(
            Three.DefaultLoadingManager
          )
          fragmentLoader.setResponseType('text')
          fragmentLoader.load(fragmentUrl, function (fragmentText) {
            onLoad(vertexText, fragmentText)
          })
        },
        onProgress,
        onError
      )
    },
    onClassChange(classAttrValue) {
      const classList = classAttrValue.split(' ')
      if (classList.includes('is-inview')) {
        document.getElementById('nav_site').classList.remove('dif')
        this.play = true
        if (this.fShader !== null) {
          this.animate()
        }
      } else {
        document.getElementById('nav_site').classList.add('dif')

        this.play = false
      }
    },
  },
}
</script>
<style lang="postcss" scoped>
#container {
  @apply w-screen h-screen;
}
</style>
