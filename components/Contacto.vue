<template>
  <div class="contacto_wrap">
    <div class="contacto_int">
      <address>
        <p>
          <span class="a1">{{ story.content.direccion_1 }} </span>
          <span class="a2">{{ story.content.direccion_2 }} </span>
          <span class="a3">{{ story.content.direccion_3 }} </span>
          <span class="a4">{{ story.content.direccion_4 }} </span>
        </p>
      </address>
    </div>
    <div class="contacto">
      <div class="contacto_info">
        <div class="contacto_info_int">
          <div class="mails">
            <a v-cursor-right href="mailto:info@melborp.co "
              >info@melborp.co
            </a>
            <a v-cursor-right href="mailto:brief@melborp.co"
              >brief@melborp.co</a
            >
          </div>
          <div class="chat">
            <a
              v-cursor-right
              class="wap"
              :href="`https://wa.me/57${story.content.whataspp}`"
              target="_blank"
            >
              <i class="fab fa-whatsapp"></i> Whatsapp
            </a>
            <a
              v-cursor-right
              class="fac"
              href="http://m.me/melborpco"
              target="_blank"
            >
              <i class="fab fa-facebook-messenger"></i> Facebook
            </a>
          </div>
          <div
            class="tels"
            v-html="$storyapi.richTextResolver.render(story.content.tels)"
          ></div>
          <div class="hvs">
            <p><b> Hojas de vida</b></p>
            <a v-cursor-right href="mailto:welcome@melborp.co"
              >welcome@melborp.co</a
            >
          </div>
          <div class="social">
            <a
              v-cursor-right
              href="https://www.behance.net/melborp"
              target="_blank"
            >
              <i class="fab fa-behance"></i>
            </a>
            <a
              v-cursor-right
              href="https://www.instagram.com/melborp/"
              target="_blank"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              v-cursor-right
              href="https://www.instagram.com/melborp/"
              target="_blank"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              v-cursor-right
              href="https://www.linkedin.com/company/melborp/"
              target="_blank"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-lazy-container="{ selector: 'img' }" class="contacto-img-1">
      <img
        :data-src="story.content.imagenes[0].filename"
        :data-loading="
          story.content.imagenes[0].filename + '/m/filters:quality(10)'
        "
        :data-error="
          story.content.imagenes[0].filename + '/m/filters:quality(10)'
        "
        class="vlazy"
      />
    </div>
    <div v-lazy-container="{ selector: 'img' }" class="contacto-img-2">
      <img
        :data-src="story.content.imagenes[1].filename"
        :data-loading="
          story.content.imagenes[1].filename + '/m/filters:quality(10)'
        "
        :data-error="
          story.content.imagenes[1].filename + '/m/filters:quality(10)'
        "
        class="vlazy"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    story: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    console.log('CONTACTO', this.story.content)
  },
}
</script>

<style lang="postcss" scoped>
.contacto_wrap {
  @apply block pt-32 md:pt-0 md:grid md:grid-cols-12 md:grid-rows-6 w-screen md:min-h-screen;

  .contacto-img-1 {
    @apply hidden md:block md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-4 z-0;
    img {
      @apply object-cover w-full h-full;
    }
  }
  .contacto-img-2 {
    @apply hidden md:block md:col-start-10 md:col-span-3 row-start-4 row-span-2 z-0;
    img {
      @apply object-cover w-full h-full;
    }
  }
  .contacto_int {
    @apply block w-full mb-8 md:mb-0 md:col-start-3 md:col-span-8 row-start-2 row-span-3 z-10 md:self-center;
    address {
      @apply not-italic;
      p {
        @apply mx-4 md:mx-0 md:grid md:grid-cols-12 md:grid-rows-3 md:gap-x-4 md:gap-y-0;

        span {
          @apply md:block leading-none;
          &.a1 {
            font-variation-settings: 'wght' var(--font-weight, 400),
              'wdth' var(--font-width, 120), 'ital' 0;
            @apply text-4xl md:text-6xl xl:text-7xl md:col-start-3 md:col-span-8 row-start-1 row-span-1 col-span-1 uppercase;
          }
          &.a2 {
            font-variation-settings: 'wght' var(--font-weight, 400),
              'wdth' var(--font-width, 120), 'ital' 0;
            @apply text-right text-4xl md:text-6xl xl:text-7xl md:col-span-8 md:col-start-1 row-start-2 row-span-1 uppercase;
          }
          &.a3 {
            font-variation-settings: 'wght' var(--font-weight, 400),
              'wdth' var(--font-width, 130), 'ital' 0;
            @apply text-base self-center md:text-lg xl:text-xl md:col-span-2 md:col-start-9 row-start-2 row-span-1 uppercase;
          }
          &.a4 {
            font-variation-settings: 'wght' var(--font-weight, 200),
              'wdth' var(--font-width, 130), 'ital' 0;
            @apply text-center text-4xl md:text-5xl xl:text-7xl md:col-span-10 md:col-start-2 row-start-3 row-span-1;
          }
        }
      }
    }
  }
  .contacto {
    @apply z-10 mb-8 md:mb-0 md:self-end md:col-start-1 md:col-span-10 md:row-start-5 md:row-span-2 flex flex-col justify-between w-full;
    .contacto_info {
      @apply mt-auto w-full max-w-9xl mx-auto;
      .contacto_info_int {
        @apply mx-4 md:mx-16 md:grid md:grid-cols-12 md:grid-rows-2 md:gap-x-4 md:gap-y-0 text-xl md:text-lg;
        a {
          @apply transition-all duration-300 ease-in-out;
          &:hover {
            @apply text-black-800;
          }
        }

        .mails {
          @apply mb-8 md:mb-0 md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-1;
          a {
            @apply block mb-0;
          }
        }
        .chat {
          @apply mb-8 md:mb-0 md:col-start-4 md:col-span-2 md:row-start-1 md:row-span-1;
          a {
            @apply block mb-2 rounded-full px-2 py-1.5 text-center transition-all border text-sm;
            &.wap {
              @apply border-green-100 hover:border-green-400 text-green-500;
            }
            &.fac {
              @apply border-blue-100 hover:border-blue-400 text-blue-500;
            }
            i {
              @apply text-sm;
            }
          }
        }
        .tels {
          @apply mb-8 md:mb-0 md:col-start-7 md:col-span-2 md:row-start-1 md:row-span-1;
          p {
            @apply mb-3;
          }
        }
        .hvs {
          @apply mb-8 md:mb-0 mt-12 md:mt-0 md:col-start-10 md:col-span-2 md:row-start-1 md:row-span-1;
        }
        .social {
          @apply mt-16 md:mt-2 md:col-start-1 md:col-span-4 md:row-start-2 md:row-span-1 font-light flex space-x-4;
          a {
            font-variation-settings: 'wght' var(--font-weight, 200),
              'wdth' var(--font-width, 130), 'ital' 0;
            @apply inline-block text-xl md:text-lg;
          }
        }
      }
    }
  }
}
</style>
