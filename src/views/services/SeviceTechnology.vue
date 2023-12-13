<script setup>
import Service from '../../components/service/Service.vue'
import ServiceBenefit from '../../components/service/ServiceBenefit.vue'
import { services } from '../../states/states.js'
import { benefits } from '../../states/states.js'
import { service_technology } from '../../states/states.js'
import { service_benefit } from '../../states/states.js'
</script>

<template>
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
  <div class="services-helpful justify-content-center">
    <div class="title">
      <h1>{{ benefits[0].title }}</h1>
    </div>
    <div class="text">
      <p>
        {{ benefits[0].description }}
      </p>
    </div>
    <div class="row justify-content-center">
      <div class="service col mb-5" v-for="(benefit, index) in service_benefit" :key="index">
        <ServiceBenefit
          :title="benefit.title"
          :image="benefit.image"
          :description="benefit.description"
          :numero="index"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Start .service */
.services {
  width: 100%;
  height: auto;
  background-image: url('../../assets/images/background/tech-service2.jpg');
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
  font-size: 18px;
}
.services-helpful .row {
  margin: auto;
}
.services-helpful .service {
  width: 480px;
}
/* End .services-helpful */

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
}
</style>