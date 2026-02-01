<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CookieManager from '@/utils/cookies.js'

const visible = ref(false)
const emit = defineEmits(['consent-updated'])
const { t } = useI18n()

function openSettings() {
  visible.value = true
}

function closeSettings() {
  visible.value = false
}

function acceptAll() {
  CookieManager.grantConsent()
  emit('consent-updated')
  closeSettings()
}

function acceptEssential() {
  CookieManager.denyConsent()
  emit('consent-updated')
  closeSettings()
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
          <p class="settings-note">{{ t('cookie.settings.notice') }}</p>
          <div class="cookie-type">
            <div class="cookie-info">
              <h4>{{ t('cookie.settings.essentialTitle') }}</h4>
              <p>{{ t('cookie.settings.essentialDescription') }}</p>
            </div>
          </div>

          <div class="cookie-type">
            <div class="cookie-info">
              <h4>{{ t('cookie.settings.analyticsTitle') }}</h4>
              <p>{{ t('cookie.settings.analyticsDescription') }}</p>
            </div>
          </div>

          <div class="cookie-type">
            <div class="cookie-info">
              <h4>{{ t('cookie.settings.functionalTitle') }}</h4>
              <p>{{ t('cookie.settings.functionalDescription') }}</p>
            </div>
          </div>
        </div>

        <div class="settings-actions">
          <button @click="acceptAll" class="btn btn-primary">
            {{ t('cookie.settings.actions.acceptAll') }}
          </button>
          <button @click="acceptEssential" class="btn btn-secondary">
            {{ t('cookie.settings.actions.essentialOnly') }}
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

.settings-note {
  margin: 0 0 18px 0;
  color: #475569;
  font-size: 0.92rem;
  line-height: 1.5;
}

.cookie-type {
  margin-bottom: 24px;
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

.settings-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
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
