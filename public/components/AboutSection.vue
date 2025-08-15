<script setup>
import { ref } from "vue";

const expanded = ref(false);
</script>

<template>
  <section class="about-root" id="about">
    <div class="about-container">
      <h2 class="about-title">Σχετικά με εμάς</h2>
      <div class="about-content">
        <p>
          Η ομάδα της <strong>Handyman 24/7</strong> παρέχει ολοκληρωμένες
          υπηρεσίες τεχνικής υποστήριξης και ανακαίνισης σε Αθήνα και προάστια.
          Με πολυετή εμπειρία στον χώρο, ειδικευόμαστε σε
          <strong>ηλεκτρολογικές και υδραυλικές εργασίες</strong>, βαψίματα,
          τοποθετήσεις πλακιδίων, ξυλουργικές κατασκευές και γενικές επισκευές.
        </p>
        <p>
          Η αξιοπιστία, η άμεση εξυπηρέτηση και η ποιοτική εργασία αποτελούν για
          εμάς προτεραιότητα. Αναλαμβάνουμε μικρές και μεγάλες εργασίες για
          κατοικίες και επαγγελματικούς χώρους, προσφέροντας λύσεις “κλειδί στο
          χέρι”. Η ομάδα μας αποτελείται από εξειδικευμένους τεχνίτες που
          φροντίζουν για κάθε λεπτομέρεια με επαγγελματισμό και υπευθυνότητα.
        </p>
        <div style="text-align: center">
          <button
            v-if="!expanded"
            class="btn btn-outline"
            @click="expanded = true"
            type="button"
            aria-label="Διαβάστε περισσότερα"
          >
            Διαβάστε περισσότερα
          </button>
        </div>
        <transition name="fade">
          <div v-if="expanded">
            <ul class="about-list">
              <li>Ηλεκτρολογικές &amp; Υδραυλικές εργασίες</li>
              <li>Γενικές επισκευές και συντηρήσεις</li>
              <li>Τοποθέτηση πλακιδίων και βαψίματα</li>
              <li>Ξυλουργικές κατασκευές</li>
              <li>Ανακαινίσεις και ολοκληρωμένες λύσεις</li>
            </ul>
             <h2>
              Τεχνικός Αθήνα 24 ώρες – Όλες οι τεχνικές λύσεις με ένα τηλεφώνημα
            </h2>
            <p>
              Χρειάζεστε άμεσα έναν αξιόπιστο τεχνικό για το σπίτι ή την
              επιχείρησή σας; Το <strong>Handyman 24/7</strong> προσφέρει
              ολοκληρωμένες τεχνικές υπηρεσίες σε όλη την Αθήνα και την Αττική,
              διαθέτοντας εξειδικευμένους επαγγελματίες κάθε ειδικότητας. Από
              έμπειρο <strong>ηλεκτρολόγο Αθήνα</strong> και 24ωρο
              <strong>υδραυλικό Αθήνα</strong> μέχρι τεχνίτες για ανακαινίσεις,
              καλύπτουμε κάθε σας ανάγκη, <strong>24 ώρες το 24ωρο</strong>, 7
              ημέρες την εβδομάδα. <strong>Καλέστε μας τώρα</strong> και λάβετε
              άμεση εξυπηρέτηση όπου κι αν βρίσκεστε – κέντρο ή
              <strong>στα προάστια</strong>!
            </p>

            <ul>
              <li>
                <strong>24ωρη Άμεση Εξυπηρέτηση:</strong> Είμαστε διαθέσιμοι
                κάθε ώρα και στιγμή, ακόμα και Κυριακές και αργίες. Η ομάδα μας
                ανταποκρίνεται σε επείγοντα περιστατικά μέσα σε ελάχιστο χρόνο,
                γιατί κάθε λεπτό μετράει.
              </li>
              <li>
                <strong>Έμπειροι & Πιστοποιημένοι Τεχνικοί:</strong> Κάθε μέλος
                της ομάδας μας διαθέτει εκπαίδευση, άδεια και πολυετή εμπειρία.
                Ο κατάλληλος ειδικός (ηλεκτρολόγος, υδραυλικός, κ.λπ.) θα
                αντιμετωπίσει το πρόβλημά σας με επαγγελματισμό και
                υπευθυνότητα.
              </li>
              <li>
                <strong>Κάλυψη σε όλη την Αθήνα &amp; Αττική:</strong>
                Εξυπηρετούμε τόσο το κέντρο της Αθήνας όσο και όλα τα προάστια.
                Όπου κι αν βρίσκεστε (Βόρεια, Νότια, Ανατολικά ή Δυτικά
                προάστια), έχουμε τον κατάλληλο τεχνικό για εσάς, άμεσα στο χώρο
                σας.
              </li>
              <li>
                <strong>Εγγυημένη Ποιότητα:</strong> Δίνουμε έμφαση στη
                λεπτομέρεια και χρησιμοποιούμε ποιοτικά υλικά. Κάθε εργασία
                συνοδεύεται από εγγύηση καλής λειτουργίας, ώστε να έχετε το
                κεφάλι σας ήσυχο.
              </li>
              <li>
                <strong>Προσιτές Τιμές &amp; Δωρεάν Εκτίμηση:</strong>
                Προσφέρουμε ανταγωνιστικές τιμές χωρίς κρυφές χρεώσεις.
                <strong>Ζητήστε δωρεάν εκτίμηση</strong> κόστους σήμερα και
                ενημερωθείτε εκ των προτέρων, χωρίς καμία υποχρέωση.
              </li>
            </ul>

            

            

            <p>
              Με το <strong>Handyman 24/7</strong>, βρίσκετε εύκολα τον ειδικό
              που χρειάζεστε: <strong>ηλεκτρολόγος Αθήνα</strong>,
              <strong>υδραυλικός Αθήνα</strong>, τεχνίτες για
              <strong>τοποθέτηση πλακιδίων Αθήνα</strong> ή
              <strong>βάψιμο σπιτιού Αθήνα</strong>, έμπειρος
              <strong>ξυλουργός Αθήνα</strong>, ολοκληρωμένες
              <strong>ανακαινίσεις σπιτιών Αθήνα</strong> και
              <strong>συντηρήσεις κτιρίων Αθήνα</strong> (καθώς και
              <strong>επισκευές κατοικιών Αττική</strong>). Ό,τι κι αν
              χρειάζεται ο χώρος σας, είμαστε ο αξιόπιστος συνεργάτης σας για
              όλες τις τεχνικές εργασίες, με ένα απλό τηλεφώνημα!
            </p>

            <div style="text-align: center">
              <button
                class="btn btn-outline btn-collapse"
                @click="expanded = false"
                type="button"
                aria-label="Σύμπτυξη περιεχομένου"
              >
                Σύμπτυξη
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-root {
  background: #f8fafb;
  padding: 68px 0 44px 0;
  width: 100vw;
}

