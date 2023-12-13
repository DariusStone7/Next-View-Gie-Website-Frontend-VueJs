<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { setting } from '@/states/states.js'

const state_bugger_menu = ref(false)
const route = useRoute()
</script>

<template>
  <div class="header-info d-flex justify-content-between">
    <div class="d-flex contact">
      <div class="phone p-2 m-2" v-if="setting.phone">
        <a href="tel:237698154430">
          <font-awesome-icon
            icon="fa-solid fa-phone-volume"
            size="lg"
            color="rgb(240, 149, 29)"
            pull="left"
            bounce
          />
          <p>{{ setting.phone }}</p>
        </a>
      </div>
      <div class="sep m-2" v-if="setting.phone && setting.email"></div>
      <div class="p-2 m-2" v-if="setting.email">
        <a href="mailto:nfo@next-view.com">
          <font-awesome-icon
            icon="fa-solid fa-envelope"
            size="lg"
            color="rgb(240, 149, 29)"
            pull="left"
            fade
          />
          <p>info@next-view.com</p>
        </a>
      </div>
    </div>
    <div class="social-network p-3 d-flex justify-content-between">
      <a :href="setting.facebook"><font-awesome-icon icon="fa-brands fa-facebook-f" size="lg" /></a>
      <a :href="setting.twitter"><font-awesome-icon icon="fa-brands fa-twitter" size="lg" /></a>
      <a :href="setting.linkedin"><font-awesome-icon icon="fa-brands fa-linkedin-in" size="lg" /></a>
      <a :href="setting.youtube"><font-awesome-icon icon="fa-brands fa-youtube" size="lg" /></a>
    </div>
  </div>

  <div class="nav-bar d-flex justify-content-between">
    <div class="logo">
      <a href="/">
        <h1>Next-View GIE</h1>
      </a>
    </div>
    <nav>
      <ul class="d-flex justify-content-between">
        <li :class="{ 'active-link': route.path === '/' }">
          <a href="/">
            <RouterLink to="/" class="no-underline"> Accueil </RouterLink>
          </a>
        </li>
        <li id="dropdown" :class="{ 'active-link': route.path === '/service-technologie' || route.path === '/service-immobilier' || route.path === '/service-vehicules' || route.path === '/annonce-detail'}">
          <a href="" class="dropdown-link">Services </a>
            <font-awesome-icon :icon="['fas', 'chevron-down']" class="dropdown-icon"/>
          <ul>
            <a href="/service-technologie"
              ><li>
                <RouterLink to="/service-technologie" class="no-underline">
                  Technologies
                </RouterLink>
              </li></a
            >
            <a href="/service-immobilier"
              ><li>
                <RouterLink to="/service-immobilier" class="no-underline"> Immobilier </RouterLink>
              </li></a
            >
            <a href=""
              ><li>
                <RouterLink to="" class="no-underline"> Véhicules </RouterLink>
              </li></a
            >
          </ul>
        </li>
        <li :class="{ 'active-link': route.path === '/a-propos' }">
          <a href="/a-propos">
            <RouterLink to="/a-propos" class="no-underline"> A propos </RouterLink>
          </a>
        </li>
        <li :class="{ 'active-link': route.path === '/contact' }">
          <a href="/contact">
            <RouterLink to="/contact" class="no-underline"> Contact </RouterLink>
          </a>
        </li>
      </ul>
    </nav>
    <div class="search">
      <form class="form-inline d-flex">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Rechercher"
          aria-label="Rechercher"
        />
        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </button>
      </form>
    </div>
    <div class="burgger-menu rounded-circle" @click="state_bugger_menu = !state_bugger_menu">
      <div class="burgger-1"></div>
      <div class="burgger-2"></div>
      <div class="burgger-3"></div>
    </div>
  </div>

  <!-- nav-bar mobile plateforme -->
  <div class="nav-bar-mobile" v-if="state_bugger_menu">
    <ul class="justify-content-between">
      <a href="/" @click="state_bugger_menu = !state_bugger_menu">
        <li>
          <font-awesome-icon
            :icon="['fas', 'house']"
            style="color: #233f71; padding-right: 30px"
            size="x"
          />
          <RouterLink to="/" class="no-underline" @click="state_bugger_menu = !state_bugger_menu">
            Accueil
          </RouterLink>
        </li>
      </a>

      <a href="">
        <li>
          <font-awesome-icon
            :icon="['fas', 'list-check']"
            style="color: #233f71; padding-right: 26px"
            size="x"
          />
          &nbsp;Services
          <font-awesome-icon :icon="['fas', 'chevron-down']" class="chevron" />
          <ul>
            <a href="/service-technologie" @click="state_bugger_menu = !state_bugger_menu"
              ><li>
                <RouterLink to="/service-technologie" active-class="active-link"  class="no-underline">
                  Technologie
                </RouterLink>
              </li></a
            >
            <a href="/service-immobilier" @click="state_bugger_menu = !state_bugger_menu">
              <li>
                <RouterLink to="/service-immobilier" active-class="active-link" class="no-underline"> Immobilier </RouterLink>
              </li></a
            >
            <a href="/service-vehicules" @click="state_bugger_menu = !state_bugger_menu"
              ><li>
                <RouterLink to="/service-vehicules" active-class="active-link" class="no-underline"> Véhicule </RouterLink>
              </li></a
            >
          </ul>
        </li>
      </a>
      <a href="/a-propos" @click="state_bugger_menu = !state_bugger_menu">
        <li>
          <font-awesome-icon
            :icon="['fab', 'sourcetree']"
            style="color: #233f71; padding-right: 26px"
            size="x"
          />
          <RouterLink to="/a-propos" active-class="active-link" class="no-underline"> &nbsp;A propos </RouterLink>
        </li>
      </a>
      <a href="/contact" @click="state_bugger_menu = !state_bugger_menu">
        <li>
          <font-awesome-icon
            :icon="['fas', 'address-card']"
            style="color: #233f71; padding-right: 20px"
            size="x"
          />
          <RouterLink to="/contact" active-class="active-link" class="no-underline"> &nbsp;Contact </RouterLink>
        </li>
      </a>
    </ul>
  </div>
