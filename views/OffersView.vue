<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { CheckCircle } from 'lucide-vue-next'

const { t, tm } = useI18n()

// Get kitchen hood section data
const kitchenHoodSection = computed(() => t('offersPage.sections.kitchenHood'))
const kitchenHoodCards = computed(() => tm('offersPage.sections.kitchenHood.cards'))
const kitchenHoodAdvantages = computed(() => tm('offersPage.sections.kitchenHood.advantages'))

// Get hood ventilation section data
const hoodVentilationSection = computed(() => t('offersPage.sections.hoodVentilation'))
const hoodVentilationCards = computed(() => tm('offersPage.sections.hoodVentilation.cards'))

// Helper function to ensure arrays
const toArray = (value) => (Array.isArray(value) ? value : [])
</script>

<template>
  <main class="offers-root">
    <h2 class="offers-title">{{ t('offersPage.title') }}</h2>
    <div class="offers-container">

      <!-- Kitchen & Hood Section -->
      <section class="offers-section">
        <h3 class="offers-section-title">{{ t('offersPage.sections.kitchenHood.title') }}</h3>
        <div class="offers-cards-row">

          <!-- Kitchen Connection Card -->
          <div class="offer-card">
            <h4>{{ t('offersPage.sections.kitchenHood.cards.kitchenConnection.title') }}</h4>
            <div class="offer-price" v-html="t('offersPage.sections.kitchenHood.cards.kitchenConnection.price')"></div>
            <ul class="offer-features">
              <li v-for="feature in toArray(tm('offersPage.sections.kitchenHood.cards.kitchenConnection.features'))" :key="feature">
                <CheckCircle :size="18" class="icon-check" /> {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Hood Connection Card -->
          <div class="offer-card">
            <h4>{{ t('offersPage.sections.kitchenHood.cards.hoodConnection.title') }}</h4>
            <div class="offer-price" v-html="t('offersPage.sections.kitchenHood.cards.hoodConnection.price')"></div>
            <ul class="offer-features">
              <li v-for="feature in toArray(tm('offersPage.sections.kitchenHood.cards.hoodConnection.features'))" :key="feature">
                <CheckCircle :size="18" class="icon-check" /> {{ feature }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Advantages -->
        <ul class="offer-advantages">
          <li v-for="advantage in toArray(kitchenHoodAdvantages)" :key="advantage">{{ advantage }}</li>
        </ul>

        <!-- Combo Set Card -->
        <div class="offer-card offer-set">
          <h4>{{ t('offersPage.sections.kitchenHood.cards.comboSet.title') }}</h4>
          <div class="offer-price-set" v-html="t('offersPage.sections.kitchenHood.cards.comboSet.price')"></div>
          <div class="offer-set-desc" v-html="t('offersPage.sections.kitchenHood.cards.comboSet.description')">
          </div>
        </div>
      </section>

      <!-- Hood Ventilation Section -->
      <section class="offers-section">
        <h3 class="offers-section-title">{{ t('offersPage.sections.hoodVentilation.title') }}</h3>
        <div class="offers-cards-row">
          
          <!-- Hood Installation Card -->
          <div class="offer-card">
            <h4>{{ t('offersPage.sections.hoodVentilation.cards.hoodInstallation.title') }}</h4>
            <div class="offer-price" v-html="t('offersPage.sections.hoodVentilation.cards.hoodInstallation.price')"></div>
            <ul class="offer-features">
              <li v-for="feature in toArray(tm('offersPage.sections.hoodVentilation.cards.hoodInstallation.features'))" :key="feature">
                <CheckCircle :size="18" class="icon-check" /> {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Hood Replacement Card -->
          <div class="offer-card">
            <h4>{{ t('offersPage.sections.hoodVentilation.cards.hoodReplacement.title') }}</h4>
            <div class="offer-price" v-html="t('offersPage.sections.hoodVentilation.cards.hoodReplacement.price')"></div>
            <ul class="offer-features">
              <li v-for="feature in toArray(tm('offersPage.sections.hoodVentilation.cards.hoodReplacement.features'))" :key="feature">
                <CheckCircle :size="18" class="icon-check" /> {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Disclaimer -->
      <div class="offers-disclaimer" v-html="t('offersPage.disclaimer')">
      </div>
    </div>
  </main>
</template>

<style scoped>
.offers-root {
  background: #f9fbfc;
  min-height: 100vh;
  padding: 38px 0 24px 0;
}
.offers-title {
  text-align: center;
  font-size: 2.1rem;
  color: #e92127;
  font-weight: 900;
  margin-bottom: 36px;
  letter-spacing: 0.01em;
}
.offers-container {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 28px;
  box-sizing: border-box;
}
.offers-section {
  margin-bottom: 44px;
}
.offers-section-title {
  font-size: 1.28rem;
  color: #044877;
  background: #e6eef6;
  font-weight: 700;
  padding: 14px 16px;
  border-radius: 7px;
  margin-bottom: 18px;
  letter-spacing: 0.01em;
}
.offers-cards-row {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.offer-card {
  background: #fff;
  border: 1.5px solid #e6e8eb;
  border-radius: 11px;
  box-shadow: 0 4px 20px rgba(50,70,100,0.07);
  flex: 1 1 260px;
  min-width: 260px;
  max-width: 330px;
  padding: 24px 20px 18px 20px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.offer-card h4 {
  color: #044877;
  font-size: 1.13rem;
  font-weight: 700;
  margin-bottom: 7px;
}
.offer-price,
.offer-price-set {
  font-size: 1.29rem;
  color: #e92127;
  font-weight: 800;
  margin-bottom: 7px;
  margin-top: 3px;
}
.offer-price-set {
  font-size: 1.32rem;
}
.offer-features {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #26304a;
  font-size: 1.02rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.icon-check {
  color: #16bb45;
  margin-right: 7px;
  vertical-align: middle;
}
.offer-advantages {
  margin: 14px 0 22px 0;
  padding-left: 2px;
  color: #044877;
  font-size: 1.04rem;
  list-style: none;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}
.offer-advantages li {
  display: flex;
  align-items: center;
  gap: 4px;
}
.offer-set {
  background: #e9fff3;
  border: 2px solid #20ba7c;
  margin-top: 16px;
}
.offer-set-desc {
  color: #0d345a;
  font-size: 1.06rem;
  margin-top: 6px;
}
.offers-disclaimer {
  margin-top: 44px;
  font-size: 0.97rem;
  color: #888;
  text-align: center;
  opacity: 0.9;
}

@media (max-width: 900px) {
  .offers-cards-row {
    flex-direction: column;
    gap: 18px;
  }
  .offer-card {
    min-width: 0;
    max-width: 100%;
    width: 100%;
  }
  .offer-advantages {
    gap: 13px;
    flex-direction: column;
    align-items: flex-start;
  }
}
@media (max-width: 600px) {
  .offers-container {
    padding: 0 6vw;
  }
  .offers-title {
    font-size: 1.36rem;
    margin-bottom: 18px;
  }
  .offers-section-title {
    font-size: 1.04rem;
    padding: 11px 8px;
    margin-bottom: 11px;
  }
  .offer-card h4 {
    font-size: 1.01rem;
  }
}
</style>
