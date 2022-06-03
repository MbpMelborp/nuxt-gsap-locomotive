<template>
  <div class="proyect-wrap">
    <div class="item-project">
      <div class="item-project-wrap">
        <nuxt-link
          v-cursor-right
          class="item-project-wrap-fl"
          :to="proyecto.full_slug"
        >
          <div class="item-project-wrap-fl-title">
            <h4>
              {{ proyecto.content.cliente }},
              {{ proyecto.content.nombre }}
            </h4>
            <h3>
              {{ proyecto.content.titular }}
            </h3>
            <div class="item-project-wrap-fl-title-intro">
              <div class="tipo">
                {{ proyecto.content.tipo }}
              </div>
              <div
                v-html="
                  $storyapi.richTextResolver.render(proyecto.content.intro)
                "
              ></div>
              <div class="pmel nproblem">
                <h5>Problem</h5>
                <div
                  v-html="
                    $storyapi.richTextResolver.render(proyecto.content.problem)
                  "
                ></div>
              </div>
              <div class="pmel nmelborp">
                <h5>Melborp</h5>
                <div
                  v-html="
                    $storyapi.richTextResolver.render(proyecto.content.melborp)
                  "
                ></div>
              </div>
            </div>
          </div>

          <div
            v-lazy-container="{ selector: 'img' }"
            class="item-project-wrap-fl-content"
          >
            <img
              v-if="
                proyecto.content.home[0].media1.filename.split('.').pop() !=
                'mp4'
              "
              :data-src="proyecto.content.home[0].media1.filename + '/m/'"
              :data-loading="
                proyecto.content.home[0].media1.filename +
                '/m/filters:quality(10)'
              "
              :data-error="
                proyecto.content.home[0].media1.filename +
                '/m/filters:quality(10)'
              "
              :alt="proyecto.content.nombre"
              class="img_1 vlazy"
            />
            <video v-else muted playsinline loop preload autoplay class="img_1">
              <source
                :src="proyecto.content.home[0].media1.filename"
                type="video/mp4"
              />
            </video>
            <img
              v-if="
                proyecto.content.home[0].media2.filename.split('.').pop() !=
                'mp4'
              "
              :data-scroll="!$isMobile() ? true : false"
              :data-scroll-speed="!$isMobile() ? 0.5 : 0"
              :data-src="proyecto.content.home[0].media2.filename + '/m/'"
              :data-loading="
                proyecto.content.home[0].media2.filename +
                '/m/filters:quality(10)'
              "
              :data-error="
                proyecto.content.home[0].media2.filename +
                '/m/filters:quality(10)'
              "
              :alt="proyecto.content.nombre"
              class="img_2 vlazy"
            />
            <video v-else muted playsinline loop preload autoplay class="img_2">
              <source
                :src="proyecto.content.home[0].media2.filename"
                type="video/mp4"
              />
            </video>
            <img
              v-if="
                proyecto.content.home[0].media3.filename.split('.').pop() !=
                'mp4'
              "
              :data-scroll="!$isMobile() ? true : false"
              :data-scroll-speed="!$isMobile() ? -0.5 : 0"
              :data-src="proyecto.content.home[0].media3.filename + '/m/'"
              :data-loading="
                proyecto.content.home[0].media3.filename +
                '/m/filters:quality(10)'
              "
              :data-error="
                proyecto.content.home[0].media3.filename +
                '/m/filters:quality(10)'
              "
              :alt="proyecto.content.nombre"
              class="img_3 vlazy"
            />
            <video v-else muted playsinline loop preload autoplay class="img_3">
              <source
                :src="proyecto.content.home[0].media3.filename"
                type="video/mp4"
              />
            </video>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    proyecto: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="postcss">
.proyect-wrap {
  .item-project {
    @apply pt-8 pb-8 md:pb-32 w-full max-w-9xl mx-auto overflow-hidden 2xl:mb-12;
    hr {
      @apply mx-4 md:mx-14 mb-8;
    }
    &-wrap {
      @apply mx-8 md:mx-20;
      .item-project-title {
        font-variation-settings: 'wght' var(--font-weight, 400),
          'wdth' var(--font-width, 80), 'ital' 0;
        @apply mb-8 text-sm;
      }
      p {
        @apply mb-4;
      }
      &-fl {
        @apply flex justify-between flex-col-reverse md:flex-row items-center transition-all duration-1000 ease-in-out;
        &-title {
          @apply w-full md:w-4/12 text-sm;
          p {
            @apply text-base;
          }
          h4 {
            font-variation-settings: 'wght' var(--font-weight, 600),
              'wdth' var(--font-width, 120), 'ital' 0;
            @apply text-3xl mb-2 uppercase;
          }
          h3 {
            @apply text-2xl mb-6;
          }
          &-intro {
            .tipo {
              font-variation-settings: 'wght' var(--font-weight, 500),
                'wdth' var(--font-width, 130), 'ital' 0;
              @apply opacity-50 mb-4;
            }
          }
          .pmel {
            @apply mb-4;
            h5 {
              font-variation-settings: 'wght' var(--font-weight, 600),
                'wdth' var(--font-width, 120), 'ital' 0;
              @apply text-xl mb-2 uppercase;
            }
            &.nproblem {
              p {
                @apply line-through;
              }
            }
          }
        }
        &-content {
          @apply w-full mb-8 mt-16 md:mb-0 md:mt-0 md:w-7/12 text-sm md:grid md:grid-cols-12 md:grid-rows-6;
          .img_1 {
            transition: all 0.5s ease-in-out;
            @apply block md:col-start-1 md:col-span-7 md:row-start-1 md:row-span-5;
          }
          .img_2 {
            transition: all 0.5s ease-in-out;
            @apply delay-75 hidden md:block md:col-start-7 md:col-span-6 md:row-start-3 md:row-span-4;
          }
          .img_3 {
            transition: all 0.5s ease-in-out;
            @apply delay-100 hidden md:block md:col-start-2 md:col-span-4 md:row-start-4 md:row-span-3;
          }
          img {
            @apply w-full object-cover;
          }
        }
      }
      &-fl:hover {
        @media (min-width: 768px) {
          .img_1 {
            transform: scale(0.8) !important;
          }
          .img_2 {
            transform: scale(0.9) !important;
          }
          .img_3 {
            transform: scale(1.1) !important;
          }
        }
      }
    }
  }
}
</style>
