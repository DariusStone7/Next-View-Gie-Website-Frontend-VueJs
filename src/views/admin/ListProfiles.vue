<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { getPath } from '@/utils/index.js'
import { members_profiles } from '@/states/states.js'
import Profile from '../../components/admin/Profile.vue'
import Image from '@/components/admin/Image.vue'

const profile = ref({
  name: '',
  role: '',
  image: ''
})
const formData = new FormData()
let idProfile = -1
const editAction = ref(false)
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
//function to manage button
const manageButton = () => {
  message.value.addSuccess = false
  message.value.addError = false
  message.value.editSuccess = false
  message.value.editError = false

  formAction.value.update = false
  formAction.value.add = true
  editAction.value = false

  profile.value = {
    name: '',
    role: '',
    image: profile.image
  }
  images.value = []
}

//Function to handle profile update emit
const handleUpdateProfile = (index) => {
  message.value.editSuccess = false
  message.value.editError = false
  idProfile = index
  profile.value = members_profiles.value.find((objet) => objet.id_member_profile === idProfile)
  editAction.value = true
  formAction.value.add = false
  formAction.value.update = true
}

//function to update profile
const updateProfile = () => {
  message.value.editSuccess = false
  message.value.editError = false
  editSpinner.value = true
  let url = `http://127.0.0.1:8000/members-profiles/${idProfile}`
  const profileData = Object.assign({}, profile.value)
  profileData.image = UploadImage ? UploadImage : profile.value.image

  for (const key in profileData) {
    if (profileData.hasOwnProperty(key)) {
      formData.append(key, profileData[key])
    }
  }
  axios
    .put(url, formData)
    .then((response) => {
      profile.value = response.data
      images.value = []
      editSpinner.value = false
      message.value.editSuccess = true
    })
    .catch((error) => {
      console.log(error)
      editSpinner.value = false
      message.value.editError = true
    })
}

//function to save profile
const saveProfile = () => {
  message.value.addSuccess = false
  message.value.addError = false
  addSpinner.value = true
  const profileData = Object.assign({}, profile.value)
  profileData.image = UploadImage ? UploadImage : profile.value.image

  for (const key in profileData) {
    if (profileData.hasOwnProperty(key)) {
      formData.append(key, profileData[key])
    }
  }
  axios
    .post('http://127.0.0.1:8000/member-profile', formData)
    .then((response) => {
      members_profiles.value.push(response.data)
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

//function to save or upload about
const save = () => {
  if (formAction.value.add === true) {
    saveProfile()
  }
  if (formAction.value.update === true) {
    updateProfile()
  }
}

//Function to handle about delete emit
const handleDeleteProfile = (index) => {
  idProfile = index
  let url = `http://127.0.0.1:8000/members-profiles/${idProfile}`
  axios
    .delete(url)
    .then((response) => {
      //remove element in the list
      let id = members_profiles.value.findIndex((profile) => profile.id_member_profile == idProfile)
      if (id !== -1) {
        members_profiles.value.splice(id, 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

//Function to upload image
const uploadImage = (event) => {
  formData.append('oldImage', profile.value.image)
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
  <span>{{ getPath() }}</span> <br /><br />

  <!-- Modal -->
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <div class="head">
            <h4 v-if="formAction.add">New member</h4>
            <h4 v-if="formAction.update">Update member</h4>
            <h6 class="success" v-if="message.addSuccess">Nouveau profile ajouté avec success</h6>
            <h6 class="error" v-if="message.addError">Erreur le profile n'a pas été ajouté</h6>
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
          <!-- form to add member -->
          <div class="form" id="form">
            <div class="imageBlock d-flex" v-if="editAction">
              <div class="images d-flex" id="imagesList">
                <Image :imagePath="profile.image" :id="profile.id_member_profile" :action="false" />
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
                  v-model="profile.name"
                />
                <label for="floatingName">Name</label>
              </div>
              <div class="mb-5">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingRole"
                    placeholder="Role"
                    required
                    v-model="profile.role"
                  />
                  <label for="floatingRole">Role</label>
                </div>
              </div>
              <div class="mb-3">
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
                <button type="button" class="m-3" data-bs-dismiss="modal">Fermer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br />
  <div class="row profiles">
    <div class="profile col mb-3" v-for="(profile, index) in members_profiles" :key="index">
      <Profile
        :id_profile="profile.id_member_profile"
        :name="profile.name"
        :role="profile.role"
        :image="profile.image"
        :index="index"
        @updateProfile="handleUpdateProfile"
        @deleteProfile="handleDeleteProfile"
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
  margin: auto;
  padding: 5%;
  padding-bottom: 80px;
  border-radius: 10px 10px 10px 10px;
  box-shadow: rgba(2, 2, 2, 0.1) 0px 5px 15px;
  max-width: 800px;
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
.form form .row {
  padding-left: 0px;
}
.form form .row .col input {
  width: 100%;
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
.profiles {
  margin: auto;
}
.row .col {
  max-width: 320px;
  min-width: 320px;
  margin-right: 30px;
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
  position: relative;
  bottom: 30px;
  left: 50px;
}
</style>