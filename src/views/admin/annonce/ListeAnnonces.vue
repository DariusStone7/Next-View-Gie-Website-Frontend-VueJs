<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { annonces } from '@/states/states.js'
import { getPath } from '@/utils/index.js'
import Annonce from '@/components/admin/annonce/Annonce.vue'
import { services } from '../../../states/states'
import axios from 'axios'

const router = ref(useRouter())

const formRedirect = () => {
  router.value.push('/admin/dashboard/annonces/new')
}
let idAnnonce = -1

//Function to handle annonce update emit
const handleUpdateAnnonce = (index) => {
  idAnnonce = index
  router.value.push('/admin/dashboard/annonce/update?id=' + index)
}

//Function to delete annonce
const deleteAnnonce = () => {
  let url = `http://127.0.0.1:8000/annonces/${idAnnonce}`
  axios
    .delete(url)
    .then((response) => {
      //remove element in the list
      let id = annonces.value.findIndex((annonce) => annonce.id_annonce == idAnnonce)
      if (id !== -1) {
        annonces.value.splice(id, 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

//Function to handle annonce delete emit
const handleDeleteAnnonce = (index) => {
  idAnnonce = index
  deleteAnnonce()
}
</script>


<template>
  <span>{{ getPath() }}</span>
  <div class="liste-annonces">
    <div class="block-header d-flex justify-content-between">
      <h4>Liste des annonces</h4>
    </div>
    <div class="header">
      <table>
        <tr>
          <td class="number">N°</td>
          <td class="title">Titre</td>
          <td class="description">Description</td>
          <td class="address">Adresse</td>
        </tr>
      </table>
    </div>
    <br />

    <div class="annonce" v-for="(annonce, index) in annonces" :key="index">
      <Annonce
        :id_annonce="annonce.id_annonce"
        :title="annonce.title"
        :description="annonce.description"
        :address="annonce.address"
        :index="index"
        @updateAnnonce="handleUpdateAnnonce"
        @deleteAnnonce="handleDeleteAnnonce"
      />
    </div>
  </div>

  <div class="floating-button">
    <button @click="formRedirect()">
      <h4 v-if="!formSatus">+</h4>
      <h4 v-else>x</h4>
    </button>
  </div>
  <br /><br />
</template>


<style scoped>
.liste-annonces {
  margin: auto;
  margin-top: 50px;
  padding: 25px;
  /* box-shadow: 2px 2px 2px 2px; */
  border-radius: 10px;
  min-height: 500px;
  height: auto;
  width: auto;
  /* max-width: 650px; */
}
.block-header {
  width: 100%;
  height: auto;
  border-bottom: 2px solid rgb(138, 136, 136);
  padding: 0px 10px 10px 0px;
  margin-bottom: 30px;
}
.header .number {
  width: 50px;
}
.header .title {
  max-width: 200px;
  min-width: 200px;
}
.header .description {
  width: 540px;
}
.header .address {
  width: 200px;
}
.header .menu {
  width: 50px;
}
.block-header a button h4 {
  color: rgb(56, 54, 54);
}
.block-header button {
  width: 45px;
  border-radius: 30px;
}
.liste-annonces .annonce {
  width: auto;
  margin-bottom: 20px;
}
.floating-button {
  position: fixed;
  bottom: 100px;
  right: 8%;
}
.floating-button button {
  width: 45px;
  border-radius: 30px;
  background-color: rgb(213, 218, 218);
}
</style>