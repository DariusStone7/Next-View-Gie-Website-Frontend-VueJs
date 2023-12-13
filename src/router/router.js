import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import axios from 'axios'

export const router = createRouter({
  history: createWebHistory(),
  routes
})


// Définir le token d'accès dans les en-têtes de chaque requête
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

//Gestion de l'access aux routes du dashboard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const isAuthenticated = localStorage.getItem("access_token") ? true : false;
  if(to.path == '/admin/login' && isAuthenticated){
    next('/admin/dashboard')
  }
  if (requiresAuth && !isAuthenticated) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    next('/admin/login');
  } else {
    next();
  }
});

// Vérifier l'authentification sur les requêtes avec statut 401 (Non autorisé)
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       const requiresAuth = error.config?.route?.meta?.requiresAuth; // Vérifier si la route requiert une authentification
//       if (requiresAuth) {
//         // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
//         router.push('/admin/login');
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// Vérifier l'authentification sur les requêtes avec statut 401 (Non autorisé)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      router.push('/admin/login');
    }
    return Promise.reject(error);
  }
);

