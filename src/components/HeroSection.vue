<script setup>
import { ref } from 'vue'
import AppointmentPopup from './AppointmentPopup.vue'

const showPopup = ref(false)
</script>

<template>
  <section class="hero-root">
    <div class="hero-main">
  <div class="hero-content">
    <div class="hero-left">
      <h1>
        Άμεση Τεχνική Υποστήριξη<br /><span>στο χώρο σας!</span>
      </h1>
      <div class="hero-desc">
        Ηλεκτρολογικά – Υδραυλικά – Βαφές – Γυψοσανίδες – Ξυλουργικές Κατασκευές – Γενικές Επισκευές.<br />
        Αναλαμβάνουμε κατοικίες & επαγγελματικούς χώρους.<br /><br />
        • Εμπειρία – Συνέπεια – Άμεση εξυπηρέτηση<br />
        • Μικρές και μεγάλες εργασίες χωρίς καθυστερήσεις
      </div>

      <div class="hero-buttons">
        <a href="tel:+306973858321" class="btn btn-outline">ΚΑΛΕΣΤΕ ΜΑΣ ΤΩΡΑ</a>
        <button class="btn btn-outline" @click="showPopup = true">ΚΛΕΙΣΤΕ ΡΑΝΤΕΒΟΥ</button>
      </div>
    </div>
    <div class="hero-right">
      <img src="@/assets/heromain.png" alt="Handyman" />
    </div>
  </div>
</div>


    <div class="hero-offer">
      <div class="offer-main">
        ΕΙΔΙΚΗ ΠΡΟΣΦΟΡΑ: <span> <br>ΣΥΝΔΕΣΗ ΦΟΥΡΝΟΥ €27,99</span>
      </div>
      <div class="offer-title">
        ΣΥΝΔΕΣΗ ΦΟΥΡΝΟΥ &amp; ΗΛΕΚΤΡΙΚΗΣ ΕΣΤΙΑΣ €37,99
        <span class="offer-note">(ΑΠΟ ΗΛΕΚΤΡΟΛΟΓΟ ΕΓΚΑΤΑΣΤΑΤΗ)</span>
      </div>
      <div class="offer-icons">
        <span class="offer-check">✔</span>
        ΑΜΕΣΑ - ΜΕ ΑΣΦΑΛΕΙΣ - ΕΠΑΓΓΕΛΜΑΤΙΚΑ
      </div>
      <div class="offer-bottom">
        <!-- <span class="offer-strong">ΚΛΕΙΣΤΕ ΡΑΝΤΕΒΟΥ ΤΩΡΑ</span> -->
        <button class="btn btn-outline" @click="showPopup = true">ΚΛΕΙΣΤΕ ΡΑΝΤΕΒΟΥ ΤΩΡΑ</button>
      </div>
    </div>
    <AppointmentPopup v-model:isOpen="showPopup" />
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
  flex: 1.12;
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
  background: #e92127;
  border-radius: 18px;
  box-shadow: 0 6px 30px 0 rgba(233,33,39,0.14);
  padding: 36px 32px 22px 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
    padding: 24px 2vw 42px 2vw;
    align-items: center; 
  }
  .hero-left {
    padding-top: 0;
  }
  .hero-right {
    justify-content: center;
    align-items: flex-end;
    margin-top: 26px;
  }
  .hero-right img {
    max-width: 80vw;
    margin-left: 0;
    margin-bottom: 0;
  }
  .hero-offer {
    margin-top: -85px;
    padding: 13px 2vw 11px 2vw;
  }
  .hero-buttons {
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px 18px;
    margin: 0 auto;
    width: 100%;
    padding-top: 10px;
  }
  .btn {
    width: auto;
    min-width: 140px;
    padding: 12px 12px;
    font-size: 1.04rem;
    margin: 0;
  }
}
@media (max-width: 500px) {
  .hero-content {
    padding: 12px 6vw 32px 6vw;
  }
  .hero-offer {
    margin: -60px auto 0 auto;
    width: 90vw;
    padding: 7vw 7vw 7vw 7vw;
    border-radius: 12px;
  }

}
</style>
