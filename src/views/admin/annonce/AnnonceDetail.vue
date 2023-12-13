<script setup>
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ref, onBeforeMount, onMounted } from 'vue'
import AnnonceDetail from '../../../components/admin/annonce/AnnonceDetail.vue'
import { getPath } from '../../../utils/index.js'

let route = useRoute()
let annonce = ref({})
let url = ref('')


onBeforeMount(() => {
  url.value = `http://127.0.0.1:8000/annonces/${route.query.id}`
  console.log(url.value)
  axios.get(url.value)
  .then((response) => {
    annonce.value = response.data[0]
  })
})
</script>

<template>
     <span>{{getPath()}}</span>
     <AnnonceDetail
      :id="route.query.id"
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
      :address="annonce.address"
      :email="annonce.email"
      :images="annonce.images"
    />
</template>

<style>

</style>