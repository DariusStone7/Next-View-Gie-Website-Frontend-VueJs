<script setup>
import { ref, onMounted } from 'vue'
import { messages } from '@/states/states.js'
import { defineEmits } from 'vue'
import { setImage } from '@/utils/index.js'
import { user } from '@/states/states.js'
import axios from 'axios'

const emits = defineEmits(['activeDropdownLink'])

console.log(user.value)
const toggleDropdownClick = () => {
  emits('activeDropdownLink')
}

onMounted(()=>{
  axios.get('http://127.0.0.1:8000/users/me/').then((response) => {
    if (response.status == 200) {
      user.value = response.data
    }
  })
})
const userOptions = ref(false)
</script>

<template>
  <div class="header">
    <div class="info d-flex justify-content-between">
      <div class="message">
        <a
          href="/admin/dashboard/messages"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Messages"
        >
          <RouterLink
            to="/admin/dashboard/messages"
            active-class="active-link"
            class="no-underline"
          >
            <font-awesome-icon :icon="['fas', 'bell']" size="2xl" style="color: #babdb6" />
            <span class="rounded-circle">{{ messages.length }}</span>
          </RouterLink>
        </a>
      </div>
      <div class="user" @click="toggleDropdownClick()">
        <a href="#">
          <img
            :src="setImage(user.image)"
            alt=""
            class="rounded-circle"
            @click="userOptions = !userOptions"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: white;
  box-shadow: rgb(206, 203, 203) 0px 5px 15px;
  padding: 5px 1% 0px 0px;
  margin-bottom: 10px;
  position: sticky;
  top: 0px;
  margin-top: 10px;
  border-radius: 5px;
}
.header .info {
  width: 100px;
  float: right;
}
.header .info .message {
  margin-top: 5px;
  width: 80px;
}
.header .info .message span {
  position: relative;
  right: 10px;
  bottom: 10px;
  color: white;
  background-color: rgb(235, 14, 14);
  font-size: 12px;
  width: auto;
  font-weight: bold;
  padding: 2px 4px 2px 3px;
}
.header .info .user {
  width: 50px;
}
.header .info .user .user-options {
  background-color: #ebebec;
  position: absolute;
}
.header .info .user .user-options a {
  text-decoration: none;
  color: #494b4d;
  font-size: 12px;
}
.header .info .user .user-options li {
  list-style-type: none;
  position: relative;
  right: 50px;
}
.header .info .user .user-options li:hover {
  color: black;
}
.header .info .user img {
  width: 40px;
  height: 40px;
}
</style>