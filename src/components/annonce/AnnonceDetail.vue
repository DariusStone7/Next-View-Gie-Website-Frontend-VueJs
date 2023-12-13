  <script setup>
import { onMounted, onBeforeMount, ref, defineProps } from 'vue'
import { setImage } from '../../utils/index.js'
import { annonces } from '../../states/states.js'
import { useRoute } from 'vue-router'
import axios from 'axios'
import '@splidejs/vue-splide/css'
import '@splidejs/vue-splide/css/core'

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  url: String,
  price: Number,
  bedroom: Number,
  bathroom: Boolean,
  warehouse: Boolean,
  parking: Boolean,
  pool: Boolean,
  wind: Boolean,
  furniture: Boolean,
  fredge: Boolean,
  phone: String,
  address: String,
  email: String,
  images: String
})

const cardOptions = {
  rewind: true,
  autoplay: true,
  height: 'auto',
  arrows: false,
  arrowPath: 'm7.61 0.807-2.12...',
  interval: 4000,
  keyboard: 'global'
}

const options = {
  rewind: true,
  // autoplay: true,
  height: 'auto',
  // interval: 3000,
  // keyboard: 'global',
  arrows: false
}

const thumbnailOptions = {
  type: 'slide',
  perPage: 4,
  focus: 'center',
  pagination: true,
  isNavigation: true,
  width: 'auto',
  arrows: false
}

const splide = ref(0) // Capture du contexte actuel (composant Vue)

const goToSlide = (index) => {
  splide.value.go(index)
}

