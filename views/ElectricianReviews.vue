<template>
  <div class="service-page">
    <div class="service-container">
      <h1>{{ t('electricianReviews.title') }}</h1>
      
      <div class="service-intro">
        <p v-html="t('electricianReviews.intro')"></p>
      </div>
      
      <div class="reviews-section">
        <div v-for="(review, index) in reviewsList" :key="index" class="review-item">
          <div class="review-header">
            <div class="review-stars">{{ review.stars }}</div>
            <div class="review-author">{{ review.author }}</div>
            <div class="review-date">{{ review.date }}</div>
          </div>
          <div class="review-content">
            <p v-html="review.content"></p>
          </div>
        </div>
      </div>
      
      <div class="contact-section">
        <h2>{{ t('electricianReviews.contact.title') }}</h2>
        <p v-html="t('electricianReviews.contact.description')"></p>
        
        <div class="contact-buttons">
          <a href="tel:+306949214461" class="btn btn-primary">{{ t('electricianReviews.contact.callNow') }}</a>
          <a href="https://wa.me/306949214461" class="btn btn-secondary">{{ t('electricianReviews.contact.whatsapp') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

// Get reviews list from translations
const reviewsList = computed(() => {
  const reviews = tm('electricianReviews.reviews')
  return Array.isArray(reviews) ? reviews : []
})
</script>

<style scoped>
@import '@/assets/service-pages.css';

.reviews-section {
  margin: 40px 0;
}

.review-item {
  margin-bottom: 30px;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #044877;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.review-stars {
  font-size: 1.2rem;
}

.review-author {
  font-weight: 600;
  color: #044877;
}

.review-date {
  color: #666;
  font-size: 0.9rem;
}

.review-content p {
  margin-bottom: 0;
  line-height: 1.5;
  font-style: italic;
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
  .review-item {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .review-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .contact-section {
    padding: 25px 20px;
  }
}

@media (max-width: 480px) {
  .review-item {
    padding: 15px;
    margin-bottom: 15px;
  }
  
  .review-header {
    gap: 6px;
  }
  
  .review-stars {
    font-size: 1rem;
  }
  
  .contact-section {
    padding: 20px 15px;
  }
}
</style> 