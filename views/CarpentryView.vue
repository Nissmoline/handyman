<template>
  <main class="service-page">
    <article class="service-container">
      <h1>{{ t('carpentryPage.title') }}</h1>

      <div class="service-intro">
        <p v-for="(paragraph, index) in introParagraphs" :key="'intro-' + index" v-html="paragraph"></p>
      </div>

      <h2>{{ t('carpentryPage.services.title') }}</h2>
      <ul>
        <li v-for="(item, index) in serviceTasks" :key="'service-' + index" v-html="item"></li>
      </ul>

      <h2>{{ t('carpentryPage.whyChoose.title') }}</h2>
      <ul>
        <li v-for="(item, index) in whyChooseItems" :key="'why-' + index" v-html="item"></li>
      </ul>

      <p v-for="(paragraph, index) in closingParagraphs" :key="'closing-' + index" v-html="paragraph"></p>

      <div class="contact-buttons">
        <a href="tel:+306949214461" class="btn btn-primary">{{ t('carpentryPage.contact.callNow') }}</a>
        <a href="https://wa.me/306949214461" class="btn btn-secondary">{{ t('carpentryPage.contact.whatsapp') }}</a>
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

const toArray = (value) => (Array.isArray(value) ? value : [])
const path = '/carpentry'

const introParagraphs = computed(() => toArray(tm('carpentryPage.intro')))
const serviceTasks = computed(() => toArray(tm('carpentryPage.services.tasks')))
const whyChooseItems = computed(() => toArray(tm('carpentryPage.whyChoose.items')))
const closingParagraphs = computed(() => toArray(tm('carpentryPage.closing')))

const structuredData = computed(() => [
  createServiceSchema({
    name: t('carpentryPage.schema.serviceName'),
    serviceType: t('carpentryPage.schema.serviceType'),
    description: introParagraphs.value.map(stripTags).join(' '),
    path,
    services: serviceTasks.value,
  }),
  createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: t('carpentryPage.title'), path },
  ]),
])

useHead(() => ({
  script: [
    {
      key: 'carpentry-jsonld',
      type: 'application/ld+json',
      children: JSON.stringify(structuredData.value),
    },
  ],
}))
</script>

<style scoped>
@import '@/assets/service-pages.css';
</style>
