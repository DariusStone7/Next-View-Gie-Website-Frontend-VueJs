
import { useRoute } from 'vue-router'

export const setImage = (src) => {
    return `http://127.0.0.1:8000/${String(src).slice(2, src.length)}`
}

export const getPath = () => {
    const route = useRoute()
    return route.path.slice(6, route.path.length)
}

export const toggleClickOutside = (event) => {
    const target = event.target
  
    // Vérifier si le clic a été effectué à l'extérieur de la div options-menu
    if (!target.closest('.menu')) {
      return false
    }
    return true
}