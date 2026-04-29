export const CookieManager = {
  hasConsent() {
    const consent = localStorage.getItem('cookie_consent')
    return consent === 'all'
  },

  setConsent() {
    localStorage.setItem('cookie_consent', 'all')
    localStorage.setItem('cookie_consent_date', new Date().toISOString())
    this.enableAnalytics()
  },

  enableAnalytics() {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'cookie_consent_granted',
      })
    }
  },

  disableAnalytics() {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
    }
  },

  getConsentDate() {
    return localStorage.getItem('cookie_consent_date')
  },

  clearConsent() {
    localStorage.removeItem('cookie_consent')
    localStorage.removeItem('cookie_consent_date')
    this.disableAnalytics()
  },

  shouldShowBanner() {
    return !this.hasConsent()
  },
}

export default CookieManager
