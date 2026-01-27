<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import CookieManager from '@/utils/cookies.js'
import CookieSettings from './CookieSettings.vue'

const visible = ref(false)
const showDetails = ref(false)
const cookieSettingsRef = ref(null)
const { t } = useI18n()

onMounted(() => {
  if (CookieManager.shouldShowBanner()) {
    setTimeout(() => {
      visible.value = true
    }, 1000)
  }
})

watch(visible, (value) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = value ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

function acceptAllCookies() {
  CookieManager.setConsent('all')
  visible.value = false
}

function acceptEssentialCookies() {
  CookieManager.setConsent('essential')
  visible.value = false
}

function toggleDetails() {
  showDetails.value = !showDetails.value
}

function openSettings() {
  cookieSettingsRef.value?.openSettings()
}
</script>

<template>
  <transition name="fade">
    <div v-if="visible" class="cookie-consent">
      <div class="cookie-content">
        <div class="cookie-header">
          <h3>{{ t('cookie.banner.title') }}</h3>
          <p>{{ t('cookie.banner.description') }}</p>
        </div>

        <div v-if="showDetails" class="cookie-details">
          <div class="cookie-type">
            <h4>{{ t('cookie.banner.sections.essential.title') }}</h4>
            <p>{{ t('cookie.banner.sections.essential.description') }}</p>
          </div>
          <div class="cookie-type">
            <h4>{{ t('cookie.banner.sections.analytics.title') }}</h4>
            <p>{{ t('cookie.banner.sections.analytics.description') }}</p>
          </div>
          <div class="cookie-type">
            <h4>{{ t('cookie.banner.sections.functional.title') }}</h4>
            <p>{{ t('cookie.banner.sections.functional.description') }}</p>
          </div>
        </div>

        <div class="cookie-actions">
          <button
            v-if="!showDetails"
            class="cookie-btn cookie-btn-secondary"
            @click="toggleDetails"
          >
            {{ t('cookie.banner.actions.more') }}
          </button>
          <button
            v-else
            class="cookie-btn cookie-btn-secondary"
            @click="toggleDetails"
          >
            {{ t('cookie.banner.actions.less') }}
          </button>

          <div class="cookie-buttons">
            <button class="cookie-btn cookie-btn-essential" @click="acceptEssentialCookies">
              {{ t('cookie.banner.actions.acceptEssential') }}
            </button>
            <button class="cookie-btn cookie-btn-accept" @click="acceptAllCookies">
              {{ t('cookie.banner.actions.acceptAll') }}
            </button>
          </div>

          <div class="cookie-footer">
            <a
              href="#"
              @click.prevent="openSettings"
              class="cookie-settings-link"
              :aria-label="t('cookie.banner.actions.settings')"
            >
              {{ t('cookie.banner.actions.settings') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <CookieSettings ref="cookieSettingsRef" />
</template>
<style scoped>
.cookie-consent {
  position: fixed;
  inset: 0;
  background: rgba(4, 72, 119, 0.35);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 10000;
  font-size: 0.95rem;
  line-height: 1.5;
}

.cookie-content {
  padding: 20px;
  background: #fff;
  border: 1px solid #e6e8eb;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  max-width: 560px;
  width: min(92vw, 560px);
  max-height: 90vh;
  overflow: auto;
}

.cookie-header h3 {
  margin: 0 0 12px 0;
  color: #044877;
  font-size: 1.2rem;
  font-weight: 600;
}

.cookie-header p {
  margin: 0 0 16px 0;
  color: #4a5568;
  font-size: 0.9rem;
}

.cookie-details {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  border: 1px solid #e2e8f0;
}

.cookie-type {
  margin-bottom: 16px;
}

.cookie-type:last-child {
  margin-bottom: 0;
}

.cookie-type h4 {
  margin: 0 0 6px 0;
  color: #044877;
  font-size: 1rem;
  font-weight: 600;
}

.cookie-type p {
  margin: 0;
  color: #64748b;
  font-size: 0.85rem;
}

.cookie-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cookie-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cookie-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.cookie-btn-accept {
  background: #044877;
  color: #fff;
  flex: 1;
  min-width: 120px;
}

.cookie-btn-accept:hover {
  background: #03365d;
  transform: translateY(-1px);
}

.cookie-btn-essential {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  flex: 1;
  min-width: 120px;
}

.cookie-btn-essential:hover {
  background: #e2e8f0;
  color: #334155;
}

.cookie-btn-secondary {
  background: transparent;
  color: #044877;
  border: 1px solid #044877;
  align-self: flex-start;
  font-size: 0.85rem;
  padding: 8px 12px;
}

.cookie-btn-secondary:hover {
  background: #044877;
  color: #fff;
}

.cookie-footer {
  margin-top: 12px;
  text-align: center;
}

.cookie-settings-link {
  color: #044877;
  text-decoration: none;
  font-size: 0.85rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.cookie-settings-link:hover {
  border-bottom-color: #044877;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from .cookie-content,
.fade-leave-to .cookie-content {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .cookie-consent {
    padding: 16px;
  }
  
  .cookie-content {
    padding: 16px;
    width: 100%;
  }
  
  .cookie-header h3 {
    font-size: 1.1rem;
  }
  
  .cookie-header p {
    font-size: 0.85rem;
  }
  
  .cookie-buttons {
    flex-direction: column;
  }
  
  .cookie-btn {
    width: 100%;
    padding: 12px 16px;
    font-size: 0.95rem;
  }
  
  .cookie-btn-secondary {
    align-self: stretch;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .cookie-consent {
    padding: 12px;
  }
  
  .cookie-content {
    padding: 14px;
  }
  
  .cookie-details {
    padding: 12px;
  }
  
  .cookie-type h4 {
    font-size: 0.95rem;
  }
  
  .cookie-type p {
    font-size: 0.8rem;
  }
}
</style>

