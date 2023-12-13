<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { getPath } from '@/utils/index.js'
import { service_benefit } from '@/states/states.js'
import { benefits } from '@/states/states.js'
import Benefit from '../../components/admin/service/Benefit.vue'
import ServiceBenefitTitle from '../../components/admin/service/ServiceBenefitTitle.vue'

const serviceBenefitTitle = ref({
  title: '',
  description: ''
})
const serviceBenefit = ref({
  title: '',
  description: ''
})
const titleFormAction = ref({
  add: true,
  update: false
})
const benefitFormAction = ref({
  add: true,
  update: false
})
let idBenefitTitle = -1
let idBenefit = -1
const addTitleSpinner = ref(false)
const ediTitleSpinner = ref(false)
const addServiceSpinner = ref(false)
const editServiceSpinner = ref(false)
const message = ref({
  editServiceSuccess: false,
  editServiceError: false,
  addServiceSuccess: false,
  addServiceError: false,
  editTitleSuccess: false,
  editTitleError: false
})

/* manage service benefit block title */

//function to manage service benefit block title button
const manageTitleButton = () => {
  titleFormAction.value.update = false
  titleFormAction.value.add = true
  serviceBenefitTitle.value = {
    title: '',
    description: ''
  }
}

//Function to handle service update emit
const handleUpdateServiceBenefitTitle = (index) => {
  message.value.editTitleSuccess = false
  message.value.editTitleError = false
  idBenefitTitle = index
  serviceBenefitTitle.value = benefits.value.find((objet) => objet.id_benefit === index)
  titleFormAction.value.add = false
  titleFormAction.value.update = true
}

//function to save service benefit block title
const saveServiceBenefitTitle = () => {
  addTitleSpinner.value = true
  const updateData = { ...serviceBenefitTitle.value }
  axios
    .post('http://127.0.0.1:8000/benefit', updateData)
    .then((response) => {
      benefits.value.push(response.data)
      addTitleSpinner.value = false
    })
    .catch((error) => {
      console.log(error)
      addTitleSpinner.value = false
    })
}

//Function to update service benefit block title
const updateServiceBenefitTitle = () => {
  message.value.editTitleSuccess = false
  message.value.editTitleError = false
  ediTitleSpinner.value = true
  let url = `http://127.0.0.1:8000/benefits/${idBenefitTitle}`
  const updateData = { ...serviceBenefitTitle.value }
  axios
    .put(url, updateData)
    .then((response) => {
      ediTitleSpinner.value = false
      message.value.editTitleSuccess = true
    })
    .catch((error) => {
      console.log(error)
      ediTitleSpinner.value = false
      message.value.editTitleError = true
    })
}

const saveTitle = () => {
  if (titleFormAction.value.add === true) {
    saveServiceBenefitTitle()
  }
  if (titleFormAction.value.update === true) {
    updateServiceBenefitTitle()
  }
}

