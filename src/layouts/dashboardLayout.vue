<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import ServiceDropdown from '@/components/admin/ServiceDropdown.vue'
import ProfileDropdown from '@/components/admin/ProfileDropdown.vue'

import { ref } from 'vue'

const serviceDropdownStatus = ref(false)
const profileDropdownStatus = ref(false)

const handleActiveServiceDropdownLink = () => {
  serviceDropdownStatus.value = !serviceDropdownStatus.value
}
const handleActiveProfileDropdownLink = () => {
  profileDropdownStatus.value = !profileDropdownStatus.value
}
</script>


<template>
  <div class="layout">
    <header>
      <AdminHeader  @activeDropdownLink="handleActiveProfileDropdownLink"/>
    </header>
    <body class="d-flex">
      <div class="sidebar-block">
        <AdminSidebar @activeDropdownLink="handleActiveServiceDropdownLink"/>
      </div>
      <div class="event">
        <div class="profile_dropdown"  v-if="profileDropdownStatus">
          <profile-dropdown @disableDropdownLink="handleActiveProfileDropdownLink"/>
        </div>
        <div class="service-dropdown" v-if="serviceDropdownStatus">
          <service-dropdown @disableDropdownLink="handleActiveServiceDropdownLink"/>
        </div>
        <div class="space">
          <router-view />
        </div>
      </div>
    </body>
    <footer></footer>
  </div>
</template>



<style scoped>
.layout {
  background-color: rgba(213, 218, 218, 0.5);
}
header {
  width: 87%;
  float: right;
  position: sticky;
  top: 0px;
  padding: 0 7% 0px 0;
}
body {
  width: 100%;
}
body .sidebar-block {
  position: fixed;
  top: 0px;
  width: 5%;
}
body .event {
  position: absolute;
  width: 95%;
  margin-left: 5%;
  height: 100%;
  overflow-y: scroll;
  background-color: rgba(213, 218, 218, 0.5);
}
/* .event .dropdown {
  position: absolute;
  top: 165px;
  background-color: #fff;
  width: 70px;
  text-align: left;
} */
.event .space {
  width: 84%;
  height: 100%;
  padding: 20px 0px 0px 0px;
  margin: 0px 0px 300px 8.5%;
}
</style>