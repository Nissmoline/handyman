import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebook, faInstagram, faTelegram, faViber, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import App from './App.vue'
import { createAppRouter } from './router/index.js'
import { createI18nInstance } from './i18n/index.js'

library.add(faWhatsapp, faViber, faTelegram, faFacebook, faInstagram)

export async function render(url) {
  const app = createSSRApp(App)
  const router = createAppRouter({ ssr: true })
  const head = createHead()
  const i18n = createI18nInstance('el')

  app.use(createPinia())
  app.use(head)
  app.use(router)
  app.use(i18n)
  app.component('font-awesome-icon', FontAwesomeIcon)

  await router.push(url)
  await router.isReady()

  return renderToString(app)
}
