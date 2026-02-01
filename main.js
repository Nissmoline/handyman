import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import i18n from './i18n'
import './assets/main.css'
import CookieManager from './utils/cookies.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWhatsapp, faViber, faTelegram, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(faWhatsapp, faViber, faTelegram, faFacebook, faInstagram)

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior, base: '/' },
  ({ app, isClient }) => {
    const head = createHead()
    app.use(head)
    app.use(createPinia())
    app.use(i18n)
    app.component('font-awesome-icon', FontAwesomeIcon)

    if (isClient) {
      CookieManager.applyStoredConsent()
    }
  }
)

