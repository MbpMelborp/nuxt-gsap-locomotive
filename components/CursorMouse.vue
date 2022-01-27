<template>
  <div class="custom-cursor">
    <div
      ref="customCursorCircle"
      class="custom-cursor__circle"
      :style="circleStyle"
    >
      <svg
        ref="cursorSvg"
        viewBox="0 0 45 46"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g
          class="move"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g transform="translate(-152.000000, -191.000000)" stroke-width="2">
            <g id="cursorfx" transform="translate(152.193604, 191.874200)">
              <path
                d="M2.18019648,1.5 L44.1801965,1.5 M2.30639648,1.6258 L2.5,43.5 M2.5,1.93268477 L44.0673152,43.5"
                stroke="#000000"
              ></path>
              <path
                d="M1.18019648,0.5 L43.1801965,0.5 M1.30639648,0.6258 L1.5,42.5 M1.5,0.932684766 L43.0673152,42.5"
                stroke="#FFFFFF"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomCursor',
  data() {
    return {
      targets: ['a', 'button', 'proyecto_data'],
      hoverSize: 2,
      scale: 1,
      x: null,
      y: null,
      circlePosX: null,
      circlePosY: null,
      circleStyle: null,
      svgStyle: null,
      rotate: 0,
    }
  },

  mounted() {
    this.initCursor()
  },
  methods: {
    initCursor() {
      window.addEventListener('mousemove', this.customCursor)
    },
    customCursor(e) {
      // cursor pos
      this.x = e.clientX
      this.y = e.clientY

      // cursor circle
      const circle = this.$refs.customCursorCircle

      if (circle) {
        this.circlePosX = this.x // - circle.clientWidth / 2
        this.circlePosY = this.y // - circle.clientWidth / 2
        circle.style.transform = `translate(${this.circlePosX}px,${this.circlePosY}px)`
      }
    },
  },
}
</script>

<style lang="scss">
$ease: cubic-bezier(0.23, 1, 0.32, 1);

.custom-cursor {
  cursor: none;
  pointer-events: none;
}
.custom-cursor__circle {
  position: fixed;
  cursor: none;
  top: 0;
  left: 0;
  width: 34px;
  height: 34px;
  transform: translate(0, 0);
  transition: transform 0.4s $ease;
  z-index: 999;
  svg {
    transition: transform 0.4s $ease;
    transform-origin: 0% 0%;
  }
}
.cursor {
  cursor: none;
  &.cursor-right {
    .custom-cursor__circle {
      svg {
        transform: scale(2) rotate(135deg);
        .move {
          animation: movecursor 1s infinite;
        }
      }
    }
  }
  &.cursor-left {
    .custom-cursor__circle {
      svg {
        transform: scale(2) rotate(-45deg);
        .move {
          animation: movecursor 1s infinite;
        }
      }
    }
  }
  &.cursor-up {
    .custom-cursor__circle {
      svg {
        transform: scale(2) rotate(90deg);
        .move {
          animation: movecursor 1s infinite;
        }
      }
    }
  }
  &.cursor-down {
    .custom-cursor__circle {
      svg {
        transform: scale(2) rotate(225deg);
        .move {
          animation: movecursor 1s infinite;
        }
      }
    }
  }
}
@keyframes movecursor {
  0% {
    transform: translate(0%, 0%);
  }
  50% {
    transform: translate(10%, 10%);
  }
  100% {
    transform: translate(0%, 0%);
  }
}
</style>
