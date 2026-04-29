<template>
  <main class="service-page urgent-electrician-page">
    <article class="service-container">
      <p class="service-eyebrow">{{ t(`${pageKey}.eyebrow`) }}</p>
      <h1>{{ t(`${pageKey}.title`) }}</h1>

      <div class="service-intro">
        <p v-for="(paragraph, index) in introParagraphs" :key="'intro-' + index" v-html="paragraph"></p>
      </div>

      <div class="contact-buttons urgent-electrician-page__top-cta">
        <a href="tel:+306949214461" class="btn btn-primary">{{ t(`${pageKey}.contact.callNow`) }}</a>
        <a href="https://wa.me/306949214461" class="btn btn-secondary">{{ t(`${pageKey}.contact.whatsapp`) }}</a>
      </div>

      <section>
        <h2>{{ t(`${pageKey}.when.title`) }}</h2>
        <p v-html="t(`${pageKey}.when.description`)"></p>
        <ul>
          <li v-for="(item, index) in whenItems" :key="'when-' + index" v-html="item"></li>
        </ul>
      </section>

      <section>
        <h2>{{ t(`${pageKey}.services.title`) }}</h2>
        <ul>
          <li v-for="(item, index) in serviceTasks" :key="'service-' + index" v-html="item"></li>
        </ul>
      </section>

      <section>
        <h2>{{ t(`${pageKey}.process.title`) }}</h2>
        <ol>
          <li v-for="(item, index) in processItems" :key="'process-' + index" v-html="item"></li>
        </ol>
      </section>

      <section>
        <h2>{{ t(`${pageKey}.areas.title`) }}</h2>
        <p v-html="t(`${pageKey}.areas.description`)"></p>
        <ul>
          <li v-for="(item, index) in areaItems" :key="'area-' + index" v-html="item"></li>
        </ul>
      </section>

      <section class="urgent-electrician-page__notice">
        <h2>{{ t(`${pageKey}.safety.title`) }}</h2>
        <p v-html="t(`${pageKey}.safety.description`)"></p>
      </section>

      <section>
        <h2>{{ t(`${pageKey}.faq.title`) }}</h2>
        <div class="faq-list">
          <article v-for="(item, index) in faqItems" :key="'faq-' + index" class="faq-item">
            <h3>{{ item.question }}</h3>
            <p>{{ item.answer }}</p>
          </article>
        </div>
      </section>

      <div class="contact-buttons">
        <a href="tel:+306949214461" class="btn btn-primary">{{ t(`${pageKey}.contact.callNow`) }}</a>
        <router-link to="/electrician" class="btn btn-secondary">{{ t(`${pageKey}.contact.mainPage`) }}</router-link>
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
import { createBreadcrumbSchema, createLocalBusinessSchema, createServiceSchema, stripTags } from '@/utils/seo'

const { t, tm } = useI18n()
const pageKey = 'urgentElectricianPage'
const path = '/ilektrologos-24-ores'
const toArray = (value) => (Array.isArray(value) ? value : [])

const introParagraphs = computed(() => toArray(tm(`${pageKey}.intro`)))
const whenItems = computed(() => toArray(tm(`${pageKey}.when.items`)))
const serviceTasks = computed(() => toArray(tm(`${pageKey}.services.tasks`)))
const processItems = computed(() => toArray(tm(`${pageKey}.process.items`)))
const areaItems = computed(() => toArray(tm(`${pageKey}.areas.items`)))
const faqItems = computed(() => toArray(tm(`${pageKey}.faq.items`)))

const structuredData = computed(() => [
  createLocalBusinessSchema({
    '@id': 'https://handyman24.gr/#urgent-electrician',
    name: t(`${pageKey}.schema.businessName`),
    description: introParagraphs.value.map(stripTags).join(' '),
  }),
  createServiceSchema({
    name: t(`${pageKey}.schema.serviceName`),
    serviceType: t(`${pageKey}.schema.serviceType`),
    description: introParagraphs.value.map(stripTags).join(' '),
    path,
    services: serviceTasks.value,
    providerType: 'Electrician',
  }),
  createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: t(`${pageKey}.title`), path },
  ]),
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `https://handyman24.gr${path}#faq`,
    mainEntity: faqItems.value.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
])

useHead(() => ({
  script: [
    {
      key: 'urgent-electrician-jsonld',
      type: 'application/ld+json',
      children: JSON.stringify(structuredData.value),
    },
  ],
}))
</script>

<style scoped>
@import '@/assets/service-pages.css';

.service-eyebrow {
  margin: 0 0 12px;
  color: #e92127;
  font-weight: 800;
  text-transform: uppercase;
}

.urgent-electrician-page__top-cta {
  justify-content: flex-start;
}

.urgent-electrician-page__notice {
  border-left: 4px solid #e92127;
  padding-left: 18px;
}

.faq-list {
  display: grid;
  gap: 16px;
}

.faq-item {
  border: 1px solid #dbe5ef;
  border-radius: 8px;
  padding: 18px;
  background: #f8fbfd;
}

.faq-item h3 {
  margin-top: 0;
  color: #044877;
}

.faq-item p {
  margin-bottom: 0;
}
</style>
