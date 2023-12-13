<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { carousels } from '@/states/states.js'
import { getPath } from '@/utils/index.js'
import Carousel from '@/components/admin/Carousel.vue'
import Image from '@/components/admin/Image.vue'

const formSatus = ref(false)

const carousel = ref({
  text: '',
  image: ''
})

const formData = new FormData()
const addImageSpinner = ref(false)
//function to save carousel
// const saveCarousel = () => {
//   axios.post('http://127.0.0.1:8000/carousel', formData).then((response) => {
//     carousels.value.push(response.data)
//   })
// }

const addImage = (event) => {
  addImageSpinner.value = true
  formData.append('file', event.target.files[0])
  axios.post('http://127.0.0.1:8000/carousel', formData).then((response) => {
    carousels.value.push(response.data)
    addImageSpinner.value = false
  })
  .catch((error) => {
      console.log(error)
      addImageSpinner.value = false
    })
}

//function to upload image
// const uploadImage = (event) => {
//   formData.append('file', event.target.files[0])
// }

//function to handle carousel delete emit
const handleDeleteCarousel = (index) => {
  let idCarousel = index
  let url = `http://127.0.0.1:8000/carousels/${idCarousel}`
  axios
    .delete(url)
    .then((response) => {
      //remove element in the list
      let id = carousels.value.findIndex((carousel) => carousel.id_carousel == idCarousel)
      if (id !== -1) {
        carousels.value.splice(id, 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <span>{{ getPath() }}</span>
  <br /><br /><br />
  <div class="row">
    <div class="block row">
      <div class="carousel col mb-4" v-for="(carousel, index) in carousels" :key="index">
        <div class="images" id="imagesList">
          <div
            class="image"
            v-for="(image, index) in String(carousel.image).split(',')"
            :key="index"
          >
            <Image
              :imagePath="image"
              :id="carousel.id_carousel"
              :action="true"
              @deleteImage="handleDeleteCarousel"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="floating-button">
      <div class="custom-file-input" v-if="!addImageSpinner">
        <input type="file" id="myFileInput" class="hidden" @change="addImage" />
        <label for="myFileInput">
          <span class="file-icon">
            <font-awesome-icon :icon="['fas', 'file-medical']" size="2xl" style="color: #888a85" />
          </span>
        </label>
      </div>
      <span
        v-if="addImageSpinner"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    </div>
  </div>
</template>


<style scoped>
.form {
  margin-top: 50px;
  max-width: 650px;
  margin: auto;
  padding: 20px;
  padding-bottom: 80px;
  border-radius: 10px 10px 10px 10px;
  box-shadow: rgba(2, 2, 2, 0.1) 0px 5px 15px;
  background-color: #fff;
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
.liste-carousels {
  margin: auto;
  margin-top: 5%;
  padding: 25px 0px 25px 25px;
  box-shadow: 2px 2px 2px 2px;
  border-radius: 10px;
  background-color: #fff;
  width: auto;
  max-width: 1000px;
  min-height: 500px;
  height: auto;
}

.block-header {
  width: 100%;
  height: auto;
  border-bottom: 2px solid rgb(138, 136, 136);
  padding: 0px 10px 10px 0px;
  margin-bottom: 30px;
}
.block-header a button h4 {
  color: rgb(56, 54, 54);
}
.block-header button {
  width: 45px;
  border-radius: 30px;
}
.header .number {
  width: 50px;
}
.header .name {
  width: 500px;
}
.header .menu {
  width: 50px;
}
.liste-carousels .carousel {
  width: 100%;
  height: auto;
}
.row {
  padding-top: 30px;
  width: 100%;
  margin: auto;
  flex-wrap: wrap;
}
.row .col-md-4 {
  width: auto;
}
.row .col {
  max-width: 218px;
  padding: 0;
}
.floating-button {
  position: fixed;
  bottom: 100px;
  right: 8%;
  box-shadow: rgba(2, 2, 2, 0.1) 10px 15px 15px;
  border-radius: 25px;
  width: 50px;
  padding: 10px 0px;
  background-color: #fff;
  text-align: center;
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