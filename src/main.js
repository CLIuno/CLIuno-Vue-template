import './assets/css/main.css'

import Particles from 'vue3-particles'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import vuetify from './plugins/vuetify'
// PrimeVue
import PrimeVue from './plugins/primevue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(PrimeVue)
app.use(Particles)
app.use(PrimeVue)
app.mount('#app')
