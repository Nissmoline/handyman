// Утилита для управления cookies и согласием пользователя

export const CookieManager = {
  // Проверяет, дал ли пользователь согласие на cookies
  hasConsent(type = 'all') {
    const consent = localStorage.getItem('cookie_consent')
    if (type === 'all') {
      return consent === 'all'
    } else if (type === 'essential') {
      return consent === 'essential' || consent === 'all'
    }
    return false
  },

  // Устанавливает согласие пользователя
  setConsent(type) {
    localStorage.setItem('cookie_consent', type)
    localStorage.setItem('cookie_consent_date', new Date().toISOString())
    
    // Включаем аналитику если пользователь согласился на все
    if (type === 'all') {
      this.enableAnalytics()
    }
  },

  // Включает Google Analytics
  enableAnalytics() {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      })
    }
    
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'cookie_consent_granted'
      })
    }
  },

  // Отключает аналитику
  disableAnalytics() {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      })
    }
  },

  // Получает дату согласия
  getConsentDate() {
    return localStorage.getItem('cookie_consent_date')
  },

  // Удаляет согласие (для тестирования)
  clearConsent() {
    localStorage.removeItem('cookie_consent')
    localStorage.removeItem('cookie_consent_date')
    this.disableAnalytics()
  },

  // Проверяет, нужно ли показать баннер согласия
  shouldShowBanner() {
    return !this.hasConsent('essential')
  }
}

// Экспортируем для использования в компонентах
export default CookieManager
