<template>
  <div class="service-page">
    <div class="service-container">
      <h1>{{ t('maintenancePage.title') }}</h1>

      <div class="service-intro">
        <p v-for="(paragraph, index) in introParagraphs" :key="'intro-' + index" v-html="paragraph"></p>
      </div>

      <h2>{{ t('maintenancePage.services.title') }}</h2>
      <ul>
        <li v-for="(item, index) in serviceTasks" :key="'service-' + index" v-html="item"></li>
      </ul>

      <h2>{{ t('maintenancePage.whyChoose.title') }}</h2>
      <ul>
        <li v-for="(item, index) in whyChooseItems" :key="'why-' + index" v-html="item"></li>
      </ul>

      <p v-for="(paragraph, index) in closingParagraphs" :key="'closing-' + index" v-html="paragraph"></p>

      <div class="contact-buttons">
        <a href="tel:+306949214461" class="btn btn-primary">{{ t('maintenancePage.contact.callNow') }}</a>
        <a href="https://wa.me/306949214461" class="btn btn-secondary">{{ t('maintenancePage.contact.whatsapp') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const toArray = (value) => (Array.isArray(value) ? value : [])

const introParagraphs = computed(() => toArray(tm('maintenancePage.intro')))
const serviceTasks = computed(() => toArray(tm('maintenancePage.services.tasks')))
const whyChooseItems = computed(() => toArray(tm('maintenancePage.whyChoose.items')))
const closingParagraphs = computed(() => toArray(tm('maintenancePage.closing')))
</script>

<style scoped>
@import '@/assets/service-pages.css';
</style>
