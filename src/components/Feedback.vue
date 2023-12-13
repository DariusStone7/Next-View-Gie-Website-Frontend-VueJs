<script setup>
import { defineProps} from "vue";
import {setImage} from '@/utils/index.js'

const props = defineProps({
    name:String,
    role:String,
    image:String,
    message:String
});
</script>

<template>
  <div class="block">
    <div class="head d-flex">
      <span><font-awesome-icon :icon="['fas', 'quote-left']" size="2x" style="color: #d7a009;" /></span>
      <div class="photo">
        <img :src="setImage(props.image)" alt="user" class="rounded-circle"/>
      </div>
      <div class="info">
        <h4>{{ props.name }}</h4>
        <span>{{ props.role }}</span>
      </div>
    </div>
    <div class="message">
      <p>
       {{ props.message }}
      </p>
    </div>
  </div>
</template>


<style scoped>
.block{
    background-color: white;
    width: auto;
    min-width: 350px;
    max-width: 600px;
    min-height: 280px;
    height: auto;
    padding: 30px;
    border-radius: 20px 20px 20px 20px;
    margin: auto;
}
.block .head .photo img{
    width: 100px;
    height: 100px;
}
.block .head .info{
    padding: 20px;
}
.block .message{
  margin-top: 10px;
  color: rgb(48, 49, 49);
  text-align: justify;
}

@media screen and(max-width: 1000px) {
.block{
    width: auto;
    background: black;
}
}
</style>