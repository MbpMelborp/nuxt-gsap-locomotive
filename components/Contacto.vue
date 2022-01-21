<template>
  <div class="contacto" data-scroll-section data-scroll-call="contacto">
    <div class="contacto_int">
      <address>
        <p>
          <span class="a1">km 17 vía las palmas </span>
          <span class="a2">parque la reserva </span>
          <span class="a3">Piso 4 </span>
          <span class="a4">Envigado, Colombia.</span>
        </p>
      </address>
    </div>
    <div class="contacto_info">
      <div class="contacto_info_int">
        <div class="mails">
          <a href="mailto:info@melborp.co ">info@melborp.co </a>
          <a href="mailto:brief@melborp.co">brief@melborp.co</a>
        </div>
        <div class="tels">
          <p>tel: +57 4 311 98 26</p>
          <p>cel: 301 500 4179</p>
        </div>
        <div class="hvs">
          <p><b> Hojas de vida</b></p>
          <a href="mailto:welcome@melborp.co">brief@melborp.co</a>
        </div>
        <div class="social">
          <a href="">
            <i class="fab fa-behance"></i>
          </a>
          <a href="">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
.contacto {
  @apply flex flex-col justify-between w-full pt-80 pb-24;
  .contacto_int {
    @apply w-full max-w-9xl mx-auto mb-40;
    address {
      @apply not-italic;
      p {
        @apply mx-4 md:mx-0 md:grid md:grid-cols-12 md:grid-rows-3 md:gap-x-4 md:gap-y-0;
        span {
          @apply md:block leading-none;
          &.a1 {
            font-variation-settings: 'wght' var(--font-weight, 400),
              'wdth' var(--font-width, 120), 'ital' 0;
            @apply text-6xl md:text-7xl md:col-start-3 md:col-span-8 row-start-1 row-span-1 col-span-1 uppercase;
          }
          &.a2 {
            font-variation-settings: 'wght' var(--font-weight, 400),
              'wdth' var(--font-width, 120), 'ital' 0;
            @apply text-right text-6xl md:text-7xl md:col-span-8 md:col-start-1 row-start-2 row-span-1 uppercase;
          }
          &.a3 {
            font-variation-settings: 'wght' var(--font-weight, 400),
              'wdth' var(--font-width, 130), 'ital' 0;
            @apply text-xl self-center md:text-xl md:col-span-2 md:col-start-9 row-start-2 row-span-1 uppercase;
          }
          &.a4 {
            font-variation-settings: 'wght' var(--font-weight, 200),
              'wdth' var(--font-width, 130), 'ital' 0;
            @apply text-center text-6xl md:text-7xl md:col-span-10 md:col-start-2 row-start-3 row-span-1;
          }
        }
      }
    }
  }
  .contacto_info {
    @apply mt-auto w-full max-w-9xl mx-auto;
    .contacto_info_int {
      @apply md:mx-16 md:grid md:grid-cols-12 md:grid-rows-2 md:gap-x-4 md:gap-y-0;
      a {
        @apply text-sm md:text-xl transition-all duration-300 ease-in-out;
        &:hover {
          @apply text-black-800;
        }
      }
      .mails {
        @apply md:col-start-4 md:col-span-2 md:row-start-1 md:row-span-1;
      }
      .tels {
        @apply md:col-start-7 md:col-span-2 md:row-start-1 md:row-span-1;
      }
      .hvs {
        @apply md:col-start-10 md:col-span-2 md:row-start-1 md:row-span-1;
      }
      .social {
        @apply mt-16 text-sm md:col-start-1 md:col-span-4 md:row-start-2 md:row-span-1 font-light flex space-x-4;
        a {
          font-variation-settings: 'wght' var(--font-weight, 200),
            'wdth' var(--font-width, 130), 'ital' 0;
          @apply inline-block;
        }
      }
    }
  }
}
</style>
