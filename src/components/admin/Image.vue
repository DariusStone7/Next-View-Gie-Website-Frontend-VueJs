<script setup>
import { defineProps, defineEmits } from 'vue'
import { setImage } from '@/utils/index.js'

const props = defineProps({
  imagePath: String,
  id: Number,
  action: Boolean
})
const emits = defineEmits(['deleteImage'])

const handleClick = () => {
  emits('deleteImage', props.id)
}
</script>

<template>
  <div class="card">
    <div class="photo pswp-gallery pswp-gallery--single-column" id="gallery">
      <a
        :href="setImage(props.imagePath)"
        data-pswp-width="1669"
        data-pswp-height="2500"
        target="_blank"
        rel="noreferrer"
      >
        <img :src="setImage(props.imagePath)" class="card-img-top" />
      </a>
    </div>
    <div class="card-img-overlay" v-if="props.action">
      <span @click="handleClick">
        <font-awesome-icon :icon="['fas', 'trash']" size="x" class="icon" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: rgb(213, 218, 218, 0.5);
  width: 200px;
  height: 100px;
}
.card .photo {
  width: 200px;
  height: 100px;
}
.card .card-img-overlay {
  max-height: 1px;
}
.card-img-overlay span {
  text-align: center;
  color: white;
  width: 198px;
  background-color: rgba(19, 18, 18, 0.6);
  position: relative;
  top: 62px;
  left: 150px;
}
span .icon {
  cursor: pointer;
  padding: 0px 10px 0px 10px;
  /* width: 198px; */
  /* position: relative;
  top: 70px;
  right: 16px; */
}
span .icon:hover {
  color: rgb(238, 144, 21);
}
.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>