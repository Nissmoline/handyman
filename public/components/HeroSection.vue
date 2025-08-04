<script setup>
import { ref, inject } from 'vue'

const openAppointmentPopup = inject('openAppointmentPopup')
</script>

<template>
  <section class="hero-root">
    <div class="hero-main">
  <div class="hero-content">
    <div class="hero-left">
      <h1>
        Ηλεκτρολόγος Αθήνα 24/7<br /><span>Επείγων Ηλεκτρολόγος Κοντά Μου</span>
      </h1>
      <div class="hero-desc">
        <strong>Ηλεκτρολόγος Αθήνα 24/7</strong> - Επείγων ηλεκτρολόγος κοντά μου, διαθέσιμος ηλεκτρολόγος 24/7.<br />
        Αναζήτηση ηλεκτρολόγου, ηλεκτρολογικές κατασκευές, άμεση εξυπηρέτηση ηλεκτρολόγου.<br /><br />
        • Εμπειρία – Συνέπεια – Άμεση εξυπηρέτηση ηλεκτρολόγου<br />
        • Μικρές και μεγάλες εργασίες χωρίς καθυστερήσεις
      </div>

      <div class="hero-buttons">
        <a href="tel:+306949214461" class="btn btn-outline">ΚΑΛΕΣΤΕ ΜΑΣ ΤΩΡΑ</a>
        <button class="btn btn-outline" @click="openAppointmentPopup()">ΚΛΕΙΣΤΕ ΡΑΝΤΕΒΟΥ</button>
      </div>
    </div>
    <div class="hero-right">
      <img src="@/assets/heromain.png" alt="Handyman" />
    </div>
  </div>
</div>


    <div class="hero-offer">
      <div class="offer-main">
        ΕΙΔΙΚΗ ΠΡΟΣΦΟΡΑ: <span> <br>ΣΥΝΔΕΣΗ ΦΟΥΡΝΟΥ ΑΠΟ 27,99€</span>
      </div>
      <div class="offer-title">
        ΣΥΝΔΕΣΗ ΦΟΥΡΝΟΥ &amp; ΗΛΕΚΤΡΙΚΗΣ ΕΣΤΙΑΣ ΑΠΟ 37,99€
        <span class="offer-note">(ΑΠΟ ΗΛΕΚΤΡΟΛΟΓΟ ΕΓΚΑΤΑΣΤΑΤΗ)</span>
      </div>
      <div class="offer-icons">
        <span class="offer-check">✔</span>
        ΑΜΕΣΑ - ΜΕ ΑΣΦΑΛΕΙA &amp; ΕΠΑΓΓΕΛΜΑΤΙΚΑ
      </div>
      <div class="offer-bottom">
        <!-- <span class="offer-strong">ΚΛΕΙΣΤΕ ΡΑΝΤΕΒΟΥ ΤΩΡΑ</span> -->
        <button class="btn btn-outline" @click="openAppointmentPopup()">ΚΛΕΙΣΤΕ ΡΑΝΤΕΒΟΥ ΤΩΡΑ</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-root {
  width: 100%;
  background: #fff;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 64px;
}
.hero-main {
  width: 100vw;
  background: #044877;
  display: flex;
  justify-content: center;
}
.hero-content {
  max-width: 1060px;
  width: 100%;
  display: flex;
  align-items: stretch;
  padding: 64px 40px 72px 40px;
  margin: 0 auto;
  box-sizing: border-box;
}
.hero-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  padding-top: 8px;
}
.hero-left h1 {
  font-size: 2.65rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  line-height: 1.08;
}
.hero-left h1 span {
  font-weight: 700;
  font-size: 2.05rem;
  display: block;
  margin-top: 0.17em;
}
.hero-desc {
  font-size: 1.13rem;
  margin-bottom: 34px;
  line-height: 1.43;
  font-weight: 400;
  letter-spacing: 0.005em;
}
.hero-buttons {
  display: flex;
  gap: 18px;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-decoration: none;
  min-width: 180px;
  padding: 12px 10px;
  border-radius: 5px;
  font-size: 1.07rem;
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  transition: 0.19s;
  letter-spacing: 0.01em;
  font-family: inherit;
  line-height: 1.1;
  box-sizing: border-box;
}

.btn-outline {
  background: transparent;
  border: 2px solid #fff;
}
.btn-outline:hover {
  background: #fff;
  color: #044877;
}
.hero-right {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  min-width: 290px;
}
.hero-right img {
  max-width: 345px;
  width: 100%;
  height: auto;
  border-radius: 0;
  object-fit: cover;
  margin-left: 28px;
  margin-bottom: -12px;
}

