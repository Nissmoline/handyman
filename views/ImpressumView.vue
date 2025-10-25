<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const toArray = (value) => (Array.isArray(value) ? value : [])

const heroHighlights = computed(() => toArray(tm('impressum.hero.highlights')))
const infoCards = computed(() => toArray(tm('impressum.cards')))
const detailSections = computed(() => toArray(tm('impressum.sections')))
const legalParagraphs = computed(() => toArray(tm('impressum.legal.paragraphs')))
const legalBullets = computed(() => toArray(tm('impressum.legal.bullets')))

const contactBlock = computed(() => {
  const value = tm('impressum.contact')
  return value && typeof value === 'object' ? value : {}
})
</script>

<template>
  <main class="impressum-page">
    <section class="impressum-hero">
      <p class="impressum-eyebrow">{{ t('impressum.hero.eyebrow') }}</p>
      <h1>{{ t('impressum.hero.title') }}</h1>
      <p class="impressum-subtitle">{{ t('impressum.hero.subtitle') }}</p>

      <ul class="impressum-highlights" v-if="heroHighlights.length">
        <li v-for="(item, index) in heroHighlights" :key="'highlight-' + index" v-html="item"></li>
      </ul>

      <p class="impressum-updated">{{ t('impressum.lastUpdated') }}</p>
    </section>

    <section class="impressum-cards" aria-label="Key legal information">
      <article v-for="card in infoCards" :key="card.title" class="info-card">
        <div class="info-card__header">
          <h2>{{ card.title }}</h2>
          <p v-if="card.description">{{ card.description }}</p>
        </div>

        <dl v-if="card.rows?.length" class="info-card__list">
          <div v-for="row in card.rows" :key="row.label" class="info-card__row">
            <dt>{{ row.label }}</dt>
            <dd>
              <a
                v-if="row.href"
                :href="row.href"
                :target="row.target || (row.type === 'link' ? '_blank' : undefined)"
                :rel="row.rel || (row.type === 'link' ? 'noopener noreferrer' : undefined)"
              >
                {{ row.value }}
              </a>
              <span v-else>{{ row.value }}</span>
            </dd>
          </div>
        </dl>

        <p v-if="card.note" class="info-card__note">{{ card.note }}</p>
      </article>
    </section>

    <section class="impressum-details">
      <article v-for="section in detailSections" :key="section.title" class="detail-block">
        <h3>{{ section.title }}</h3>
        <p
          v-for="(paragraph, index) in toArray(section.paragraphs)"
          :key="section.title + '-paragraph-' + index"
          v-html="paragraph"
        />
        <ul v-if="section.bullets?.length">
          <li v-for="(bullet, index) in section.bullets" :key="section.title + '-bullet-' + index" v-html="bullet"></li>
        </ul>
      </article>
    </section>

    <section class="impressum-legal">
      <div class="legal-card">
        <h2>{{ t('impressum.legal.title') }}</h2>
        <p v-for="(paragraph, index) in legalParagraphs" :key="'legal-paragraph-' + index" v-html="paragraph" />
        <ul v-if="legalBullets.length">
          <li v-for="(bullet, index) in legalBullets" :key="'legal-bullet-' + index" v-html="bullet"></li>
        </ul>
      </div>
    </section>

    <section class="impressum-contact">
      <div>
        <p class="impressum-eyebrow">{{ t('impressum.contact.eyebrow') }}</p>
        <h2>{{ contactBlock.title }}</h2>
        <p>{{ contactBlock.subtitle }}</p>
      </div>
      <div class="contact-actions">
        <a
          class="contact-link contact-link--primary"
          :href="contactBlock.phoneHref"
          rel="nofollow"
        >
          <span>{{ contactBlock.phoneLabel }}</span>
          <strong>{{ contactBlock.phoneValue }}</strong>
        </a>
        <a
          class="contact-link contact-link--secondary"
          :href="contactBlock.emailHref"
        >
          <span>{{ contactBlock.emailLabel }}</span>
          <strong>{{ contactBlock.emailValue }}</strong>
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.impressum-page {
  padding: 120px 20px 80px;
  max-width: 1100px;
  margin: 0 auto;
  color: #1f2a37;
}

.impressum-hero {
  text-align: center;
  margin-bottom: 48px;
}

.impressum-eyebrow {
  text-transform: uppercase;
  font-size: 0.82rem;
  letter-spacing: 0.3em;
  color: #269b7c;
  font-weight: 700;
  margin-bottom: 14px;
}

