<script setup>
import { inject, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const openAppointmentPopup = inject('openAppointmentPopup')
const { t, tm } = useI18n()

const toStringArray = (value) => (Array.isArray(value) ? value : [])

const descriptionParagraphs = computed(() => toStringArray(tm('hero.description')))
const bulletPoints = computed(() => toStringArray(tm('hero.bullets')))
const offerFeatures = computed(() => toStringArray(tm('hero.offer.features')))
</script>

<template>
  <section class="hero-root">
    <div class="hero-main">
      <div class="hero-content">
        <div class="hero-left">
          <h1>
            {{ t('hero.title.main') }}<br /><span>{{ t('hero.title.highlight') }}</span>
          </h1>
          <div class="hero-desc">
            <p
              v-for="(paragraph, index) in descriptionParagraphs"
              :key="'hero-desc-' + index"
              v-html="paragraph"
            />
            <ul v-if="bulletPoints.length" class="hero-desc-list">
              <li v-for="(point, index) in bulletPoints" :key="'hero-point-' + index">
                {{ point }}
              </li>
            </ul>
          </div>

          <div class="hero-buttons">
            <a
              href="tel:+306949214461"
              class="btn btn-outline"
              :aria-label="t('hero.buttons.callAria')"
            >
              {{ t('hero.buttons.call') }}
            </a>
            <button
              class="btn btn-outline"
              @click="openAppointmentPopup && openAppointmentPopup()"
              type="button"
              :aria-label="t('hero.buttons.bookAria')"
            >
              {{ t('hero.buttons.book') }}
            </button>
          </div>
        </div>
        <div class="hero-right">
          <img src="/heromain.png" :alt="t('hero.alt')" />
        </div>
      </div>
    </div>

    <div class="hero-offer">
      <div class="offer-main">
        {{ t('hero.offer.badge') }}
        <span><br />{{ t('hero.offer.highlight') }}</span>
      </div>
      <div class="offer-title">
        {{ t('hero.offer.title') }}
        <span class="offer-note">{{ t('hero.offer.note') }}</span>
      </div>
      <div
        v-for="(feature, index) in offerFeatures"
        :key="'offer-feature-' + index"
        class="offer-icons"
      >
        <span class="offer-check">✔</span>
        {{ feature }}
      </div>
      <div class="offer-bottom">
        <button
          class="btn btn-outline"
          @click="openAppointmentPopup && openAppointmentPopup()"
          type="button"
          :aria-label="t('hero.offer.ctaAria')"
        >
          {{ t('hero.offer.cta') }}
        </button>
      </div>
    </div>
  </section>
</template>
<style scoped>
.hero-root {
  width: 100%;
  background: #fff;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 64px;
}
.hero-main {
  width: 100vw;
  background: #044877;
  display: flex;
  justify-content: center;
}
.hero-content {
  max-width: 1060px;
  width: 100%;
  display: flex;
  align-items: stretch;
  padding: 64px 40px 72px 40px;
  margin: 0 auto;
  box-sizing: border-box;
}
.hero-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  padding-top: 8px;
}
.hero-left h1 {
  font-size: 2.65rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  line-height: 1.08;
}
.hero-left h1 span {
  font-weight: 700;
  font-size: 2.05rem;
  display: block;
  margin-top: 0.17em;
}
.hero-desc {
  font-size: 1.13rem;
  margin-bottom: 34px;
  line-height: 1.43;
  font-weight: 400;
  letter-spacing: 0.005em;
}
.hero-desc-list {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
}
.hero-desc-list li {
  position: relative;
  padding-left: 18px;
  margin-bottom: 6px;
}
.hero-desc-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #fff;
  font-size: 1.1em;
  line-height: 1;
}
.hero-buttons {
  display: flex;
  gap: 18px;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-decoration: none;
  min-width: 180px;
  padding: 12px 10px;
  border-radius: 5px;
  font-size: 1.07rem;
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  transition: 0.19s;
  letter-spacing: 0.01em;
  font-family: inherit;
  line-height: 1.1;
  box-sizing: border-box;
}

.btn-outline {
  background: transparent;
  border: 2px solid #fff;
}
.btn-outline:hover {
  background: #fff;
  color: #044877;
}
.hero-right {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  min-width: 290px;
}
.hero-right img {
  max-width: 345px;
  width: 100%;
  height: auto;
  border-radius: 0;
  object-fit: cover;
  margin-left: 28px;
  margin-bottom: -12px;
}