</template>

<style scoped>
/*Header-Info start*/
.header-info {
  width: 100%;
  height: 40px;
  background-color: #0f2a5e;
  padding-left: 5%;
  font-size: 13px;
}
.header-info a {
  text-decoration: none;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
}
.header-info .contact {
  display: flex;
  width: auto;
}
.header-info .contact a{
  width: auto;
}
.header-info .contact a p {
  text-align: center;
  width: 170px;
}
.header-info .contact .phone{
  max-width: 170px;
}
.header-info .contact a:hover {
  color: rgb(240, 149, 29);
}
.header-info .sep {
  border-left: 3px solid rgb(240, 149, 29);
  height: 25px;
}

.header-info .social-network {
  margin-right: 5%;
  width: 150px;
  text-align: center;
}
/*Header-Info stop*/

/*Nav-bar start*/
.nav-bar {
  width: 100%;
  height: 75px;
  background-color: #f0eeee;
  padding: 15px 5% 0px 5%;
  /* position: sticky;
  top: 50px;
  z-index: 500; */
}
.nav-bar .logo {
  padding: 0px 0px 50px 0;
}
.nav-bar .logo a,
h1 {
  text-decoration: none;
  color: #444242;
  font-size: 30px;
}
.nav-bar nav {
  width: 500px;
  height: auto;
}
.nav-bar nav ul {
  display: flex;
  height: auto;
  width: 450px;
}
.nav-bar nav ul .active-link{
  border-bottom: 3px solid #0f2a5e;
}
.nav-bar nav ul .active-link a{
  color: #0f2a5e;
}
.nav-bar nav ul li{
  position: relative;
  /* overflow: hidden; */
  list-style-type: none;
  padding: 10px;
  width: auto;
  height: 40px;
}

.nav-bar nav ul li::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: #0f2a5e; /* Couleur de la bordure */
  transition: width 0.5s ease; /* Transition pour l'expansion de la bordure */
}
nav-bar nav ul li::after {
  border: none;
}
.nav-bar nav ul #dropdown::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: inherit; /* Couleur de la bordure */
  transition: width 0.4s ease; /* Transition pour l'expansion de la bordure */
}

.nav-bar nav ul li:hover::after {
  width: 100%; /* Expansion complète de la bordure lors du survol */
}
.nav-bar nav ul li:hover a{
  color: #0f2a5e;
}
.nav-bar nav ul li:hover ul li a{
  color: #000;
}
.nav-bar nav ul li ul li:hover a{
  color: #0f2a5e;
}
.nav-bar nav ul #dropdown:hover{
  border-bottom: none;
  color: #0f2a5e;
  width: 115px;
}
.nav-bar nav ul #dropdown:hover .dropdown-link{
  color: #0f2a5e;
}
.nav-bar nav ul #dropdown:hover .dropdown-icon{
  color: #0f2a5e;
  rotate: 180deg;
}
.nav-bar nav ul li a {
  text-decoration: none;
  font-size: 16px;
  letter-spacing: 1px;
  color: #000;
}
.nav-bar nav ul li a:hover {
  color: #0f2a5e;
}

