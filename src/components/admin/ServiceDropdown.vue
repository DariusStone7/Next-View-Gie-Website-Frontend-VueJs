<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const emits = defineEmits(['disableDropdownLink'])

const toggleDropdowItem = () =>{
  emits('disableDropdownLink')
}

</script>


<template>
  <div class="dropdown">
    <ul>
      <a
        href="/admin/dashboard/services-technologie"
        data-toggle="tooltip"
        data-placement="right"
        title="technologie"
        :class="{ 'active-link': route.path === '/admin/dashboard/services-technologie' }"
        @click="toggleDropdowItem()"
      >
        <li>
          <font-awesome-icon :icon="['fas', 'laptop-code']" size="x" class="icon"/>
          <RouterLink
            to="/admin/dashboard/services-technologie"
            active-class="active-link"
            class="no-underline"
          >
            Tech
          </RouterLink>
        </li>
      </a>
      <a
        href="/admin/dashboard/service-benefit"
        data-toggle="tooltip"
        data-placement="right"
        title="Utilités"
        :class="{ 'active-link': route.path === '/admin/dashboard/service-benefit' }"
        @click="toggleDropdowItem()"
      >
        <li>
          <font-awesome-icon :icon="['fas', 'arrow-up-right-dots']" size="x" class="icon"/>
          <RouterLink
            to="/admin/dashboard/service-benefit"
            active-class="active-link"
            class="no-underline"
          >
            Utilités
          </RouterLink>
        </li>
      </a>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: fixed;
  top: 250px;
  background-color: #fff;
  width: 120px;
  text-align: left;
  margin-left: 10px;
  padding-top: 10px;
  z-index: 30;
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
.dropdown ul a li .icon{
  margin-right: 10px;
}
.dropdown ul a:hover {
  color: rgb(201, 115, 4);
}
.sidebar ul .active-link {
  color: rgb(201, 115, 4);
}
</style>