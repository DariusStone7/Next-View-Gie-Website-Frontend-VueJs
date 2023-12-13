<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { getPath } from '@/utils/index.js'
import { services } from '@/states/states.js'
import { service_technology } from '@/states/states.js'
import Image from '@/components/admin/Image.vue'

import Service from '@/components/admin/service/Service.vue'
import ServiceTechnologyTitle from '../../components/admin/service/ServiceTechnologyTitle.vue'

const imageFormSatus = ref(false)
const editAction = ref(false)
const serviceTitle = ref({
  title: '',
  description: ''
})
const service = ref({
  title: '',
  description: '',
  image: '',
  icon: ''
})
const titleFormAction = ref({
  add: true,
  update: false
})
const serviceFormAction = ref({
  add: true,
  update: false
})
const formData = new FormData()
let idServiceTitle = -1
let idService = -1
let images = ref([])
let UploadImage
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
/*Service Block title manage*/

//function to manage service block title button
const manageTitleButton = () => {
  titleFormAction.value.update = false
  titleFormAction.value.add = true
  serviceTitle.value = {
    title: '',
    description: ''
  }
}

//Function to handle service technologie block title update emit
const handleUpdateServiceTitle = (index) => {
  message.value.editTitleSuccess = false
  message.value.editTitleError = false
  idServiceTitle = index
  serviceTitle.value = service_technology.value.find(
    (objet) => objet.id_service_technology === index
  )
  titleFormAction.value.add = false
  titleFormAction.value.update = true
}

//Function to save Service block title
const saveServiceTitle = () => {
  addTitleSpinner.value = true
  axios
    .post('http://127.0.0.1:8000/service-technology', {
      title: serviceTitle.value.title,
      description: serviceTitle.value.description
    })
    .then((response) => {
      console.log(response)
      service_technology.value.push(response.data)
      addTitleSpinner.value = false
    })
    .catch((error) => {
      console.log(error)
      addTitleSpinner.value = false
    })
}

