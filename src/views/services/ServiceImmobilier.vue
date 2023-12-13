<script setup>
import Annonce from '../../components/annonce/Annonce.vue'
import { annonces } from '../../states/states.js'
import { RouterLink, RouterView } from 'vue-router'

let url = '/annonce-detail?id='
</script>

<template>
  <div class="content">
    <h1>
      Méilleurs annonces
      <span
        ><font-awesome-icon
          :icon="['fas', 'house-circle-check']"
          size="2xl"
          style="color: rgb(240, 149, 29)"
      /></span>
    </h1>
    <div class="row justify-content-center">
      <div class="service col mb-5" v-for="(annonce, index) in annonces" :key="index">
        <a :href="url + annonce.id_annonce">
            <Annonce
              :id="annonce.id_annonce"
              :title="annonce.title"
              :description="annonce.description"
              :url="annonce.url"
              :price="annonce.price"
              :bedroom="annonce.bedroom"
              :bathroom="annonce.bathroom"
              :warehouse="annonce.warehouse"
              :parking="annonce.parking"
              :pool="annonce.pool"
              :wind="annonce.wind"
              :furniture="annonce.furniture"
              :fredge="annonce.fredge"
              :phone="annonce.phone"
              :adresse="annonce.adresse"
              :email="annonce.email"
              :images="annonce.images"
            />
          <!-- </RouterLink> -->
        </a>
      </div>
    </div>
  </div>
</template>


<style scoped>
.content {
  padding: 100px 5% 100px 5%;
}
.content h1 {
  margin-bottom: 50px;
  text-align: center;
  color: rgb(2, 9, 36);
}
.content .service {
  width: 480px;
}
.content .row .service a {
  text-decoration: none;
  color: inherit;
}
</style>