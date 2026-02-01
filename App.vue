<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
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
const siteUrl = 'https://handyman24.gr'

const defaultSeo = {
  titleKey: 'seo.default.title',
  descriptionKey: 'seo.default.description',
  ogImage: 'https://handyman24.gr/logoico.svg',
  twitterImage: 'https://handyman24.gr/logoico.svg',
}

const routeMeta = computed(() => route.meta as {
  titleKey?: string
  descriptionKey?: string
  ogImage?: string
  twitterImage?: string
})

const titleKey = computed(() => routeMeta.value.titleKey || defaultSeo.titleKey)
const descriptionKey = computed(() => routeMeta.value.descriptionKey || defaultSeo.descriptionKey)
const ogImage = computed(() => routeMeta.value.ogImage || defaultSeo.ogImage)
const twitterImage = computed(() => routeMeta.value.twitterImage || defaultSeo.twitterImage)

const title = computed(() => t(titleKey.value))
const description = computed(() => t(descriptionKey.value))
const canonicalUrl = computed(() =>
  route.path === '/' ? `${siteUrl}/` : `${siteUrl}${route.path}`
)
const ogLocale = computed(() => (locale.value === 'el' ? 'el_GR' : 'en_US'))

const metaTags = computed(() => {
  const tags = [
    { name: 'description', content: description.value },
    { name: 'language', content: locale.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title.value },
    { property: 'og:description', content: description.value },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:site_name', content: 'Handyman24 - Ηλεκτρολόγος Αθήνα' },
    { property: 'og:locale', content: ogLocale.value },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title.value },
    { name: 'twitter:description', content: description.value },
  ]

  if (ogImage.value) {
    tags.push({ property: 'og:image', content: ogImage.value })
  }

  if (twitterImage.value) {
    tags.push({ name: 'twitter:image', content: twitterImage.value })
  }

  return tags
})

useHead(() => ({
  title: title.value,
  htmlAttrs: { lang: locale.value },
  meta: metaTags.value,
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
}))
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

