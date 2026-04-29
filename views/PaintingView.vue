<template>
  <main class="service-page">
    <article class="service-container">
      <h1>{{ t('paintingPage.title') }}</h1>

      <div class="service-intro">
        <p v-for="(paragraph, index) in introParagraphs" :key="'intro-' + index" v-html="paragraph"></p>
      </div>

      <section>
        <h2>{{ t('paintingPage.services.title') }}</h2>
        <ul>
          <li v-for="(item, index) in serviceTasks" :key="'service-' + index" v-html="item"></li>
        </ul>
      </section>

      <section>
        <h2>{{ t('paintingPage.whyChoose.title') }}</h2>
        <ul>
          <li v-for="(item, index) in whyChooseItems" :key="'why-' + index" v-html="item"></li>
        </ul>
      </section>

      <p v-for="(paragraph, index) in closingParagraphs" :key="'closing-' + index" v-html="paragraph"></p>

      <div class="contact-buttons">
        <a href="tel:+306949214461" class="btn btn-primary">{{ t('paintingPage.contact.callNow') }}</a>
        <a href="https://wa.me/306949214461" class="btn btn-secondary">{{ t('paintingPage.contact.whatsapp') }}</a>
      </div>

      <RelatedServices />
    </article>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import RelatedServices from '@/components/RelatedServices.vue'
import { createBreadcrumbSchema, createServiceSchema, stripTags } from '@/utils/seo'

const { t, tm } = useI18n()
const pageKey = 'paintingPage'
const path = '/painting'
const toArray = (value) => (Array.isArray(value) ? value : [])

const introParagraphs = computed(() => toArray(tm(`${pageKey}.intro`)))
const serviceTasks = computed(() => toArray(tm(`${pageKey}.services.tasks`)))
const whyChooseItems = computed(() => toArray(tm(`${pageKey}.whyChoose.items`)))
const closingParagraphs = computed(() => toArray(tm(`${pageKey}.closing`)))

const structuredData = computed(() => [
  createServiceSchema({
    name: t(`${pageKey}.schema.serviceName`),
    serviceType: t(`${pageKey}.schema.serviceType`),
    description: introParagraphs.value.map(stripTags).join(' '),
    path,
    services: serviceTasks.value,
  }),
  createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: t(pageKey + '.title'), path },
  ]),
])

useHead(() => ({
  script: [
    {
      key: 'painting-jsonld',
      type: 'application/ld+json',
      children: JSON.stringify(structuredData.value),
    },
  ],
}))
</script>

<style scoped>
@import '@/assets/service-pages.css';
</style>
