<template>
  <div class="media_video">
    <div :class="`media_video_wrapper ${media.posicion}`">
      <intersect v-lazy-container="{ selector: 'video' }" @leave="stopVideo()">
        <video
          :ref="`video_${media._uid}`"
          loading="lazy"
          controls=""
          :data-src="media.video.filename"
          class="media_video_player"
          preload="auto"
          :poster="media.poster.filename"
        ></video>
      </intersect>

      <button
        :id="`video_btn_${media._uid}`"
        v-cursor-right
        class="media_video_poster"
        :lazy-background="media.poster.filename"
        @click="playVideo"
      >
        <b class="t proy_link btn-mbp hvr-sweep-to-top">
          <span> Play <i class="fal fa-play"></i> </span>
        </b>
      </button>
    </div>
    <intersect v-if="showdesc" @enter="clipToRight">
      <div
        v-if="media.descripcion"
        :class="`descripcion media_video_content ${media.posicion}`"
        v-html="$storyapi.richTextResolver.render(media.descripcion)"
      ></div>
    </intersect>
  </div>
</template>
<script>
import { gsap, Expo } from 'gsap'
import Intersect from 'vue-intersect'
import loaderm from '~/mixins/loader.js'
export default {
  components: {
    Intersect,
  },
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
    console.log(
      'VIEDO',
      this.$storyapi.richTextResolver.render(this.media.descripcion)
    )
    if (
      this.$storyapi.richTextResolver.render(this.media.descripcion) ===
      '<p></p>'
    ) {
      this.showdesc = false
    }
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
        @apply text-4xl md:text-9xl text-white shadow-sm transition-all tracking-tighter;
        i {
          @apply text-2xl md:text-6xl;
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
