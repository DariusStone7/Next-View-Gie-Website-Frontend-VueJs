<script setup>
import Service from '../components/service/Service.vue'
import ServiceHelp from '../components/service/ServiceBenefit.vue'
import Profile from '../components/Profile.vue'
import Feedback from '../components/Feedback.vue'
import Contact from '../components/Contact.vue'
import About from '../components/About.vue'
import Carousel from '../components/Carousel.vue'
import Annonce from '../components/annonce/Annonce.vue'

import { ref, onMounted } from 'vue'
import { abouts } from '../states/states.js'
import { annonces } from '../states/states.js'
import { benefits } from '../states/states.js'
import { carousels } from '../states/states.js'
import { customers_feedbacks } from '../states/states.js'
import { members_profiles } from '../states/states.js'
import { messages } from '../states/states.js'
import { services } from '../states/states.js'
import { service_benefit } from '../states/states.js'
import { service_technology } from '../states/states.js'
import { setImage } from '../utils/index.js'

let url = '/annonce-detail?id='
let best_annonces = ref({})

const feedbackSplideOptions = {
  rewind: true,
  speed: 2000,
  autoplay: true,
  padding: 250,
  gab: '5rem',
  interval: 3000,
  keyboard: 'global',
  breakpoints: {
    1300: {
      padding: 200
    },
    1150: {
      padding: 150
    },
    1000: {
      padding: 100
    },
    900: {
      padding: 0
    }
  }
}

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
      perPage: 1
    }
  }
}

const splideData = {
  type: 'loop'
}
</script>

<template>
  <div class="carousel">
    <Carousel />
  </div>
  <div class="about">
    <About />
  </div>
  <div class="services justify-content-center">
    <div class="title">
      <h1>{{ service_technology[0].title }}</h1>
    </div>
    <div class="text">
      <p>
        {{ service_technology[0].description }}
      </p>
    </div>
    <div class="row justify-content-center">
      <div class="service col mb-5" v-for="(service, index) in services" :key="index">
        <Service
          :id_service="service.id_service"
          :title="service.title"
          :image="service.image"
          :description="service.description"
          :numero="index"
          :icon="service.icon"
        />
      </div>
    </div>
  </div>
  <div class="annonces">
    <h1>
      Méilleurs annonces
      <span
        ><font-awesome-icon
          :icon="['fas', 'house-circle-check']"
          size="2xl"
          style="color: rgb(240, 149, 29)"
      /></span>
    </h1>
    <div class="row justify-content-center">
      <div class="annonce col mb-5" v-for="(annonce, index) in annonces.slice(0, 6)" :key="index">
        <a :href="url + annonce.id_annonce">
          <Annonce
            :id="annonce.id_annonce"
            :title="annonce.title"
            :description="annonce.description"
            :url="annonce.url"
            :price="annonce.price"
            :bedroom="annonce.bedroom"
            :bathroom="annonce.bathroom"
            :warehouse="annonce.warehouse"
            :parking="annonce.parking"
            :pool="annonce.pool"
            :wind="annonce.wind"
            :furniture="annonce.furniture"
            :fredge="annonce.fredge"
            :phone="annonce.phone"
            :adresse="annonce.adresse"
            :email="annonce.email"
            :images="annonce.images"
          />
        </a>
      </div>
      <!-- <div class="next col" v-if="(annonces.length / 2) != 0"></div> -->
    </div>
    <div class="plus">
      <a href="/service-immobilier">Voir plus -></a>
    </div>
  </div>
  <div class="services-helpful justify-content-center">
    <div class="title">
      <h2>{{ benefits[0].title }}</h2>
    </div>
    <div class="text">
      <p>
        {{ benefits[0].description }}
      </p>
    </div>
    <div class="row justify-content-center">
      <div class="service col mb-5" v-for="(benefit, index) in service_benefit" :key="index">
        <ServiceHelp
          :title="benefit.title"
          :image="benefit.image"
          :description="benefit.description"
          :numero="index"
        />
      </div>
    </div>
  </div>
  <div class="members justify-content-center">
    <div class="title d-flex justify-content-center">
      <h1>Les membres de notre équipe</h1>
      <img :src="setImage('./images/members/members2.jpeg')" alt="" />
    </div>
    <br /><br /><br />
    <div class="members-profile justify-content-center">
      <Splide :options="membersSplideOptions" data-splide='{"type":"loop"}'>
        <SplideSlide v-for="(profile, index) in members_profiles" :key="index">
          <Profile :name="profile.name" :role="profile.role" :image="profile.image" />
        </SplideSlide>
      </Splide>
      <!-- <div class="members-profile col mb-5" v-for="(profile, index) in members_profiles" :key="index">
      </div> -->
    </div>
  </div>
  <div class="feedbacks justify-content-center">
    <h1>Commentaires de nos clients</h1>
    <br /><br />
    <Splide :options="feedbackSplideOptions" data-splide='{"type":"loop"}'>
      <SplideSlide v-for="(feedback, index) in customers_feedbacks" :key="index">
        <Feedback
          :name="feedback.name"
          :role="feedback.role"
          :image="feedback.image"
          :message="feedback.message"
        />
      </SplideSlide>
    </Splide>
  </div>
  <div class="contact justify-content-center">
    <h1>Laissez nous un message !</h1>
    <Contact />
  </div>
