
<script setup>
import { defineProps } from 'vue'
import {setImage} from '../../utils/index.js'


const props = defineProps({
  id_service: Number,
  image: String,
  title: String,
  description: String,
  icon: String
})
// console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa ', props.icon)
</script>

<template>
  <div class="block">
    <div class="image">
      <img :src="setImage(props.image)" alt="" />
    </div>
    <div class="content">
      <div class="title">
        <h4><font-awesome-icon :icon="['fas', `${props.icon}` ]" size="x" style="color: #c7820a;" />
          {{ props.title }}</h4>
      </div>
      <div class="description">
        <p>
          {{ props.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block {
  width: auto;
  height: auto;
  min-height: 600px;
  width: 350px;
  /* min-width: 350px; */
  /* box-shadow: rgba(2, 2, 2, 2) 0px 5px 15px; */
  border-radius: 15px 15px 15px 15px;
  text-align: justify;
  background-color: white;
  margin: auto;
}
.block .image{
  height: 300px;
  width: 100%;
}
.block .image img{
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
}
.block .content{
  width: 100%;
  height: auto;
  padding: 0px 30px 0px 30px;
}
.block .content.title{
  width: 100%;
}
.block h4 {
  text-align: left;
}
.block img {
  height: 70px;
  float: left;
}
.block p {
  color: rgb(97, 93, 88);
}
.block:hover {
  background: rgba(243, 244, 245, 0.7);
  -webkit-transition: background-color 800ms linear;
  -ms-transition: background-color 800ms linear;
  transition: background-color 800ms linear;
}
.block:hover p {
  color: rgb(2, 2, 2);
  -webkit-transition: background-color 800ms linear;
  -ms-transition: background-color 800ms linear;
  transition: color 800ms linear;
}
@media screen and (max-width: 1000px) {
  .block{
    width: 300px;
  }
  .block h3{
    text-align: left;
  }
  
}
@media screen and (max-width: 800px){
  .block{
    min-width: 250px;
    width: auto;
  }
}
</style>