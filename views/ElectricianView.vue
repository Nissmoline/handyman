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

      <section class="emergency-section" id="urgent-electrician">
        <h2>{{ t('electricianPage.urgentLanding.title') }}</h2>
        <p v-html="t('electricianPage.urgentLanding.description')"></p>
        <router-link to="/ilektrologos-24-ores" class="btn btn-primary">
          {{ t('electricianPage.urgentLanding.cta') }}
        </router-link>
      </section>
      
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

      <section
        v-if="showElectricianSeoContent && featuredElectricianPhoto"
        class="electrician-photo-section electrician-photo-feature"
        aria-labelledby="electrician-photo-feature-title"
      >
        <h2 id="electrician-photo-feature-title">{{ featuredElectricianPhoto.title }}</h2>
        <figure class="featured-electrician-photo">
          <img
            :src="featuredElectricianPhoto.src"
            :alt="featuredElectricianPhoto.alt"
            :width="featuredElectricianPhoto.width"
            :height="featuredElectricianPhoto.height"
            loading="lazy"
            decoding="async"
          >
          <figcaption>{{ featuredElectricianPhoto.caption }}</figcaption>
        </figure>
      </section>

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

      <section v-if="showElectricianSeoContent" class="electrician-seo-section" aria-labelledby="electrician-seo-title">
        <h2 id="electrician-seo-title">{{ electricianSeoContent.title }}</h2>
        <p v-for="(paragraph, index) in electricianSeoContent.intro" :key="'seo-intro-' + index" v-html="paragraph"></p>
      </section>

      <section v-if="showElectricianSeoContent" class="electrician-seo-section">
        <h2>Ηλεκτρολόγος άμεσα, κοντά μου και 24 ώρες</h2>
        <article
          v-for="section in electricianSeoContent.prioritySections"
          :key="section.title"
          class="seo-content-card"
        >
          <h3>{{ section.title }}</h3>
          <p v-for="(paragraph, index) in section.paragraphs" :key="section.title + '-p-' + index" v-html="paragraph"></p>
          <ul v-if="section.list?.length">
            <li v-for="item in section.list" :key="item">{{ item }}</li>
          </ul>
        </article>
      </section>

      <section v-if="showElectricianSeoContent" class="electrician-seo-section">
        <h2>Αναλυτικές ηλεκτρολογικές εργασίες</h2>
        <div class="seo-content-grid">
          <article
            v-for="section in electricianSeoContent.serviceSections"
            :key="section.title"
            class="seo-content-card"
          >
            <h3>{{ section.title }}</h3>
            <p v-for="(paragraph, index) in section.paragraphs" :key="section.title + '-p-' + index" v-html="paragraph"></p>
            <ul v-if="section.list?.length">
              <li v-for="item in section.list" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section
        v-if="showElectricianSeoContent && electricianGalleryPhotos.length"
        class="electrician-photo-section"
        aria-labelledby="electrician-photo-gallery-title"
      >
        <h2 id="electrician-photo-gallery-title">Φωτογραφίες ηλεκτρολογικών υπηρεσιών</h2>
        <div class="electrician-photo-grid">
          <figure
            v-for="photo in electricianGalleryPhotos"
            :key="photo.src"
            class="electrician-photo-card"
          >
            <img
              :src="photo.src"
              :alt="photo.alt"
              :width="photo.width"
              :height="photo.height"
              loading="lazy"
              decoding="async"
            >
            <figcaption>
              <strong>{{ photo.title }}</strong>
              <span>{{ photo.caption }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section v-if="showElectricianSeoContent" class="electrician-seo-section">
        <h2>Περιοχές εξυπηρέτησης για ηλεκτρολόγο στην Αττική</h2>
        <p>
          Εξυπηρετούμε μεγάλο αριθμό περιοχών, ώστε όποιος αναζητά ηλεκτρολόγο κοντά μου,
          ηλεκτρολόγο άμεσα, ηλεκτρολόγο Αθήνα ή ηλεκτρολόγο 24 ώρες να μπορεί να βρει τεχνική
          υποστήριξη στην περιοχή του.
        </p>
        <div class="area-groups">
          <article v-for="group in electricianSeoContent.areaGroups" :key="group.title" class="area-group">
            <h3>{{ group.title }}</h3>
            <p>{{ group.text }}</p>
          </article>
        </div>
      </section>

      <section v-if="showElectricianSeoContent" class="electrician-seo-section">
        <h2>Ηλεκτρολόγος ανά περιοχή</h2>
        <div class="local-area-grid">
          <article v-for="area in electricianSeoContent.localAreas" :key="area[0]" class="local-area-card">
            <h3>{{ area[0] }}</h3>
            <p>{{ area[1] }}</p>
          </article>
        </div>
      </section>

      <section v-if="showElectricianSeoContent" class="electrician-seo-section">
        <h2>{{ electricianSeoContent.reasons.title }}</h2>
        <p v-for="(paragraph, index) in electricianSeoContent.reasons.paragraphs" :key="'reason-p-' + index">
          {{ paragraph }}
        </p>
        <ul>
          <li v-for="item in electricianSeoContent.reasons.list" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section v-if="showElectricianSeoContent" class="electrician-seo-section">
        <h2>{{ electricianSeoContent.priceGuide.title }}</h2>
        <p v-for="(paragraph, index) in electricianSeoContent.priceGuide.paragraphs" :key="'price-p-' + index">
          {{ paragraph }}
        </p>
        <ul>
          <li v-for="item in electricianSeoContent.priceGuide.list" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section v-if="showElectricianSeoContent" class="electrician-seo-section faq-seo-section">
        <h2>{{ electricianSeoContent.faq.title }}</h2>
        <div class="faq-list">
          <article v-for="item in electricianSeoContent.faq.items" :key="item.question" class="faq-item">
            <h3>{{ item.question }}</h3>
            <p>{{ item.answer }}</p>
          </article>
        </div>
      </section>

      <section v-if="showElectricianSeoContent" class="electrician-seo-summary">
        <h2>{{ electricianSeoContent.summary.title }}</h2>
        <p v-for="(paragraph, index) in electricianSeoContent.summary.paragraphs" :key="'summary-p-' + index">
          {{ paragraph }}
        </p>
        <div class="related-searches" aria-label="Σχετικές αναζητήσεις ηλεκτρολόγου">
          <span v-for="search in electricianSeoContent.relatedSearches" :key="search">{{ search }}</span>
        </div>
      </section>

      <section v-if="showElectricianSeoContent" class="electrician-final-cta">
        <h2>{{ electricianSeoContent.cta.title }}</h2>
        <p>{{ electricianSeoContent.cta.text }}</p>
        <div class="contact-buttons">
          <a href="tel:+306949214461" class="btn btn-primary">{{ electricianSeoContent.cta.call }}</a>
          <router-link to="/ilektrologos-24-ores" class="btn btn-secondary">
            {{ electricianSeoContent.cta.urgent }}
          </router-link>
        </div>
      </section>
      
      <ElectricianLinks />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import ElectricianLinks from '@/components/ElectricianLinks.vue'
import { electricianSeoContent } from '@/data/electricianSeoContent'

const { t, tm, locale } = useI18n()

const toStringArray = (value) => (Array.isArray(value) ? value : [])
const stripTags = (value = '') => value.toString().replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

const servicesList = computed(() => toStringArray(tm('electricianPage.services.list')))
const serviceAreasList = computed(() => toStringArray(tm('electricianPage.serviceAreas.areas')))
const whyChooseReasons = computed(() => toStringArray(tm('electricianPage.whyChoose.reasons')))
const emergencyServicesList = computed(() => toStringArray(tm('electricianPage.emergencyInfo.services')))
const showElectricianSeoContent = computed(() => locale.value === 'el')
const featuredElectricianPhoto = computed(() => electricianSeoContent.photos[0])
const electricianGalleryPhotos = computed(() => electricianSeoContent.photos.slice(1))
const electricianPhotoUrls = computed(() =>
  electricianSeoContent.photos.map((photo) => `https://handyman24.gr${photo.src}`)
)
const seoTextDescription = computed(() => {
  if (!showElectricianSeoContent.value) return ''

  return stripTags([
    electricianSeoContent.intro[0],
    ...electricianSeoContent.summary.paragraphs,
  ].join(' ')).slice(0, 900)
})
const seoServiceNames = computed(() => {
  if (!showElectricianSeoContent.value) return []

  return [
    ...electricianSeoContent.serviceSections.map((section) => section.title),
    ...electricianSeoContent.priceGuide.list,
  ]
})

const schemaStrings = computed(() => ({
  businessName: t('electricianPage.schema.businessName'),
  serviceName: t('electricianPage.schema.serviceName'),
  serviceType: t('electricianPage.schema.serviceType'),
  priceDescription: t('electricianPage.schema.priceDescription'),
  catalogName: t('electricianPage.schema.catalogName'),
}))

const structuredData = computed(() => {
  const baseDescription = [
    t('electricianPage.intro.paragraph1'),
    t('electricianPage.intro.paragraph2'),
    t('electricianPage.intro.paragraph3'),
  ]
    .map(stripTags)
    .join(' ')
  const description = [baseDescription, seoTextDescription.value].filter(Boolean).join(' ')

  const areas = serviceAreasList.value.map(stripTags).filter(Boolean)
  const services = [...servicesList.value.map(stripTags), ...seoServiceNames.value.map(stripTags)].filter(Boolean)
  const schema = schemaStrings.value

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Electrician', 'ProfessionalService'],
    name: schema.businessName || 'HandyMan 24 – Ηλεκτρολόγος Αθήνα & Πειραιάς',
    image: ['https://handyman24.gr/metaimg.jpg', ...electricianPhotoUrls.value],
    url: 'https://handyman24.gr/electrician',
    telephone: '+30-694-9214461',
    email: 'handyman24gr@gmail.com',
    description,
    priceRange: '€€',
    areaServed: areas,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Φυλής 153, Άγιος Παντελεήμονας',
      postalCode: '11251',
      addressLocality: 'Αθήνα',
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
    image: electricianPhotoUrls.value,
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

  const graph = [localBusiness, electricianService]

  if (showElectricianSeoContent.value && electricianSeoContent.faq.items.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://handyman24.gr/electrician#faq',
      mainEntity: electricianSeoContent.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  return graph
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

.electrician-seo-section,
.electrician-seo-summary,
.electrician-final-cta {
  background: #fff;
  border: 1px solid #dbe5ef;
  border-radius: 8px;
  padding: 26px;
  margin: 34px 0;
  box-shadow: 0 8px 24px rgba(4, 72, 119, 0.07);
}

.electrician-seo-section {
  border-left: 4px solid #044877;
}

.electrician-seo-summary {
  border-left: 4px solid #269b7c;
  background: #f4fbf8;
}

.electrician-final-cta {
  border-left: 4px solid #e92127;
  background: #fff8f8;
  text-align: center;
}

.electrician-photo-section {
  background: #fff;
  border: 1px solid #dbe5ef;
  border-radius: 8px;
  padding: 24px;
  margin: 34px 0;
  box-shadow: 0 8px 24px rgba(4, 72, 119, 0.07);
}

.electrician-photo-section h2 {
  margin-top: 0;
}

.featured-electrician-photo,
.electrician-photo-card {
  margin: 0;
}

.featured-electrician-photo img,
.electrician-photo-card img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #dbe5ef;
  background: #eef5fb;
}

.featured-electrician-photo figcaption {
  margin-top: 12px;
  color: #24435d;
  font-weight: 700;
}

.electrician-photo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.electrician-photo-card {
  overflow: hidden;
  border: 1px solid #dbe5ef;
  border-radius: 8px;
  background: #f8fbfd;
}

.electrician-photo-card img {
  border: 0;
  border-bottom: 1px solid #dbe5ef;
  border-radius: 0;
}

.electrician-photo-card figcaption {
  display: grid;
  gap: 6px;
  padding: 14px 16px 16px;
}

.electrician-photo-card strong {
  color: #044877;
  font-size: 1rem;
}

.electrician-photo-card span {
  color: #36536b;
  line-height: 1.55;
}

.seo-content-card,
.area-group,
.local-area-card,
.faq-item {
  border: 1px solid #dbe5ef;
  border-radius: 8px;
  padding: 18px;
  background: #f8fbfd;
}

.seo-content-card + .seo-content-card {
  margin-top: 18px;
}

.seo-content-grid,
.area-groups,
.local-area-grid,
.faq-list {
  display: grid;
  gap: 16px;
}

.seo-content-grid,
.local-area-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.seo-content-card h3,
.area-group h3,
.local-area-card h3,
.faq-item h3 {
  margin-top: 0;
}

.related-searches {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.related-searches span {
  display: inline-flex;
  align-items: center;
  border: 1px solid #cfe0ed;
  border-radius: 999px;
  padding: 8px 12px;
  background: #fff;
  color: #164087;
  font-weight: 700;
  font-size: 0.92rem;
}

@media (max-width: 768px) {
  .electrician-seo-section,
  .electrician-seo-summary,
  .electrician-final-cta {
    padding: 20px;
  }

  .seo-content-grid,
  .local-area-grid,
  .electrician-photo-grid {
    grid-template-columns: 1fr;
  }
}
</style>