/* RED OFFER */
.hero-offer {
  position: relative;
  z-index: 2;
  max-width: 770px;
  width: 88vw;
  margin: -60px auto 0 auto;
  background: #c1121c; 
  border-radius: 18px;
  box-shadow: 0 6px 30px 0 rgba(233,33,39,0.14);
  padding: 36px 32px 22px 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.offer-main {
  font-size: 1.36rem;
  font-weight: 700;
  margin-bottom: 2px;
  letter-spacing: 0.01em;
}
.offer-main span {
  font-weight: 900;
  color: #fff;
  font-size: 1.21em;
}
.offer-title {
  font-size: 1.26rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 2px;
  line-height: 1.22;
}
.offer-note {
  display: block;
  font-size: 1.04rem;
  font-weight: 400;
  text-transform: none;
  margin-top: 2px;
}
.offer-icons {
  font-size: 1.06rem;
  font-weight: 700;
  margin-top: 6px;
  margin-bottom: 2px;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 10px;
}
.offer-check {
  font-size: 1.19em;
  margin-right: 5px;
}
.offer-bottom {
  font-size: 1.11rem;
  margin-top: 6px;
  font-weight: 400;
  letter-spacing: 0.01em;
  width: 100%;
  display: flex;
  justify-content: center;
}
.offer-strong {
  font-weight: 700;
  color: #fff;
}
@media (max-width: 1060px) {
  .hero-content {
    max-width: 99vw;
    padding: 36px 6vw 80px 6vw;
  }
  .hero-offer {
    width: 80vw;
    max-width: 99vw;
    padding: 22px 4vw 12px 4vw;
  }
}

@media (max-width: 950px) {
  .hero-offer {
    margin: -38px auto 0 auto;
  }
}

@media (max-width: 750px) {
  .hero-content {
    flex-direction: column;
    padding: 20px 16px 40px;
    align-items: center;
    text-align: center;
    justify-content: center;
    min-height: auto;
  }
  .hero-left {
    padding-top: 0;
    width: 100%;
    max-width: 100%;
  }
  .hero-left h1 {
    font-size: 2rem;
    line-height: 1.1;
    margin-bottom: 20px;
    text-align: center;
  }
  .hero-left h1 span {
    font-size: 1.6rem;
    margin-top: 0.2em;
    text-align: center;
  }
  .hero-desc {
    font-size: 1rem;
    margin-bottom: 24px;
    line-height: 1.5;
    text-align: center;
  }
  .hero-right {
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    min-width: auto;
  }
  .hero-right img {
    max-width: 280px;
    width: 100%;
    margin-left: 0;
    margin-bottom: 0;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  .hero-offer {
    margin: -40px 16px 0;
    padding: 20px 16px;
    border-radius: 12px;
    background: linear-gradient(135deg, #c1121c 0%, #a50f17 100%);
    box-shadow: 0 8px 24px rgba(193, 18, 28, 0.3);
    width: calc(100% - 32px);
    max-width: 100%;
    align-items: center;
  }
  .hero-buttons {
    flex-direction: column;
    gap: 12px;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    padding-top: 10px;
  }
  .btn {
    width: 100%;
    max-width: 280px;
    padding: 14px 20px;
    font-size: 1rem;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .offer-main {
    font-size: 1.1rem;
    margin-bottom: 8px;
    text-align: center;
  }
  .offer-title {
    font-size: 1rem;
    line-height: 1.3;
    text-align: center;
  }
  .offer-note {
    font-size: 0.9rem;
    margin-top: 4px;
  }
  .offer-icons {
    font-size: 0.95rem;
    margin: 12px 0;
    text-align: center;
  }
  .offer-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .offer-bottom .btn {
    width: 100%;
    margin-top: 8px;
  }
}
@media (max-width: 500px) {
  .hero-content {
    padding: 16px 12px 32px;
    text-align: center;
  }
  .hero-left {
    width: 100%;
    text-align: center;
  }
  .hero-left h1 {
    font-size: 1.8rem;
    text-align: center;
  }
  .hero-left h1 span {
    font-size: 1.4rem;
    text-align: center;
  }
  .hero-desc {
    font-size: 0.95rem;
    text-align: center;
  }
  .btn {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
  .hero-right {
    width: 100%;
    justify-content: center;
  }
  .hero-right img {
    max-width: 240px;
  }
  .hero-offer {
    margin: -30px 12px 0;
    padding: 16px 12px;
    border-radius: 12px;
    width: calc(100% - 24px);
    align-items: center;
  }
  .offer-main {
    text-align: center;
  }
  .offer-title {
    text-align: center;
  }
  .offer-icons {
    text-align: center;
  }
  .offer-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 12px 8px 24px;
    text-align: center;
  }
  .hero-left {
    width: 100%;
    text-align: center;
  }
  .hero-left h1 {
    font-size: 1.6rem;
    text-align: center;
  }
  .hero-left h1 span {
    font-size: 1.3rem;
    text-align: center;
  }
  .hero-desc {
    font-size: 0.9rem;
    margin-bottom: 20px;
    text-align: center;
  }
  .hero-right {
    width: 100%;
    justify-content: center;
  }
  .hero-right img {
    max-width: 200px;
  }
  .hero-offer {
    margin: -25px 8px 0;
    padding: 14px 10px;
    width: calc(100% - 16px);
    align-items: center;
  }
  .offer-main {
    font-size: 1rem;
    text-align: center;
  }
  .offer-title {
    font-size: 0.9rem;
    text-align: center;
  }
  .offer-note {
    font-size: 0.8rem;
  }
  .offer-icons {
    font-size: 0.85rem;
    text-align: center;
  }
  .offer-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
