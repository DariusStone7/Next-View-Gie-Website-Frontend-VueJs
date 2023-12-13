<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { getPath } from '@/utils/index.js'
import { abouts } from '@/states/states.js'
import { setting } from '@/states/states.js'
import About from '../../components/admin/About.vue'
import Image from '@/components/admin/Image.vue'

const about = ref({
  title: '',
  text: '',
  image: ''
})
const formData = new FormData()
let idAbout = -1
let editAction = ref(false)
let editInformation = ref(false)
const formAction = ref({
  add: true,
  update: false
})
let images = ref([])
let UploadImage
const fileInputRef = ref(null)
const addSpinner = ref(false)
const editSpinner = ref(false)
const editInformationSpinner = ref(false)
const message = ref({
  editInfoSuccess: false,
  editInfoError: false,
  editSuccess: false,
  editError: false
})

const manageButton = () => {
  formAction.value.update = false
  formAction.value.add = true
  editAction.value = false

  about.value = {
    title: '',
    text: '',
    image: about.value.image
  }
}

//Function to handle about update emit
const handleUpdateAbout = (index) => {
  message.value.editSuccess = false
  message.value.editError = false
  message.value.editInfoSuccess = false
  message.value.editInfoError = false
  idAbout = index
  about.value = abouts.value.find((objet) => objet.id_about === idAbout)
  editAction.value = true
  formAction.value.add = false
  formAction.value.update = true
}

//function to update about
const updateAbout = () => {
  message.value.editSuccess = false
  message.value.editError = false
  message.value.editInfoSuccess = false
  message.value.editInfoError = false
  editSpinner.value = true
  let url = `http://127.0.0.1:8000/abouts/${idAbout}`
  const aboutData = Object.assign({}, about.value)
  aboutData.image = UploadImage ? UploadImage : about.value.image

  for (const key in aboutData) {
    if (aboutData.hasOwnProperty(key)) {
      formData.append(key, aboutData[key])
    }
  }
  axios
    .put(url, formData)
    .then((response) => {
      about.value = response.data
      editSpinner.value = false
      message.value.editSuccess = true
    })
    .catch((error) => {
      console.log(error)
      editSpinner.value = false
      message.value.editError = true
    })
}

//function to save about
const saveAbout = () => {
  editSpinner.value = true
  const aboutData = Object.assign({}, about.value)
  aboutData.image = UploadImage ? UploadImage : about.value.image

  for (const key in aboutData) {
    if (aboutData.hasOwnProperty(key)) {
      formData.append(key, aboutData[key])
    }
  }
  axios
    .post('http://127.0.0.1:8000/about', formData)
    .then((response) => {
      abouts.value.push(response.data)
      images.value = []
      editSpinner.value = false
      message.value.editInfoSuccess = true
    })
    .catch((error) => {
      console.error('Erreur lors de la requête :', error)
      editSpinner.value = false
      message.value.editInfoError = true
    })
}

//function to save or upload about
const save = () => {
  if (formAction.value.add === true) {
    saveAbout()
  }
  if (formAction.value.update === true) {
    updateAbout()
  }
}

