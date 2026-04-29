<script setup>
import { inject, computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const openAppointmentPopup = inject('openAppointmentPopup')
const { t, tm } = useI18n()

const toStringArray = (value) => (Array.isArray(value) ? value : [])

const heroSlides = computed(() => {
  const slides = tm('hero.slides')
  if (Array.isArray(slides) && slides.length) {
    return slides
  }

  return [
    {
      serviceLabel: t('header.servicesMenu.electrician'),
      title: {
        main: t('hero.title.main'),
        highlight: t('hero.title.highlight'),
      },
      description: toStringArray(tm('hero.description')),
      bullets: toStringArray(tm('hero.bullets')),
      image: '/heromain.png',
      alt: t('hero.alt'),
    },
  ]
})
const offerFeatures = computed(() => toStringArray(tm('hero.offer.features')))

const activeServiceIndex = ref(0)
let slideTimer = null
const AUTO_SLIDE_DELAY = 6200
const SWIPE_THRESHOLD = 46
const touchStartX = ref(0)
const touchStartY = ref(0)

const phoneNumberUrl = 'tel:+306949214461'

const triggerConversion = (url) => {
  if (typeof window === 'undefined') {
    return
  }
  let fallbackTimer = null

  if (typeof url === 'string') {
    fallbackTimer = window.setTimeout(() => {
      window.location.href = url
    }, 700)
  }

  const eventFn = window.gtagSendEvent
  if (typeof eventFn === 'function') {
    eventFn(url)
  }

  const conversionFn = window.gtag_report_conversion
  if (typeof conversionFn === 'function') {
    conversionFn(url)
  }

  if (!eventFn && !conversionFn && fallbackTimer) {
    window.clearTimeout(fallbackTimer)
    window.location.href = url
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

const goToNextSlide = () => {
  if (!heroSlides.value.length) return
  activeServiceIndex.value = (activeServiceIndex.value + 1) % heroSlides.value.length
}

const goToPrevSlide = () => {
  if (!heroSlides.value.length) return
  activeServiceIndex.value = (activeServiceIndex.value - 1 + heroSlides.value.length) % heroSlides.value.length
}

const stopAutoSlide = () => {
  if (slideTimer) {
    clearInterval(slideTimer)
    slideTimer = null
  }
}

const startAutoSlide = () => {
  stopAutoSlide()
  if (heroSlides.value.length <= 1) return
  slideTimer = setInterval(() => {
    goToNextSlide()
  }, AUTO_SLIDE_DELAY)
}

const restartAutoSlide = () => {
  startAutoSlide()
}

onMounted(() => {
  startAutoSlide()
})

onBeforeUnmount(() => {
  stopAutoSlide()
})

const activateSlide = (index) => {
  activeServiceIndex.value = index
  restartAutoSlide()
}

const goNextSlideByUser = () => {
  goToNextSlide()
  restartAutoSlide()
}

const goPrevSlideByUser = () => {
  goToPrevSlide()
  restartAutoSlide()
}

const onTouchStart = (event) => {
  const touch = event.changedTouches?.[0]
  if (!touch) return
  touchStartX.value = touch.clientX
  touchStartY.value = touch.clientY
}

const onTouchEnd = (event) => {
  const touch = event.changedTouches?.[0]
  if (!touch) return

  const deltaX = touch.clientX - touchStartX.value
  const deltaY = touch.clientY - touchStartY.value

  if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) {
    return
  }

  if (deltaX < 0) {
    goNextSlideByUser()
  } else {
    goPrevSlideByUser()
  }
}
</script>

<template>
  <section class="hero-root">
    <div class="hero-main">
      <div
        class="hero-carousel"
        @mouseenter="stopAutoSlide"
        @mouseleave="startAutoSlide"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div class="hero-track" :style="{ transform: `translateX(-${activeServiceIndex * 100}%)` }">
          <div
            v-for="(slide, slideIndex) in heroSlides"
            :key="slide.serviceLabel || slideIndex"
            class="hero-content hero-slide"
            :aria-hidden="slideIndex !== activeServiceIndex"
          >
            <div class="hero-left">
              <component :is="slideIndex === 0 ? 'h1' : 'h2'" class="hero-title">
                {{ slide.title?.main }}<br /><span>{{ slide.title?.highlight }}</span>
              </component>
              <div class="hero-desc">
                <p
                  v-for="(paragraph, index) in toStringArray(slide.description)"
                  :key="`hero-desc-${slideIndex}-${index}`"
                  v-html="paragraph"
                />
                <ul v-if="toStringArray(slide.bullets).length" class="hero-desc-list">
                  <li
                    v-for="(point, index) in toStringArray(slide.bullets)"
                    :key="`hero-point-${slideIndex}-${index}`"
                  >
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
              <router-link
                v-if="slide.path"
                :to="slide.path"
                class="hero-image-link"
                :aria-label="slide.serviceLabel || 'Open service page'"
              >
                <img
                  class="hero-slide-image"
                  :src="slide.image || '/heromain.png'"
                  :alt="slide.alt || t('hero.alt')"
                  width="624"
                  height="624"
                  decoding="async"
                  :loading="slideIndex === 0 ? 'eager' : 'lazy'"
                  :fetchpriority="slideIndex === 0 ? 'high' : 'auto'"
                />
              </router-link>
              <img
                v-else
                class="hero-slide-image"
                :src="slide.image || '/heromain.png'"
                :alt="slide.alt || t('hero.alt')"
                width="624"
                height="624"
                decoding="async"
                :loading="slideIndex === 0 ? 'eager' : 'lazy'"
                :fetchpriority="slideIndex === 0 ? 'high' : 'auto'"
              />
            </div>
          </div>
        </div>
        <button
          v-if="heroSlides.length > 1"
          type="button"
          class="hero-nav hero-nav--prev"
          aria-label="Previous service slide"
          @click="goPrevSlideByUser"
        >
          ‹
        </button>
        <button
          v-if="heroSlides.length > 1"
          type="button"
          class="hero-nav hero-nav--next"
          aria-label="Next service slide"
          @click="goNextSlideByUser"
        >
          ›
        </button>
        <div class="hero-dots-main" v-if="heroSlides.length > 1">
          <button
            v-for="(slide, index) in heroSlides"
            :key="'dot-' + index"
            type="button"
            class="hero-dot"
            :class="{ 'hero-dot--active': index === activeServiceIndex }"
            :aria-label="slide.serviceLabel || `Slide ${index + 1}`"
            @click="activateSlide(index)"
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
.hero-carousel {
  width: 100%;
  max-width: 1060px;
  overflow: hidden;
  position: relative;
  touch-action: pan-y;
}
.hero-track {
  display: flex;
  transition: transform 0.75s cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: transform;
}
.hero-slide {
  min-width: 100%;
  flex: 0 0 100%;
  max-width: 100%;
  margin: 0;
}
.hero-dots-main {
  margin-top: 0;
  padding-bottom: 20px;
  padding-top: 8px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}
.hero-nav {
  position: absolute;
  top: auto;
  bottom: 54px;
  transform: none;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  background: rgba(4, 72, 119, 0.55);
  color: #fff;
  font-size: 1.4rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
}
.hero-nav:hover {
  background: rgba(255, 255, 255, 0.95);
  color: #044877;
}
.hero-nav--prev {
  left: 4px;
}
.hero-nav--next {
  right: 4px;
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
.hero-title {
  font-size: 2.65rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  line-height: 1.08;
}
.hero-title span {
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
.hero-dot {
  width: 10px;
  height: 10px;
  min-width: 10px;
  min-height: 10px;
  max-width: 10px;
  max-height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 0;
  flex: 0 0 auto;
  display: block;
  opacity: 0.92;
}
.hero-dot--active {
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.28);
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
.hero-image-link {
  display: inline-flex;
  width: 100%;
  max-width: 624px;
  margin-left: 28px;
  margin-bottom: -12px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 22px rgba(7, 28, 46, 0.22);
  aspect-ratio: 1 / 1;
  align-items: stretch;
  justify-content: stretch;
}
.hero-right > .hero-slide-image {
  width: 100%;
  max-width: 624px;
  height: auto;
  aspect-ratio: 1 / 1;
  margin-left: 28px;
  margin-bottom: -12px;
  border-radius: 14px;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 8px 22px rgba(7, 28, 46, 0.22);
  background: #d6e6f1;
  display: block;
  cursor: pointer;
}
.hero-right .hero-image-link > .hero-slide-image {
  width: 100%;
  height: 100%;
  max-width: none;
  min-width: 0;
  flex: 1 1 auto;
  object-fit: cover;
  object-position: center;
  display: block;
  background: #d6e6f1;
  image-rendering: auto;
}
.hero-right .hero-slide-image {
  cursor: pointer;
  image-rendering: auto;
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
    margin-top: -20px;
  }
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
  .hero-right {
    width: 100%;
    justify-content: center;
    min-width: 0;
  }
  .hero-image-link,
  .hero-right > .hero-slide-image {
    width: 100%;
    max-width: 493px;
    margin-left: 0;
    margin-bottom: 0;
    margin-right: 0;
  }
  .hero-title {
    font-size: 2rem;
    line-height: 1.1;
    margin-bottom: 20px;
    text-align: center;
  }
  .hero-title span {
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
  .hero-dots-main {
    margin-top: 6px;
    padding-bottom: 14px;
    gap: 9px;
  }
  .hero-nav {
    display: none;
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
  .hero-title {
    font-size: 1.8rem;
    text-align: center;
  }
  .hero-title span {
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
  .hero-image-link,
  .hero-right > .hero-slide-image {
    width: 100%;
    max-width: 435px;
    margin-left: auto;
    margin-right: auto;
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
  .hero-root {
    margin-top: -12px;
  }
  .hero-content {
    padding: 12px 8px 24px;
    text-align: center;
  }
  .hero-left {
    width: 100%;
    text-align: center;
  }
  .hero-title {
    font-size: 1.6rem;
    text-align: center;
  }
  .hero-title span {
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
  .hero-image-link,
  .hero-right > .hero-slide-image {
    width: 100%;
    max-width: 377px;
    margin-left: auto;
    margin-right: auto;
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
  .hero-dots-main {
    margin-top: 4px;
    padding-bottom: 12px;
  }
  .hero-dot {
    width: 9px;
    height: 9px;
    min-width: 9px;
    min-height: 9px;
    max-width: 9px;
    max-height: 9px;
  }
  .hero-nav {
    display: none;
  }
}
</style>



