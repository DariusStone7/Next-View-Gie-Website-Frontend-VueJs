<script setup>
import { onMounted, onBeforeMount, ref, defineProps } from 'vue'
import { annonces } from '../../../states/states.js'
import { setImage } from '../../../utils/index.js'
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
const formSatus = ref(false)

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

const formData = new FormData()

const uploadImage = (event) => {
  const fileInput = document.getElementById('floatingImage')
  const file = fileInput.files[0]
  formData.append('image', file)
  formData.append('id_annonce', props.id)

  axios.post('http://127.0.0.1:8000/annonce-image', formData).then((response) => {
    console.log(response.data.name)
    let id = annonces.value.findIndex((annonce) => annonce.id_annonce == props.id)
      if (id !== -1) {
        annonces.value[id].images =  annonces.value[id].images + ',' +response.data.name
      }
  })
}
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
        <!-- <a class="image-link" :href="setImage(image)" data-lightbox="image"> -->
        <Splide :options="cardOptions" data-splide='{"type":"fade"}'>
          <SplideSlide v-for="(image, index) in String(props.images).split(',')" :key="index">
            <!-- <a class="image-link" :href="setImage(image)" data-lightbox="image"> -->
            <img :src="setImage(image)" alt="Sample 1" />
            <!-- </a> -->
          </SplideSlide>
        </Splide>
        <!-- </a> -->
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
  <div class="gallery justify-content-center">
    <div class="head d-flex">
      <h3>Gallery</h3>
      <!-- <div class="floating-button">
        <div class="custom-file-input">
          <input type="file" id="floatingImage" class="hidden" @change="uploadImage" />
          <label for="floatingImage">
            <span class="file-icon">
              <font-awesome-icon
                :icon="['fas', 'file-medical']"
                size="2xl"
                style="color: #888a85"
              />
            </span>
          </label>
        </div>
      </div> -->
    </div>

    <div class="carousel justify-content-center">
      <Splide :options="options" data-splide='{"type":"loop"}' ref="splide">
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
  margin: 5% 50px 50px 5%;
}
.card {
  width: 60%;
  /* margin: auto; */
  text-align-last: left;
  border: none;
  background-color: #fff;
  padding: 0px;
  border-radius: 10px 10px 10px 10px;
  box-shadow: #0202021a 0px 5px 5px;
  background-color: rgba(253, 255, 255, 0.6);
}
.card .image {
  height: 350px;
  width: 100%;
}
.card .image iframe {
  height: 350px;
  width: 100%;
  margin-bottom: 100px;
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
  padding-left: 2%;
}
.row {
  width: 100%;
  margin-top: 20px;
  font-size: 13px;
  padding-left: 2%;
}
.col,
h1,
h4,
h6,
h3 {
  font-family: Arial;
  padding-left: 2%;
}

h5 {
  color: #6d6a6a;
  padding-left: 2%;
}

h6 {
  padding-left: 40px;
}
.form {
  max-width: 900px;
  margin: auto;
  margin-bottom: 30px;
  padding: 5%;
  padding-bottom: 6%;
  border-radius: 10px 10px 10px 10px;
  box-shadow: rgba(2, 2, 2, 0.1) 0px 5px 15px;
}
.form .submit button {
  padding: 5px;
  border-radius: 10px;
  color: rgb(49, 48, 48);
  float: right;
}
.form form textarea {
  height: 150px;
}
.gallery .head {
  align-items: baseline;
}
.gallery .head a {
  margin-left: 30px;
}
.gallery .head a button h4 {
  color: rgb(56, 54, 54);
}
.gallery .head button {
  width: 45px;
  border-radius: 30px;
}

.floating-button {
  position: fixed;
  bottom: 100px;
  right: 8%;
  box-shadow: rgba(2, 2, 2, 0.1) 10px 15px 15px;
  border-radius: 25px;
  width: 50px;
  padding: 10px 0px;
  background-color: #fff;
  text-align: center;
}

.custom-file-input {
  position: relative;
  display: inline-block;
}

.custom-file-input input[type='file'] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-icon {
  display: inline-block;
  vertical-align: middle;
}

.file-label {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

.content .contact {
  width: 35%;
  height: 500px;
  padding: 2%;
  border-radius: 10px 10px 10px 10px;
  box-shadow: rgba(2, 2, 2, 0.1) 0px 5px 5px;
  background-color: rgba(253, 255, 255, 0.6);
}
.content .contact .contact-info {
  border-bottom: 1px solid #000;
}
.gallery h3 {
  margin: -20px 0px 5% 5%;
}
.carousel {
  padding: 50px 5% 0px 5%;
  width: 80%;
  margin: auto;
  padding: auto;
  justify-content: center;
  align-items: center;
  background-color: rgba(253, 255, 255, 0.3);
}
.carousel img {
  width: 100%;
  height: 100%;
}
.thumbnail-carousel {
  width: 400px;
  background-color: rgba(230, 224, 224, 0.3);
  /* border: 2px solid #f08f10; */
  justify-content: center;
  align-items: center;
  margin: auto;
}
.thumbnail-carousel img {
  width: 100%;
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

  .thumbnail-carousel {
    width: auto;
  }
}
</style>