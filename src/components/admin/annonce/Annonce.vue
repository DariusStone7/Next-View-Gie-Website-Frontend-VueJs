<script setup>
import { defineProps, onMounted, ref, defineEmits } from 'vue'
import OptionsMenu from '../OptionsMenu.vue'

const props = defineProps({
  id_annonce: Number,
  title: String,
  description: String,
  address: String,
  index: Number
})
const emit = defineEmits(['updateAnnonce', 'deleteAnnonce'])
const optionMenuStatus = ref(false)

//function to truncate the description
const truncateText = (text, maxlenght) => {
  return text.length < maxlenght ? text : text.slice(0, maxlenght)
}

//Function to handle options menu update emit
const handleToggleUpdate = (index) => {
  emit('updateAnnonce', index)
  optionMenuStatus.value = false
}
//Function to handle options menu delete emit
const handleToggleDelete = (index) => {
  emit('deleteAnnonce', index)
  optionMenuStatus.value = false
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
            {{ truncateText(props.description, 75) }}
          </td>
          <td class="address">
            {{ props.address }}
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
              <div class="options-menu" v-if="optionMenuStatus" ref="optionsMenu">
                <OptionsMenu
                  :id="props.id_annonce"
                  target="annonces"
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
}
.block .info tr .number {
  width: 50px;
}
.block .info tr .title {
  width: 200px;
}
.block .info tr .description {
  width: 580px;
}
.block .info tr .address {
  width: 200px;
}
.block .info tr .options-button {
  width: 50px;
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