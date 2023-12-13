<script setup>
import {setImage} from '../../utils/index.js'
import { defineProps, onMounted, ref } from 'vue'
import '@splidejs/vue-splide/css'
import '@splidejs/vue-splide/css/core'

const props = defineProps({
  id : Number,
  title : String,
  description : String,
  url : String,
  price : Number,
  bedroom : Number,
  bathroom : Boolean,
  warehouse : Boolean,
  parking : Boolean,
  pool : Boolean,
  wind : Boolean,
  furniture : Boolean,
  fredge : Boolean,
  phone : String,
  adresse : String,
  email : String,
  images: String
})
const options = {
  rewind:  true,
  autoplay: true,
  height: 'auto',
  arrows: false,
  arrowPath: 'm7.61 0.807-2.12...',
  interval: 4500,
  keyboard: 'global',
}
let images_string = ref("")
let images_table = ref([])

onMounted(() => {
  images_string.value = String(props.images)
  images_table.value   = (images_string.value).split(",")
})


//function to truncate the description
const truncateText = (text, maxlenght) => {
  return text.length < maxlenght ? text : text.slice(0, maxlenght)
}

</script>

<template>
  <div class="block">
    <div class="image" v-if="props.url">
      <iframe
        :src="url"
        frameborder="0"
        allowfullscreen
        allow="xr-spatial-tracking"
      ></iframe>
    </div>
    <div class="image" v-else>
      <Splide :options="options" data-splide='{"type":"fade"}'>
        <SplideSlide v-for="(image, index) in String(props.images).split(',')" :key="index">
          <img :src="setImage(image)" alt="Sample 1" />
        </SplideSlide>
    </Splide>
      <!-- <img :src="setImage(String(props.images).split(',')[0])" alt="" /> -->
    </div>
    <div class="content">
      <div class="title">
        <span>{{ props.price }} FCFA - mois</span><br /><br />
        <h4>
          {{ props.title }}
        </h4>
      </div>
      <div class="description">
        <p>{{ truncateText(props.description, 100) }}...</p>
      </div>
      <div class="info d-flex justify-content-left">
        <div class="bedroom">
          <font-awesome-icon :icon="['fas', 'bed']" size="x" style="color: rgb(240, 149, 29)" />
          <span>{{ props.bedroom }}</span>
          <h6>Chambre</h6>
        </div>
        <div class="bathroom">
          <font-awesome-icon :icon="['fas', 'bath']" size="x" style="color: rgb(240, 149, 29)" />
          <span>{{ props.bathroom ? 'oui' : 'non'}}</span>
          <h6>Salle de bain</h6>
        </div>
        <div class="couch">
          <font-awesome-icon :icon="['fas', 'couch']" size="x" style="color: rgb(240, 149, 29)" />
          <span>{{ props.furniture ? 'oui' : 'non' }}</span>
          <h6>Meubles</h6>
        </div>
        <div class="warehouse">
          <font-awesome-icon
            :icon="['fas', 'warehouse']"
            size="x"
            style="color: rgb(240, 149, 29)"
          />
          <span>{{ props.parking ? 'oui' : 'non'}}</span>
          <h6>Parking</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block {
  height: auto;
  border-radius: 15px 15px 15px 15px;
  text-align: justify;
  background-color: white;
  /* max-width: 700px; */
  width: 380px;
  margin: auto;
}

.block .image {
  height: 250px;
  width: 100%;
}
.block .image iframe{
  min-height: 250px;
  width: 100%;
}
.block .image img {
  width: 100%;
  height: 250px;
}
.block .content {
  width: 100%;
  height: auto;
  padding: 20px 30px 30px 30px;
}
.block .content .title {
  width: 100%;
}
.block h4, h6{
  text-align: left;
  font-family: 'Bodoni';
  color: rgb(82, 81, 81);
}
.block h6{
  font-size: 12px;
}
.block p {
  color: rgb(97, 93, 88);
}
.block:hover {
  background: rgba(243, 244, 245, 0.7);
  -webkit-transition: background-color 800ms linear;
  -ms-transition: background-color 800ms linear;
  transition: background-color 800ms linear;
  box-shadow: rgba(2, 2, 2, 0.3) 0px 5px 5px;
}
.block:hover p {
  color: rgb(49, 48, 48);
  -webkit-transition: background-color 800ms linear;
  -ms-transition: background-color 800ms linear;
  transition: color 800ms linear;
}
.block .title span {
  color: rgb(182, 104, 2);
  font-family: 'Bodoni';
  font-size: 20px;
}
.block .info .bedroom,
.bathroom,
.couch {
  margin-right: 20px;
}
.block .info span {
  font-size: 15px;
  padding-right: 10px;
}
@media screen and (max-width: 1000px){
  .block {
    height: auto;
    border-radius: 15px 15px 15px 15px;
    text-align: justify;
    background-color: white;
    /* max-width: 700px; */
    width: 380px;
    /* width: auto; */
    margin: auto;
}
.block h6{
  font-size: 10px;
}
}
@media screen and (max-width: 600px){
  .block{
    width: auto;
  }
}
</style>