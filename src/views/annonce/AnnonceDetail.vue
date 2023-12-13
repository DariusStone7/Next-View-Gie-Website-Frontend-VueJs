<script setup>
import AnnonceDetail from '../../components/annonce/AnnonceDetail.vue'
import { useRoute } from 'vue-router'
import { annonces } from '../../states/states.js'
import { ref, onMounted, onBeforeMount } from 'vue'
import axios from 'axios'

let route = useRoute()
let annonce = ref({})
let url = ref("")
let images_string = ref('')
let images_table = ref([])

onBeforeMount(() => {
  url.value = `http://127.0.0.1:8000/annonces/${route.query.id}`
  axios.get(url.value)
  .then((response) => {
    annonce.value = response.data[0]
    console.log(annonce.value)
  })

  images_string.value = String(annonce.images)
  images_table.value = images_string.value.split(',')
})

</script>

<template>
  <div class="annonce">
    <AnnonceDetail
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
  </div>
</template>


<style scoped>
</style>