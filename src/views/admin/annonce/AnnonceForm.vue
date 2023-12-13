<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getPath } from '../../../utils/index.js'

import { annonces } from '@/states/states.js'

const annonce = ref({
  title: '',
  description: '',
  url: '',
  price: 0,
  bedroom: 0,
  bathroom: 0,
  warehouse: 0,
  parking: 0,
  pool: 0,
  wind: 0,
  furniture: 0,
  fredge: 0,
  phone: '+237 698 154 430',
  address: '',
  email: 'info@next-view.com',
  images: []
})
const formData = new FormData()
let images = ref([])
const addSpinner = ref(false)
const message = ref({
  success: false,
  error: false
})
//function to save annonce
const saveAnnonce = () => {
  message.value.success = false
  message.value.error = false
  addSpinner.value = true
  for (const key in annonce.value) {
    if (annonce.value.hasOwnProperty(key)) {
      if (key === 'images') {
        const images = annonce.value[key]
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i])
        }
      } else {
        formData.append(key, annonce.value[key])
      }
    }
  }
  axios
    .post('http://127.0.0.1:8000/annonce', formData)
    .then((response) => {
      annonces.value.push(response.data)
      annonce.value.images = []
      images.value = []
      addSpinner.value = false
      message.value.success = true
    })
    .catch((error) => {
      console.log(error)
      addSpinner.value = false
      message.value.error = true
    })
}

//function to upload images
const uploadImage = (event) => {
  let size = images.value.length

  for (let i = 0; i < event.target.files.length; i++) {
    annonce.value.images[size + i] = event.target.files[i]

    //lire les fichiers selectionnés et les ajouter dans le tableaux d'images a afficher pour la prévisualisation
    const reader = new FileReader()
    reader.onload = (e) => {
      images.value[size + i] = e.target.result
    }
    reader.readAsDataURL(annonce.value.images[size + i])
  }
}
const deleteSelectImage = (index) => {
  annonce.value.images.splice(index, 1)
  images.value.splice(index, 1)
}
</script>


