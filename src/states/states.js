import { ref } from 'vue'

// Definition of state
export const abouts = ref([{
  id_about: Number,
  title: String,
  text: String,
  image: String
}])

export const annonces = ref([{
  id_annonce: Number,
  title : String,
  description : String,
  url : String,
  price : Number,
  bedroom : Number,
  bathroom : Boolean,
  warehouse : Boolean,
  parking : Boolean,
  pool : Boolean,
  wind : Boolean,
  furniture : Boolean,
  fredge : Boolean,
  phone : String,
  address : String,
  email : String,
  images: String,
  upload_folder: String,
}])

export const annonce_images = ref({
  id_annonce_image : Number,
  name : String,
  id_annonce : Number
})

export const benefits = ref([{
  id_benefit : Number,
  title : String,
  description : String
}])

export const carousels = ref([{
  id_carousel: Number,
  text : String,
  image : String
}])

export const customers_feedbacks = ref([{
  id_customer_feedback : Number,
  name : String,
  role : String,
  message : String,
  image : String
}])

export const members_profiles = ref([{
  id_member_profile: Number,
  name : String,
  role : String,
  image : String
}])

export const messages = ref([{
  id_message: Number,
  name : String,
  email : String,
  phone : String,
  subject : String,
  text : String,
  create_at: String,
  read_at: String
}])

export const services = ref([{
  id_service: Number,
  title : String,
  description : String,
  image : String,
  icon : String
}])

export const service_benefit = ref([{
  id_service_benefit : Number,
  title : String,
  description : String
}])

export const setting = ref({
  id_setting: Number,
  phone: String,
  email: String,
  facebook: String,
  twitter: String,    
  linkedin: String,
  youtube: String
})

export const service_technology = ref([{
  id_service_technology : Number,
  title : String,
  description : String
}])

export const user = ref({
  username: String,
  email: String,
  image: String,
  name: String
})