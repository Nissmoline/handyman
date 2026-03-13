<template>
  <div class="service-page">
    <div class="service-container">
      <h1>{{ t('yachtRepairPage.title') }}</h1>

      <div class="service-intro">
        <p v-for="(paragraph, index) in introParagraphs" :key="'intro-' + index" v-html="paragraph"></p>
      </div>

      <section>
        <h2>{{ t('yachtRepairPage.electrical.title') }}</h2>
        <ul>
          <li v-for="(item, index) in electricalTasks" :key="'electrical-' + index" v-html="item"></li>
        </ul>
      </section>

      <section>
        <h2>{{ t('yachtRepairPage.furniture.title') }}</h2>
        <ul>
          <li v-for="(item, index) in furnitureTasks" :key="'furniture-' + index" v-html="item"></li>
        </ul>
      </section>

      <section>
        <h2>{{ t('yachtRepairPage.flooring.title') }}</h2>
        <ul>
          <li v-for="(item, index) in flooringTasks" :key="'flooring-' + index" v-html="item"></li>
        </ul>
      </section>

      <section>
        <h2>{{ t('yachtRepairPage.whyChoose.title') }}</h2>
        <ul>
          <li v-for="(item, index) in whyChooseItems" :key="'why-' + index" v-html="item"></li>
        </ul>
      </section>

      <p v-for="(paragraph, index) in closingParagraphs" :key="'closing-' + index" v-html="paragraph"></p>

      <div class="contact-buttons">
        <a href="tel:+306949214461" class="btn btn-primary">{{ t('yachtRepairPage.contact.callNow') }}</a>
        <a href="https://wa.me/306949214461" class="btn btn-secondary">{{ t('yachtRepairPage.contact.whatsapp') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const toArray = (value) => (Array.isArray(value) ? value : [])

const introParagraphs = computed(() => toArray(tm('yachtRepairPage.intro')))
const electricalTasks = computed(() => toArray(tm('yachtRepairPage.electrical.tasks')))
const furnitureTasks = computed(() => toArray(tm('yachtRepairPage.furniture.tasks')))
const flooringTasks = computed(() => toArray(tm('yachtRepairPage.flooring.tasks')))
const whyChooseItems = computed(() => toArray(tm('yachtRepairPage.whyChoose.items')))
const closingParagraphs = computed(() => toArray(tm('yachtRepairPage.closing')))
</script>

<style scoped>
@import '@/assets/service-pages.css';
</style>
