<template>
  <main class="electrician-area-page">
    <section class="area-hero" aria-labelledby="area-electrician-title">
      <div class="area-hero__inner">
        <div class="area-hero__copy">
          <p class="area-eyebrow">{{ area.region }}</p>
          <h1 id="area-electrician-title">{{ area.headline }}</h1>
          <p>{{ area.metaDescription }}</p>
          <div class="area-hero__actions">
            <a href="tel:+306949214461" class="btn btn-primary">
              <Phone :size="20" aria-hidden="true" />
              Καλέστε Ηλεκτρολόγο
            </a>
            <a href="https://wa.me/306949214461" class="btn btn-secondary">
              <MessageCircle :size="20" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>

        <figure class="area-hero__photo">
          <img
            src="/photos/Electrichandyman8.jpg"
            :alt="`${area.title} για ηλεκτρολογικές βλάβες, πίνακες και πρίζες`"
            width="1672"
            height="941"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          >
        </figure>
      </div>
    </section>

    <section class="area-band area-band--white">
      <div class="area-inner">
        <h2>{{ area.title }} για κατοικίες και επαγγελματικούς χώρους</h2>
        <p>{{ area.copy }}</p>
        <p>
          Η εξυπηρέτηση αφορά προγραμματισμένες εργασίες και επείγουσες ανάγκες, με έμφαση
          στην ασφαλή διάγνωση, στη σωστή σειρά ελέγχου και στην καθαρή ενημέρωση πριν από την εργασία.
        </p>
      </div>
    </section>

    <section class="area-band area-band--soft">
      <div class="area-inner">
        <h2>Ηλεκτρολογικές εργασίες σε {{ area.name }}</h2>
        <div class="area-service-grid">
          <article v-for="service in area.services" :key="service" class="area-card">
            <PlugZap :size="22" aria-hidden="true" />
            <p>{{ service }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="area-band area-band--white">
      <div class="area-inner area-two-col">
        <div>
          <h2>Συχνές ανάγκες στην περιοχή</h2>
          <ul class="area-check-list">
            <li v-for="item in area.focus" :key="item">
              <BadgeCheck :size="20" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>

        <div>
          <h2>Κοντινές περιοχές</h2>
          <p>
            Για αναζητήσεις τύπου “ηλεκτρολόγος κοντά μου”, η περιοχή συνδέεται πρακτικά με:
          </p>
          <div class="area-chip-list">
            <span v-for="place in area.nearby" :key="place">{{ place }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="area-band area-band--soft">
      <div class="area-inner">
        <h2>Σχετικές αναζητήσεις</h2>
        <div class="area-searches" aria-label="Σχετικές αναζητήσεις ηλεκτρολόγου">
          <span v-for="term in area.searchTerms" :key="term">{{ term }}</span>
        </div>
      </div>
    </section>

    <section class="area-band area-band--white">
      <div class="area-inner">
        <h2>Ηλεκτρολόγος σε άλλες περιοχές</h2>
        <div class="area-links-grid">
          <router-link
            v-for="relatedArea in relatedAreas"
            :key="relatedArea.slug"
            :to="relatedArea.path"
            class="area-link-card"
          >
            <MapPin :size="18" aria-hidden="true" />
            <span>{{ relatedArea.title }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <section class="area-band area-band--soft">
      <div class="area-inner">
        <h2>Συχνές ερωτήσεις για {{ area.title }}</h2>
        <div class="area-faq-list">
          <article v-for="item in faqItems" :key="item.question" class="area-card">
            <h3>{{ item.question }}</h3>
            <p>{{ item.answer }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="area-final-cta">
      <div class="area-inner">
        <h2>Χρειάζεστε {{ area.title }};</h2>
        <p>
          Καλέστε για ηλεκτρολογική βλάβη, πίνακα, πρίζα, φωτισμό, σύνδεση συσκευής ή προγραμματισμένη
          ηλεκτρολογική εργασία σε {{ area.name }}.
        </p>
        <div class="area-hero__actions">
          <a href="tel:+306949214461" class="btn btn-primary">
            <Phone :size="20" aria-hidden="true" />
            Καλέστε τώρα
          </a>
          <router-link to="/electrician" class="btn btn-light">
            Όλες οι υπηρεσίες
            <ArrowRight :size="20" aria-hidden="true" />
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { ArrowRight, BadgeCheck, MapPin, MessageCircle, Phone, PlugZap } from 'lucide-vue-next'
import {
  createElectricianAreaFaq,
  getElectricianAreaBySlug,
  getRelatedElectricianAreas,
} from '@/data/electricianAreas'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const area = computed(() => getElectricianAreaBySlug(props.slug))
const relatedAreas = computed(() => getRelatedElectricianAreas(area.value, 10))
const faqItems = computed(() => createElectricianAreaFaq(area.value))
const canonicalUrl = computed(() => `https://handyman24.gr${area.value.path}`)

const structuredData = computed(() => [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Αρχική', item: 'https://handyman24.gr/' },
      { '@type': 'ListItem', position: 2, name: 'Ηλεκτρολόγος', item: 'https://handyman24.gr/electrician' },
      { '@type': 'ListItem', position: 3, name: area.value.title, item: canonicalUrl.value },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Electrician', 'ProfessionalService'],
    '@id': 'https://handyman24.gr/#localbusiness',
    name: 'HandyMan 24 - Ηλεκτρολόγος Αθήνα',
    url: 'https://handyman24.gr/',
    image: ['https://handyman24.gr/metaimg.jpg', 'https://handyman24.gr/photos/Electrichandyman8.jpg'],
    telephone: '+30-694-9214461',
    email: 'handyman24gr@gmail.com',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Φυλής 153, Άγιος Παντελεήμονας',
      postalCode: '11251',
      addressLocality: 'Αθήνα',
      addressRegion: 'Αττική',
      addressCountry: 'GR',
    },
    areaServed: [area.value.name, area.value.region, 'Αθήνα', 'Αττική'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl.value}#service`,
    name: `${area.value.title} 24 ώρες`,
    serviceType: `Ηλεκτρολογικές υπηρεσίες σε ${area.value.name}`,
    description: area.value.metaDescription,
    url: canonicalUrl.value,
    image: 'https://handyman24.gr/photos/Electrichandyman8.jpg',
    areaServed: [area.value.name, area.value.region, 'Αττική'],
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://handyman24.gr/#localbusiness',
      name: 'HandyMan 24',
      telephone: '+30-694-9214461',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Υπηρεσίες - ${area.value.title}`,
      itemListElement: area.value.services.map((service, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: service,
        },
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl.value}#faq`,
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
  title: area.value.metaTitle,
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  meta: [
    { name: 'description', content: area.value.metaDescription },
    { property: 'og:title', content: area.value.metaTitle },
    { property: 'og:description', content: area.value.metaDescription },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:image', content: 'https://handyman24.gr/metaimg.jpg' },
    { name: 'twitter:title', content: area.value.metaTitle },
    { name: 'twitter:description', content: area.value.metaDescription },
  ],
  script: [
    {
      key: `electrician-area-${area.value.slug}-jsonld`,
      type: 'application/ld+json',
      children: JSON.stringify(structuredData.value),
    },
  ],
}))
</script>

<style scoped>
.electrician-area-page {
  width: 100%;
  min-height: 100vh;
  background: #f8fafb;
  color: #243648;
  overflow-x: hidden;
}

.area-hero {
  background: #044877;
  color: #fff;
}

.area-hero__inner {
  width: 100%;
  max-width: 1060px;
  margin: 0 auto;
  padding: 58px 40px 82px;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
  align-items: center;
  gap: 38px;
  box-sizing: border-box;
}

.area-eyebrow {
  margin: 0 0 12px;
  color: #cde6f7;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0;
}

.area-hero h1 {
  margin: 0 0 18px;
  color: #fff;
  font-size: 2.7rem;
  line-height: 1.08;
  font-weight: 900;
  overflow-wrap: anywhere;
}

.area-hero p {
  margin: 0 0 26px;
  color: #f4fbff;
  font-size: 1.09rem;
  line-height: 1.58;
}

.area-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.area-hero__photo {
  margin: 0 0 -28px;
  border-radius: 14px;
  overflow: hidden;
  background: #d6e6f1;
  box-shadow: 0 8px 22px rgba(7, 28, 46, 0.22);
  aspect-ratio: 1 / 1;
}

.area-hero__photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.area-band {
  padding: 58px 20px;
}

.area-band--white {
  background: #fff;
}

.area-band--soft {
  background: #f8fafb;
}

.area-inner {
  width: 100%;
  max-width: 1060px;
  margin: 0 auto;
}

.area-inner > h2,
.area-two-col h2,
.area-final-cta h2 {
  margin: 0 0 22px;
  color: #044877;
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 850;
  text-align: center;
}

.area-inner > p,
.area-two-col p,
.area-final-cta p {
  max-width: 860px;
  margin: 0 auto 20px;
  color: #263241;
  font-size: 1.06rem;
  line-height: 1.66;
}

.area-service-grid,
.area-links-grid,
.area-faq-list {
  display: grid;
  gap: 16px;
}

.area-service-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.area-card,
.area-link-card {
  border: 1px solid rgba(4, 72, 119, 0.1);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(22, 54, 77, 0.14);
}

.area-card {
  padding: 18px;
}

.area-service-grid .area-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.area-card svg {
  flex: 0 0 auto;
  color: #164087;
  margin-top: 2px;
}

.area-card p,
.area-card li {
  margin: 0;
  color: #263241;
  font-size: 1.02rem;
  line-height: 1.62;
}

.area-card h3 {
  margin: 0 0 10px;
  color: #164087;
  font-size: 1.16rem;
  line-height: 1.3;
}

.area-two-col {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}

.area-check-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

.area-check-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #263241;
  font-size: 1.03rem;
  line-height: 1.55;
}

.area-check-list svg {
  flex: 0 0 auto;
  color: #269b7c;
  margin-top: 2px;
}

.area-chip-list,
.area-searches {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.area-chip-list span,
.area-searches span {
  display: inline-flex;
  align-items: center;
  border: 1px solid #cfe0ed;
  border-radius: 999px;
  padding: 8px 12px;
  background: #fff;
  color: #164087;
  font-weight: 750;
  font-size: 0.94rem;
  line-height: 1.25;
}

.area-links-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.area-link-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  color: #044877;
  font-weight: 800;
  text-decoration: none;
  transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.area-link-card:hover,
.area-link-card:focus-visible {
  border-color: #044877;
  transform: translateY(-2px);
  outline: none;
}

.area-faq-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.area-final-cta {
  padding: 58px 20px;
  background: #044877;
  color: #fff;
  text-align: center;
}

.area-final-cta h2,
.area-final-cta p {
  color: #fff;
}

.area-final-cta .area-hero__actions {
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
  border: 2px solid transparent;
  border-radius: 5px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.15;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.19s ease, border-color 0.19s ease, color 0.19s ease, transform 0.19s ease;
  box-sizing: border-box;
}

.btn:hover,
.btn:focus-visible {
  transform: translateY(-2px);
  outline: none;
}

.btn-primary {
  color: #fff;
  background: #e92127;
  border-color: #e92127;
}

.btn-primary:hover,
.btn-primary:focus-visible {
  background: #c1121c;
  border-color: #c1121c;
}

.btn-secondary {
  color: #fff;
  background: #25d366;
  border-color: #25d366;
}

.btn-secondary:hover,
.btn-secondary:focus-visible {
  background: #128c7e;
  border-color: #128c7e;
}

.btn-light {
  color: #044877;
  background: #fff;
  border-color: #fff;
}

.btn-light:hover,
.btn-light:focus-visible {
  color: #fff;
  background: transparent;
}

@media (max-width: 820px) {
  .area-hero__inner {
    grid-template-columns: 1fr;
    padding: 32px 16px 64px;
    text-align: center;
  }

  .area-hero__actions {
    justify-content: center;
  }

  .area-hero__photo {
    width: 100%;
    max-width: 493px;
    margin: 0 auto;
  }

  .area-hero h1 {
    font-size: 2rem;
  }

  .area-band,
  .area-final-cta {
    padding: 44px 16px;
  }

  .area-inner > h2,
  .area-two-col h2,
  .area-final-cta h2 {
    font-size: 1.72rem;
  }

  .area-service-grid,
  .area-two-col,
  .area-links-grid,
  .area-faq-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .area-hero__inner {
    padding: 20px 12px 50px;
  }

  .area-hero h1 {
    font-size: 1.58rem;
  }

  .area-hero p {
    font-size: 0.96rem;
  }

  .btn {
    width: 100%;
    max-width: 320px;
    min-width: 0;
  }

  .area-card,
  .area-link-card {
    padding: 16px;
  }
}
</style>
