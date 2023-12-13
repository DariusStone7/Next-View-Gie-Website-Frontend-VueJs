<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getPath } from '../../../utils/index.js'
import { useRoute } from 'vue-router'
import { annonces } from '@/states/states.js'
import Image from '@/components/admin/Image.vue'

const router = ref(useRoute())
const annonce = ref({
  id_annonce: '',
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
  upload_folder: '',
  images: '',
  imagesId: ''
})
const formData = new FormData()
let url = `http://127.0.0.1:8000/annonces/${router.value.query.id}`
let images = ref(null)
let imagesId = ref(null)
const editSpinner = ref(false)
const addImageSpinner = ref(false)
const message = ref({
  success: false,
  error: false
})
onMounted(() => {
  axios
    .get(url)
    .then((response) => {
      annonce.value = response.data[0]
      images.value = String(annonce.value.images).split(',')
      imagesId.value = String(annonce.value.imagesId).split(',')
      // annonce.value.bathroom = 0
      // annonce.value.warehouse = 0
      // annonce.value.parking = 0
      // annonce.value.wind = 0
      // annonce.value.pool = 0
      // annonce.value.furniture = 0
      // annonce.value.fredge = 0
    })
    .catch((error) => {
      console.log(error)
    })
})
//function to save image
const saveImage = () => {
  addImageSpinner.value = true
  formData.append('id_annonce', router.value.query.id)
  axios
    .post('http://127.0.0.1:8000/annonce-image', formData)
    .then((response) => {
      annonce.value.images = annonce.value.images + `,${response.data.name}`
      images.value.push(response.data.name)
      imagesId.value.push(response.data.id_annonce_image)
      addImageSpinner.value = false
    })
    .catch((error) => {
      console.log(error)
      addImageSpinner.value = false
    })
}
//function to upload image
const uploadImage = (event) => {
  const file = event.target.files[0]
  formData.append('image', file)

  saveImage()
}

//function to update annonce
const updateAnnonce = () => {
  message.value.success = false
  message.value.error = false
  editSpinner.value = true
  let url = `http://127.0.0.1:8000/annonces/${router.value.query.id}`
  const updateData = { ...annonce.value }
  delete updateData.images
  delete updateData.imagesId
  delete updateData.id_annonce

  axios
    .put(url, updateData)
    .then((response) => {
      // if(response.status == 200){
      //   router.value.push('/admin/dashboard/annonces')
      // }
      editSpinner.value = false
      message.value.success = true
    })
    .catch((error) => {
      console.log(error)
      editSpinner.value = false
      message.value.error = true
    })
}

const handleDelete = (id_image) => {
  let url = `http://127.0.0.1:8000/annonces-images/${id_image}`
  axios.delete(url).then((response) => {
    let index = images.value.indexOf(response.data.name)
    if (index > -1) {
      images.value.splice(index, 1)
    }
  })
}
</script>


<template>
  <span>{{ getPath() }}</span
  ><br /><br />

  <div class="imageBlock d-flex">
    <div class="custom-file-input" v-if="!addImageSpinner">
      <input type="file" id="myFileInput" class="hidden" @change="uploadImage" />
      <label for="myFileInput">
        <span class="file-icon">
          <font-awesome-icon
            :icon="['fas', 'file-medical']"
            size="2xl"
            style="color: #888a85"
          /> </span
        >&emsp14;
      </label>
    </div>
    <span
      v-if="addImageSpinner"
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
  </div>
  <div class="images row" id="imagesList">
    <div class="image col m-3" v-for="(image, index) in images" :key="index">
      <Image :imagePath="image" :id="imagesId[index]" :action="true" @deleteImage="handleDelete" />
    </div>
  </div>

  <div class="form">
    <h6 class="success" v-if="message.success">Modification apporté avec success !</h6>
    <h6 class="error" v-if="message.error">Erreur lors de la modification !</h6>
    <br />
    <form action="" method="post" @submit.prevent="updateAnnonce">
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
                :checked="annonce.bathroom ? true : false"
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
                :checked="annonce.warehouse ? true : false"
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
                :checked="annonce.parking ? true : false"
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
                :checked="annonce.pool ? true : false"
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
                :checked="annonce.wind ? true : false"
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
                :checked="annonce.furniture ? true : false"
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
                :checked="annonce.fredge ? true : false"
                v-model="annonce.fredge"
              />
              <label class="form-check-label" for="fredge"> Frigo </label>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row">
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
      </div>

      <div class="submit">
        <button type="submit" class="m-3" :disabled="!editSpinner == false ? true : false">
          Modifier
          <span
            v-if="editSpinner"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </form>
  </div>
  <br /><br />
</template>


<style scoped>
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
.form {
  margin: 50px 2% 100px 2%;
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
.images {
  margin: auto;
  max-width: 950px;
}
.images .col {
  max-width: 200px;
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
</style>