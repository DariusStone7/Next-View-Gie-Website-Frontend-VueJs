<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { getPath } from '@/utils/index.js'
import { customers_feedbacks } from '@/states/states.js'
import Feedback from '../../components/admin/Feedback.vue'
import Image from '@/components/admin/Image.vue'

const feedback = ref({
  name: '',
  role: '',
  message: '',
  image: ''
})
const formData = new FormData()
let idFeedback = -1
let editAction = ref(false)
const formAction = ref({
  add: true,
  update: false
})
let images = ref([])
let UploadImage
const addSpinner = ref(false)
const editSpinner = ref(false)
const message = ref({
  editSuccess: false,
  editError: false,
  addSuccess: false,
  addError: false
})

const manageButton = () => {
  message.value.addSuccess = false
  message.value.addError = false
  message.value.editSuccess = false
  message.value.editError = false

  formAction.value.update = false
  formAction.value.add = true
  editAction.value = false

  feedback.value = {
    name: '',
    role: '',
    message: '',
    image: feedback.value.image
  }
  images.value = []
}

//Function to handle feedback update emit
const handleUpdateFeedback = (index) => {
  message.value.addSuccess = false
  message.value.addError = false
  message.value.editSuccess = false
  message.value.editError = false

  message.value.editSuccess = false
  message.value.editError = false
  // alert(index)
  idFeedback = index
  feedback.value = customers_feedbacks.value.find(
    (objet) => objet.id_customer_feedback == idFeedback
  )
  editAction.value = true
  formAction.value.add = false
  formAction.value.update = true
}

//function to update feedback
const updateFeedback = () => {
  message.value.editSuccess = false
  message.value.editError = false
  editSpinner.value = true
  let url = `http://127.0.0.1:8000/customers-feedbacks/${idFeedback}`
  const feedbackData = Object.assign({}, feedback.value)
  feedbackData.image = UploadImage ? UploadImage : feedback.value.image

  for (const key in feedbackData) {
    if (feedbackData.hasOwnProperty(key)) {
      formData.append(key, feedbackData[key])
    }
  }
  axios
    .put(url, formData)
    .then((response) => {
      feedback.value = response.data
      editSpinner.value = false
      message.value.editSuccess = true
    })
    .catch((error) => {
      console.log(error)
      editSpinner.value = false
      message.value.editError = true
    })
}

//function to save member
const saveFeedback = () => {
  message.value.addSuccess = false
  message.value.addError = false
  addSpinner.value = true
  const feedbackData = Object.assign({}, feedback.value)
  feedbackData.image = UploadImage ? UploadImage : feedback.value.image

  for (const key in feedbackData) {
    if (feedbackData.hasOwnProperty(key)) {
      formData.append(key, feedbackData[key])
    }
  }
  axios
    .post('http://127.0.0.1:8000/customer-feedback', formData)
    .then((response) => {
      customers_feedbacks.value.push(response.data)
      images.value = []
      addSpinner.value = false
      message.value.addSuccess = true
    })
    .catch((error) => {
      console.log(error)
      addSpinner.value = false
      message.value.addError = true
    })
}

//function to save or upload feedback
const save = () => {
  if (formAction.value.add === true) {
    saveFeedback()
  }
  if (formAction.value.update === true) {
    updateFeedback()
  }
}

