<template>
  <div class="media_video">
    <div :class="`media_video_wrapper ${media.posicion}`">
      <video
        :ref="`video_${media._uid}`"
        loading="lazy"
        controls=""
        :src="media.video.filename"
        class="media_video_player"
        preload="auto"
        :poster="media.poster.filename"
      ></video>
      <button
        :id="`video_btn_${media._uid}`"
        class="media_video_poster"
        data-target="#fid_1062"
        :style="`
          background-image: url(${media.poster.filename});
        `"
        @click="playVideo"
      >
        <b class="t proy_link btn-mbp hvr-sweep-to-top">
          <span> Ver video </span>
        </b>
      </button>
    </div>
    <div
      v-if="media.descripcion"
      :class="`media_video_content ${media.posicion}`"
      v-html="$storyapi.richTextResolver.render(media.descripcion)"
    ></div>
  </div>
</template>
<script>
import { gsap, Expo } from 'gsap'
export default {
  props: {
    media: {
      type: Object,
      default: null,
    },
  },

  methods: {
    playVideo(e) {
      this.$refs[`video_${this.media._uid}`].play()
      gsap.fromTo(
        `#video_btn_${this.media._uid}`,
        {
          //   clipPath: 'inset(0% 100% 0% 0%)',
        },
        {
          //   clipPath: 'inset(0% 0% 0% 0%)',
          autoAlpha: 0,
          duration: 1,

          onComplete: () => {},
          ease: Expo.easeInOut,
        }
      )
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
      font-size: 0.9em;

      @apply absolute top-0 right-0 left-0 bottom-0 w-full h-full cursor-pointer border-none outline-none overflow-hidden opacity-100 text-sm bg-cover;
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
