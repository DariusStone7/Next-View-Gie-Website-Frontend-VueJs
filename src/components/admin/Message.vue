<script setup>
import { getPath } from '@/utils/index.js'
import axios from 'axios'
import { defineProps, ref } from 'vue'
import { messages } from '@/states/states.js'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import locale from 'dayjs/locale/fr'

dayjs.locale('fr')
dayjs.extend(localizedFormat)

const props = defineProps({
  id_message: Number,
  name: String,
  email: String,
  phone: String,
  subject: String,
  text: String,
  create_at: String,
  read_at: String
})
const messageDetail = ref(false)

//function to truncate the message
const truncateText = (text, maxlenght) => {
  return text.length < maxlenght ? text : text.slice(0, maxlenght) + '...'
}

const deleteMessage = () => {
  const url = `http://127.0.0.1:8000/messages/${props.id_message}`
  let id = -1
  axios
    .delete(url)
    .then((response) => {
      // console.log(response.data)
      id = messages.value.findIndex((message) => message.id_message == props.id_message)
      if (id !== -1) {
        messages.value.splice(id, 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const readMessage = () => {
  messageDetail.value = !messageDetail.value

  if (props.read_at == null) {
    const date = dayjs().format('llll')
    const url = `http://127.0.0.1:8000/message-read/${props.id_message}`

    axios
      .put(url, date)
      .then((response) => {
        let id = messages.value.findIndex((message) => message.id_message == props.id_message)
        if (id !== -1) {
          messages.value[id].read_at = response.data.date
        }
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<template>
  <div class="block" @click="readMessage">
    <div class="header d-flex justify-content-between">
      <div class="name">
        <span>{{ props.name }}</span>
      </div>
      <div class="date">
        <small>
          {{ props.create_at }}
          <font-awesome-icon :icon="['fas', 'check-double']" size="x" style="color: rgb(3, 95, 95)" v-if="props.read_at"/>
        </small>
      </div>
    </div>
    <br />
    <div class="message-small d-flex justify-content-between" v-if="!messageDetail">
      <div>
        <small>{{ props.subject }}</small>
        <p>{{ truncateText(props.text, 100) }}</p>
      </div>
      <div class="button" @click="deleteMessage">
        <font-awesome-icon :icon="['fas', 'trash']" size="x" style="color: #e95a2e" />
      </div>
    </div>
    <div class="message-more" v-if="messageDetail">
      <div class="message-small d-flex justify-content-between">
        <div>
          <small>{{ props.subject }}</small>
          <p>{{ props.text }}</p>
        </div>
        <div class="button" @click="deleteMessage">
          <font-awesome-icon :icon="['fas', 'trash']" size="x" style="color: #e95a2e" />
        </div>
      </div>
      <div class="more d-flex justify-content-between">
        <div class="contact justify-content-between">
          <div class="email">Email: {{ props.email }}</div>
          <div class="phone">Tel: {{ props.phone }}</div>
        </div>
        <div class="read-date">
          <div class="date">
            <small>lu, {{ props.read_at }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block {
  /* max-width: 700px; */
  min-width: 400px;
  background-color: rgba(253, 255, 255, 0.6);
  border: 1px solid rgb(212, 210, 210);
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 20px;
  cursor: help;
  text-align: justify;
}
.block .name {
  color: rgb(3, 95, 95);
}
.block .message-small,
.message-more {
  color: rgb(45, 45, 46);
}
.block .message-small .button {
  visibility: hidden;
}
.block:hover .button {
  visibility: visible;
  cursor: pointer;
}
.block .message-more .contact {
  color: rgb(58, 85, 85);
}
</style>