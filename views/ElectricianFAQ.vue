<template>
  <div class="service-page">
    <div class="service-container">
      <h1>{{ t('electricianFaq.title') }}</h1>
      
      <div class="service-intro">
        <p v-html="t('electricianFaq.intro')"></p>
      </div>
      
      <div class="faq-section">
        <div v-for="(faq, index) in faqsList" :key="index" class="faq-item">
          <h3>{{ faq.question }}</h3>
          <p v-html="faq.answer"></p>
        </div>
      </div>
      
      <div class="contact-section">
        <h2>{{ t('electricianFaq.contact.title') }}</h2>
        <p v-html="t('electricianFaq.contact.description')"></p>
        
        <div class="contact-buttons">
          <a href="tel:+306949214461" class="btn btn-primary">{{ t('electricianFaq.contact.callNow') }}</a>
          <a href="https://wa.me/306949214461" class="btn btn-secondary">{{ t('electricianFaq.contact.whatsapp') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

// Get FAQ list from translations
const faqsList = computed(() => {
  const faqs = tm('electricianFaq.faqs')
  return Array.isArray(faqs) ? faqs : []
})
</script>

<style scoped>
@import '@/assets/service-pages.css';

.faq-section {
  margin: 40px 0;
}

.faq-item {
  margin-bottom: 30px;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #044877;
}

.faq-item h3 {
  color: #044877;
  margin-bottom: 15px;
  font-size: 1.3rem;
  font-weight: 600;
}

.faq-item p {
  margin-bottom: 0;
  line-height: 1.5;
}

.contact-section {
  margin-top: 40px;
  padding: 30px;
  background: #e8f5e8;
  border-radius: 12px;
  border-left: 4px solid #28a745;
  text-align: center;
}

.contact-section h2 {
  margin-top: 0;
  margin-bottom: 15px;
}

.contact-section p {
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .faq-item {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .faq-item h3 {
    font-size: 1.1rem;
  }
  
  .contact-section {
    padding: 25px 20px;
  }
}

@media (max-width: 480px) {
  .faq-item {
    padding: 15px;
    margin-bottom: 15px;
  }
  
  .faq-item h3 {
    font-size: 1rem;
  }
  
  .contact-section {
    padding: 20px 15px;
  }
}
</style> 