.nav-bar nav ul li ul {
  display: block;
  background-color: #fff;
  font-size: 18px;
  width: 250px;
  height: auto;
  padding: 20px 0px 5px 0px;
  border-radius: 15px 15px 15px 15px;
  display: none;
  margin: 0%;
  margin-top: 5px;
  box-shadow: rgba(2, 2, 2, 0.1) 0px 5px 15px;
  position: relative;
  right: 75px;
}
.nav-bar nav ul li ul li {
  padding: 10px 10px 10px 50px;
  width: 100%;
  height: 55px;
  letter-spacing: 1px;
  border-bottom: 1px solid #e0d7d7;
}
.nav-bar nav ul li ul li:hover {
  color: #174291;
  background: #fff;
  border-radius: 2px 2px 2px 2px;
  /* box-shadow: rgba(2, 2, 2, 0.4) 0px 5px 15px; */
  border: none;
}
.nav-bar nav ul li:hover ul {
  display: block;
}

.nav-bar .search {
  width: 250px;
}
.nav-bar .search input {
  width: 100%;
  height: 40px;
}
.nav-bar .burgger-menu {
  width: 60px;
  height: 50px;
  display: none;
}
.nav-bar .burgger-menu:hover{
  background: rgb(247, 243, 243);
  box-shadow: rgba(2, 2, 2, 0.1) 0px 5px 15px;
}
.nav-bar .burgger-menu .burgger-1,
.burgger-2,
.burgger-3 {
  width: 40px;
  height: 3px;
  margin: 10px;
  background-color: rgb(240, 149, 29);
  border-radius: 2px 2px 2px 2px;
}
/* .burgger-menu:active .burgger-2{
  display: none;
}
.burgger-menu:active .burgger-1{
  rotate: 40deg;
  width: 70px;
}
.burgger-menu:active .burgger-3{
  width: 70px;
  rotate: -45deg;
} */

/* End nav-bar */

/* Start .nav-bar-mobile */
.nav-bar-mobile {
  width: 100%;
  float: right;
  background-color: #f0eeee;
  height: 280px;
  z-index: 200;
}
.nav-bar-mobile ul {
  padding: 20px 0px 0px 0px;
  height: auto;
  width: 100%;
}
.nav-bar-mobile ul a li {
  list-style-type: none;
  width: 100%;
  padding: 20px 0px 0px 5%;
  height: 65px;
  border-bottom: #d1d4dbc5 3px solid;
}
.nav-bar-mobile ul a {
  text-decoration: none;
  font-size: 20px;
  letter-spacing: 1px;
  color: #000;
}
.nav-bar-mobile ul a li:hover {
  background: rgb(224, 221, 221);
}
.nav-bar-mobile ul li ul {
  background-color: #fff;
  height: auto;
  margin-top: 5px;
  padding: 0px 0px 5px 10px;
  width: 100%;
  /* position: relative;
  right: 20px; */
  display: none;
  position: absolute;
  border-radius: 15px 15px 15px 15px;
}
.nav-bar-mobile ul li ul a {
  padding: 0px;
}
.nav-bar-mobile ul li ul li:hover {
  border-bottom: #174291 3px solid;
  background: white;
  color: #174291;
}
.nav-bar-mobile ul li:hover ul {
  display: block;
}
/* Stop .nav-bar-mobile */

/* Media screen */
@media screen and (max-width: 1000px) {
  .nav-bar .logo a, h1 {
    font-size: 25px;
  }
  .nav-bar .burgger-menu {
    display: block;
    position: inherit;
  }
  .nav-bar nav {
    display: none;
  }
  .nav-bar .search{
    width: auto;
  }
  .header-info {
    padding: 0;
  }
  .header-info .contact {
    margin-left: 0px;
  }
 
  .nav-bar .search input {
    width: 100px;
    height: 40px;
  }
  .nav-bar .search button {
    height: 40px;
  }
}



@media screen and (max-width: 600px) {
  .header-info .contact a p {
    display: none;
  }
  .nav-bar .logo {
    width: 100px;
  }
  .nav-bar .logo h1 {
    font-size: 20px;
  }
  .nav-bar .search {
    position: initial;
  }
  .nav-bar .search input {
    width: 100px;
    height: 40px;
    margin-top: 8px;
  }
  .burgger-menu {
    right: 20px;
  }
}
@media screen and (max-width: 370px) {
  .nav-bar .search form input {
    width: 60px;
  }
}
@media screen and (max-width: 300px) {
  .nav-bar .search {
    display: none;
  }
}
</style>