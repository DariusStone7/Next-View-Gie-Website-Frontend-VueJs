<script setup>
import Profile from '../components/Profile.vue'
import About from '../components/About.vue'
import { members_profiles } from '../states/states.js'

const membersSplideOptions = {
  rewind: true,
  speed: 700,
  autoplay: true,
  arrows: false,
  arrowPath: 'm7.61 0.807-2.12...',
  interval: 3000,
  keyboard: 'global',
  perMove: 1,
  perPage: 2,
  breakpoints: {
    1000: {
      perPage:1
    },
  },
}
</script>

<template>
  <div class="about">
    <About/>
  </div>
  <div class="members justify-content-center">
    <div class="title d-flex justify-content-center">
      <h1>Les membres de notre équipe</h1>
      <img src="../assets/images/members/members2.jpeg" alt="" />
    </div>
    <br /><br /><br />
    <div class="row justify-content-center">
      <Splide :options="membersSplideOptions" data-splide='{"type":"loop"}'>
        <SplideSlide  v-for="(profile, index) in members_profiles" :key="index">
          <Profile :name="profile.name" :role="profile.role" :image="profile.image" />
        </SplideSlide>
      </Splide>   
    </div>
  </div>
</template>

<style scoped>

/* Start .members */
.members {
  width: 100%;
  margin: 0;
  padding: 0px 5% 200px 5%;
}
.members .title {
  margin: auto;
  width: 100%;
  text-align: center;
  vertical-align: baseline;
}
.members .title h1 {
  color: rgb(7, 48, 94);
  padding-top: 40px;
  width: 50%;
  background-color: #fff;
}
.members .title img {
  width: 200px;
}
.members .members-profile {
  width: auto;
}
/* End .members */
</style>