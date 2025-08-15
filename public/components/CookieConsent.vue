<script setup>
import { ref, onMounted } from 'vue'
import CookieManager from '@/utils/cookies.js'
import CookieSettings from './CookieSettings.vue'

const visible = ref(false)
const showDetails = ref(false)
const cookieSettingsRef = ref(null)

onMounted(() => {
  // Проверяем, нужно ли показать баннер согласия
  if (CookieManager.shouldShowBanner()) {
    // Небольшая задержка для лучшего UX
    setTimeout(() => {
      visible.value = true
    }, 1000)
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
  if (cookieSettingsRef.value) {
    cookieSettingsRef.value.openSettings()
  }
}
</script>

<template>
  <transition name="slide-up">
    <div v-if="visible" class="cookie-consent">
      <div class="cookie-content">
        <div class="cookie-header">
          <h3>🍪 Χρήση Cookies</h3>
          <p>
            Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας, να αναλύσουμε την κίνηση και να παρέχουμε εξατομικευμένο περιεχόμενο. 
            Κάποια cookies είναι απαραίτητα για τη λειτουργία του ιστότοπου.
          </p>
        </div>
        
        <div v-if="showDetails" class="cookie-details">
          <div class="cookie-type">
            <h4>Απαραίτητα Cookies</h4>
            <p>Απαραίτητα για τη βασική λειτουργία του ιστότοπου. Δεν μπορούν να απενεργοποιηθούν.</p>
          </div>
          <div class="cookie-type">
            <h4>Αναλυτικά Cookies</h4>
            <p>Βοηθούν στην κατανόηση του τρόπου που οι επισκέπτες χρησιμοποιούν τον ιστότοπο (Google Analytics).</p>
          </div>
          <div class="cookie-type">
            <h4>Λειτουργικά Cookies</h4>
            <p>Βελτιώνουν την λειτουργικότητα και την απόδοση του ιστότοπου.</p>
          </div>
        </div>
        
        <div class="cookie-actions">
          <button 
            v-if="!showDetails" 
            class="cookie-btn cookie-btn-secondary" 
            @click="toggleDetails"
          >
            Περισσότερες πληροφορίες
          </button>
          <button 
            v-else 
            class="cookie-btn cookie-btn-secondary" 
            @click="toggleDetails"
          >
            Λιγότερες πληροφορίες
          </button>
          
          <div class="cookie-buttons">
            <button class="cookie-btn cookie-btn-essential" @click="acceptEssentialCookies">
              Απαραίτητα μόνο
            </button>
            <button class="cookie-btn cookie-btn-accept" @click="acceptAllCookies">
              Αποδοχή όλων
            </button>
          </div>
          
          <div class="cookie-footer">
            <a href="#" @click.prevent="openSettings" class="cookie-settings-link">
              Ρυθμίσεις Cookies
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
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #e6e8eb;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  max-width: 90vw;
  width: 480px;
  z-index: 10000;
  font-size: 0.95rem;
  line-height: 1.5;
}

.cookie-content {
  padding: 20px;
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

.slide-up-enter-active, 
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from, 
.slide-up-leave-to {
  transform: translateX(-50%) translateY(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .cookie-consent {
    bottom: 16px;
    left: 16px;
    right: 16px;
    transform: none;
    width: auto;
    max-width: none;
  }
  
  .cookie-content {
    padding: 16px;
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
    bottom: 12px;
    left: 12px;
    right: 12px;
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
