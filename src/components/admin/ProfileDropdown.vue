<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const emits = defineEmits(['disableDropdownLink'])

const toggleDropdowItem = () => {
  emits('disableDropdownLink')
}
const toggleDropdowItemLogout = () => {
  // Effacer le token
  localStorage.clear()
  emits('disableDropdownLink')
}
</script>

<template>
  <div class="dropdown">
    <ul>
      <a
        href="/admin/dashboard/profile"
        data-toggle="tooltip"
        data-placement="left"
        title="Mon profile"
        :class="{ 'active-link': route.path === '/admin/dashboard/profile' }"
        @click="toggleDropdowItem()"
      >
        <li>
          <font-awesome-icon :icon="['far', 'user']" size="x" class="icon" />
          <RouterLink to="/admin/dashboard/profile" active-class="active-link" class="no-underline">
            Profile
          </RouterLink>
        </li>
      </a>
      <a
        href="/admin/login"
        data-toggle="tooltip"
        data-placement="right"
        title="Se déconnecter"
        :class="{ 'active-link': route.path === '/admin/login' }"
        @click="toggleDropdowItemLogout()"
      >
        <li>
          <font-awesome-icon
            :icon="['fas', 'arrow-right-to-bracket']"
            rotation="180"
            size="x"
            class="icon"
          />
          <RouterLink to="/admin/login" active-class="active-link" class="no-underline">
            Logout
          </RouterLink>
        </li>
      </a>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: fixed;
  right: 20px;
  background-color: #fff;
  width: 120px;
  text-align: left;
  padding-top: 10px;
  float: right;
  /* margin-right: 20px; */
}
.dropdown ul {
  width: 100%;
}
.dropdown ul a {
  text-decoration: none;
  color: rgba(47, 49, 49, 0.9);
  width: 100%;
  position: relative;
  right: 10px;
}
.dropdown ul a li {
  list-style-type: none;
  width: 100%;
  margin-bottom: 10px;
}
.dropdown ul a li .icon {
  margin-right: 10px;
}
.dropdown ul a:hover {
  color: rgb(201, 115, 4);
}
.sidebar ul .active-link {
  color: rgb(201, 115, 4);
}
</style>