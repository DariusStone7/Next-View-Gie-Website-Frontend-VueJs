import './assets/css/all.min.css'
import './assets/css/bootstrap.min.css'
import './assets/css/owl.carousel.min.css'
import './assets/main.css'
import { router } from './router/router'
import axios from 'axios'
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

import { createApp } from 'vue'
import VueSplide from '@splidejs/vue-splide'


// Include Lightbox
// import PhotoSwipeLightbox from 'photoswipe'
// import 'photoswipe/style.css'

// const lightbox = new PhotoSwipeLightbox({
//   // may select multiple "gallaeries"
//   gallery: '#gallery',

//   // Elements within gallery (slides)
//   children: 'a',

//   // setup PhotoSwipe Core dynamic import
//   pswpModule: () => import('photoswipe')
// })
// lightbox.init()

// lightbox.option({
//   positionFromTop: 100,
//   showZoom: true,
//   alwaysShowNavOnTouchDevices: true,
//   fitImagesInViewport: true,
//   disableScrolling: true
// })

// if (window.location.pathname === '/admin') {
//     // Masquer le Lightbox
//     lightbox.close();
//   }


import App from './App.vue'
const app = createApp(App)

// app.use(createPinia())
app.use(router)
app.use(VueSplide)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
