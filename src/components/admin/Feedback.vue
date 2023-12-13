<script setup>
import { defineProps, onMounted, ref, defineEmits } from 'vue'
import OptionsMenu from './OptionsMenu.vue'
import { setImage } from '@/utils/index.js'

const props = defineProps({
  id_customer_feedback: Number,
  name: String,
  role: String,
  message: String,
  image: String,
  index: Number
})
const optionMenuStatus = ref(false)
const image = ref(String(props.image).split('/').slice(-1)[0])
const emit = defineEmits(['updateFeedback', 'deleteFeedback'])

//function to truncate the description
const truncateText = (text, maxlenght) => {
  return text.length < maxlenght ? text : text.slice(0, maxlenght)
}

//Function to handle options menu update emit
const handleToggleUpdate = () => {
  emit('updateFeedback', props.id_customer_feedback)
  optionMenuStatus.value = false
}

//Function to handle options menu delete emit
const handleToggleDelete = () => {
  emit('deleteFeedback', props.id_customer_feedback)
  optionMenuStatus.value = false
}
</script>


<template>
  <!-- <div class="block">
    <div class="info">
      <table>
        <tr>
          <td class="number">
            {{ props.index + 1 }}
          </td>
          <td class="name">
            {{ props.name }}
          </td>
          <td class="role">
            {{ props.role }}
          </td>
          <td class="message">
            {{ props.message }}
          </td>
          <td class="image">
            {{ image }}
          </td>
          <td class="options-button">
            <div class="menu">
              <div class="button" @click="optionMenuStatus = !optionMenuStatus">
                <font-awesome-icon
                  :icon="['fas', 'ellipsis-vertical']"
                  size="x"
                  style="color: #222324"
                />
              </div>
              <div class="options-menu" v-if="optionMenuStatus">
                <a href="#form">
                  <OptionsMenu
                    :id="props.id_customer_feedback"
                    target="customers-feedbacks"
                    @toggleUpdate="handleToggleUpdate"
                    @toggleDelete="handleToggleDelete"
                  />
                </a>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div> -->
  <div class="block">
    <div class="head d-flex">
      <span
        ><font-awesome-icon :icon="['fas', 'quote-left']" size="2x" style="color: #d7a009"
      /></span>
      <div class="photo">
        <img :src="setImage(props.image)" alt="user" class="rounded-circle" />
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
        :icon="['fas', 'trash']"
        size="x"
        class="icon"
        @click="handleToggleDelete"
      />
    </div>
  </div>
</template>




<style scoped>
.block {
  background-color: rgba(253, 255, 255, 0.6);
  width: auto;
  min-width: 350px;
  max-width: 600px;
  min-height: 280px;
  height: auto;
  padding: 30px;
  border-radius: 20px 20px 20px 20px;
  margin: auto;
}
.block .head .photo img {
  width: 100px;
  height: 100px;
}
.block .head .info {
  padding: 20px;
}
.block .message {
  margin-top: 10px;
  color: rgb(61, 61, 61);
  text-align: justify;
}
.action .icon {
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