//Function to update Service block title
const updateServiceTitle = () => {
  message.value.editTitleSuccess = false
  message.value.editTitleError = false
  ediTitleSpinner.value = true
  let url = `http://127.0.0.1:8000/service-technology/${idServiceTitle}`
  axios
    .put(url, {
      title: serviceTitle.value.title,
      description: serviceTitle.value.description
    })
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

//function to save or update service block title
const saveTitleForm = () => {
  if (titleFormAction.value.add === true) {
    saveServiceTitle()
  }
  if (titleFormAction.value.update === true) {
    updateServiceTitle()
  }
}

//Function to delete Service block title
const deleteServiceTitle = () => {
  let url = `http://127.0.0.1:8000/service-technology/${idServiceTitle}`
  axios
    .delete(url)
    .then((response) => {
      //remove element in the list
      let id = service_technology.value.findIndex(
        (serviceTilte) => serviceTilte.id_service_technology == idServiceTitle
      )
      if (id !== -1) {
        service_technology.value.splice(id, 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
//Function to handle service technologie block title delete emit
const handleDeleteServiceTitle = (index) => {
  idServiceTitle = index
  deleteServiceTitle()
}

/*Service  manage*/
//function to manage service block title button
const manageServiceButton = () => {
  message.value.addServiceSuccess = false
  message.value.addServiceError = false
  message.value.editServiceError = false
  message.value.editServiceSuccess = false

  serviceFormAction.value.update = false
  serviceFormAction.value.add = true
  editAction.value = false

  service.value = {
    title: '',
    description: '',
    image: service.value.image,
    icon: ''
  }
}

//Function to handle service update emit
const handleUpdateService = (index) => {
  message.value.addServiceSuccess = false
  message.value.addServiceError = false
  message.value.editServiceError = false
  message.value.editServiceSuccess = false

  idService = index
  service.value = services.value.find((objet) => objet.id_service === index)
  serviceFormAction.value.add = false
  serviceFormAction.value.update = true
  editAction.value = true
}
//Function to update Service block title
const updateService = () => {
  message.value.editServiceSuccess = false
  message.value.editServiceSuccess = false
  editServiceSpinner.value = true
  let url = `http://127.0.0.1:8000/services/${idService}`
  const serviceData = Object.assign({}, service.value)
  serviceData.image = UploadImage ? UploadImage : service.value.image

  for (const key in serviceData) {
    if (serviceData.hasOwnProperty(key)) {
      formData.append(key, serviceData[key])
    }
  }
  axios
    .put(url, formData)
    .then((response) => {
      service.value = response.data
      editServiceSpinner.value = false
      message.value.editServiceSuccess = true
    })
    .catch((error) => {
      console.log(error)
      editServiceSpinner.value = false
      message.value.editServiceError = true
    })
}

//Function to save Service
const saveService = () => {
  message.value.addServiceSuccess = false
  message.value.addServiceError = false
  addServiceSpinner.value = true
  const serviceData = Object.assign({}, service.value)
  serviceData.image = UploadImage ? UploadImage : service.value.image

  for (const key in serviceData) {
    if (serviceData.hasOwnProperty(key)) {
      formData.append(key, serviceData[key])
    }
  }
  axios
    .post('http://127.0.0.1:8000/service', formData)
    .then((response) => {
      services.value.push(response.data)
      service.value.image = ''
      images.value = []
      addServiceSpinner.value = false
      message.value.addServiceSuccess = true
    })
    .catch((error) => {
      console.log(error)
      addServiceSpinner.value = false
      message.value.addServiceError = true
    })
}

//function to save or upload service
const saveListForm = () => {
  if (serviceFormAction.value.add === true) {
    saveService()
  }
  if (serviceFormAction.value.update === true) {
    updateService()
  }
}
//Function to delete Service block title
const deleteService = () => {
  let url = `http://127.0.0.1:8000/services/${idService}`
  axios
    .delete(url)
    .then((response) => {
      //remove element in the list
      let id = services.value.findIndex((service) => service.id_service == idService)
      if (id !== -1) {
        services.value.splice(id, 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
//Function to handle service technologie block title delete emit
const handleDeleteService = (index) => {
  idService = index
  deleteService()
}

//Function to upload image
const uploadImage = (event) => {
  formData.append('oldImage', service.value.image)
  // service.value.image = event.target.files[0]
  UploadImage = event.target.files[0]

  //lire les fichiers selectionnés et les ajouter dans le tableaux d'images a afficher pour la prévisualisation
  const reader = new FileReader()
  reader.onload = (e) => {
    images.value[0] = e.target.result
  }
  reader.readAsDataURL(UploadImage)
}

const deleteSelectImage = () => {
  service.value.image = ''
  images.value = []
}
</script>


<template>
  <span>{{ getPath() }}</span> <br /><br />

  <!-- Title block form modal -->
  <div
    class="modal fade"
    id="titleModal"
    tabindex="-1"
    aria-labelledby="titleModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <div class="head">
            <h4 v-if="titleFormAction.add">New title</h4>
            <h4 v-if="titleFormAction.update">Update title</h4>
            <h6 class="success" v-if="message.editTitleSuccess">
              Modification apporté avec success
            </h6>
            <h6 class="error" v-if="message.editTitleError">Erreur lors de la modification</h6>
          </div>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- form to add service block title -->
        <div class="form" id="titleForm">
          <form action="" method="post" @submit.prevent="saveTitleForm">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingTitle"
                placeholder="Titre"
                required
                v-model="serviceTitle.title"
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
                v-model="serviceTitle.description"
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

  <!-- list of service block title -->
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
    <div class="service" v-for="(block, index) in service_technology" :key="index">
      <ServiceTechnologyTitle
        :id_service_technology="block.id_service_technology"
        :title="block.title"
        :description="block.description"
        :index="index"
        @updateServiceTitle="handleUpdateServiceTitle"
      />
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="listModal"
    tabindex="-1"
    aria-labelledby="listModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <div class="head">
            <h4 v-if="serviceFormAction.add">New service</h4>
            <h4 v-if="serviceFormAction.update">Update service</h4>
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
        <div class="modal-body">
          <!-- form to add service -->
          <div class="form" id="listForm">
            <div class="imageBlock d-flex" v-if="editAction">
              <div class="images d-flex" id="imagesList">
                <Image
                  :imagePath="service.image"
                  :id="service.id_service"
                  :action="false"
                  @deleteImage="handleDelete"
                />
              </div>
            </div>
            <br />
            <form action="" method="post" @submit.prevent="saveListForm">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingTitle"
                  placeholder="Titre"
                  required
                  v-model="service.title"
                />
                <label for="floatingTitle">Titre</label>
              </div>
              <div class="row">
                <div class="col">
                  <label for="">Icon</label>
                  <div class="form-floating mb-3 col">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingIcon"
                      placeholder="Icon"
                      required
                      v-model="service.icon"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="d-flex imageBlock">
                    <div class="label">
                      <label for="floatingImage">Images</label>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div class="form-floating mb-3">
                      <div class="custom-file-input">
                        <input
                          type="file"
                          class="hidden"
                          id="floatingImage"
                          placeholder="Image"
                          required
                          accept="image/*"
                          @change="uploadImage"
                          v-if="!editAction"
                        />
                        <input
                          type="file"
                          class="hidden"
                          id="floatingImage"
                          placeholder="Image"
                          accept="image/*"
                          @change="uploadImage"
                          v-if="editAction"
                        />
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
                    </div>
                    <div class="select-images row">
                      <div class="image col" v-for="(image, index) in images" :key="index">
                        <span @click="deleteSelectImage"> x </span>
                        <img :src="image" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-floating">
                <textarea
                  class="form-control"
                  name="description"
                  id="floatingDescriptionList"
                  cols="30"
                  rows="20"
                  v-model="service.description"
                  placeholder="Desciption"
                  required
                ></textarea>
                <label for="floatingDescriptionList">&emsp;Description</label>
              </div>
              <div class="submit" v-if="serviceFormAction.add">
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
              <div class="submit" v-if="serviceFormAction.update">
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
  </div>

  <h4>Liste des Sevices</h4>
  <hr />
  <div class="row services">
    <div class="service col mb-5" v-for="(service, index) in services" :key="index">
      <Service
        :id_service="service.id_service"
        :title="service.title"
        :description="service.description"
        :image="service.image"
        :icon="service.icon"
        :index="index"
        @updateService="handleUpdateService"
        @deleteService="handleDeleteService"
      />
    </div>
  </div>
  <div class="floating-button">
    <button @click="manageServiceButton" data-bs-toggle="modal" data-bs-target="#listModal">
      <h4>+</h4>
    </button>
  </div>
</template>


<style scoped>
.modal-dialog {
  max-width: 800px;
}
.imageBlock .button button {
  width: 50px;
  margin-right: 50px;
  padding: 5px;
  border-radius: 30px;
  color: rgb(49, 48, 48);
}
.imageBlock .imageForm button {
  border-radius: 10px;
  padding: 5px;
}
#titleForm {
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
.form form .row {
  padding-left: 0px;
}
.form form .row .col input {
  width: 95%;
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
a {
  text-decoration: none;
}
.services-title,
.liste-services {
  margin: auto;
  padding: 25px;
  border-radius: 10px;
  height: auto;
  width: auto;
}
.services-title .header td {
  padding-right: 30px;
  text-align: justify;
  word-wrap: break-word;
}
.services-title .header .number {
  width: 50px;
  padding-left: 15px;
}
.services-title .header .title {
  width: 270px;
}
.services-title .header .text {
  width: 700px;
}
.services-title .header .menu {
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

.services-title .service,
.liste-services .service {
  width: auto;
}
.services {
  margin: auto;
  margin-bottom: 150px;
}
.row .col {
  max-width: 350px;
  min-width: 350px;
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
.imageBlock {
  margin-top: 25px;
}
.imageBlock .row {
  margin: 0px 5% 0px 0px;
}
.imageBlock .row .col {
  max-width: 50px;
  height: 50px;
}
.imageBlock .row .col img {
  width: 50px;
  height: 50px;
}
.imageBlock .row .col span {
  cursor: pointer;
  position: relative;
  bottom: 30px;
  left: 50px;
}
</style>