<script setup>
import {useRoute } from 'vue-router'
import {defineEmits} from 'vue'

const emits = defineEmits(['activeDropdownLink'])

const toggleDropdownClick = () =>{
  emits('activeDropdownLink')
}
const route = useRoute()
</script>


<template>
  <div class="sidebar">
    <!-- <div class="home">
      <a href="/" data-toggle="tooltip" data-placement="right" title="Accueil">
        <RouterLink to="/" class="no-underline"> Home </RouterLink>
      </a>
      <hr />
    </div> -->
    <ul class="navbar-nav sidebar sidebar-dark accordion ">
      <a href="/admin/dashboard" data-toggle="tooltip" data-placement="right" title="Dashboard">
        <li>
          <RouterLink to="/admin/dashboard" active-class="active-link" :class="{ 'active-link': route.path === '/admin/dashboard'}" class="no-underline">
            <font-awesome-icon :icon="['fas', 'qrcode']" size="x" class="icon" />
          </RouterLink>
        </li>
      </a>
      <a href="/admin/dashboard/annonces" data-toggle="tooltip" data-placement="right" title="Annonces">
        <li>
          <RouterLink to="/admin/dashboard/annonces" active-class="active-link" :class="{ 'active-link': route.path === '/admin/dashboard/annonces' ||  route.path === '/admin/dashboard/annonce/detail'}" class="no-underline">
            <font-awesome-icon :icon="['fas', 'city']" size="x" class="icon" />
          </RouterLink>
        </li>
      </a>
      <a href="/admin/dashboard/carousels" data-toggle="tooltip" data-placement="right" title="Carousel">
        <li>
          <RouterLink to="/admin/dashboard/carousels" active-class="active-link" class="no-underline">
            <font-awesome-icon :icon="['fas', 'photo-film']" size="x" class="icon" />
          </RouterLink>
        </li>
      </a>
      <a href="/admin/dashboard/a-propos" data-toggle="tooltip" data-placement="right" title="A propos">
        <li>
          <RouterLink to="/admin/dashboard/a-propos" active-class="active-link" class="no-underline">
            <font-awesome-icon :icon="['fas', 'circle-info']" size="x" class="icon" />
          </RouterLink>
        </li>
      </a>
      
      <li data-toggle="tooltip" data-placement="right" title="Service" :class="{ 'active-dropdow-link': route.path === '/admin/dashboard/services-technologie' || route.path === '/admin/dashboard/service-benefit'}" @click="toggleDropdownClick()">
        <font-awesome-icon :icon="['fas', 'rectangle-list']" size="x" class="icon" />
      </li>
      <a href="/admin/dashboard/members" data-toggle="tooltip" data-placement="right" title="Membres">
        <li>
          <RouterLink to="/admin/dashboard/members" active-class="active-link" class="no-underline">
            <font-awesome-icon :icon="['fas', 'people-group']" size="x" class="icon" />
          </RouterLink>
        </li>
      </a>
      <a href="/admin/dashboard/feedbacks" data-toggle="tooltip" data-placement="right" title="Feedbacks">
        <li>
          <RouterLink to="/admin/dashboard/feedbacks" active-class="active-link" class="no-underline">
            <font-awesome-icon :icon="['fas', 'message']" size="x" class="icon" />
          </RouterLink>
        </li>
      </a>
    </ul>
    
  </div>
  
</template>

<style scoped>
.sidebar {
  width: 100%;
  height: 100vh;
  padding-top: 8px;
  color: #bcbec0;
  background-color: rgb(213, 218, 218);
}
.sidebar .home {
  padding-top: 10px;
  text-align: center;
  margin: auto;
  width: 100%;
  background-color: #fff;
  box-shadow: rgb(206, 203, 203) 0px 2px 0px;
  
}
.sidebar .home a{
  color: rgb(53, 51, 51);
}
.sidebar a:hover {
  color: #000;
}
.sidebar ul {
  width: 100%;
  /* padding-top: 10%; */
  text-align: center;
}
.sidebar a,
ul a {
  text-decoration: none;
  color: #a3a5a7;
  width: 100%;
}
.sidebar a,
ul a .icon, ul li .icon {
  color: #919494;
}
.sidebar a,
ul a .icon :hover, ul li:hover .icon{
  color: rgb(201, 115, 4);
}
.sidebar ul a .active-link {
  color: rgb(201, 115, 4);
}
.sidebar ul a .active-link .icon {
  color: rgb(201, 115, 4);
}
.sidebar ul .active-dropdow-link .icon{
  color: rgb(201, 115, 4);
}
.sidebar ul a:hover,
li:hover {
  color: #eef1f3;
}
.sidebar ul li {
  list-style-type: none;
  text-decoration: none;
  margin-bottom: 30px;
  width: 100%;
  cursor: pointer;
}
.sidebar ul li ul {
  width: 100%;
  font-size: 14px;
  display: none;
  z-index: 10;
  position: relative;
  bottom: 35px;
  left: 35px;
  padding-bottom: 5px;
}
.sidebar ul li ul li {
  margin: 0px 0px 5px 0px;
  padding: 0px;
  text-align: left;
  position: relative;
  right: 20px;
}
.sidebar ul li:hover ul {
  display: block;
  z-index: 4;
  padding-top: 10px;
}
.sidebar ul li:hover ul a{
 color: #212222;
}
.sidebar ul li:hover ul a:hover{
  color: rgb(201, 115, 4);
}
.sidebar ul li ul li .active-link {
  color: rgb(201, 115, 4);
}
</style>