<script setup>
import { abouts } from '../states/states.js'
import { setImage } from '../utils/index.js'
</script>

<template>
  <div class="row block justify-content-center">
    <div class="col mb-5 description">
      <h1>{{ abouts[0].title }}</h1>
      <p>
        {{ abouts[0].text }}
      </p>
      <div class="description-images d-flex justify-content-bettween">
        <div class="d-quality">
          <img :src="setImage('./images/about/param.avif')" alt="qualité" />
          <h3>Qualité</h3>
          <p>Pour une meilleur qualité de service</p>
        </div>
        <div class="d-support">
          <br />
          <img :src="setImage('./images/about/contactez-icones.avif')" alt="support" />
          <h3>Support</h3>
          <p>Un support rapide et éfficace</p>
        </div>
      </div>
    </div>
    <div class="col image">
      <img
        :src="setImage(abouts[0].image)"
        alt=""
      />
    </div>
  </div>
</template>


<style scoped>
.block {
  padding: 10%;
  width: 100%;
}
.block .description {
  padding: 50px 2% 0px 0px;
  width: 50%;
}
.block .description h1 {
  padding-bottom: 20px;
}
.block .description p {
  font-size: 20px;
  font-family: 'Times New Roman', Times, serif;
  text-align: justify;
}
.block .image {
  width: 50%;
  padding-right: 0%;
}
.block .image img {
  border-radius: 50px 20px 50px 20px;
  width: 100%;
}
.block .description-images {
  width: 100%;
}
.block .description-images img {
  width: 50%;
}
.block .description-images .d-quality,
.block .d-support {
  width: 50%;
  padding-right: 15%;
  text-align: justify;
}
@media screen and (max-width: 1000px) {
  .block {
    display: block;
    width: 100%;
  }
  .block .description {
    width: auto;
    padding: 0px;
  }
  .block .description-images {
    width: auto;
    padding: auto;
  }
  .block .image {
    width: 80%;
    padding: 0px;
    display: none;
  }
}
</style>