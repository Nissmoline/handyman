<template>
  <div class="service-page">
    <div class="service-container">
      <h1>Κριτικές Πελατών - Ηλεκτρολόγος Αθήνα 24/7 | Αξιολογήσεις</h1>
      
      <div class="service-intro">
        <p>
          Δείτε τι λένε οι πελάτες μας για τις <strong>ηλεκτρολογικές υπηρεσίες</strong> μας. 
          Ως <strong>επείγον ηλεκτρολόγος κοντά μου</strong>, είμαστε περήφανοι για την εμπιστοσύνη των πελατών μας.
        </p>
      </div>
      
      <div class="reviews-section">
        <div class="review-item">
          <div class="review-header">
            <div class="review-stars">⭐⭐⭐⭐⭐</div>
            <div class="review-author">Μαρία Κ.</div>
            <div class="review-date">2 ημέρες πριν</div>
          </div>
          <div class="review-content">
            <p>
              "Αναζήτηση ηλεκτρολόγου τελείωσε εδώ! Επαγγελματικές <strong>ηλεκτρολογικές κατασκευές</strong> 
              και διαφανείς τιμές. Ο <strong>επείγον ηλεκτρολόγος</strong> μας έλυσε το πρόβλημα σε λίγες ώρες."
            </p>
          </div>
        </div>
        
        <div class="review-item">
          <div class="review-header">
            <div class="review-stars">⭐⭐⭐⭐⭐</div>
            <div class="review-author">Γιώργος Π.</div>
            <div class="review-date">1 εβδομάδα πριν</div>
          </div>
          <div class="review-content">
            <p>
              "Διαθέσιμος ηλεκτρολόγος 24/7 που πραγματικά αξίζει! Επείγον ηλεκτρολόγος κοντά μου 
              με άμεση εξυπηρέτηση ηλεκτρολόγου. Πολύ ευχαριστημένη από την ποιότητα της δουλειάς."
            </p>
          </div>
        </div>
        
        <div class="review-item">
          <div class="review-header">
            <div class="review-stars">⭐⭐⭐⭐⭐</div>
            <div class="review-author">Ελένη Μ.</div>
            <div class="review-date">2 εβδομάδες πριν</div>
          </div>
          <div class="review-content">
            <p>
              "Άψογη εξυπηρέτηση! Ο <strong>ηλεκτρολόγος κοντά</strong> μας έλυσε το πρόβλημα 
              με το ηλεκτρολογικό πίνακα σε λιγότερο από μία ώρα. Σίγουρα θα τους καλέσω ξανά."
            </p>
          </div>
        </div>
        
        <div class="review-item">
          <div class="review-header">
            <div class="review-stars">⭐⭐⭐⭐⭐</div>
            <div class="review-author">Νίκος Α.</div>
            <div class="review-date">3 εβδομάδες πριν</div>
          </div>
          <div class="review-content">
            <p>
              "Εξαιρετική εμπειρία! Οι <strong>ηλεκτρολογικές εργασίες</strong> έγιναν με ποιότητα 
              και σε σύντομο χρόνο. Προτείνω ανεπιφύλακτα για κάθε ηλεκτρολογική ανάγκη."
            </p>
          </div>
        </div>
        
        <div class="review-item">
          <div class="review-header">
            <div class="review-stars">⭐⭐⭐⭐⭐</div>
            <div class="review-author">Αννα Δ.</div>
            <div class="review-date">1 μήνα πριν</div>
          </div>
          <div class="review-content">
            <p>
              "Πολύ επαγγελματική ομάδα! Ο <strong>διαθέσιμος ηλεκτρολόγος 24/7</strong> 
              μας έλυσε επείγουσα βλάβη σε λίγες ώρες. Τιμές και ποιότητα υπερβολικές!"
            </p>
          </div>
        </div>
      </div>
      
      <div class="contact-section">
        <h2>📞 Καλέστε τον Ηλεκτρολόγο μας</h2>
        <p>
          Χρειάζεστε <strong>επείγον ηλεκτρολόγος κοντά μου</strong>; Καλέστε μας άμεσα για 
          <strong>άμεση εξυπηρέτηση ηλεκτρολόγου</strong> σε όλη την Αθήνα.
        </p>
        
        <div class="contact-buttons">
          <a href="tel:+306949214461" class="btn btn-primary">Καλέστε Ηλεκτρολόγο Άμεσα</a>
          <a href="https://wa.me/306949214461" class="btn btn-secondary">WhatsApp Ηλεκτρολόγος</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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