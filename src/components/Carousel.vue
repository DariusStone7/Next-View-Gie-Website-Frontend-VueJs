<script setup>
import { carousels } from '../states/states.js'
import { setImage } from '../utils/index.js'
// Default theme
import '@splidejs/vue-splide/css'
import '@splidejs/vue-splide/css/core'

// or other themes
// import '@splidejs/vue-splide/css/skyblue';
// import '@splidejs/vue-splide/css/sea-green';
// or only core styles

const options = {
  rewind: true,
  autoplay: true,
  height: 'auto',
  arrows: false,
  arrowPath: 'm7.61 0.807-2.12...',
  interval: 4000,
  keyboard: 'global'
}
</script>


<template>
  <div class="carousel">
    <Splide :options="options" data-splide='{"type":"fade"}'>
      <SplideSlide v-for="(carousel, index) in carousels" :key="index">
        <img :src="setImage(carousel.image)" alt="Sample 1" />
      </SplideSlide>
    </Splide>
  </div>
</template>


<style scoped>
.carousel {
  width: 100%;
  height: auto;
  /* background-color: black; */
}
.carousel img {
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 800px) {
  .carousel {
    height: auto;
  }
  .carousel img {
    height: 100%;
  }
}
</style>
