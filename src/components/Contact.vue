<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { setImage } from '../utils/index.js'
import { messages } from '@/states/states.js'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import locale from 'dayjs/locale/fr'

dayjs.locale('fr')
dayjs.extend(localizedFormat)

const message = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  text: '',
  datetime: ''
})

const save = () => {
  let date = new Date()

  message.value.datetime = dayjs().format('llll')
  delete message.value.id_message

  const messageData = { ...message.value }

  axios
    .post('http://127.0.0.1:8000/message', messageData)
    .then((response) => {
      messages.value.push(response.data)
      alert("Nous avons bien recus votre message. Nous vous répondrons d'ici peu.")
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="row block">
    <div class="image mb-5">
      <img :src="setImage('./images/contact/contact.avif')" alt="" />
    </div>
    <div class="form mb-5">
      <form action="" method="POST" @submit.prevent="save">
        <div class="row">
          <div class="col form-outline mb-4">
            <label class="form-label" for="name">Nom *</label>
            <input
              type="text"
              id="name"
              name="name"
              class="form-control"
              placeholder="Jean"
              required
              v-model="message.name"
            />
          </div>
          <div class="col form-outline mb-4">
            <label class="form-label" for="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="exemple@gmail.com"
              required
              v-model="message.email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col form-outline mb-4">
            <label class="form-label" for="number">Tel *</label>
            <input
              type="text"
              id="number"
              name="number"
              class="form-control"
              placeholder="+237 673 452 564"
              required
              maxlength="13"
              minlength="9"
              v-model="message.phone"
            />
          </div>
          <div class="col form-outline mb-4">
            <label class="form-label" for="subject">Sujet </label>
            <input
              type="text"
              id="subject"
              name="subject"
              class="form-control"
              placeholder="Avis sur l'entreprise"
              required
              v-model="message.subject"
            />
          </div>
          <div class="row">
            <div class="col form-outline mb-4">
              <label class="form-label" for="message">Message * </label>
              <textarea
                name="message"
                id="message"
                cols="40"
                rows="10"
                class="form-control"
                placeholder="Bonjour"
                required
                v-model="message.text"
              ></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col form-outline mb-4">
              <button type="submit">Envoyer</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.block {
  width: 100%;
  padding: 5% 0px 0px 0px;
}
.block .image {
  width: 40%;
}
.block .image img {
  width: 100%;
}
.block .form {
  width: 60%;
  /* box-shadow: rgba(2, 2, 2, 0.1) 0px 5px 15px; */
}
.block .form form input {
  height: 60px;
  border-radius: 10px 10px 10px 10px;
  background-color: rgb(246, 249, 252);
}
.block .form form textarea {
  width: 100%;
  border-radius: 10px 10px 10px 10px;
  background-color: rgb(246, 249, 252);
}
.block .form form button {
  width: 200px;
  height: 50px;
  border-radius: 10px 10px 10px 10px;
  background: black;
  background-color: rgb(230, 170, 8);
  font-size: 20px;
  float: right;
}
.block .form form label {
  font-size: 17px;
}
@media screen and (max-width: 1000px) {
  .block {
    display: block;
    width: 100%;
    margin: 0%;
  }
  .block .form {
    width: 100%;
  }
  .block .image {
    display: none;
  }
}
</style>