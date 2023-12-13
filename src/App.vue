<script setup>
import Home from './views/Home.vue'
import FooterVue from './components/Footer.vue'
import HeaderVue from './components/Header.vue'

import { abouts } from './states/states.js'
import { annonces } from './states/states.js'
import { benefits } from './states/states.js'
import { carousels } from './states/states.js'
import { customers_feedbacks } from './states/states.js'
import { members_profiles } from './states/states.js'
import { messages } from './states/states.js'
import { setting } from './states/states.js'
import { services } from './states/states.js'
import { service_benefit } from './states/states.js'
import { service_technology } from './states/states.js'

import axios from 'axios'
import { ref, onBeforeMount, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onBeforeMount(() => {
  //get all data from api
  axios.get('http://127.0.0.1:8000/abouts/').then((response) => {
    abouts.value = response.data
    // console.log(about)
  })

  axios.get('http://127.0.0.1:8000/annonces/').then((response) => {
    annonces.value = response.data
    // console.log(annonces)
  })

  axios.get('http://127.0.0.1:8000/benefits/').then((response) => {
    benefits.value = response.data
    // console.log(benefits)
  })

  axios.get('http://127.0.0.1:8000/carousels/').then((response) => {
    carousels.value = response.data
    // console.log(carousels)
  })

  axios.get('http://127.0.0.1:8000/customers-feedbacks/').then((response) => {
    customers_feedbacks.value = response.data
    // console.log(customers_feedbacks)
  })

  axios.get('http://127.0.0.1:8000/members-profiles/').then((response) => {
    members_profiles.value = response.data
    // console.log(members_profiles)
  })

  axios.get('http://127.0.0.1:8000/messages/').then((response) => {
    messages.value = response.data
    // console.log(messages)
  })

  axios.get('http://127.0.0.1:8000/service-technology/').then((response) => {
    service_technology.value = response.data
    // console.log(service_technology)
  })

  axios.get('http://127.0.0.1:8000/settings/').then((response) => {
    setting.value = response.data[0]
    console.log(setting.value)
  })

  axios.get('http://127.0.0.1:8000/services/').then((response) => {
    services.value = response.data
    // console.log(services)
  })

  axios.get('http://127.0.0.1:8000/service-benefit/').then((response) => {
    service_benefit.value = response.data
    // console.log(service_benefit)
  })
})
</script>

<template>

  <body>
    <router-view />
  </body>

</template>

<style scoped>
body {
  margin: 0;
}
header {
  position: sticky;
  top: 0;
  z-index: 500;
}
footer {
  margin-top: 100px;
}
@media screen and (max-width: 1500px) {
  footer {
    margin-top: 0px;
  }
}
</style>
