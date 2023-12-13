<script setup>
import { defineProps, onMounted, ref, defineEmits } from 'vue'
import OptionsMenu from '../OptionsMenu.vue'

const props = defineProps({
  id_service_benefit: Number,
  title: String,
  description: String,
  index: Number
})
let listModal = "#listModal"              
const optionMenuStatus = ref(false)
const emits = defineEmits(['updateServiceBenefit', 'deleteServiceBenefit'])

//function to truncate the description
const truncateText = (text, maxlenght) => {
  return text.length < maxlenght ? text : text.slice(0, maxlenght)
}

//Function to handle options menu update emit
const handleToggleUpdate = (index) => {
  optionMenuStatus.value = false
  emits('updateServiceBenefit', index)
}

//Function to handle options menu delete emit
const handleToggleDelete = (index) => {
  optionMenuStatus.value = false
  emits('deleteServiceBenefit', index)
}
</script>


<template>
  <div class="block">
    <div class="info">
      <table>
        <tr>
          <td class="number">
            {{ props.index + 1 }}
          </td>
          <td class="title">
            {{ props.title }}
          </td>
          <td class="description">
            {{ truncateText(props.description, 150) }}
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
                    :id="props.id_service_benefit"
                    :modal="listModal"
                    @toggleUpdate="handleToggleUpdate"
                    @toggleDelete="handleToggleDelete"
                  />
              </div>
            </div>
          </td>
        </tr>
      </table>
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
  width: 800px;
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