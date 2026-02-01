<script setup>
import { inject, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const openAppointmentPopup = inject('openAppointmentPopup')
const { t, tm } = useI18n()

const toStringArray = (value) => (Array.isArray(value) ? value : [])

const descriptionParagraphs = computed(() => toStringArray(tm('hero.description')))
const bulletPoints = computed(() => toStringArray(tm('hero.bullets')))
const offerFeatures = computed(() => toStringArray(tm('hero.offer.features')))

const phoneNumberUrl = 'tel:+306949214461'

const triggerConversion = (url) => {
  if (typeof window === 'undefined') {
    return
  }
  let navigationHandled = false

  const eventFn = window.gtagSendEvent
  if (typeof eventFn === 'function') {
    const eventResult = eventFn(url)
    if (eventResult === false) {
      navigationHandled = true
    }
  }

  const conversionFn = window.gtag_report_conversion
  if (typeof conversionFn === 'function') {
    const conversionResult = conversionFn(url)
    if (conversionResult === false) {
      navigationHandled = true
    }
  }

  if (!navigationHandled && typeof url === 'string') {
    window.location = url
  }
}

const handleCallClick = () => {
  triggerConversion(phoneNumberUrl)
}

const handleBookClick = () => {
  triggerConversion()
  if (typeof openAppointmentPopup === 'function') {
    openAppointmentPopup()
  }
}
</script>

<template>
  <section class="hero-root">
    <div class="hero-main">
      <div class="hero-content">
        <div class="hero-left">
          <h1 class="hero-title">
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
              @click.prevent="handleCallClick"
            >
              {{ t('hero.buttons.call') }}
            </a>
            <button
              class="btn btn-outline"
              @click="handleBookClick"
              type="button"
              :aria-label="t('hero.buttons.bookAria')"
            >
              {{ t('hero.buttons.book') }}
            </button>
          </div>
        </div>
        <div class="hero-right">
          <img
            src="/heromain.png"
            :alt="t('hero.alt')"
            width="1024"
            height="1024"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
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
          @click="handleBookClick"
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
  .hero-root {
    min-height: auto;
    background: #fff;
    padding-bottom: 36px;
  }

  .hero-main {
    background: linear-gradient(160deg, #044877 0%, #0c5a8a 55%, #0b6fa5 100%);
  }

  .hero-content {
    flex-direction: column;
    padding: 96px 0 22px;
    align-items: center;
    text-align: left;
    justify-content: center;
    gap: 10px;
  }
  .hero-left {
    display: contents;
  }
  .hero-title {
    order: 1;
    align-self: stretch;
  }
  .hero-left h1 {
    font-size: 1.95rem;
    line-height: 1.1;
    margin-bottom: 12px;
    text-align: center;
  }
  .hero-left h1 span {
    font-size: 1.28rem;
    margin-top: 0.3em;
    text-align: center;
    color: #e0f2ff;
  }
  .hero-desc {
    order: 3;
    font-size: 0.96rem;
    margin-bottom: 14px;
    line-height: 1.45;
    font-weight: 400;
    letter-spacing: 0.005em;
    max-width: none;
    margin-left: 0;
    margin-right: 0;
    padding: 0 25px;
  }
  .hero-desc p {
    margin: 0 0 8px 0;
  }
  .hero-desc-list {
    list-style: none;
    margin: 10px 0 0;
    padding: 0;
    display: grid;
    gap: 8px;
    max-width: none;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    padding: 0 25px;
  }
  .hero-desc-list li {
    position: relative;
    padding: 8px 10px 8px 30px;
    margin-bottom: 0;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.22);
    text-align: left;
    font-size: 0.92rem;
    line-height: 1.4;
  }
  .hero-desc-list li::before {
    content: '✓';
    position: absolute;
    left: 10px;
    top: 9px;
    color: #e0f2ff;
    font-size: 1rem;
    line-height: 1;
  }
  .hero-buttons {
    order: 4;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    margin: 0;
    width: 100%;
    padding-top: 4px;
    max-width: none;
    padding-left: 25px;
    padding-right: 25px;
  }
  .btn {
    width: 100%;
    max-width: none;
    padding: 14px 20px;
    font-size: 1rem;
    border-radius: 11px;
    font-weight: 600;
    box-shadow: none;
  }
  .hero-buttons .btn {
    width: 100%;
    max-width: 320px;
    background: transparent;
    border: 2px solid #ffffff;
    color: #ffffff;
    box-shadow: none;
  }
  .hero-buttons .btn:hover,
  .hero-buttons .btn:focus-visible {
    background: #ffffff;
    color: #044877;
  }
  .hero-right {
    order: 2;
    width: 100%;
    justify-content: center;
    min-width: 0;
    position: relative;
    margin: 6px 0 16px;
    align-self: center;
  }
  .hero-right::before {
    content: '';
    position: absolute;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.12) 60%, transparent 70%);
  }
  .hero-right img {
    max-width: 435px;
    width: min(90vw, 435px);
    margin: 0 auto 8px;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.24));
    position: relative;
    z-index: 1;
    border-radius: 28px;
  }
  .hero-offer {
    margin: 6px 25px 0;
    padding: 18px 20px;
    border-radius: 16px;
    width: auto;
    background: #c1121c;
    color: #ffffff;
    box-shadow: 0 14px 32px rgba(193, 18, 28, 0.24);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
  .offer-main {
    font-size: 0.95rem;
    margin-bottom: 6px;
    text-align: center;
    color: #ffffff;
  }
  .offer-main span {
    color: #ffffff;
  }
  .offer-title {
    font-size: 1.05rem;
    line-height: 1.35;
    text-align: left;
    text-transform: none;
    letter-spacing: 0.01em;
  }
  .offer-note {
    font-size: 0.88rem;
    margin-top: 4px;
    color: rgba(255, 255, 255, 0.85);
  }
  .offer-icons {
    font-size: 0.95rem;
    margin: 10px 0;
    text-align: left;
    color: #ffffff;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
  }
  .offer-check {
    color: #ffffff;
  }
  .offer-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .offer-bottom .btn {
    width: 100%;
    margin-top: 6px;
    background: transparent;
    border-color: #ffffff;
    color: #fff;
    box-shadow: none;
  }
}
@media (max-width: 500px) {
  .hero-content {
    padding: 88px 0 20px;
  }
  .hero-left h1 {
    font-size: 1.8rem;
  }
  .hero-left h1 span {
    font-size: 1.2rem;
  }
  .hero-desc {
    font-size: 0.94rem;
    max-width: none;
  }
  .btn {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
  .hero-right::before {
    width: 320px;
    height: 320px;
  }
  .hero-right img {
    max-width: 360px;
    width: min(90vw, 360px);
    border-radius: 26px;
  }
  .hero-offer {
    margin: 6px 25px 0;
    padding: 16px 20px;
    width: auto;
  }
  .offer-title {
    font-size: 1rem;
  }
  .offer-icons {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 82px 0 18px;
  }
  .hero-left h1 {
    font-size: 1.6rem;
  }
  .hero-left h1 span {
    font-size: 1.15rem;
  }
  .hero-desc {
    font-size: 0.88rem;
    max-width: none;
  }
  .hero-desc-list li {
    padding: 8px 10px 8px 28px;
    font-size: 0.88rem;
  }
  .hero-right::before {
    width: 290px;
    height: 290px;
  }
  .hero-right img {
    max-width: 335px;
    width: min(90vw, 335px);
    border-radius: 24px;
  }
  .hero-offer {
    padding: 14px 18px;
    width: auto;
    margin: 4px 25px 0;
  }
  .offer-title {
    font-size: 0.95rem;
  }
  .offer-note {
    font-size: 0.82rem;
  }
  .offer-icons {
    font-size: 0.85rem;
  }
}
</style>



