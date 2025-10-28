<template>
  <div class="service-page">
    <div class="service-container">
      <h1>{{ t('electricianPage.title') }}</h1>
      
      <div class="service-intro">
        <p v-html="t('electricianPage.intro.paragraph1')"></p>
        <p v-html="t('electricianPage.intro.paragraph2')"></p>
        <p v-html="t('electricianPage.intro.paragraph3')"></p>
      </div>

      <div class="emergency-section" id="emergency">
        <h2>{{ t('electricianPage.emergency.title') }}</h2>
        <p v-html="t('electricianPage.emergency.description')"></p>
      </div>
      
      <section id="installations">
        <h2>{{ t('electricianPage.services.title') }}</h2>
        <ul>
          <li v-for="service in servicesList" :key="service" v-html="service"></li>
        </ul>
      </section>

      <div class="service-areas" id="business">
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

      <div class="emergency-info" id="safety">
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
import { useHead } from '@vueuse/head'
import ElectricianLinks from '@/components/ElectricianLinks.vue'

const { t, tm } = useI18n()

const toStringArray = (value) => (Array.isArray(value) ? value : [])
const stripTags = (value = '') => value.toString().replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

const servicesList = computed(() => toStringArray(tm('electricianPage.services.list')))
const serviceAreasList = computed(() => toStringArray(tm('electricianPage.serviceAreas.areas')))
const whyChooseReasons = computed(() => toStringArray(tm('electricianPage.whyChoose.reasons')))
const emergencyServicesList = computed(() => toStringArray(tm('electricianPage.emergencyInfo.services')))

const schemaStrings = computed(() => ({
  businessName: t('electricianPage.schema.businessName'),
  serviceName: t('electricianPage.schema.serviceName'),
  serviceType: t('electricianPage.schema.serviceType'),
  priceDescription: t('electricianPage.schema.priceDescription'),
  catalogName: t('electricianPage.schema.catalogName'),
}))

const structuredData = computed(() => {
  const description = [
    t('electricianPage.intro.paragraph1'),
    t('electricianPage.intro.paragraph2'),
    t('electricianPage.intro.paragraph3'),
  ]
    .map(stripTags)
    .join(' ')

  const areas = serviceAreasList.value.map(stripTags).filter(Boolean)
  const services = servicesList.value.map(stripTags).filter(Boolean)
  const schema = schemaStrings.value

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Electrician', 'ProfessionalService'],
    name: schema.businessName || 'HandyMan 24 – Ηλεκτρολόγος Αθήνα & Πειραιάς',
    image: 'https://handyman24.gr/logoico.svg',
    url: 'https://handyman24.gr/electrician',
    telephone: '+30-694-9214461',
    email: 'handyman24gr@gmail.com',
    description,
    priceRange: '€€',
    areaServed: areas,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Πλ. Ιπποδαμείας 8, Γραφείο Δ8',
      postalCode: '18531',
      addressLocality: 'Πειραιάς',
      addressRegion: 'Αττική',
      addressCountry: 'GR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: [
      'https://www.facebook.com/share/1FyUjq1AGd/',
      'https://instagram.com/handyman24.gr',
      'https://wa.me/306949214461',
    ],
  }

  const electricianService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: schema.serviceName || 'Επείγον Ηλεκτρολόγος Αθήνα & Πειραιάς 24/7',
    serviceType: schema.serviceType || 'Ηλεκτρολογικές υπηρεσίες',
    areaServed: areas,
    provider: {
      '@type': 'LocalBusiness',
      name: 'HandyMan 24',
      telephone: '+30-694-9214461',
      address: localBusiness.address,
    },
    description,
    offers: {
      '@type': 'Offer',
      url: 'https://handyman24.gr/electrician',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'EUR',
        description: schema.priceDescription || 'Διαφανείς τιμές ηλεκτρολόγου Αθήνα & Πειραιάς – ενημέρωση πριν την εργασία',
      },
    },
    hasOfferCatalog: services.length
      ? {
          '@type': 'OfferCatalog',
          name: schema.catalogName || 'Υπηρεσίες Ηλεκτρολόγου',
          itemListElement: services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service,
            },
          })),
        }
      : undefined,
  }

  return [localBusiness, electricianService]
})

useHead(() => ({
  script: [
    {
      key: 'electrician-jsonld',
      type: 'application/ld+json',
      children: JSON.stringify(structuredData.value),
    },
  ],
}))
</script>

<style scoped>
@import '@/assets/service-pages.css';
</style>

