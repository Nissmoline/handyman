<template>
  <div class="electrician-page">
    <section class="electrician-hero" aria-labelledby="electrician-page-title">
      <div class="electrician-hero__inner">
        <div class="electrician-hero__copy">
          <h1 id="electrician-page-title">{{ t('electricianPage.title') }}</h1>
          <div class="electrician-hero__intro">
            <p v-html="t('electricianPage.intro.paragraph1')"></p>
            <p v-html="t('electricianPage.intro.paragraph2')"></p>
            <p v-html="t('electricianPage.intro.paragraph3')"></p>
          </div>
          <div class="electrician-hero__buttons">
            <a href="tel:+306949214461" class="btn btn-outline">
              <Phone :size="20" aria-hidden="true" />
              {{ t('electricianPage.contact.callNow') }}
            </a>
            <a href="https://wa.me/306949214461" class="btn btn-outline">
              <MessageCircle :size="20" aria-hidden="true" />
              {{ t('electricianPage.contact.whatsapp') }}
            </a>
          </div>
        </div>

        <figure v-if="topElectricianPhoto" class="electrician-hero__photo">
          <img
            :src="topElectricianPhoto.src"
            :alt="topElectricianPhoto.alt"
            :width="topElectricianPhoto.width"
            :height="topElectricianPhoto.height"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          >
        </figure>
      </div>
    </section>

    <section class="electrician-offer" id="urgent-electrician">
      <Siren :size="28" aria-hidden="true" />
      <div class="electrician-offer__copy">
        <h2>{{ t('electricianPage.urgentLanding.title') }}</h2>
        <p v-html="t('electricianPage.urgentLanding.description')"></p>
      </div>
      <router-link to="/ilektrologos-24-ores" class="btn btn-light">
        {{ t('electricianPage.urgentLanding.cta') }}
        <ArrowRight :size="20" aria-hidden="true" />
      </router-link>
    </section>

    <section class="electrician-band electrician-band--white" id="emergency">
      <div class="electrician-section-inner electrician-emergency">
        <div class="section-heading">
          <ShieldAlert :size="34" aria-hidden="true" />
          <h2>{{ t('electricianPage.emergency.title') }}</h2>
        </div>
        <p v-html="t('electricianPage.emergency.description')"></p>
      </div>
    </section>

    <section class="electrician-band electrician-band--soft" id="installations">
      <div class="electrician-section-inner">
        <h2 class="section-title">{{ t('electricianPage.services.title') }}</h2>
        <ul class="electrician-service-grid">
          <li v-for="service in servicesList" :key="service">
            <PlugZap :size="28" aria-hidden="true" />
            <span v-html="service"></span>
          </li>
        </ul>
      </div>
    </section>

    <section class="electrician-band electrician-band--white" id="business">
      <div class="electrician-section-inner">
        <h2 class="section-title">{{ t('electricianPage.serviceAreas.title') }}</h2>
        <p class="section-intro" v-html="t('electricianPage.serviceAreas.intro')"></p>
        <ul class="electrician-area-list">
          <li v-for="area in serviceAreasList" :key="area">
            <MapPin :size="18" aria-hidden="true" />
            <span v-html="area"></span>
          </li>
        </ul>
        <p class="section-intro" v-html="t('electricianPage.serviceAreas.availability')"></p>
      </div>
    </section>

    <section class="electrician-band electrician-band--soft">
      <div class="electrician-section-inner">
        <h2 class="section-title">{{ t('electricianPage.whyChoose.title') }}</h2>
        <ul class="electrician-reason-grid">
          <li v-for="reason in whyChooseReasons" :key="reason">
            <BadgeCheck :size="28" aria-hidden="true" />
            <span v-html="reason"></span>
          </li>
        </ul>
      </div>
    </section>

    <section class="electrician-band electrician-band--white">
      <div class="electrician-section-inner electrician-info-grid">
        <div class="electrician-info-card" id="safety">
          <Clock3 :size="32" aria-hidden="true" />
          <h2>{{ t('electricianPage.emergencyInfo.title') }}</h2>
          <p v-html="t('electricianPage.emergencyInfo.description')"></p>
          <ul>
            <li v-for="service in emergencyServicesList" :key="service" v-html="service"></li>
          </ul>
        </div>

        <div class="electrician-info-card">
          <CircleDollarSign :size="32" aria-hidden="true" />
          <h2>{{ t('electricianPage.pricing.title') }}</h2>
          <p v-html="t('electricianPage.pricing.description')"></p>
        </div>
      </div>
    </section>

    <section class="electrician-cta-strip">
      <div class="contact-buttons">
        <a href="tel:+306949214461" class="btn btn-primary">
          <Phone :size="20" aria-hidden="true" />
          {{ t('electricianPage.contact.callNow') }}
        </a>
        <a href="https://wa.me/306949214461" class="btn btn-secondary">
          <MessageCircle :size="20" aria-hidden="true" />
          {{ t('electricianPage.contact.whatsapp') }}
        </a>
      </div>
    </section>

    <section
      v-if="showElectricianSeoContent && featuredElectricianPhoto"
      class="electrician-photo-section electrician-photo-feature"
      aria-labelledby="electrician-photo-feature-title"
    >
      <div class="electrician-section-inner">
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
      </div>
    </section>

    <section v-if="showElectricianSeoContent" class="electrician-seo-section" aria-labelledby="electrician-seo-title">
      <div class="electrician-section-inner">
        <h2 id="electrician-seo-title">{{ electricianSeoContent.title }}</h2>
        <p v-for="(paragraph, index) in electricianSeoContent.intro" :key="'seo-intro-' + index" v-html="paragraph"></p>
      </div>
    </section>

    <section v-if="showElectricianSeoContent" class="electrician-seo-section electrician-seo-section--soft">
      <div class="electrician-section-inner">
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
      </div>
    </section>

    <section v-if="showElectricianSeoContent" class="electrician-seo-section">
      <div class="electrician-section-inner">
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
      </div>
    </section>

    <section
      v-if="showElectricianSeoContent && electricianGalleryPhotos.length"
      class="electrician-photo-section"
      aria-labelledby="electrician-photo-gallery-title"
    >
      <div class="electrician-section-inner">
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
      </div>
    </section>

    <section v-if="showElectricianSeoContent" class="electrician-seo-section electrician-seo-section--soft">
      <div class="electrician-section-inner">
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
      </div>
    </section>

    <section v-if="showElectricianSeoContent" class="electrician-seo-section">
      <div class="electrician-section-inner">
        <h2>Ηλεκτρολόγος ανά περιοχή</h2>
        <div class="local-area-grid">
          <article v-for="area in electricianSeoContent.localAreas" :key="area[0]" class="local-area-card">
            <h3>{{ area[0] }}</h3>
            <p>{{ area[1] }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-if="showElectricianSeoContent" class="electrician-seo-section electrician-seo-section--soft">
      <div class="electrician-section-inner">
        <h2>{{ electricianSeoContent.reasons.title }}</h2>
        <p v-for="(paragraph, index) in electricianSeoContent.reasons.paragraphs" :key="'reason-p-' + index">
          {{ paragraph }}
        </p>
        <ul>
          <li v-for="item in electricianSeoContent.reasons.list" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section v-if="showElectricianSeoContent" class="electrician-seo-section">
      <div class="electrician-section-inner">
        <h2>{{ electricianSeoContent.priceGuide.title }}</h2>
        <p v-for="(paragraph, index) in electricianSeoContent.priceGuide.paragraphs" :key="'price-p-' + index">
          {{ paragraph }}
        </p>
        <ul>
          <li v-for="item in electricianSeoContent.priceGuide.list" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section v-if="showElectricianSeoContent" class="electrician-seo-section faq-seo-section electrician-seo-section--soft">
      <div class="electrician-section-inner">
        <h2>{{ electricianSeoContent.faq.title }}</h2>
        <div class="faq-list">
          <article v-for="item in electricianSeoContent.faq.items" :key="item.question" class="faq-item">
            <h3>{{ item.question }}</h3>
            <p>{{ item.answer }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-if="showElectricianSeoContent" class="electrician-seo-summary">
      <div class="electrician-section-inner">
        <h2>{{ electricianSeoContent.summary.title }}</h2>
        <p v-for="(paragraph, index) in electricianSeoContent.summary.paragraphs" :key="'summary-p-' + index">
          {{ paragraph }}
        </p>
        <div class="related-searches" aria-label="Σχετικές αναζητήσεις ηλεκτρολόγου">
          <span v-for="search in electricianSeoContent.relatedSearches" :key="search">{{ search }}</span>
        </div>
      </div>
    </section>

    <section v-if="showElectricianSeoContent" class="electrician-final-cta">
      <div class="electrician-section-inner">
        <h2>{{ electricianSeoContent.cta.title }}</h2>
        <p>{{ electricianSeoContent.cta.text }}</p>
        <div class="contact-buttons">
          <a href="tel:+306949214461" class="btn btn-primary">
            <Phone :size="20" aria-hidden="true" />
            {{ electricianSeoContent.cta.call }}
          </a>
          <router-link to="/ilektrologos-24-ores" class="btn btn-secondary">
            {{ electricianSeoContent.cta.urgent }}
            <ArrowRight :size="20" aria-hidden="true" />
          </router-link>
        </div>
      </div>
    </section>

    <div class="electrician-links-wrap">
      <ElectricianLinks />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import {
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  PlugZap,
  ShieldAlert,
  Siren,
} from 'lucide-vue-next'
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
const topElectricianPhoto = computed(() => electricianSeoContent.photos.find((photo) => photo.src.includes('Electrichandyman8')))
const featuredElectricianPhoto = computed(() => electricianSeoContent.photos[0])
const electricianGalleryPhotos = computed(() =>
  electricianSeoContent.photos.slice(1).filter((photo) => photo.src !== topElectricianPhoto.value?.src)
)
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
.electrician-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: #f8fafb;
  color: #243648;
}

.electrician-hero {
  width: 100%;
  background: #044877;
  color: #fff;
}

.electrician-hero__inner {
  width: 100%;
  max-width: 1060px;
  margin: 0 auto;
  padding: 64px 40px 92px;
  display: flex;
  align-items: stretch;
  gap: 40px;
  box-sizing: border-box;
}

.electrician-hero__copy {
  flex: 1.55;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.electrician-hero h1 {
  margin: 0 0 24px;
  font-size: 2.65rem;
  line-height: 1.08;
  font-weight: 800;
  color: #fff;
  overflow-wrap: anywhere;
}

.electrician-hero__intro {
  display: grid;
  gap: 14px;
  margin-bottom: 34px;
  font-size: 1.08rem;
  line-height: 1.5;
}

.electrician-hero__intro p {
  margin: 0;
  overflow-wrap: anywhere;
}

.electrician-hero__buttons,
.contact-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.electrician-hero__photo {
  flex: 0 1 420px;
  align-self: flex-end;
  margin: 0 0 -28px;
  border-radius: 14px;
  overflow: hidden;
  background: #d6e6f1;
  box-shadow: 0 8px 22px rgba(7, 28, 46, 0.22);
  aspect-ratio: 1 / 1;
}

.electrician-hero__photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.electrician-offer {
  position: relative;
  z-index: 2;
  max-width: 860px;
  width: calc(100% - 32px);
  margin: -60px auto 0;
  padding: 30px 32px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  color: #fff;
  background: #c1121c;
  border-radius: 18px;
  box-shadow: 0 6px 30px rgba(233, 33, 39, 0.16);
  box-sizing: border-box;
}

.electrician-offer h2 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  line-height: 1.22;
  color: #fff;
  font-weight: 900;
  text-transform: uppercase;
}

.electrician-offer p {
  margin: 0;
  line-height: 1.55;
}

.electrician-band,
.electrician-photo-section,
.electrician-seo-section,
.electrician-seo-summary,
.electrician-final-cta {
  padding: 58px 20px;
}

.electrician-band--white,
.electrician-seo-section,
.electrician-photo-section {
  background: #fff;
}

.electrician-band--soft,
.electrician-seo-section--soft {
  background: #f8fafb;
}

.electrician-section-inner {
  width: 100%;
  max-width: 1060px;
  margin: 0 auto;
}

.section-title,
.electrician-section-inner > h2,
.electrician-info-card h2 {
  margin: 0 0 22px;
  color: #044877;
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 800;
  text-align: center;
}

.section-intro,
.electrician-section-inner > p {
  max-width: 860px;
  margin: 0 auto 22px;
  color: #263241;
  font-size: 1.06rem;
  line-height: 1.65;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
  color: #e92127;
}

.section-heading h2 {
  margin: 0;
  color: #044877;
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 800;
  text-align: center;
}

.electrician-emergency {
  max-width: 940px;
  padding: 28px;
  border: 1px solid #f0c8ca;
  border-radius: 8px;
  background: #fff8f8;
  box-shadow: 0 8px 24px rgba(4, 72, 119, 0.07);
  box-sizing: border-box;
}

.electrician-emergency p {
  margin: 0;
  color: #263241;
  font-size: 1.08rem;
  line-height: 1.65;
  text-align: center;
}

.electrician-service-grid,
.electrician-reason-grid,
.electrician-area-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.electrician-service-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.electrician-service-grid li,
.electrician-reason-grid li,
.electrician-info-card,
.seo-content-card,
.area-group,
.local-area-card,
.faq-item {
  border: 1px solid rgba(4, 72, 119, 0.1);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(22, 54, 77, 0.14);
}

.electrician-service-grid li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px;
  color: #233245;
  font-size: 1rem;
  line-height: 1.55;
}