<template>
  <span>{{ getPath() }}</span>
  <!-- form to add customer feedback -->
  <div class="form">
    <h6 class="success" v-if="message.success">Nouvelle annonce ajouté avec success !</h6>
    <h6 class="error" v-if="message.error">Erreur l'annonce n'a pas été ajouté !</h6>
    <br />
    <form action="" method="post" @submit.prevent="saveAnnonce">
      <div class="row">
        <div class="form-floating mb-3 col">
          <input
            type="text"
            class="form-control"
            id="floatingTitle"
            placeholder="Titre"
            required
            v-model="annonce.title"
          />
          <label for="floatingTitle">&emsp; Titre</label>
        </div>

        <div class="form-floating mb-3 col">
          <input
            type="text"
            class="form-control"
            id="floatingUrl"
            placeholder="Url"
            v-model="annonce.url"
          />
          <label for="floatingUrl">&emsp; Url</label>
        </div>
      </div>
      <div class="row">
        <div class="form-floating mb-3 col">
          <input
            type="text"
            class="form-control"
            id="floatingPhone"
            placeholder="Tel"
            required
            v-model="annonce.phone"
          />
          <label for="floatingPhone">&emsp; Téléphone</label>
        </div>

        <div class="form-floating mb-3 col">
          <input
            type="text"
            class="form-control"
            id="floatingEmail"
            placeholder="Email"
            required
            v-model="annonce.email"
          />
          <label for="floatingEmail">&emsp; Email</label>
        </div>
      </div>
      <div class="row">
        <div class="form-floating mb-3 col">
          <input
            type="text"
            class="form-control"
            id="floatingAddress"
            placeholder="Adresse"
            required
            v-model="annonce.address"
          />
          <label for="floatingAddress">&emsp; Adresse</label>
        </div>
        <div class="col">
          <div class="row">
            <div class="col">
              <div class="form-floating mb-3 col">
                <input
                  type="number"
                  class="form-control"
                  id="floatingPrice"
                  placeholder="Prix"
                  required
                  min="0"
                  v-model="annonce.price"
                />
                <label for="floatingPrice">Prix</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating mb-3 col">
                <input
                  type="number"
                  class="form-control"
                  id="floatingBedroom"
                  placeholder="Chambre"
                  required
                  min="0"
                  v-model="annonce.bedroom"
                />
                <label for="floatingPrice">Chambre</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row chekList">
        <div class="col">
          <div class="row">
            <div class="form-check col">
              <input
                class="form-check-input"
                type="checkbox"
                name="bathroom"
                id="bathroom"
                v-model="annonce.bathroom"
              />
              <label class="form-check-label" for="bathroom"> Salle de Bain </label>
            </div>
            <div class="form-check col">
              <input
                class="form-check-input"
                type="checkbox"
                name="warehouse"
                id="warehouse"
                v-model="annonce.warehouse"
              />
              <label class="form-check-label" for="warehouse"> Garage </label>
            </div>
          </div>
          <div class="row">
            <div class="form-check col">
              <input
                class="form-check-input"
                type="checkbox"
                name="parking"
                id="parking"
                v-model="annonce.parking"
              />
              <label class="form-check-label" for="parking"> Parking </label>
            </div>
            <div class="form-check col">
              <input
                class="form-check-input"
                type="checkbox"
                name="pool"
                id="pool"
                v-model="annonce.pool"
              />
              <label class="form-check-label" for="pool"> Piscine </label>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="form-check col">
              <input
                class="form-check-input"
                type="checkbox"
                name="wind"
                id="wind"
                v-model="annonce.wind"
              />
              <label class="form-check-label" for="wind"> Climatiseur </label>
            </div>
            <div class="form-check col">
              <input
                class="form-check-input"
                type="checkbox"
                name="furniture"
                id="furniture"
                v-model="annonce.furniture"
              />
              <label class="form-check-label" for="pool"> Meubles </label>
            </div>
          </div>
          <div class="row">
            <div class="form-check col">
              <input
                class="form-check-input"
                type="checkbox"
                name="fredge"
                id="fredge"
                v-model="annonce.fredge"
              />
              <label class="form-check-label" for="fredge"> Frigo </label>
            </div>
          </div>
        </div>
      </div>
      <br />
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
              multiple
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
          <div class="image col mb-4" v-for="(image, index) in images" :key="index">
            <span @click="deleteSelectImage(index)"> x </span>
            <img :src="image" alt="" />
          </div>
        </div>
      </div>
      <br />
      <div class="form-floating">
        <textarea
          class="form-control"
          name="message"
          id="floatingDescription"
          cols="30"
          rows="20"
          v-model="annonce.description"
          placeholder="description"
          required
        ></textarea>
        <label for="floatingDescription">&emsp; Description</label>
      </div>
      <br />

      <div class="submit">
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
    </form>
  </div>
  <br /><br />
</template>


<style scoped>
.form {
  margin: 50px 2% 0px 2%;
  background-color: #fff;
  border-radius: 20px;
  padding: 5%;
  padding-top: 50px;
  padding-bottom: 100px;
  color: rgb(49, 48, 48);
  box-shadow: rgba(2, 2, 2, 0.1) 0px 5px 15px;
}
.form .success {
  color: green;
}
.form .error {
  color: red;
}
.form form input,
textarea {
  background-color: rgb(234, 236, 236);
}
.form form .form-check-input {
  background-color: rgb(160, 157, 157);
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
.form form .chekList {
  margin-left: 10px;
  color: rgb(49, 48, 48);
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
.imageBlock .row {
  margin: 0px 5% 0px 0px;
  position: relative;
  bottom: 25px;
}
.imageBlock .row .col {
  max-width: 50px;
  height: 50px;
  margin-left: 10px;
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