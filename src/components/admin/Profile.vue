<script setup>
import { defineProps, onMounted, ref, defineEmits } from 'vue'
import OptionsMenu from './OptionsMenu.vue'
import { setImage } from '@/utils/index.js'

const props = defineProps({
  id_profile: Number,
  name: String,
  role: String,
  image: String,
  index: Number
})
const deleteSpinner = ref(false)
const optionMenuStatus = ref(false)
const image = String(props.image).split('/').slice(-1)[0]
const emit = defineEmits(['updateProfile', 'deleteProfile'])

//function to truncate the description
const truncateText = (text, maxlenght) => {
  return text.length < maxlenght ? text : text.slice(0, maxlenght)
}

//Function to handle options menu update emit
const handleToggleUpdate = () => {
  emit('updateProfile', props.id_profile)
  optionMenuStatus.value = false
}

//Function to handle options menu delete emit
const handleToggleDelete = () => {
  emit('deleteProfile', props.id_profile)
  optionMenuStatus.value = false
}
</script>


<template>
  <div class="block">
    <div class="head d-flex">
      <div class="photo">
        <img :src="setImage(props.image)" alt="user" class="rounded-circle" />
      </div>
      <div class="info">
        <h6>{{ props.name }}</h6>
        <span>{{ props.role }}</span>
      </div>
    </div>
    <div class="action">
      <font-awesome-icon
        :icon="['fas', 'edit']"
        size="x"
        class="icon"
        data-bs-toggle="modal"
        data-bs-target="#modal"
        @click="handleToggleUpdate"
      />
      <font-awesome-icon
        v-if="!deleteSpinner"
        :icon="['fas', 'trash']"
        size="x"
        class="icon"
        @click="handleToggleDelete"
      />
      <span
        v-if="deleteSpinner"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    </div>
  </div>
</template>


<style scoped>
.block {
  background-color: rgba(253, 255, 255, 0.6);
  width: auto;
  /* min-width: 250px; */
  width: 330px;
  min-height: 120px;
  height: auto;
  padding: 20px;
  border-radius: 20px 20px 10px 20px;
  margin: auto;
  box-shadow: rgb(206, 203, 203) 0px 5px 5px;
}
.block .head .photo img {
  width: 90px;
  height: 90px;
}
.block .head .info {
  padding: 20px;
}
.block .message {
  color: rgb(48, 49, 49);
}
.action .icon,
.spinner-border {
  float: right;
  margin-right: 20px;
  color: rgb(153, 152, 150);
  cursor: pointer;
}
.action .icon:hover {
  color: rgb(211, 122, 5);
}
@media screen and(max-width: 1000px) {
  .block {
    width: auto;
    background: black;
  }
}
</style>