.electrician-service-grid svg,
.electrician-reason-grid svg,
.electrician-info-card > svg {
  flex: 0 0 auto;
  color: #164087;
}

.electrician-area-list {
  max-width: 860px;
  margin: 0 auto 22px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.electrician-area-list li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 5px;
  background: #fff;
  color: #044877;
  font-weight: 700;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.electrician-area-list svg {
  color: #269b7c;
}

.electrician-reason-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.electrician-reason-grid li {
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 18px;
  font-size: 0.98rem;
  line-height: 1.5;
}

.electrician-info-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 22px;
}

.electrician-info-card {
  padding: 26px;
}

.electrician-info-card h2 {
  margin-top: 14px;
  font-size: 1.55rem;
  text-align: left;
}

.electrician-info-card p,
.electrician-info-card li {
  color: #263241;
  font-size: 1.02rem;
  line-height: 1.6;
}

.electrician-info-card ul,
.electrician-seo-section ul,
.seo-content-card ul {
  margin: 16px 0 0;
  padding-left: 22px;
}

.electrician-info-card li,
.electrician-seo-section li,
.seo-content-card li {
  margin-bottom: 10px;
}

.electrician-info-card :deep(a) {
  color: #0b6ea8;
  font-weight: 700;
}

.electrician-cta-strip {
  padding: 26px 20px 58px;
  background: #fff;
}