.impressum-hero h1 {
  font-size: clamp(2rem, 3vw, 2.75rem);
  color: #044877;
  margin-bottom: 16px;
}

.impressum-subtitle {
  font-size: 1.16rem;
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.6;
  color: #3b4857;
}

.impressum-highlights {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin: 28px auto 0;
  padding: 0;
  list-style: none;
}

.impressum-highlights li {
  background: #edf6ff;
  border: 1px solid #cfe4ff;
  color: #0b395f;
  border-radius: 999px;
  padding: 10px 18px;
  font-size: 0.95rem;
}

.impressum-updated {
  margin-top: 24px;
  color: #65748b;
  font-size: 0.95rem;
}

.impressum-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.info-card {
  border: 1px solid #dbe5ef;
  border-radius: 18px;
  padding: 28px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(4, 72, 119, 0.08);
}

.info-card__header h2 {
  margin: 0 0 10px;
  font-size: 1.3rem;
  color: #04385f;
}

.info-card__header p {
  margin: 0 0 16px;
  color: #4c5a6b;
  line-height: 1.5;
}

.info-card__list {
  margin: 0;
  padding: 0;
}

.info-card__row {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #edf2f7;
}

.info-card__row:first-of-type {
  border-top: none;
}

.info-card__row dt {
  font-weight: 600;
  color: #304154;
}

.info-card__row dd {
  margin: 0;
  color: #18212b;
  word-break: break-word;
}

.info-card__row a {
  color: #0c6ba8;
  text-decoration: none;
  font-weight: 600;
}

.info-card__row a:hover {
  text-decoration: underline;
}

.info-card__note {
  margin-top: 18px;
  font-size: 0.92rem;
  color: #65748b;
}

.impressum-details {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 48px;
}

.detail-block {
  padding: 28px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(4, 72, 119, 0.05), rgba(38, 155, 124, 0.08));
  border: 1px solid rgba(4, 72, 119, 0.12);
}

.detail-block h3 {
  margin-top: 0;
  color: #04385f;
  font-size: 1.2rem;
}

.detail-block p {
  margin: 10px 0;
  line-height: 1.6;
}

.detail-block ul {
  margin: 12px 0 0;
  padding-left: 20px;
  color: #1d2a36;
}

.impressum-legal {
  margin-bottom: 56px;
}

.legal-card {
  background: #041f3d;
  color: #f6fbff;
  padding: 36px;
  border-radius: 20px;
  box-shadow: 0 18px 40px rgba(4, 31, 61, 0.35);
}

.legal-card h2 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.5rem;
}

.legal-card p {
  margin-bottom: 14px;
  line-height: 1.6;
}

.legal-card ul {
  margin: 0;
  padding-left: 20px;
}

.legal-card li {
  margin-bottom: 10px;
  line-height: 1.5;
}

.impressum-contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  padding: 32px;
  border: 1px solid #d0f1e4;
  border-radius: 18px;
  background: #f3fcf9;
}

.impressum-contact h2 {
  margin: 8px 0;
  color: #04385f;
}

.impressum-contact p {
  margin: 0;
  max-width: 460px;
  line-height: 1.5;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.contact-link {
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
  border-radius: 12px;
  min-width: 220px;
  text-decoration: none;
  border: 2px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.contact-link span {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: inherit;
}

.contact-link strong {
  font-size: 1.2rem;
  margin-top: 6px;
  color: inherit;
}

.contact-link--primary {
  background: linear-gradient(120deg, #0b74c2, #04548c);
  color: #fff;
  box-shadow: 0 15px 35px rgba(11, 116, 194, 0.35);
}

.contact-link--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(11, 116, 194, 0.45);
}

.contact-link--secondary {
  border-color: #0b74c2;
  color: #0b74c2;
  background: #fff;
}

.contact-link--secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(4, 72, 119, 0.15);
}

@media (max-width: 768px) {
  .impressum-page {
    padding: 100px 16px 60px;
  }

  .info-card__row {
    grid-template-columns: 1fr;
  }

  .impressum-contact {
    flex-direction: column;
    text-align: center;
  }

  .contact-link {
    min-width: 0;
    width: 100%;
    align-items: center;
  }

  .detail-block {
    padding: 24px;
  }

  .legal-card {
    padding: 28px;
  }
}

@media (max-width: 480px) {
  .impressum-page {
    padding: 90px 12px 50px;
  }

  .info-card {
    padding: 22px;
  }

  .detail-block {
    padding: 20px;
  }

  .impressum-highlights {
    flex-direction: column;
  }
}
</style>
