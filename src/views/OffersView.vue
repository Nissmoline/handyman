<script setup>
import { CheckCircle } from 'lucide-vue-next'
</script>

<template>
  <main class="offers-root">
    <h2 class="offers-title">Οι προσφορές μας</h2>
    <div class="offers-container">

      <!-- Блок 1 -->
      <section class="offers-section">
        <h3 class="offers-section-title">Εντοιχιζόμενες κουζίνες &amp; εστίες</h3>
        <div class="offers-cards-row">
          <!-- Карточка 1 -->
          <div class="offer-card">
            <h4>Σύνδεση εντοιχιζόμενης κουζίνας</h4>
            <div class="offer-price">από <b>27,99€</b></div>
            <ul class="offer-features">
              <li><CheckCircle :size="18" class="icon-check" /> Άμεση τοποθέτηση &amp; σύνδεση</li>
              <li><CheckCircle :size="18" class="icon-check" /> Έλεγχος καλής λειτουργίας</li>
              <li><CheckCircle :size="18" class="icon-check" /> Τεχνικός με άδεια ηλεκτρολόγου</li>
            </ul>
          </div>
          <!-- Карточка 2 -->
          <div class="offer-card">
            <h4>Σύνδεση εντοιχιζόμενης εστίας</h4>
            <div class="offer-price">από <b>27,99€</b></div>
            <ul class="offer-features">
              <li><CheckCircle :size="18" class="icon-check" /> Σύνδεση κεραμικών ή επαγωγικών εστιών</li>
              <li><CheckCircle :size="18" class="icon-check" /> Έλεγχος &amp; δοκιμή λειτουργίας</li>
              <li><CheckCircle :size="18" class="icon-check" /> Έμπειρος ηλεκτρολόγος</li>
            </ul>
          </div>
        </div>

        <!-- Преимущества -->
        <ul class="offer-advantages">
          <li>⚡ Εγγυημένη ασφάλεια και λειτουργικότητα</li>
          <li>✔ Επίσημο παραστατικό εργασιών</li>
          <li>🚗 Άμεση εξυπηρέτηση σε όλη την Αττική</li>
        </ul>

        <!-- Комбинированная карточка -->
        <div class="offer-card offer-set">
          <h4>Σύνδεση κουζίνας &amp; εστίας (σετ)</h4>
          <div class="offer-price-set">μόνο <b>37,99€</b></div>
          <div class="offer-set-desc">
            <b>Συμφέρει!</b> Περιλαμβάνει σύνδεση κουζίνας και εστίας στην ίδια επίσκεψη, με όλες τις παροχές &amp; τελικό έλεγχο από αδειούχο ηλεκτρολόγο.
          </div>
        </div>
      </section>

      <!-- Блок 2 -->
      <section class="offers-section">
        <h3 class="offers-section-title">Εντοιχιζόμενες απορροφητήρες (εξαερισμός)</h3>
        <div class="offers-cards-row">
          <div class="offer-card">
            <h4>Τοποθέτηση &amp; σύνδεση απορροφητήρα</h4>
            <div class="offer-price">από <b>24,99€</b></div>
            <ul class="offer-features">
              <li><CheckCircle :size="18" class="icon-check" /> Τοποθέτηση όλων των τύπων</li>
              <li><CheckCircle :size="18" class="icon-check" /> Βέλτιστη σύνδεση εξαερισμού</li>
              <li><CheckCircle :size="18" class="icon-check" /> Έλεγχος λειτουργίας</li>
            </ul>
          </div>
          <div class="offer-card">
            <h4>Αντικατάσταση παλιού απορροφητήρα</h4>
            <div class="offer-price">από <b>24,99€</b></div>
            <ul class="offer-features">
              <li><CheckCircle :size="18" class="icon-check" /> Αφαίρεση παλιού &amp; εγκατάσταση νέου</li>
              <li><CheckCircle :size="18" class="icon-check" /> Πλήρης δοκιμή</li>
              <li><CheckCircle :size="18" class="icon-check" /> Εξειδικευμένοι τεχνίτες</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Disclaimer -->
      <div class="offers-disclaimer">
        * Οι τιμές αφορούν στάνταρ εγκαταστάσεις εντός Αττικής. Σε εξειδικευμένες περιπτώσεις, ενδέχεται να υπάρξει επιπλέον χρέωση κατόπιν συνεννόησης.<br>
        Οι τιμές περιλαμβάνουν ΦΠΑ &amp; έκδοση απόδειξης.
      </div>
    </div>
  </main>
</template>

<style scoped>
.offers-root {
  background: #f9fbfc;
  min-height: 100vh;
  padding: 38px 0 24px 0;
}
.offers-title {
  text-align: center;
  font-size: 2.1rem;
  color: #e92127;
  font-weight: 900;
  margin-bottom: 36px;
  letter-spacing: 0.01em;
}
.offers-container {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 28px;
  box-sizing: border-box;
}
.offers-section {
  margin-bottom: 44px;
}
.offers-section-title {
  font-size: 1.28rem;
  color: #044877;
  background: #e6eef6;
  font-weight: 700;
  padding: 14px 16px;
  border-radius: 7px;
  margin-bottom: 18px;
  letter-spacing: 0.01em;
}
.offers-cards-row {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.offer-card {
  background: #fff;
  border: 1.5px solid #e6e8eb;
  border-radius: 11px;
  box-shadow: 0 4px 20px rgba(50,70,100,0.07);
  flex: 1 1 260px;
  min-width: 260px;
  max-width: 330px;
  padding: 24px 20px 18px 20px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.offer-card h4 {
  color: #044877;
  font-size: 1.13rem;
  font-weight: 700;
  margin-bottom: 7px;
}
.offer-price,
.offer-price-set {
  font-size: 1.29rem;
  color: #e92127;
  font-weight: 800;
  margin-bottom: 7px;
  margin-top: 3px;
}
.offer-price-set {
  font-size: 1.32rem;
}
.offer-features {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #26304a;
  font-size: 1.02rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.icon-check {
  color: #16bb45;
  margin-right: 7px;
  vertical-align: middle;
}
.offer-advantages {
  margin: 14px 0 22px 0;
  padding-left: 2px;
  color: #044877;
  font-size: 1.04rem;
  list-style: none;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}
.offer-advantages li {
  display: flex;
  align-items: center;
  gap: 4px;
}
.offer-set {
  background: #e9fff3;
  border: 2px solid #20ba7c;
  margin-top: 16px;
}
.offer-set-desc {
  color: #0d345a;
  font-size: 1.06rem;
  margin-top: 6px;
}
.offers-disclaimer {
  margin-top: 44px;
  font-size: 0.97rem;
  color: #888;
  text-align: center;
  opacity: 0.9;
}

@media (max-width: 900px) {
  .offers-cards-row {
    flex-direction: column;
    gap: 18px;
  }
  .offer-card {
    min-width: 0;
    max-width: 100%;
    width: 100%;
  }
  .offer-advantages {
    gap: 13px;
    flex-direction: column;
    align-items: flex-start;
  }
}
@media (max-width: 600px) {
  .offers-container {
    padding: 0 6vw;
  }
  .offers-title {
    font-size: 1.36rem;
    margin-bottom: 18px;
  }
  .offers-section-title {
    font-size: 1.04rem;
    padding: 11px 8px;
    margin-bottom: 11px;
  }
  .offer-card h4 {
    font-size: 1.01rem;
  }
}
</style>
