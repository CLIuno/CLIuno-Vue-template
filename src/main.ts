import './assets/main.css'

// i18n
import i18n from '@/plugins/i18n'

import App from './App.vue'
import router from './router'

// Apply the persisted theme (or system preference) before mount to avoid a flash
const storedTheme = localStorage.getItem('theme')
if (
  storedTheme === 'dark' ||
  (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark')
}

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')
