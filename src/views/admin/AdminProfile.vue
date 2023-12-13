<script setup>
import { ref, toRaw } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { user } from '@/states/states.js'
import { setImage } from '@/utils/index.js'
import { getPath } from '../../utils/index.js'

const router = useRouter()

const editStatus = ref(false)
const updateImageStatus = ref(false)
const updateImage = ref(null)
const errorMessage = ref(false)
let formData = new FormData()

let image

const manageEditButton = () => {
  editStatus.value = !editStatus.value
  // updateImage.value = user.value.image
}

const saveUpdate = () => {
  let url = `http://127.0.0.1:8000/user/${user.value.username}`

  const userData = Object.assign({}, user.value)
  userData.image = image ? image: user.value.image
  for (const key in userData) {
    if (userData.hasOwnProperty(key)) {
      formData.append(key, userData[key])
    }
  }
  // console.log(formData)
  axios
    .put(url, formData)
    .then((response) => {
      // console.log(response.data)
      if (response.status == 200) {
        user.value = response.data
        localStorage.clear()
        router.push('/admin/login')
      } else {
        errorMessage.value = true
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const uploadImage = (event) => {
  formData.append('oldImage', user.value.image)

  updateImageStatus.value = true
  image = event.target.files[0]

  const reader = new FileReader()
  reader.onload = (e) => {
    updateImage.value = e.target.result
  }
  reader.readAsDataURL(image)
}
</script>

<template>
  <span>{{ getPath() }}</span
  ><br /><br />

  <div class="block d-flex justify-content-between">
    <div class="head d-flex">
      <div class="photo">
        <img
          :src="setImage(user.image)"
          alt="user"
          class="rounded-circle"
          v-if="!updateImageStatus"
        />
        <img :src="updateImage" alt="user" class="rounded-circle" v-if="updateImageStatus" />
        <div class="imageBlock d-flex">
          <div class="custom-file-input">
            <input
              type="file"
              id="myFileInput"
              class="hidden"
              @change="uploadImage"
              :disabled="editStatus == false ? true : false"
            />
            <label for="myFileInput">
              <span class="file-icon">
                <font-awesome-icon :icon="['fas', 'camera']" size="xl" style="color: #c4a000" />
              </span>
            </label>
          </div>
        </div>
      </div>
      <div class="info">
        <span>Welcome,</span>
        <h2>{{ user.name }}</h2>
      </div>
    </div>
    <div class="action">
      <font-awesome-icon :icon="['fas', 'edit']" size="x" class="icon" @click="manageEditButton" />
    </div>
  </div>
  <br /><br />
  <!-- form to update profile -->
  <div class="form" id="form">
    <h5>Informations</h5>
    <hr />
    <br />
    <br />
    <form action="" method="post" @submit.prevent="saveUpdate">
      <div class="form-floating mb-4">
        <input
          type="text"
          class="form-control"
          id="floatingName"
          placeholder="Titre"
          required
          :disabled="editStatus == false ? true : false"
          v-model="user.name"
        />
        <label for="floatingName">Name</label>
      </div>
      <div class="form-floating mb-4">
        <input
          type="text"
          class="form-control"
          id="floatingRole"
          placeholder="Role"
          required
          disabled
          v-model="user.email"
        />
        <label for="floatingRole">Email</label>
      </div>
      <div class="form-floating mb-4">
        <input
          type="text"
          class="form-control"
          id="floatingRole"
          placeholder="Role"
          required
          disabled
          v-model="user.username"
        />
        <label for="floatingRole">Username</label>
      </div>
      <!-- <div class="form-floating mb-5">
        <input
          type="password"
          class="form-control"
          id="floatingRole"
          placeholder="Role"
          required
          :disabled="editStatus == false ? true : false"
          v-model="user.password"
        />
        <label for="floatingRole">password</label>
      </div> -->
      <div class="submit mb-5">
        <button type="submit" :disabled="editStatus == false ? true : false">Sauvegarder</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.block {
  background-color: rgba(253, 255, 255, 0.6);
  width: auto;
  width: 100%;
  min-height: 100px;
  min-width: 400px;
  height: auto;
  padding: 20px;
  border-radius: 20px 20px 10px 20px;
  margin: auto;
  box-shadow: rgb(206, 203, 203) 0px 5px 5px;
}
.form {
  background-color: rgba(253, 255, 255, 0.6);
  width: 100%;
  height: auto;
  padding: 50px;
  border-radius: 20px 20px 10px 20px;
  margin: auto;
  box-shadow: rgb(206, 203, 203) 0px 5px 5px;
}
.form h6 {
  color: red;
}
.block .head .photo img {
  width: 100px;
  height: 100px;
}
.block .head .info {
  padding: 20px;
  color: rgb(78, 77, 77);
  margin-left: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  max-width: 500px;
}
.imageBlock {
  position: relative;
  left: 70px;
  bottom: 35px;
  background-color: #fff;
  width: 45px;
  padding: 5px 0px 5px 10px;
  border-radius: 30px;
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
.action .icon:hover {
  cursor: pointer;
  color: rgb(211, 122, 5);
}
.form form input {
  background-color: rgba(145, 148, 148, 0.1);
}
.form .submit button {
  padding: 5px;
  border-radius: 10px;
  color: rgb(49, 48, 48);
  float: right;
}
</style>