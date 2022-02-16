<template>
  <div class="media_video">
    <div :class="`media_video_wrapper ${media.posicion}`">
      <video
        :ref="`video_${media._uid}`"
        v-intersection="handlerStopVideo"
        loading="lazy"
        :controls="!media.loop"
        :src="media.video.filename"
        class="media_video_player"
        preload="auto"
        :loop="media.loop"
        :autoplay="media.autoplay"
        :muted="media.autoplay"
        :poster="media.poster.filename + '/m/'"
      ></video>

      <button
        v-if="!media.loop"
        :id="`video_btn_${media._uid}`"
        v-cursor-right
        class="media_video_poster dif"
        :lazy-background="media.poster.filename + '/m/'"
        @click="playVideo"
      >
        <b class="t proy_link btn-mbp hvr-sweep-to-top">
          <span :class="!media.multiply ? '' : 'no-multy'">
            Play <i class="fal fa-play"></i>
          </span>
        </b>
      </button>
    </div>
    <template v-if="showdesc" v-intersection="clipToRight">
      <div
        v-if="media.descripcion"
        :class="`descripcion media_video_content ${media.posicion}`"
        v-html="$storyapi.richTextResolver.render(media.descripcion)"
      ></div>
    </template>
  </div>
</template>
<script>
import { gsap, Expo } from 'gsap'

import loaderm from '~/mixins/loader.js'

export default {
  mixins: [loaderm],
  props: {
    media: {
      type: Object,
      default: null,
    },
  },
  data() {
    return { showdesc: true }
  },
  mounted() {
    // console.log(
    //   'VIDEO',
    //   this.$storyapi.richTextResolver.render(this.media.descripcion)
    // )
    if (
      this.$storyapi.richTextResolver.render(this.media.descripcion) ===
      '<p></p>'
    ) {
      this.showdesc = false
    }
    if (this.media.autoplay) this.playVideo()
  },
  methods: {
    playVideo(e) {
      this.$refs[`video_${this.media._uid}`].play()
      gsap.to(`#video_btn_${this.media._uid}`, {
        //   clipPath: 'inset(0% 0% 0% 0%)',
        autoAlpha: 0,
        duration: 1,

        onComplete: () => {},
        ease: Expo.easeInOut,
      })
    },
    stopVideo() {
      if (!this.media.autoplay) {
        const videop = this.$refs[`video_${this.media._uid}`]
        videop.pause()
        videop.currentTime = 0
        gsap.to(`#video_btn_${this.media._uid}`, {
          //   clipPath: 'inset(0% 0% 0% 0%)',
          autoAlpha: 1,
          duration: 0.5,

          onComplete: () => {},
          ease: Expo.easeInOut,
        })
      } else {
        this.playVideo()
      }
    },
    handlerStopVideo(e, observer, isIntersecting, ratio) {
      if (!isIntersecting) {
        if (!this.media.autoplay) {
          console.log('VIDEO', 'stoped')
          this.stopVideo()
        } else {
          this.playVideo()
        }
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.media_video {
  @apply grid grid-cols-5;
  .media_video_wrapper {
    padding-top: 56%;
    @apply relative w-full h-0 self-center;
    &.center {
      @apply col-span-full;
    }
    &.left {
      @apply col-span-full md:col-start-1 md:col-end-5;
    }
    &.right {
      @apply col-span-full md:col-start-2 md:col-end-6 md:order-2;
    }

    .media_video_player {
      @apply absolute top-0 right-0 left-0 bottom-0 w-full h-full inline-block object-contain;
    }
    .media_video_poster {
      background-position: 50% 50%;
      background-size: 100% 100%;
      -webkit-transition: opacity 800ms, height 0s;
      transition: opacity 800ms, height 0s;
      -webkit-transition-delay: 0s, 0s;
      transition-delay: 0s, 0s;
      @apply absolute top-0 right-0 left-0 bottom-0 w-full h-full cursor-pointer border-none outline-none overflow-hidden opacity-100 text-sm bg-cover;
      b {
        font-variation-settings: 'wght' var(--font-weight, 100),
          'wdth' var(--font-width, 80), 'ital' 0;
        @apply text-8xl md:text-9xl text-white shadow-sm transition-all tracking-tighter;
        i {
          @apply text-2xl md:text-6xl;
        }
      }
      &.dif {
        b {
          span {
            position: relative;
            -webkit-mix-blend-mode: overlay;
            -moz-mix-blend-mode: overlay;
            -o-mix-blend-mode: overlay;
            -ms-mix-blend-mode: overlay;
            mix-blend-mode: overlay;
            &.no-multy {
              -webkit-mix-blend-mode: normal;
              -moz-mix-blend-mode: normal;
              -o-mix-blend-mode: normal;
              -ms-mix-blend-mode: normal;
              mix-blend-mode: normal;
              @apply text-white;
            }
          }
        }
      }
      &:hover {
        b {
          font-variation-settings: 'wght' var(--font-weight, 400),
            'wdth' var(--font-width, 120), 'ital' 0;
        }
      }
    }
  }
  .media_video_content {
    @apply my-8 self-center;
    &.center {
      @apply col-start-3 col-end-6;
    }
    &.left {
      @apply col-span-full md:col-start-5 md:col-end-6 md:p-8;
    }
    &.right {
      @apply col-span-full md:col-start-1 md:col-end-2 md:order-1 md:p-8;
    }
  }
}
</style>
