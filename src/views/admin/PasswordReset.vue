<script setup>
import { ref, onMounted} from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const user = ref({
  username: '',
  password: ''
})

const router = useRouter()
const errorMessage = ref(false)


const save = () => {
  let url = `http://127.0.0.1:8000/user-password/${user.value.username}`

  axios
    .put(url, user.value.password)
    .then((response) => {
      console.log(response)
      if (response.status == 200) {
        user.value = response.data
        router.push('/admin/login')
      } else {
        errorMessage.value = true
      }
    })
    .catch((error) => {
      errorMessage.value = true
      console.log(error)
    })
}
</script>

<template>
  <form method="post" action="" @submit.prevent="save">
    <!-- Email input -->
    <h6 v-if="errorMessage">Cet utilisateur n'est pas enregistré !</h6>
    <br />
    <div class="form-outline mb-4">
      <label class="form-label" for="form2Example1">Username or email :</label>
      <input type="text" id="form2Example1" class="form-control" v-model="user.username" required />
    </div>

    <!-- Password input -->
    <div class="form-outline mb-5">
      <label class="form-label" for="form2Example2">Nouveau mot de passe :</label>
      <input
        type="password"
        id="form2Example2"
        class="form-control"
        v-model="user.password"
        required
      />
    </div>

    <!-- Submit button -->
    <button type="submit" class="btn mb-4">Enregistrer</button>
  </form>
</template>


<style scoped>
form {
  max-width: 500px;
  margin: auto;
  margin-top: 10%;
  box-shadow: rgba(2, 2, 2, 0.5) 0px 2px 15px;
  padding: 40px;
}
form input {
  background-color: #e8ecee;
}
form button {
  width: 100%;
  background-color: #032144;
  color: white;
}
form button:hover {
  color: white;
}
form h6 {
  color: red;
}
</style>