//Function to handle about delete emit
const handleDeleteAbout = (index) => {
  idAbout = index
  let url = `http://127.0.0.1:8000/abouts/${idAbout}`
  axios
    .delete(url)
    .then((response) => {
      //remove element in the list
      let id = abouts.value.findIndex((about) => about.id_about == idAbout)
      if (id !== -1) {
        abouts.value.splice(id, 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

//function to upload image
const uploadImage = (event) => {
  formData.append('oldImage', about.value.image)
  UploadImage = event.target.files[0]

  //lire les fichiers selectionnés et les ajouter dans le tableaux d'images a afficher pour la prévisualisation
  const reader = new FileReader()
  reader.onload = (e) => {
    images.value[0] = e.target.result
  }
  reader.readAsDataURL(UploadImage)
}

const deleteSelectImage = () => {
  // about.value.image = ''
  images.value = []
  uploadImage = ''
  fileInputRef.value = null
}

const saveInformation = () => {
  editInformationSpinner.value = true
  message.value.editInfoSuccess = false
  message.value.editInfoError = false
  let url = `http://127.0.0.1:8000/settings/${setting.value.id_setting}`
  const settingData = Object.assign({}, setting.value)
  for (const key in settingData) {
    if (settingData.hasOwnProperty(key)) {
      formData.append(key, settingData[key])
    }
  }
  axios
    .put(url, formData)
    .then((response) => {
      setting.value = response.data
      editInformation.value = false
      editInformationSpinner.value = false
      message.value.editInfoSuccess = true
    })
    .catch((error) => {
      console.error('Erreur lors de la requête :', error)
      editInformationSpinner.value = false
      message.value.editInfoError = true
    })
}
const manageInfoButton = () => {
  editInformation.value = !editInformation.value
  message.value.editInfoSuccess = false
  message.value.editInfoError = false
}
</script>


<template>
  <span>{{ getPath() }}</span>

  <br /><br /><br />

  <!-- list of abouts -->
  <div class="liste-abouts">
    <div class="row">
      <div class="about col mb-5" v-for="(about, index) in abouts" :key="index">
        <h5>A-propos</h5>
        <hr />
        <br />
        <About
          :id_about="about.id_about"
          :title="about.title"
          :text="about.text"
          :image="about.image"
          :index="index"
          @updateAbout="handleUpdateAbout"
          @deleteAbout="handleDeleteAbout"
        />
      </div>

      <!-- form to update profile -->
      <div class="form-information col" id="form">
        <div class="d-flex justify-content-between">
          <h5>Informations</h5>

          <div class="action">
            <font-awesome-icon
              :icon="['fas', 'edit']"
              size="x"
              class="icon"
              @click="manageInfoButton"
            />
          </div>
        </div>
        <hr />
        <br />
        <form action="" method="post" @submit.prevent="saveInformation" class="form">
          <h6 class="success" v-if="message.editInfoSuccess">Modification apporté avec success</h6>
          <h6 class="error" v-if="message.editInfoError">Erreur lors de la modification</h6>
          <div class="form-floating mb-4">
            <input
              type="text"
              class="form-control"
              id="floatingTel"
              placeholder="Tel"
              required
              :disabled="editInformation == false ? true : false"
              v-model="setting.phone"
            />
            <label for="floatingTel">Tel</label>
          </div>
          <div class="form-floating mb-4">
            <input
              type="text"
              class="form-control"
              id="floatingEmail"
              placeholder="Email"
              required
              :disabled="editInformation == false ? true : false"
              v-model="setting.email"
            />
            <label for="floatingEmail">Email</label>
          </div>
          <div class="form-floating mb-4">
            <input
              type="text"
              class="form-control"
              id="floatingFacebook"
              placeholder="Facebook"
              :disabled="editInformation == false ? true : false"
              v-model="setting.facebook"
            />
            <label for="floatingFacebook">Facebook</label>
          </div>
          <div class="form-floating mb-4">
            <input
              type="text"
              class="form-control"
              id="floatingTwitter"
              placeholder="Twitter"
              :disabled="editInformation == false ? true : false"
              v-model="setting.twitter"
            />
            <label for="floatingTwitter">Twitter</label>
          </div>
          <div class="form-floating mb-4">
            <input
              type="text"
              class="form-control"
              id="floatingLinkedin"
              placeholder="Linkedin"
              :disabled="editInformation == false ? true : false"
              v-model="setting.linkedin"
            />
            <label for="floatingLinkedin">Linkedin</label>
          </div>
          <div class="form-floating mb-4">
            <input
              type="text"
              class="form-control"
              id="floatingYoutube"
              placeholder="Youtube"
              :disabled="editInformation == false ? true : false"
              v-model="setting.youtube"
            />
            <label for="floatingYoutube">Youtube</label>
          </div>
          <div class="submit mb-5">
            <button
              type="submit"
              :disabled="
                editInformation == false
                  ? true
                  : false || !editInformationSpinner == false
                  ? true
                  : false
              "
            >
              Sauvegarder
              <span
                v-if="editInformationSpinner"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- <div class="floating-button">
      <button @click="manageButton" data-bs-toggle="modal" data-bs-target="#modal">
        <h4>+</h4>
      </button>
    </div> -->
  </div>

  <!-- Modal -->
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <div class="head">
            <h4 v-if="formAction.add">New about</h4>
            <h4 v-if="formAction.update">Update about</h4>
            <h6 class="success" v-if="message.editSuccess">Modification apporté avec success</h6>
            <h6 class="error" v-if="message.editError">Erreur lors de la modification</h6>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <!-- form to add about -->
          <div class="form" id="form">
            <div class="imageBlock d-flex" v-if="editAction">
              <div class="images d-flex" id="imagesList">
                <Image :imagePath="about.image" :id="about.id_about" :action="false" />
              </div>
            </div>
            <br /><br />

            <form action="" method="post" @submit.prevent="save">
              <div class="row">
                <div class="col">
                  <div class="form-floating mb-3 col">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingTitle"
                      placeholder="Titre"
                      required
                      v-model="about.title"
                    />
                    <label for="">Titre</label>
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
                          ref="fileInputRef"
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
                      <div class="image col mb-5" v-for="(image, index) in images" :key="index">
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
                  id="floatingText"
                  cols="30"
                  rows="20"
                  v-model="about.text"
                  placeholder="Texte"
                  required
                ></textarea>
                <label for="floatingText">Texte</label>
              </div>
              <br />
              <div class="submit" v-if="formAction.add === true">
                <button type="submit" class="m-2" :disabled="!addSpinner == false ? true : false">
                  Ajouter
                  <span
                    v-if="addSpinner"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
                <button type="reset" class="m-2">Reset</button>
              </div>
              <div class="submit" v-if="formAction.update === true">
                <button type="submit" class="m-3" :disabled="!editSpinner == false ? true : false">
                  Modifier
                  <span
                    v-if="editSpinner"
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
</template>


<style scoped>
.modal-dialog {
  max-width: 800px;
}
.form-information {
  min-width: 300px;
  max-width: 700px;
}
.form-information input {
  background-color: rgba(253, 255, 255, 0.6);
}
.form-information .submit button {
  padding: 5px;
  border-radius: 10px;
  color: rgb(49, 48, 48);
  float: right;
}
.form {
  margin: auto;
  padding: 0px 0px 30px 0px;
  border-radius: 10px;
  max-width: 700px;
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
  border-radius: 5px;
  color: rgb(49, 48, 48);
  float: right;
}
.form form textarea {
  height: 130px;
  margin-left: 5px;
}
.liste-abouts {
  margin: auto;
  padding: 0px 0px 25px 25px;
  /* box-shadow: 2px 2px 2px 2px; */
  border-radius: 10px;
  /* background-color: rgba(245, 248, 248, 0.8); */
  width: auto;
  height: auto;
  /* max-height: 600px; */
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
.liste-abouts .about {
  min-width: 400px;
  max-width: 400px;
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
.col .imageBlock .row {
  margin: 0px 5% 0px 0px;
  position: relative;
  bottom: 25px;
}
form .imageBlock {
  max-width: 50px;
  height: 50px;
}
.imageBlock .row .col img {
  width: 50px;
  height: 50px;
}
.imageBlock .row .col span {
  cursor: pointer;
  margin-left: 40px;
}
</style>