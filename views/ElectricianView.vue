<template>
  <div class="service-page">
    <div class="service-container">
      <h1>{{ t('electricianPage.title') }}</h1>
      
      <div class="service-intro">
        <p v-html="t('electricianPage.intro.paragraph1')"></p>
        <p v-html="t('electricianPage.intro.paragraph2')"></p>
        <p v-html="t('electricianPage.intro.paragraph3')"></p>
      </div>

      <div class="emergency-section">
        <h2>{{ t('electricianPage.emergency.title') }}</h2>
        <p v-html="t('electricianPage.emergency.description')"></p>
      </div>
      
      <h2>{{ t('electricianPage.services.title') }}</h2>
      <ul>
        <li v-for="service in servicesList" :key="service" v-html="service"></li>
      </ul>

      <div class="service-areas">
        <h2>{{ t('electricianPage.serviceAreas.title') }}</h2>
        <p v-html="t('electricianPage.serviceAreas.intro')"></p>
        <ul>
          <li v-for="area in serviceAreasList" :key="area" v-html="area"></li>
        </ul>
        <p v-html="t('electricianPage.serviceAreas.availability')"></p>
      </div>

      <div class="why-choose-us">
        <h2>{{ t('electricianPage.whyChoose.title') }}</h2>
        <ul>
          <li v-for="reason in whyChooseReasons" :key="reason" v-html="reason"></li>
        </ul>
      </div>

      <div class="contact-buttons">
        <a href="tel:+306949214461" class="btn btn-primary">{{ t('electricianPage.contact.callNow') }}</a>
        <a href="https://wa.me/306949214461" class="btn btn-secondary">{{ t('electricianPage.contact.whatsapp') }}</a>
      </div>

      <div class="emergency-info">
        <h2>{{ t('electricianPage.emergencyInfo.title') }}</h2>
        <p v-html="t('electricianPage.emergencyInfo.description')"></p>
        <ul>
          <li v-for="service in emergencyServicesList" :key="service" v-html="service"></li>
        </ul>
      </div>

      <div class="pricing-info">
        <h2>{{ t('electricianPage.pricing.title') }}</h2>
        <p v-html="t('electricianPage.pricing.description')"></p>
      </div>
      
      <ElectricianLinks />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ElectricianLinks from '@/components/ElectricianLinks.vue'

const { t, tm } = useI18n()

// Helper function to convert to array
const toStringArray = (value) => (Array.isArray(value) ? value : [])

// Computed properties for arrays
const servicesList = computed(() => toStringArray(tm('electricianPage.services.list')))
const serviceAreasList = computed(() => toStringArray(tm('electricianPage.serviceAreas.areas')))
const whyChooseReasons = computed(() => toStringArray(tm('electricianPage.whyChoose.reasons')))
const emergencyServicesList = computed(() => toStringArray(tm('electricianPage.emergencyInfo.services')))
</script>

<style scoped>
@import '@/assets/service-pages.css';
</style>
