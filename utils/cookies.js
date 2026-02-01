// Утилита для управления cookies и согласием пользователя

const CONSENT_KEY = 'cookie_consent'
const CONSENT_DATE_KEY = 'cookie_consent_date'
const CONSENT_ALL = 'all'
const CONSENT_ESSENTIAL = 'essential'

const canUseStorage = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined'

const safeGetItem = (key) => {
  if (!canUseStorage()) return null
  try {
    return localStorage.getItem(key)
  } catch (e) {
    return null
  }
}

const safeSetItem = (key, value) => {
  if (!canUseStorage()) return
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    return
  }
}

const safeRemoveItem = (key) => {
  if (!canUseStorage()) return
  try {
    localStorage.removeItem(key)
  } catch (e) {
    return
  }
}

export const CookieManager = {
  getConsent() {
    return safeGetItem(CONSENT_KEY)
  },

  // Проверяет, дал ли пользователь согласие на cookies
  hasConsent() {
    const consent = this.getConsent()
    return consent === CONSENT_ALL || consent === CONSENT_ESSENTIAL
  },

  // Устанавливает согласие пользователя (совместимость)
  setConsent() {
    this.grantConsent()
  },

  grantConsent() {
    safeSetItem(CONSENT_KEY, CONSENT_ALL)
    safeSetItem(CONSENT_DATE_KEY, new Date().toISOString())
    this.enableAnalytics()
  },

  denyConsent() {
    safeSetItem(CONSENT_KEY, CONSENT_ESSENTIAL)
    safeSetItem(CONSENT_DATE_KEY, new Date().toISOString())
    this.disableAnalytics()
  },

  // Включает Google Analytics
  enableAnalytics() {
    if (typeof window === 'undefined') return
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      })
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'cookie_consent_granted'
      })
    }
  },

  // Отключает аналитику и рекламные cookies
  disableAnalytics() {
    if (typeof window === 'undefined') return
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      })
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'cookie_consent_denied'
      })
    }
  },

  applyStoredConsent() {
    const consent = this.getConsent()
    if (consent === CONSENT_ALL) {
      this.enableAnalytics()
      return
    }
    if (consent === CONSENT_ESSENTIAL) {
      this.disableAnalytics()
    }
  },

  // Получает дату согласия
  getConsentDate() {
    return safeGetItem(CONSENT_DATE_KEY)
  },

  // Удаляет согласие (для тестирования)
  clearConsent() {
    safeRemoveItem(CONSENT_KEY)
    safeRemoveItem(CONSENT_DATE_KEY)
    this.disableAnalytics()
  },

  // Проверяет, нужно ли показать баннер согласия
  shouldShowBanner() {
    return !this.hasConsent()
  }
}

// Экспортируем для использования в компонентах
export default CookieManager
