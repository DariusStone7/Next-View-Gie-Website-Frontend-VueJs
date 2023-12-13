import './assets/css/all.min.css'
import './assets/css/bootstrap.min.css'
import './assets/css/owl.carousel.min.css'
import './assets/main.css'
//@ts-ignore
import './assets/js/bootstrap.min.js'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(fas, far, fab, faUserSecret, faTwitter, faLinkedin, faFacebookF)

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteLocationNormalized} from 'vue-router'
import App from './App.vue'
import About from './views/About.vue'
import Home from './views/Home.vue'
import Contact from './views/Contact.vue'
import ServiceImmobilier from './views/ServiceImmobilier.vue'
import ServiceTechnology from './views/SeviceTechnology.vue'
import ServiceVehicule from './views/ServiceVehicules.vue'
import AnnonceDetail from './components/AnnonceDetail.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/a-propos', component: About},
    {path: '/contact', component: Contact},
    {path: '/service-technologie', component: ServiceTechnology},
    {path: '/service-immobilier', component: ServiceImmobilier},
    {path: '/service-vehicules', component: ServiceVehicule},
    {path: '/annonce-detail', component: AnnonceDetail, props: (route: RouteLocationNormalized) => ({ id: route.query.id })}
]     

const router = createRouter({

    history: createWebHistory(),
    routes, 
  })


const app = createApp(App)


// app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
