// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createPinia } from 'pinia';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import './firebase/init.js'
const app = createApp(App)
app.use(createPinia());
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// Your web app's Firebase configuration

  

app.mount('#app')

