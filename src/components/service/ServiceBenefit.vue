
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  image: String,
  title: String,
  description: String,
  numero: Number
})
let imagepath = '../assets/images/' + props.image
// console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa ', imagepath)
</script>

<template>
  <div class="block">
    <div class="content">
      <h3>{{ props.title }}</h3><br>
      <p>
        {{ props.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.block {
  width: auto;
  height: auto;
  min-height: 180px;
  min-width: 300px;
  max-width: 400px;
  border-bottom: 3px solid rgb(144, 146, 150);
  /* box-shadow: rgba(2, 2, 2, 2) 0px 5px 15px; */
  border-radius: 15px 15px 15px 15px;
  text-align: justify;
  background-color: white;
  padding-bottom: 30px;
  margin: auto;
  margin-bottom: 20px;
}

.block .content {
  padding: 20px 30px;
}
.block h3 {
  text-align: left;
  font-family: 'Times';
  font-weight: bold;
  color: rgb(26, 95, 95);
}
.block p {
  color: rgb(97, 93, 88);
}
.block:hover {
  background-color: rgba(227, 229, 231, 0.5);
  -webkit-transition: background-color 500ms linear;
  -ms-transition: background-color 500ms linear;
  transition: background-color 500ms linear;
}
.block:hover p{
  color: rgb(77, 74, 74);
  -webkit-transition: color 500ms linear;
  -ms-transition: color 500ms linear;
  transition: color 500ms linear;
}
</style>