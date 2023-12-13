<script setup>
import { defineProps, onMounted, ref, onUnmounted, defineEmits } from 'vue'
import OptionsMenu from './OptionsMenu.vue'
import { toggleClickOutside } from '@/utils/index.js'

const props = defineProps({
  id_carousel: Number,
  image: String,
  index: String
})
const optionMenuStatus = ref(false)
const image = ref(String(props.image).split('/').slice(-1)[0])
const emits = defineEmits(['deleteCarousel'])

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  // optionMenuStatus.value = toggleClickOutside(event)
  // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa',optionMenuStatus.value)
}

//function to truncate the description
const truncateText = (text, maxlenght) => {
  return text.length < maxlenght ? text : text.slice(0, maxlenght) + '...'
}

//Function to handle options menu delete emit
const handleToggleDelete = (index) => {
  optionMenuStatus.value = false
  emits('deleteCarousel', index)
}
//Function to handle options menu update emit
const handleToggleUpdate = (index) => {
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
        <td class="image">
          {{ String(props.image).split('/').slice(-1)[0] }}
        </td>
        <td class="options-button" id="options-button">
          <div class="menu" id="menu">
            <div class="button" @click="optionMenuStatus = !optionMenuStatus">
              <font-awesome-icon
                :icon="['fas', 'ellipsis-vertical']"
                size="x"
                style="color: #222324"
              />
            </div>
            <div class="options-menu" v-if="optionMenuStatus">
              <OptionsMenu
                :id="props.id_carousel"
                target="carousels"
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
  width: 100%;
  color: rgb(88, 86, 86);
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
.block .info tr .image {
  width: 550px;
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
  padding-right: 0;
}
</style>