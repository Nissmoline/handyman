import { createApp, createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import router from './router'
import App from './App.vue'
import i18n from './i18n'
import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWhatsapp, faViber, faTelegram, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(faWhatsapp, faViber, faTelegram, faFacebook, faInstagram)

const appRoot = document.querySelector('#app')
const app = appRoot?.hasChildNodes() ? createSSRApp(App) : createApp(App)
const head = createHead()

app.use(createPinia())
app.use(head)
app.use(router)
app.use(i18n)
app.component('font-awesome-icon', FontAwesomeIcon)

const mountApp = async () => {
  await router.isReady()
  app.mount('#app')

  const routesWithClientStructuredData = new Set([
    '/electrician',
    '/electrician-faq',
    '/offers',
    '/plumber',
    '/tiling',
    '/painting',
    '/carpentry',
    '/renovations',
    '/maintenance',
    '/yacht-repair',
  ])

  if (!routesWithClientStructuredData.has(router.currentRoute.value.path)) return

  const removeDuplicateStructuredData = () => {
    const staticStructuredData = document.querySelector('#static-seo-jsonld')
    const structuredDataBlocks = document.querySelectorAll('script[type="application/ld+json"]')

    if (staticStructuredData && structuredDataBlocks.length > 1) {
      staticStructuredData.remove()
      return true
    }

    return false
  }

  if (!removeDuplicateStructuredData()) {
    const headObserver = new MutationObserver(() => {
      if (removeDuplicateStructuredData()) headObserver.disconnect()
    })
    headObserver.observe(document.head, { childList: true })
    window.setTimeout(() => headObserver.disconnect(), 1000)
  }
}

mountApp()
