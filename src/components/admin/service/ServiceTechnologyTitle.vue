<script setup>
import { defineProps, defineEmits, onMounted, ref } from 'vue'
import OptionsMenu from '../OptionsMenu.vue'

const props = defineProps({
  id_service_technology: Number,
  title: String,
  description: String,
  index: Number
})
let titleModal = '#titleModal'

const emit = defineEmits(['updateServiceTitle', 'deleteServiceTilte'])

const optionMenuStatus = ref(false)

//function to truncate the description
const truncateText = (text, maxlenght) => {
  return text.length < maxlenght ? text : text.slice(0, maxlenght)
}

//Function to handle options menu update emit
const handleToggleUpdate = (index) => {
  emit('updateServiceTitle', index)
  optionMenuStatus.value = false
}
//Function to handle options menu delete emit
const handleToggleDelete = (index) => {
  emit('deleteServiceTitle', index)
  optionMenuStatus.value = false
}
</script>


<template>
  <div class="block">
    <div class="info row">
      <tr>
        <td class="number">
          {{ props.index + 1 }}
        </td>
        <td class="title">
          {{ props.title }}
        </td>
        <td class="description">
          {{ props.description }}
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
              <OptionsMenu
                :id="props.id_service_technology"
                :modal="titleModal"
                @toggleUpdate="handleToggleUpdate"
                @toggleDelete="handleToggleDelete"
              />
            </div>
          </div>
        </td>
      </tr>
    </div>
  </div>
</template>


<style scoped>
.block {
  margin-bottom: 20px;
  width: 100%;
  color: rgb(88, 86, 86);
  padding: 10px;
  border: 1px solid rgb(236, 232, 232);
  border-radius: 10px;
  background-color: rgba(213, 218, 218, 0.5);
}
.block .info tr {
  height: auto;
}
.block .info tr td {
  padding-right: 30px;
  text-align: justify;
  word-wrap: break-word;
}
.block .info tr .number {
  width: 50px;
}
.block .info tr .title {
  width: 290px;
}
.block .info tr .description {
  width: 700px;
}
.block .info tr .options-button {
  width: 50px;
  padding-right: 0;
}
.block .menu .button {
  width: 20px;
  text-align: center;
  cursor: pointer;
  visibility: hidden;
}
.block:hover .button {
  visibility: visible;
}
.block .menu .options-menu {
  position: relative;
  right: 100px;
}
</style>