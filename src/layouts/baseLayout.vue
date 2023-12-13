<script setup>
import FooterVue from '../components/Footer.vue'
import HeaderVue from '../components/Header.vue'
</script>


<template>
  <header>
    <HeaderVue/>
  </header>

  <body>
    <router-view />
  </body>

  <footer>
    <FooterVue/>
  </footer>
</template>


<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 500;
}
footer {
  margin-top: 10 0px;
}
@media screen and (max-width: 1500px) {
  footer {
    margin-top: 0px;
  }
}
</style>