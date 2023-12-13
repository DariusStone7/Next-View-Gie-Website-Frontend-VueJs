import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import MessageList from '@/views/admin/MessageList.vue'
import AnnonceDetail from '@/views/annonce/AnnonceDetail.vue'
import ServiceVehicule from '@/views/services/ServiceVehicules.vue'
import ServiceTechnology from '@/views/services/SeviceTechnology.vue'
import ServiceImmobilier from '@/views/services/ServiceImmobilier.vue'
import DashboardLayouts from '../layouts/dashboardLayout.vue'
import BaseLayouts from '../layouts/baseLayout.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import ListeAnnonces from '../views/admin/annonce/ListeAnnonces.vue'
import ListeCarousels from '../views/admin/ListeCarousels.vue'
import ListAbout from '../views/admin/ListAbout.vue'
import ListeServiceTechnologie from '../views/admin/ListeServiceTechnologie.vue'
import ListeServiceBenefit from '../views/admin/ListeSeviceBenefit.vue'
import ListProfiles from '../views/admin/ListProfiles.vue'
import ListFeedbacks from '../views/admin/ListFeedbacks.vue'
import AdminAnnonceDetail from '../views/admin/annonce/AnnonceDetail.vue'
import AnnonceForm from '../views/admin/annonce/AnnonceForm.vue'
import AnnonceUpdateForm from '../views/admin/annonce/AnnonceUpdateForm.vue'
import Login from '../views/admin/Login.vue'
import PasswordReset from '../views/admin/PasswordReset.vue'
import AdminProfile from '../views/admin/AdminProfile.vue'


export  const routes = [
    {
      path: '/',
      component: BaseLayouts,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'a-propos',
          component: About
        },
        {
          path: 'contact',
          component: Contact
        },
        {
          path: 'service-technologie', 
          component: ServiceTechnology
        },
        {
          path: 'service-immobilier',
          component: ServiceImmobilier,
        },
        {
          path: 'service-vehicules', 
          component: ServiceVehicule
        },
        {
          path: 'annonce-detail', 
          component: AnnonceDetail, 
          props: true
        },
      ]
    },
    {
      path: '/admin/login',
      component: Login
    },
    {
      path: '/admin/reset-password',
      component: PasswordReset
    },
    {
      path: '/admin/dashboard',
      component: DashboardLayouts,
      meta: { requiresAuth: true},
      children: [
        {
          path: '',
          component: Dashboard,
        },
        {
          path: 'profile',
          component: AdminProfile,
        },
        {
          path: 'messages',
          component: MessageList
        },
        {
          path: 'annonces',
          component: ListeAnnonces
        },
        {
          path: 'carousels',
          component: ListeCarousels
        },
        {
          path: 'a-propos',
          component: ListAbout
        },
        {
          path: 'services-technologie',
          component: ListeServiceTechnologie
        },
        {
          path: 'service-benefit',
          component: ListeServiceBenefit
        },
        {
          path: 'members',
          component: ListProfiles
        },
        {
          path: 'feedbacks',
          component: ListFeedbacks
        },
        {
          path: 'annonce/detail',
          component: AdminAnnonceDetail,
          props: true
        },
        {
          path: 'annonces/new',
          component: AnnonceForm,
        },
        {
          path: 'annonce/update',
          component: AnnonceUpdateForm,
          props: true
        },
        
      ] 
    },
]  