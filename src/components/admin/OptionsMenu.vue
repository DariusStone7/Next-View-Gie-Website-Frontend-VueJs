<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref, defineProps, defineEmits, onMounted } from 'vue'

const props = defineProps({
  id: Number,
  target: String,
  modal: String
})

const emits = defineEmits(['toggleUpdate', 'toggleDelete'])

let url = ref('')

const router = ref(useRouter())

const handleClick = () => {
  if (props.target === 'annonces') {
    router.value.push('/admin/dashboard/annonce/detail?id=' + props.id)
  }
}

const handleDelete = () => {
  emits('toggleDelete', props.id)
}

const handleUpdate = () => {
  // alert(props.id)
  // Redirection vers la route "/annonces"
  // if(props.target==='annonces'){
  // router.value.push('/admin/annonce/detail');

  // }
  emits('toggleUpdate', props.id)
}
</script>


<template>
  <div class="menu">
    <button class="eye" @click="handleClick()" v-if="props.target === 'annonces'">
      <font-awesome-icon :icon="['fas', 'eye']" size="x" style="color: #222324" />
      Voir
    </button>
    <button class="pencil" @click="handleUpdate()" data-bs-toggle="modal" :data-bs-target="props.modal">
      <font-awesome-icon :icon="['fas', 'pencil']" size="x" style="color: #2c8b06" />
      Modifier</button
    ><br />
    <button class="trash" @click="handleDelete()">
      <font-awesome-icon :icon="['fas', 'trash']" size="x" style="color: #e95a2e" />
      Supprimer
    </button>
  </div>
</template>


<style scoped>
.menu {
  background: rgb(202, 202, 200);
  height: auto;
  border-radius: 5px;
  width: 120px;
  position: absolute;
  z-index: 2;
  padding-bottom: 10px;
}
.menu button {
  margin: 10px 10px 1px 0px;
  background: rgb(202, 202, 200);
  width: 100%;
  font-family: 'Times New Roman', Times, serif;
  border: none;
  color: rgb(39, 41, 41);
  font-size: 15px;
  text-align: left;
  padding-left: 20px;
}
.menu button:hover {
  background: rgb(241, 236, 236);
}
</style>