.about-container {
  max-width: 940px;
  margin: 0 auto;
  padding: 0 40px;
}

.about-title {
  font-size: 2.12rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: #044877;
  letter-spacing: 0.02em;
  text-align: center;
}

.about-content {
  font-size: 1.14rem;
  color: #243648;
  font-weight: 400;
  line-height: 1.65;
  text-align: justify;
}

.about-content p {
  margin-bottom: 18px;
}

.about-list {
  list-style: disc inside;
  margin-bottom: 22px;
  color: #0d345a;
  font-size: 1.09rem;
  padding-left: 0;
  line-height: 1.45;
}

.about-list li {
  margin-bottom: 6px;
  padding-left: 4px;
  font-weight: 500;
}

.about-seo {
  font-size: 1.08rem;
  margin-top: 12px;
  color: #e92127;
  font-weight: 600;
  text-align: center;
}
.about-readmore {
  display: inline-block;
  cursor: pointer;
  color: #044877;
  font-weight: 600;
  margin: 10px 0;
  border-bottom: 1px dashed #044877;
  transition: color 0.2s;
}
.about-readmore:hover {
  color: #e92127;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-decoration: none;
  min-width: 180px;
  padding: 12px 12px;
  border-radius: 5px;
  font-size: 1.07rem;
  border: 2px solid #fff;
  background: transparent;
  color: #044877;
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
  border: 2px solid #044877;
}

.btn-outline:hover:enabled {
  background: #044877;
  color: #fff;
}

.btn:disabled {
  opacity: 0.68;
  pointer-events: none;
}

@media (max-width: 768px) {
  .about-container {
    padding: 0 16px;
  }
  .about-title {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  .about-root {
    padding: 3rem 0 2rem 0;
  }
  .about-content {
    font-size: 1rem;
    line-height: 1.6;
    text-align: left;
  }
  .about-list {
    font-size: 0.95rem;
  }
  .btn {
    width: 100%;
    max-width: 280px;
    padding: 14px 20px;
    font-size: 1rem;
    border-radius: 8px;
    font-weight: 600;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 0 12px;
  }
  .about-root {
    padding: 2rem 0 1.5rem 0;
  }
  .about-title {
    font-size: 1.6rem;
    margin-bottom: 16px;
  }
  .about-content {
    font-size: 0.95rem;
  }
  .about-list {
    font-size: 0.9rem;
  }
  .btn {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
}
@media (max-width: 425px) {
  .about-container {
    padding: 0 4vw;
  }

  .about-title {
    font-size: 1.05rem;
    margin-bottom: 13px;
  }

  .about-content {
    font-size: 0.99rem;
    line-height: 1.43;
    padding-left: 12px;
    padding-right: 10px;
    text-align: justify;
  }

  .about-content p {
    margin-bottom: 12px;
  }

  .about-list,
  .about-content ul {
    padding-left: 18px;
  }

  .about-list li,
  .about-content ul li {
    margin-bottom: 5px;
    font-weight: 500;
    padding-left: 2px;
  }

  h2, .about-title {
    font-size: 1.13rem;
  }
  .btn {
    min-width: 0;
    width: 75%;
    font-size: 1rem;
    padding: 12px 0;
  }
  .btn.btn-collapse {
    min-width: 0;
    width: 50%;
  }
}
</style>
