<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import CookieManager from '@/utils/cookies.js'

const visible = ref(false)
const analyticsEnabled = ref(false)
const essentialEnabled = ref(true)
const { t } = useI18n()

onMounted(() => {
  const consent = localStorage.getItem('cookie_consent')
  analyticsEnabled.value = consent === 'all'
})

function saveSettings() {
  if (analyticsEnabled.value) {
    CookieManager.setConsent('all')
  } else {
    CookieManager.setConsent('essential')
  }
  visible.value = false
}

function openSettings() {
  visible.value = true
}

function closeSettings() {
  visible.value = false
}

defineExpose({ openSettings })
</script>

<template>
  <transition name="fade">
    <div v-if="visible" class="cookie-settings">
      <div class="settings-backdrop" @click="closeSettings"></div>
      <div class="settings-modal">
        <div class="settings-header">
          <h3>{{ t('cookie.settings.title') }}</h3>
          <button @click="closeSettings" class="close-btn" :aria-label="t('common.aria.close')">
            ×
          </button>
        </div>

        <div class="settings-content">
          <div class="cookie-type">
            <div class="cookie-info">
              <h4>{{ t('cookie.settings.essentialTitle') }}</h4>
              <p>{{ t('cookie.settings.essentialDescription') }}</p>
            </div>
            <div class="cookie-toggle">
              <input
                type="checkbox"
                :checked="essentialEnabled"
                disabled
                id="essential-cookies"
              >
              <label for="essential-cookies" class="toggle-label disabled">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div class="cookie-type">
            <div class="cookie-info">
              <h4>{{ t('cookie.settings.analyticsTitle') }}</h4>
              <p>{{ t('cookie.settings.analyticsDescription') }}</p>
            </div>
            <div class="cookie-toggle">
              <input
                type="checkbox"
                v-model="analyticsEnabled"
                id="analytics-cookies"
              >
              <label for="analytics-cookies" class="toggle-label">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div class="settings-actions">
          <button @click="closeSettings" class="btn btn-secondary">
            {{ t('common.buttons.cancel') }}
          </button>
          <button @click="saveSettings" class="btn btn-primary">
            {{ t('common.buttons.save') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.cookie-settings {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.settings-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.settings-modal {
  position: relative;
  background: #fff;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.settings-header h3 {
  margin: 0;
  color: #044877;
  font-size: 1.3rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f1f5f9;
  color: #334155;
}

.settings-content {
  padding: 24px;
}

.cookie-type {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 16px;
}

.cookie-type:last-child {
  margin-bottom: 0;
}

.cookie-info {
  flex: 1;
}

.cookie-info h4 {
  margin: 0 0 8px 0;
  color: #044877;
  font-size: 1.1rem;
  font-weight: 600;
}

.cookie-info p {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
}

.cookie-toggle {
  flex-shrink: 0;
}

.cookie-toggle input[type="checkbox"] {
  display: none;
}

.toggle-label {
  display: inline-block;
  width: 48px;
  height: 24px;
  background: #cbd5e1;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
}

.toggle-label.disabled {
  background: #e2e8f0;
  cursor: not-allowed;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type="checkbox"]:checked + .toggle-label {
  background: #044877;
}

input[type="checkbox"]:checked + .toggle-label .toggle-slider {
  transform: translateX(24px);
}

.settings-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 20px 24px;
  border-top: 1px solid #e2e8f0;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-primary {
  background: #044877;
  color: #fff;
}

.btn-primary:hover {
  background: #03365d;
}

.btn-secondary {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
}

.btn-secondary:hover {
  background: #e2e8f0;
  color: #334155;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from .settings-modal,
.fade-leave-to .settings-modal {
  transform: scale(0.9) translateY(-20px);
}

@media (max-width: 768px) {
  .cookie-settings {
    padding: 16px;
  }
  
  .settings-modal {
    max-width: none;
    width: 100%;
  }
  
  .settings-header {
    padding: 16px 20px;
  }
  
  .settings-header h3 {
    font-size: 1.2rem;
  }
  
  .settings-content {
    padding: 20px;
  }
  
  .cookie-type {
    flex-direction: column;
    gap: 12px;
  }
  
  .cookie-toggle {
    align-self: flex-start;
  }
  
  .settings-actions {
    padding: 16px 20px;
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    padding: 12px 20px;
  }
}

@media (max-width: 480px) {
  .cookie-settings {
    padding: 12px;
  }
  
  .settings-header {
    padding: 14px 16px;
  }
  
  .settings-content {
    padding: 16px;
  }
  
  .settings-actions {
    padding: 14px 16px;
  }
}
</style>
