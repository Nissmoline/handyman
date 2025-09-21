<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/AppHeader.vue'
import AppBottomBar from '@/components/AppBottomBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppointmentPopup from '@/components/AppointmentPopup.vue'
import CookieConsent from '@/components/CookieConsent.vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'

const popupOpen = ref(false)
const openPopup = () => {
  popupOpen.value = true
}
const closePopup = () => {
  popupOpen.value = false
}

provide('openAppointmentPopup', openPopup)

const route = useRoute()
const { t, locale } = useI18n()

const defaultSeo = {
  titleKey: 'seo.default.title',
  descriptionKey: 'seo.default.description',
  ogImage: 'https://handyman24.gr/logoico.svg',
  twitterImage: 'https://handyman24.gr/logoico.svg',
}

const updateSeoMeta = () => {
  if (typeof document === 'undefined' || !document.head) return

  const routeMeta = route.meta as {
    titleKey?: string
    descriptionKey?: string
    ogImage?: string
    twitterImage?: string
  }

  const titleKey = routeMeta.titleKey || defaultSeo.titleKey
  const descriptionKey = routeMeta.descriptionKey || defaultSeo.descriptionKey
  const ogImage = routeMeta.ogImage || defaultSeo.ogImage
  const twitterImage = routeMeta.twitterImage || defaultSeo.twitterImage

  const title = t(titleKey)
  const description = t(descriptionKey)
  const canonicalPath = route.path
  const canonicalUrl = `https://handyman24.gr${canonicalPath === '/' ? '' : canonicalPath}`

  document.title = title

  const ensureMeta = (selector: string, attrs: Record<string, string>) => {
    let element = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null
    if (!element) {
      element = selector.startsWith('meta')
        ? document.createElement('meta')
        : document.createElement('link')
      document.head.appendChild(element)
    }
    Object.entries(attrs).forEach(([key, value]) => {
      element!.setAttribute(key, value)
    })
    return element
  }

  ensureMeta('meta[name="description"]', { name: 'description', content: description })
  ensureMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl })
  ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title })
  ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description })
  ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })

  if (ogImage) {
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage })
  }

  if (twitterImage) {
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: twitterImage })
  }
}

watch(
  [() => route.fullPath, () => locale.value],
  () => updateSeoMeta(),
  { immediate: true }
)
</script>

<template>
  <AppHeader @contact="openPopup" />
  <router-view />
  <AppBottomBar @contact="openPopup" :popup-open="popupOpen" />
  <AppFooter />
  <CookieConsent />
  <AppointmentPopup v-model:isOpen="popupOpen" />
  <SpeedInsights />
</template>

<style>
.app-main {
  min-height: 100vh;
  padding-bottom: 56px;
}
</style>