//Function to handle feedback delete emit
const handleDeleteFeedback = (index) => {
  idFeedback = index
  let url = `http://127.0.0.1:8000/customers-feedbacks/${idFeedback}`
  axios
    .delete(url)
    .then((response) => {
      //remove element in the list
      let id = customers_feedbacks.value.findIndex(
        (objet) => objet.id_customer_feedback == idFeedback
      )
      if (id !== -1) {
        customers_feedbacks.value.splice(id, 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

//Function to upload image
const uploadImage = (event) => {
  formData.append('oldImage', feedback.value.image)
  UploadImage = event.target.files[0]

  //lire les fichiers selectionnés et les ajouter dans le tableaux d'images a afficher pour la prévisualisation
  const reader = new FileReader()
  reader.onload = (e) => {
    images.value[0] = e.target.result
  }
  reader.readAsDataURL(UploadImage)
}

const deleteSelectImage = () => {
  images.value = []
  uploadImage = ''
}
</script>


<template>
  <span>{{ getPath() }}</span>

  <!-- Modal -->
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <div class="head">
            <h4 v-if="formAction.add">New feedback</h4>
            <h4 v-if="formAction.update">Update feedback</h4>
            <h6 class="success" v-if="message.addSuccess">Nouveau feedback ajouté avec success !</h6>
            <h6 class="error" v-if="message.addError">Erreur le feedback n'a pas été ajouté !</h6>
            <h6 class="success" v-if="message.editSuccess">Modification apporté avec success !</h6>
            <h6 class="error" v-if="message.editError">Erreur lors de la modification !</h6>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <!-- form to add customer feedback -->
          <div class="form" id="form">
            <div class="imageBlock d-flex" v-if="editAction">
              <div class="images d-flex" id="imagesList">
                <Image
                  :imagePath="feedback.image"
                  :id="feedback.id_customer_feedback"
                  :action="false"
                />
              </div>
            </div>
            <form action="" method="post" @submit.prevent="save">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingName"
                  placeholder="Titre"
                  required
                  v-model="feedback.name"
                />
                <label for="floatingName">Name</label>
              </div>
              <div class="row">
                <div class="col">
                  <label for="floatingRole">Role</label>
                  <div class="form-floating mb-3 col">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingRole"
                      placeholder="Role"
                      required
                      v-model="feedback.role"
                    />
                  </div>
                </div>
                <div class="col mb-3">
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
                  name="message"
                  id="floatingMessage"
                  cols="30"
                  rows="20"
                  v-model="feedback.message"
                  placeholder="Message"
                  required
                ></textarea>
                <label for="floatingMessage">Message</label>
              </div>
              <div class="submit" v-if="formAction.add">
                <button type="submit" class="m-3" :disabled="!addSpinner == false ? true : false">
                  Ajouter
                  <span
                    v-if="addSpinner"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
                <button type="reset" class="m-3">Reset</button>
              </div>
              <div class="submit" v-if="formAction.update">
                <button type="submit" class="m-3" :disabled="!editSpinner == false ? true : false">
                  Modifier
                  <span
                    v-if="editSpinner"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
                <button type="" class="m-3" data-bs-dismiss="modal">Fermer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br /><br /><br />
  <div class="row">
    <div class="feedback col mb-3" v-for="(feedback, index) in customers_feedbacks" :key="index">
      <Feedback
        :id_customer_feedback="feedback.id_customer_feedback"
        :name="feedback.name"
        :role="feedback.role"
        :message="feedback.message"
        :image="feedback.image"
        :index="index"
        @updateFeedback="handleUpdateFeedback"
        @deleteFeedback="handleDeleteFeedback"
      />
    </div>
  </div>
  <div class="floating-button">
    <button @click="manageButton" data-bs-toggle="modal" data-bs-target="#modal">
      <h4>+</h4>
    </button>
  </div>
</template>

<style scoped>
.modal-dialog {
  max-width: 800px;
}
.form {
  padding: 5%;
  padding-bottom: 80px;
  border-radius: 10px 10px 10px 10px;
  background-color: #fff;
}
.success {
  color: green;
}
.error {
  color: red;
}
.form .imageBlock {
  padding-bottom: 20px;
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

.row .col {
  max-width: 500px;
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
.col .imageBlock .row {
  margin: 0px 5% 0px 0px;
}
form .imageBlock {
  max-width: 50px;
  height: 50px;
  position: relative;
  top: 20px;
}
.imageBlock .row .col {
  position: relative;
  bottom: 20px;
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