.electrician-cta-strip .contact-buttons,
.electrician-final-cta .contact-buttons {
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 190px;
  min-height: 48px;
  padding: 12px 18px;
  border-radius: 5px;
  border: 2px solid transparent;
  color: inherit;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.15;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.19s ease, border-color 0.19s ease, color 0.19s ease, transform 0.19s ease, box-shadow 0.19s ease;
  box-sizing: border-box;
  white-space: normal;
}

.btn:hover,
.btn:focus-visible {
  transform: translateY(-2px);
  outline: none;
}

.btn-outline {
  color: #fff;
  border-color: #fff;
}

.btn-outline:hover,
.btn-outline:focus-visible,
.btn-light {
  background: #fff;
  color: #044877;
}

.btn-light {
  border-color: #fff;
}

.btn-light:hover,
.btn-light:focus-visible {
  background: transparent;
  color: #fff;
}

.btn-primary {
  color: #fff;
  background-color: #e92127;
  border-color: #e92127;
  box-shadow: 0 10px 24px rgba(233, 33, 39, 0.22);
}

.btn-primary:hover,
.btn-primary:focus-visible {
  background-color: #c1121c;
  border-color: #c1121c;
}

.btn-secondary {
  color: #fff;
  background-color: #25d366;
  border-color: #25d366;
  box-shadow: 0 10px 24px rgba(37, 211, 102, 0.22);
}

