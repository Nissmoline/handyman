// Утилита для управления cookies и согласием пользователя

export const CookieManager = {
  // Проверяет, дал ли пользователь согласие на cookies
  hasConsent() {
    const consent = localStorage.getItem('cookie_consent')
    return consent === 'all' || consent === 'essential'
  },

  // Устанавливает согласие пользователя
  setConsent() {
    localStorage.setItem('cookie_consent', 'all')
    localStorage.setItem('cookie_consent_date', new Date().toISOString())
    this.enableAnalytics()
  },

  // Включает Google Analytics
  enableAnalytics() {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      })
    }
    
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'cookie_consent_granted'
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
    this.enableAnalytics()
  },

  // Проверяет, нужно ли показать баннер согласия
  shouldShowBanner() {
    return !this.hasConsent()
  }
}

// Экспортируем для использования в компонентах
export default CookieManager