</template>
<style scoped>
/*start carousel*/
.carousel {
  height: auto;
}
/* Start .services */
.services {
  width: 100%;
  height: auto;
  background-image: url('http://127.0.0.1:8000/images/background/tech-service2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  text-align: center;
  padding: 100px 5% 100px 5%;
}
.services .title {
  margin: auto;
  color: white;
  width: 100%;
  padding: 0px 25%;
}
.services .text {
  width: 100%;
  padding: 20px 15% 50px 15%;
  color: white;
  font-size: 18px;
}
.services .row {
  margin: auto;
}
.services .service {
  width: 480px;
}
/* End .services */

/*Start annonces*/
.annonces {
  padding: 100px 5% 0px 5%;
}
.annonces h1 {
  margin-bottom: 50px;
  text-align: center;
  color: rgb(7, 48, 94);
}
.annonces .annonce {
  width: 480px;
}
.annonces .annonce a {
  text-decoration: none;
  color: inherit;
}
.plus a {
  float: right;
  /* text-decoration: none; */
  color: rgb(212, 122, 4);
}
/*end service-immobilier*/

/* Start .services-helpful */
.services-helpful {
  text-align: center;
  width: 100%;
  padding: 100px 5% 50px 5%;
}
.services-helpful .title {
  color: rgb(7, 48, 94);
  width: 100%;
  padding: 0px 25%;
}
.services-helpful .text {
  width: 100%;
  padding: 50px 15%;
  font-size: 16px;
}
.services-helpful .row {
  margin: auto;
}
.services-helpful .row .service {
  max-width: 480px;
  width: auto;
}
/* End .services-helpful */

/* Start .members */
.members {
  width: 100%;
  margin: 0;
  padding: 50px 5% 200px 5%;
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
  width: 100%;
  height: auto;
}
/* End .members */

/* Start .feedback  */
.feedbacks {
  padding: 80px 5% 50px 5%;
  min-height: 500px;
  height: auto;
  width: auto;
  background-image: url('http://127.0.0.1:8000/images/background/world4.avif');
  background-size: cover;
}
.feedbacks h1 {
  color: white;
  text-align: center;
}
.feedbacks .feedback {
  padding-top: 50px;
  width: 520px;
}

/* End .feedback  */

/* Start .contact  */
.contact {
  padding: 10%;
  width: 100%;
}
.contact h1 {
  text-align: center;
}
/* End .contact  */

@media screen and (max-width: 1500px) {
  .services .title {
    width: 100%;
    padding: 0 5% 5% 5%;
  }
  .services .text {
    width: 100%;
    padding: 0 5% 5% 5%;
  }
  .services-helpful .title {
    width: 100%;
    padding: 0 5% 5% 5%;
  }
  .services-helpful .text {
    width: 100%;
    padding: 0 5% 5% 5%;
  }
  /* Start .contact  */
  .contact {
    padding: 5%;
  }
  .contact h1 {
    text-align: center;
  }
  /* End .contact  */
}
@media screen and (max-width: 1000px) {
  .services .title {
    width: 100%;
    padding: 0px 0px 50px 0px;
    text-align: justify;
  }
  .services .text {
    width: 100%;
    padding: 0px 0px 50px 0px;
    text-align: justify;
  }
  .services-helpful .title {
    width: 100%;
    padding: 0 5% 5% 5%;
    text-align: justify;
  }
  .services-helpful .text {
    width: 100%;
    padding: 0 5% 5% 5%;
    text-align: justify;
  }
  .feedbacks {
    padding: 50px 5px 50px 5px;
  }
  .feedbacks .feedback {
    width: auto;
  }
  .contact h1 {
    padding-top: 50px;
  }
}
</style>