.btn-secondary:hover,
.btn-secondary:focus-visible {
  background-color: #128c7e;
  border-color: #128c7e;
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
  line-height: 1.5;
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

.electrician-seo-section h2,
.electrician-photo-section h2,
.electrician-seo-summary h2,
.electrician-final-cta h2 {
  color: #044877;
}

.electrician-seo-section p,
.electrician-seo-summary p,
.electrician-final-cta p,
.seo-content-card p,
.area-group p,
.local-area-card p,
.faq-item p {
  color: #263241;
  font-size: 1.03rem;
  line-height: 1.65;
}

.seo-content-card,
.area-group,
.local-area-card,
.faq-item {
  padding: 18px;
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
  color: #164087;
  line-height: 1.3;
}

.electrician-seo-summary {
  background: #f4fbf8;
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

.electrician-final-cta {
  color: #fff;
  background: #044877;
  text-align: center;
}

.electrician-final-cta h2,
.electrician-final-cta p {
  color: #fff;
}

.electrician-links-wrap {
  padding: 28px 20px 58px;
  background: #fff;
}

@media (max-width: 1060px) {
  .electrician-hero__inner {
    padding: 48px 6vw 86px;
  }

  .electrician-service-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .electrician-reason-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .electrician-hero__inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 28px 16px 74px;
  }

  .electrician-hero h1 {
    font-size: 2rem;
  }

  .electrician-hero__intro {
    font-size: 1rem;
  }

  .electrician-hero__buttons,
  .contact-buttons {
    justify-content: center;
  }

  .electrician-hero__photo {
    width: 100%;
    max-width: 493px;
    margin: 0;
    flex-basis: auto;
  }

  .electrician-offer {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    margin-top: -38px;
    padding: 22px 18px;
    border-radius: 14px;
  }

  .electrician-band,
  .electrician-photo-section,
  .electrician-seo-section,
  .electrician-seo-summary,
  .electrician-final-cta {
    padding: 44px 16px;
  }

  .section-title,
  .electrician-section-inner > h2,
  .section-heading h2 {
    font-size: 1.75rem;
  }

  .section-heading {
    flex-direction: column;
  }

  .electrician-info-grid,
  .seo-content-grid,
  .local-area-grid,
  .electrician-photo-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .electrician-hero {
    margin-top: -12px;
  }

  .electrician-hero__inner {
    padding: 18px 12px 54px;
  }

  .electrician-hero h1 {
    font-size: 1.6rem;
    line-height: 1.14;
  }

  .electrician-hero__intro {
    gap: 10px;
    margin-bottom: 24px;
    font-size: 0.94rem;
  }

  .electrician-service-grid,
  .electrician-reason-grid {
    grid-template-columns: 1fr;
  }

  .electrician-service-grid li,
  .electrician-info-card,
  .seo-content-card,
  .area-group,
  .local-area-card,
  .faq-item {
    padding: 16px;
  }

  .electrician-reason-grid li {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
  }

  .electrician-area-list {
    justify-content: stretch;
  }

  .electrician-area-list li {
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
  }

  .btn {
    width: 100%;
    max-width: 320px;
    min-width: 0;
    padding: 12px 16px;
  }

  .electrician-offer {
    width: calc(100% - 24px);
    margin-top: -30px;
  }
}
</style>
