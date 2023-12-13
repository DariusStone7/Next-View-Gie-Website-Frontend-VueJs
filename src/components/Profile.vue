<script setup>
import { ref, defineProps } from 'vue'
import {setImage} from '../utils/index.js'

const props = defineProps({
  name: String,
  role: String,
  image: String
})
</script>

<template>
  <div class="block d-flex">
    <div class="photo d-flex">
      <img :src="setImage(props.image)" alt="" class="rounded-circle" />
    </div>
    <div class="text">
      <span
        ><font-awesome-icon :icon="['fas', 'quote-right']" size="2x" style="color: #d7a009"
      /></span>
      <h3>{{ props.name }}</h3>
      <p>{{ props.role }}</p>
    </div>
  </div>
</template>


<style scoped>
.block {
  width: auto;
  height: auto;
  min-width: 300px;
  max-width: 450px;
  text-align: justify;
  background-color: white;
  padding: auto;
  margin: auto;
}
.block .photo {
  text-align: center;
  width: 220px;
}
.block .text:hover {
  background-color: #221e1e;
  transition: background-color 400ms linear;
}
.block .photo img {
  width: 100%;
  height: 100%;
}
.block .text {
  width: 100%;
  height: auto;
  box-shadow: rgba(2, 2, 2, 2) 0px 5px 15px;
  border-radius: 15px 15px 15px 15px;
  padding: 20px;
  background-color: rgb(48, 46, 46);
  color: rgb(240, 149, 29);
}
.block h3 {
  text-align: center;
}
.block p{
  text-align: left;
}
</style>