// const onSlideChange = () => {
//   alert(aaaa)
// }
</script>
<template>
  <div class="content justify-content-between">
    <div class="card">
      <div class="image" v-if="props.url">
        <iframe
          width="100%"
          height="480"
          :src="props.url"
          frameborder="0"
          allowfullscreen
          allow="xr-spatial-tracking"
        ></iframe>
      </div>
      <div class="image" v-else>
        <Splide :options="cardOptions" data-splide='{"type":"fade"}'>
          <SplideSlide v-for="(image, index) in String(props.images).split(',')" :key="index">
            <!-- <a class="image-link" :href="setImage(image)" data-lightbox="image"> -->
            <img :src="setImage(image)" alt="Sample 1" />
            <!-- </a> -->
          </SplideSlide>
        </Splide>
        <!-- <img class="card-img-top" :src="setImage(String(props.images).split(',')[0])" alt="" /> -->
      </div>
      <div class="card-body">
        <h4 class="card-title">{{ props.title }}</h4>
        <p class="card-text">
          {{ props.description }}
        </p>
        <br />
      </div>
      <h4>Détails de l'appartement</h4>
      <hr />
      <div class="row d-flex">
        <div class="col">
          <font-awesome-icon :icon="['fas', 'bed']" size="2x" style="color: rgb(240, 149, 29)" />
          Chambre:
          <span>{{ props.bedroom }}</span>
        </div>
        <div class="col">
          <font-awesome-icon :icon="['fas', 'couch']" size="2x" style="color: rgb(240, 149, 29)" />
          Meuble:
          <span>{{ props.furniture ? 'oui' : 'non' }}</span>
        </div>

        <div class="col">
          <font-awesome-icon :icon="['fas', 'road']" size="2x" style="color: rgb(240, 149, 29)" />
          Parking:
          <span>{{ props.parking ? 'oui' : 'non' }}</span>
        </div>
        <div class="col">
          <font-awesome-icon :icon="['fas', 'bath']" size="2x" style="color: rgb(240, 149, 29)" />
          Salle de bain:
          <span>{{ props.bathroom ? 'oui' : 'non' }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <font-awesome-icon
            :icon="['fas', 'person-swimming']"
            size="2x"
            style="color: rgb(240, 149, 29)"
          />
          Piscine:
          <span>{{ props.pool ? 'oui' : 'non' }}</span>
        </div>
        <div class="col">
          <font-awesome-icon :icon="['fas', 'wind']" size="2x" style="color: rgb(240, 149, 29)" />
          Climatiseur:
          <span>{{ props.wind ? 'oui' : 'non' }}</span>
        </div>
        <div class="col">
          <font-awesome-icon :icon="['fas', 'box']" size="2x" style="color: rgb(240, 149, 29)" />
          Frigo:
          <span>{{ props.fredge ? 'oui' : 'non' }}</span>
        </div>
        <div class="col">
          <font-awesome-icon
            :icon="['fas', 'warehouse']"
            size="2x"
            style="color: rgb(240, 149, 29)"
          />
          Garage:
          <span>{{ props.warehouse ? 'oui' : 'non' }}</span>
        </div>
      </div>
      <div class="price">
        <br />
        <h4>Prix</h4>
        <hr />
        <h5>{{ props.price }} FCFA - Mois</h5>
      </div>
    </div>
    <div class="contact">
      <div class="contact-info">
        <h4>Contact info</h4>
      </div>
      <br /><br />
      <div class="phone">
        <font-awesome-icon
          :icon="['fas', 'phone-volume']"
          pull="left"
          size="2x"
          style="color: rgb(230, 170, 8)"
        />
        <h6>Numéro de téléphone</h6>
        <h6>{{ props.phone }}</h6>
      </div>
      <br />
      <div class="adress">
        <font-awesome-icon
          :icon="['fas', 'location-dot']"
          pull="left"
          size="2x"
          style="color: rgb(230, 170, 8)"
        />
        <h6>Adresse</h6>
        <h6>{{ props.address }}</h6>
      </div>
      <br />
      <div class="email">
        <font-awesome-icon
          :icon="['fas', 'envelope']"
          pull="left"
          size="2x"
          style="color: rgb(230, 170, 8)"
        />
        <h6>Email</h6>
        <h6>{{ props.email }}</h6>
      </div>
    </div>
  </div>
  <br />
  <div class="gallery justify-content-center">
    <h3>Gallery</h3>
    <div class="carousel justify-content-center">
      <Splide :options="options" data-splide='{"type":"loop"}' ref="splide" class="gallerySplide">
        <SplideSlide
          v-for="(image, index) in String(props.images).split(',')"
          :key="index"
          @moved="onSlideChange"
        >
          <!-- <a class="image-link" :href="setImage(image)" data-lightbox="image"> -->
          <img :src="setImage(image)" alt="Sample 1" />
          <!-- </a> -->
        </SplideSlide> </Splide
      ><br />
      <div class="thumbnail-carousel justify-content-center">
        <Splide :options="thumbnailOptions" ref="thumbnailSplide">
          <SplideSlide
            v-for="(image, index) in String(props.images).split(',')"
            :key="index"
            style="width: 100%"
          >
            <img :src="setImage(image)" alt="" @click="goToSlide(index)" />
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </div>
  <br /><br /><br /><br />
</template>

<style scoped>
.content {
  display: flex;
  margin: 5% 50px 0px 5%;
}
.card {
  width: 58%;
  /* margin: auto; */
  padding: 2%;
  text-align-last: left;
  border: none;
  border-radius: 10px 10px 10px 10px;
  box-shadow: rgba(2, 2, 2, 0.1) 0px 5px 5px;
}
.card .image {
  height: 350px;
  width: 100%;
}
.card .image iframe {
  height: 380px;
  width: 100%;
}
.card .image img {
  width: 100%;
  height: 350px;
}
.card-body {
  padding: 50px 0px 0px 0px;
}
.card-text {
  color: #4d4a4a;
  text-align: justify;
}
.row {
  width: 100%;
  margin-top: 20px;
  font-size: 13px;
}
.col,
h1,
h4,
h6,
h3 {
  font-family: Arial;
}
h5 {
  color: #6d6a6a;
}

h6 {
  padding-left: 40px;
}
.content .contact {
  width: 35%;
  height: 500px;
  padding: 2%;
  border-radius: 10px 10px 10px 10px;
  box-shadow: rgba(2, 2, 2, 0.1) 0px 5px 5px;
  /* background-color: #042658; */
}
.content .contact .contact-info {
  border-bottom: 1px solid #000;
}
.gallery h3 {
  margin: 20px 0px 5% 6.5%;
}

.gallery .carousel .gallerySplide img {
  height: 400px;
  width: 100%;
}
.carousel {
  padding: 0px 5%;
  width: 80%;
  margin: auto;
  padding: auto;
  justify-content: center;
  align-items: center;
  background-color: rgba(230, 224, 224, 0.3);
}

.thumbnail-carousel {
  width: 400px;
  background-color: #e2dfdfd5;
  /* border: 2px solid #f08f10; */
  justify-content: center;
  align-items: center;
  margin: auto;
}
.thumbnail-carousel img {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 1000px) {
  .content {
    display: block;
    padding: auto;
    margin: 0%;
    width: 100%;
  }
  .card {
    width: auto;
    margin: 2%;
  }
  .card .image {
    background-color: #000;
  }
  .card .image img {
    width: 100%;
  }

  .content .contact {
    width: auto;
    height: auto;
    margin: 5% 2% 10% 2%;
  }
  .gallery {
    margin: 0px 2%;
    padding: 0px;
    height: auto;
  }
  .gallery .carousel {
    padding: 0;
  }
  .gallery .carousel .gallerySplide img {
    height: auto;
  }
  .thumbnail-carousel {
    width: auto;
  }
}
</style>