import { createI18n } from 'vue-i18n'
import en from '@/i18n/en.json'
import ar from '@/i18n/ar.json'
export default createI18n({
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ar,
  },
})