/* RED OFFER */
.hero-offer {
  position: relative;
  z-index: 2;
  max-width: 770px;
  width: 88vw;
  margin: -60px auto 0 auto;
  background: #c1121c; 
  border-radius: 18px;
  box-shadow: 0 6px 30px 0 rgba(233,33,39,0.14);
  padding: 36px 32px 36px 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.offer-main {
  font-size: 1.36rem;
  font-weight: 700;
  margin-bottom: 2px;
  letter-spacing: 0.01em;
}
.offer-main span {
  font-weight: 900;
  color: #fff;
  font-size: 1.21em;
}
.offer-title {
  font-size: 1.26rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 2px;
  line-height: 1.22;
}
.offer-note {
  display: block;
  font-size: 1.04rem;
  font-weight: 400;
  text-transform: none;
  margin-top: 2px;
}
.offer-icons {
  font-size: 1.06rem;
  font-weight: 700;
  margin-top: 6px;
  margin-bottom: 2px;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 10px;
}
.offer-check {
  font-size: 1.19em;
  margin-right: 5px;
}
.offer-bottom {
  font-size: 1.11rem;
  margin-top: 6px;
  font-weight: 400;
  letter-spacing: 0.01em;
  width: 100%;
  display: flex;
  justify-content: center;
}
.offer-strong {
  font-weight: 700;
  color: #fff;
}
@media (max-width: 1060px) {
  .hero-content {
    max-width: 99vw;
    padding: 36px 6vw 80px 6vw;
  }
  .hero-offer {
    width: 80vw;
    max-width: 99vw;
    padding: 22px 4vw 12px 4vw;
  }
}

@media (max-width: 950px) {
  .hero-offer {
    margin: -38px auto 0 auto;
  }
}

@media (max-width: 750px) {
  .hero-content {
    flex-direction: column;
    padding: 20px 16px 40px;
    align-items: center;
    text-align: center;
    justify-content: center;
    min-height: auto;
  }
  .hero-left {
    padding-top: 0;
    width: 100%;
    max-width: 100%;
  }
  .hero-left h1 {
    font-size: 2rem;
    line-height: 1.1;
    margin-bottom: 20px;
    text-align: center;
  }
  .hero-left h1 span {
    font-size: 1.6rem;
    margin-top: 0.2em;
    text-align: center;
  }
  .hero-desc {
  font-size: 1.13rem;
  margin-bottom: 34px;
  line-height: 1.43;
  font-weight: 400;
  letter-spacing: 0.005em;
}
.hero-desc-list {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
}
.hero-desc-list li {
  position: relative;
  padding-left: 18px;
  margin-bottom: 6px;
}
.hero-desc-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #fff;
  font-size: 1.1em;
  line-height: 1;
}
.hero-buttons {
    flex-direction: column;
    gap: 12px;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    padding-top: 10px;
  }
  .btn {
    width: 100%;
    max-width: 280px;
    padding: 14px 20px;
    font-size: 1rem;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .offer-main {
    font-size: 1.1rem;
    margin-bottom: 8px;
    text-align: center;
  }
  .offer-title {
    font-size: 1rem;
    line-height: 1.3;
    text-align: center;
  }
  .offer-note {
    font-size: 0.9rem;
    margin-top: 4px;
  }
  .offer-icons {
    font-size: 0.95rem;
    margin: 12px 0;
    text-align: center;
  }
  .offer-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .offer-bottom .btn {
    width: 100%;
    margin-top: 8px;
  }
}
@media (max-width: 500px) {
  .hero-content {
    padding: 16px 12px 32px;
    text-align: center;
  }
  .hero-left {
    width: 100%;
    text-align: center;
  }
  .hero-left h1 {
    font-size: 1.8rem;
    text-align: center;
  }
  .hero-left h1 span {
    font-size: 1.4rem;
    text-align: center;
  }
  .hero-desc {
    font-size: 0.95rem;
    text-align: center;
  }
  .btn {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
  .hero-right {
    width: 100%;
    justify-content: center;
  }
  .hero-right img {
    max-width: 240px;
  }
  .hero-offer {
    margin: -30px 12px 0;
    padding: 16px 12px;
    border-radius: 12px;
    width: calc(100% - 24px);
    align-items: center;
  }
  .offer-main {
    text-align: center;
  }
  .offer-title {
    text-align: center;
  }
  .offer-icons {
    text-align: center;
  }
  .offer-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 12px 8px 24px;
    text-align: center;
  }
  .hero-left {
    width: 100%;
    text-align: center;
  }
  .hero-left h1 {
    font-size: 1.6rem;
    text-align: center;
  }
  .hero-left h1 span {
    font-size: 1.3rem;
    text-align: center;
  }
  .hero-desc {
    font-size: 0.9rem;
    margin-bottom: 20px;
    text-align: center;
  }
  .hero-right {
    width: 100%;
    justify-content: center;
  }
  .hero-right img {
    max-width: 200px;
  }
  .hero-offer {
    margin: -25px 8px 0;
    padding: 14px 10px;
    width: calc(100% - 16px);
    align-items: center;
  }
  .offer-main {
    font-size: 1rem;
    text-align: center;
  }
  .offer-title {
    font-size: 0.9rem;
    text-align: center;
  }
  .offer-note {
    font-size: 0.8rem;
  }
  .offer-icons {
    font-size: 0.85rem;
    text-align: center;
  }
  .offer-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>