//Function to delete Service block title
const deleteServiceBenefitTitle = () => {
  let url = `http://127.0.0.1:8000/benefits/${idBenefitTitle}`
  axios
    .delete(url)
    .then((response) => {
      //remove element in the list
      let id = benefits.value.findIndex((benefitTitle) => benefitTitle.id_benefit == idBenefitTitle)
      if (id !== -1) {
        benefits.value.splice(id, 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

//Function to handle service benefit block title delete emit
const handleDeleteServiceBenefitTitle = (index) => {
  idBenefitTitle = index
  deleteServiceBenefitTitle()
}

/* manage service benefit */

//function to manage service benefit button
const manageListButton = () => {
  message.value.addServiceSuccess = false
  message.value.addServiceError = false
  message.value.editServiceError = false
  message.value.editServiceSuccess = false

  benefitFormAction.value.update = false
  benefitFormAction.value.add = true
  serviceBenefit.value = {
    title: '',
    description: ''
  }
}

//Function to handle service update emit
const handleUpdateServiceBenefit = (index) => {
  message.value.addServiceSuccess = false
  message.value.addServiceError = false
  message.value.editServiceError = false
  message.value.editServiceSuccess = false

  idBenefit = index
  serviceBenefit.value = service_benefit.value.find((objet) => objet.id_service_benefit === index)
  benefitFormAction.value.add = false
  benefitFormAction.value.update = true
}

//function to save service benefit
const saveServiceBenefit = () => {
  message.value.addServiceSuccess = false
  message.value.addServiceError = false
  addServiceSpinner.value = true
  const updateData = { ...serviceBenefit.value }
  axios
    .post('http://127.0.0.1:8000/service-benefit', updateData)
    .then((response) => {
      service_benefit.value.push(response.data)
      addServiceSpinner.value = false
      message.value.addServiceSuccess = true
    })
    .catch((error) => {
      console.log(error)
      addServiceSpinner.value = false
      message.value.addServiceError = true
    })
}

//Function to update service benefit block title
const updateServiceBenefit = () => {
  message.value.editServiceError = false
  message.value.editServiceSuccess = false
  editServiceSpinner.value = true
  let url = `http://127.0.0.1:8000/service-benefit/${idBenefit}`
  const updateData = { ...serviceBenefit.value }
  axios
    .put(url, updateData)
    .then((response) => {
      editServiceSpinner.value = false
      message.value.editServiceSuccess = true
    })
    .catch((error) => {
      console.log(error)
      editServiceSpinner.value = false
      message.value.editServiceError = true
    })
}

const saveBenefit = () => {
  if (benefitFormAction.value.add === true) {
    saveServiceBenefit()
  }
  if (benefitFormAction.value.update === true) {
    updateServiceBenefit()
  }
}

//Function to delete Service block title
const deleteServiceBenefit = () => {
  let url = `http://127.0.0.1:8000/service-benefit/${idBenefit}`
  axios
    .delete(url)
    .then((response) => {
      //remove element in the list
      let id = service_benefit.value.findIndex((benefit) => benefit.id_service_benefit == idBenefit)
      if (id !== -1) {
        service_benefit.value.splice(id, 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

//Function to handle service benefit block title delete emit
const handleDeleteServiceBenefit = (index) => {
  idBenefit = index
  deleteServiceBenefit()
}
</script>


<template>
  <span>{{ getPath() }}</span> <br /><br /><br />

  <!-- Title block form modal -->
  <div
    class="modal fade"
    id="titleModal"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <div class="head">
            <h4 v-if="titleFormAction.add">New title</h4>
            <h4 v-if="titleFormAction.update">Update title</h4>
            <h6 class="success" v-if="message.editTitleSuccess">
              Modification apporté avec success !
            </h6>
            <h6 class="error" v-if="message.editTitleError">Erreur lors de la modification !</h6>
          </div>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- form to add Service benefit block title -->
        <div class="form" id="titleForm">
          <form action="" method="post" @submit.prevent="saveTitle">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingTitle"
                placeholder="Titre"
                required
                v-model="serviceBenefitTitle.title"
              />
              <label for="floatingTitle">Titre</label>
            </div>
            <div class="form-floating">
              <textarea
                class="form-control"
                name="description"
                id="floatingText"
                cols="30"
                rows="20"
                v-model="serviceBenefitTitle.description"
                placeholder="Text"
                required
              ></textarea>
              <label for="floatingText">Texte</label>
            </div>
            <br />
            <div class="submit" v-if="titleFormAction.add">
              <button
                type="submit"
                class="m-3"
                :disabled="!addTitleSpinner == false ? true : false"
              >
                Ajouter
                <span
                  v-if="addTitleSpinner"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
              <button type="reset" class="m-3">Reset</button>
            </div>
            <div class="submit" v-if="titleFormAction.update">
              <button
                type="submit"
                class="m-3"
                :disabled="!ediTitleSpinner == false ? true : false"
              >
                Modifier
                <span
                  v-if="ediTitleSpinner"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
              <button type="button" class="m-3" data-bs-dismiss="modal">Fermer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- list of service benefit title -->
  <div class="services-title">
    <div class="block-header d-flex justify-content-between">
      <h4>Entête</h4>
      <!-- <button @click="manageTitleButton" data-bs-toggle="modal" data-bs-target="#titleModal">
          <h4>+</h4>
        </button> -->
    </div>
    <div class="header">
      <table>
        <tr>
          <td class="number">N°</td>
          <td class="title">titre</td>
          <td class="text">Description</td>
        </tr>
      </table>
    </div>
    <div class="service-benefit" v-for="(benefit, index) in benefits" :key="index">
      <ServiceBenefitTitle
        :id_benefit="benefit.id_benefit"
        :title="benefit.title"
        :description="benefit.description"
        :index="index"
        @updateServiceBenefitTitle="handleUpdateServiceBenefitTitle"
      />
    </div>
  </div>

  <!-- list of service benefit -->
  <div class="liste-services">
    <div class="block-header d-flex justify-content-between">
      <h4>Liste des utilités</h4>
      <button @click="manageListButton" data-bs-toggle="modal" data-bs-target="#listModal">
        <h4>+</h4>
      </button>
    </div>
    <div class="header">
      <table>
        <tr>
          <td class="number">N°</td>
          <td class="title">titre</td>
          <td class="description">Description</td>
        </tr>
      </table>
    </div>
    <div class="benefit" v-for="(benefit, index) in service_benefit" :key="index">
      <Benefit
        :id_service_benefit="benefit.id_service_benefit"
        :title="benefit.title"
        :description="benefit.description"
        :index="index"
        @updateServiceBenefit="handleUpdateServiceBenefit"
        @deleteServiceBenefit="handleDeleteServiceBenefit"
      />
    </div>
  </div>

  <!-- List benefit form modal -->
  <div
    class="modal fade"
    id="listModal"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <div class="head">
            <h4 v-if="benefitFormAction.add">New benefit</h4>
            <h4 v-if="benefitFormAction.update">Update benefit</h4>
            <h6 class="success" v-if="message.addServiceSuccess">
              Nouveau service ajouté avec success
            </h6>
            <h6 class="error" v-if="message.addServiceError">
              Erreur le service n'a pas été ajouté
            </h6>
            <h6 class="success" v-if="message.editServiceSuccess">
              Modification apporté avec success
            </h6>
            <h6 class="error" v-if="message.editServiceError">Erreur lors de la modification</h6>
          </div>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- form to add Service benefit -->
        <div class="form" id="listForm">
          <form action="" method="post" @submit.prevent="saveBenefit">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingTitle"
                placeholder="Titre"
                required
                v-model="serviceBenefit.title"
              />
              <label for="floatingTitle">Titre</label>
            </div>
            <div class="form-floating">
              <textarea
                class="form-control"
                name="description"
                id="floatingText"
                cols="30"
                rows="20"
                v-model="serviceBenefit.description"
                placeholder="Text"
                required
              ></textarea>
              <label for="floatingText">Description</label>
            </div>
            <br />
            <div class="submit" v-if="benefitFormAction.add">
              <button
                type="submit"
                class="m-3"
                :disabled="!addServiceSpinner == false ? true : false"
              >
                Ajouter
                <span
                  v-if="addServiceSpinner"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
              <button type="reset" class="m-3">Reset</button>
            </div>
            <div class="submit" v-if="benefitFormAction.update">
              <button
                type="submit"
                class="m-3"
                :disabled="!editServiceSpinner == false ? true : false"
              >
                Modifier
                <span
                  v-if="editServiceSpinner"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
              <button type="button" class="m-3" data-bs-dismiss="modal">Fermer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.modal-dialog {
  max-width: 800px;
}
#titleForm,
#listForm {
  width: 100%;
}
.form {
  margin-top: 50px;
  margin: auto;
  padding: 5%;
  padding-bottom: 80px;
  border-radius: 10px 10px 10px 10px;
  background-color: #fff;
  max-width: 800px;
}
.success {
  color: green;
}
.error {
  color: red;
}
.form form input,
textarea {
  background-color: rgb(234, 236, 236);
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

.services-title,
.liste-services {
  margin: auto;
  padding: 25px;
  border-radius: 10px;
  height: auto;
  width: auto;
  /* max-width: 650px; */
}
.services-title .header td {
  padding-right: 30px;
  text-align: justify;
  word-wrap: break-word;
}
.services-title .header .number {
  width: 50px;
}
.services-title .header .title {
  width: 290px;
}
.services-title .header .text {
  width: 700px;
}
.services-title .header .menu {
  width: 50px;
  padding-right: 0;
}
.liste-services {
  margin-bottom: 200px;
}
.liste-services .header td {
  padding-right: 30px;
}
.liste-services .header .number {
  width: 60px;
}
.liste-services .header .title {
  width: 250px;
}
.liste-services .header .description {
  width: 500px;
}
.liste-services .header .image {
  width: 200px;
}
.liste-services .header .icon {
  width: 100px;
}
.liste-services .header .menu {
  width: 50px;
  padding-right: 0;
}
.block-header {
  width: 100%;
  height: auto;
  border-bottom: 2px solid rgb(138, 136, 136);
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.block-header a button h4 {
  color: rgb(56, 54, 54);
}
.block-header button {
  width: 45px;
  border-radius: 30px;
}

.services-title .service-benefit,
.liste-services .benefit {
  width: auto;
}
</style>