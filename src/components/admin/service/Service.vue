<script setup>
import { defineProps, onMounted, ref, defineEmits } from 'vue'
import OptionsMenu from '../OptionsMenu.vue'
import { setImage } from '@/utils/index.js'

const props = defineProps({
  id_service: Number,
  title: String,
  description: String,
  image: String,
  icon: String,
  index: Number
})
const optionMenuStatus = ref(false)

const image = String(props.image).split('/').slice(-1)[0]

const emit = defineEmits(['updateService', 'deleteService'])

//function to truncate the description
const truncateText = (text, maxlenght) => {
  return text.length < maxlenght ? text : text.slice(0, maxlenght)
}

//Function to handle options menu update emit
const handleToggleUpdate = () => {
  emit('updateService', props.id_service)
  optionMenuStatus.value = false
}

//Function to handle options menu delete emit
const handleToggleDelete = () => {
  emit('deleteService', props.id_service)
  optionMenuStatus.value = false
}
</script>


<template>
  <div class="card">
    <img :src="setImage(props.image)" alt="" />
    <div class="card-body">
      <h4 class="card-title">
        <font-awesome-icon :icon="['fas', `${props.icon}`]" size="x" class="icon" />
        {{ props.title }}
      </h4>
      <p>{{ props.description }}</p>
    </div>
    <div class="action">
      <span>
        <font-awesome-icon
          :icon="['fas', 'trash']"
          size="x"
          class="icon"
          @click="handleToggleDelete"
        />
        <font-awesome-icon
          :icon="['fas', 'edit']"
          size="x"
          class="icon"
          data-bs-toggle="modal" data-bs-target="#listModal"
          @click="handleToggleUpdate"
        />
      </span>
    </div>
  </div>
</template>


<style scoped>
.block {
  margin-bottom: 20px;
  width: 100%;
  color: rgb(88, 86, 86);
  padding: 10px;
  border: 1px solid rgb(236, 232, 232);
  border-radius: 10px;
  background-color: rgba(213, 218, 218, 0.6);
}
.block .info tr {
  height: auto;
}
.block .info tr td {
  padding-right: 30px;
  text-align: justify;
  color: rgb(88, 86, 86);
  word-wrap: break-word;
}
.block .info tr .number {
  width: 50px;
}
.block .info tr .title {
  width: 200px;
}
.block .info tr .description {
  width: 500px;
}
.block .info tr .image {
  max-width: 150px;
}
.block .info tr .icon {
  width: 100px;
}
.block .info tr .options-button {
  width: 50px;
  padding-right: 0px;
}
.block .menu .button {
  width: 20px;
  text-align: center;
  cursor: pointer;
  visibility: hidden;
}
.block:hover .button {
  visibility: visible;
}
.block .menu .options-menu {
  position: relative;
  right: 100px;
}
.card {
  max-width: 400px;
  height: auto;
  padding-bottom: 20px;
  border-radius: 10px;
  box-shadow: rgb(206, 203, 203) 0px 5px 5px;
}
.card img {
  width: 100%;
  height: 200px;
  border-radius: 5px 5px 0px 0px;
}
.card .card-img-overlay span {
  background-color: rgba(19, 18, 18, 0.6);
  float: right;
  padding: 0px 0px 0px 10px;
}
.card .card-img-overlay .icon {
  color: white;
  margin-right: 20px;
  cursor: pointer;
}
.card .card-img-overlay .icon:hover {
  color: rgb(238, 144, 21);
}
.card .card-img-overlay .card-title {
  margin: 100px 0px;
  color: white;
}
.card .card-body .card-title .icon {
  color: rgb(187, 107, 2);
}
.card .card-body {
  padding-top: 20px;
}
.card .card-body p {
  color: rgb(75, 73, 73);
}
.action .icon {
  float: right;
  margin-right: 20px;
  color: rgb(153, 152, 150);
}
.action .icon:hover {
  color: rgb(211, 122, 5);
}
</style>