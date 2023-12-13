<script setup>
import { defineProps, onMounted, ref, defineEmits } from 'vue'
import OptionsMenu from './OptionsMenu.vue'
import { setImage } from '@/utils/index.js'

const props = defineProps({
  id_about: Number,
  title: String,
  text: String,
  image: String,
  index: Number
})
const optionMenuStatus = ref(false)
const image = String(props.image).split('/').slice(-1)[0]
const emit = defineEmits(['updateAbout', 'deleteAbout'])

//function to truncate the description
const truncateText = (text, maxlenght) => {
  return text.length < maxlenght ? text : text.slice(0, maxlenght) + '...'
}

//Function to handle options menu update emit
const handleToggleUpdate = () => {
  emit('updateAbout', props.id_about)
  optionMenuStatus.value = false
}

//Function to handle options menu delete emit
const handleToggleDelete = () => {
  emit('deleteAbout', props.id_about)
  optionMenuStatus.value = false
}
</script>


<template>
  <div class="card">
    <img :src="setImage(props.image)" alt="" />
    <div class="card-body">
      <h4 class="card-title">{{ props.title }}</h4>
      <p>{{ props.text }}</p>
    </div>
    <div class="action">
      <span>
        <!-- <font-awesome-icon
          :icon="['fas', 'trash']"
          size="x"
          class="icon"
          @click="handleToggleDelete"
        /> -->
          <font-awesome-icon
            :icon="['fas', 'edit']"
            size="x"
            class="icon"
            @click="handleToggleUpdate"
            data-bs-toggle="modal" data-bs-target="#modal"
          />
      </span>
    </div>
  </div>
</template>


<style scoped>
.card {
  max-width: 400px;
  height: auto;
  padding-bottom: 20px;
  border-radius: 10px;
  box-shadow: rgb(206, 203, 203) 0px 5px 5px;
  background-color: rgba(253, 255, 255, 0.6);
  z-index: 1;
}
.card img {
  width: 100%;
  height: 200px;
  border-radius: 5px 5px 0px 0px;
}
.card .card-img-overlay span{
  background-color: rgba(19, 18, 18, 0.6);;
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
.card .card-body {
  padding-top: 20px;
  text-align: justify;
}
.card .card-body p{
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