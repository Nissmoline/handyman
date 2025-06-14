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
              Handyman 24/7 – Ο μάστορας που χρειάζεστε σε Αθήνα &amp; Αττική,
              24/7 δίπλα σας
            </h2>
            <p>
              Ψάχνετε για αξιόπιστο τεχνικό στην Αθήνα που να ανταποκρίνεται
              άμεσα; Με το <strong>Handyman 24/7</strong> έχετε δίπλα σας έναν
              έμπειρο μάστορα για κάθε εργασία, διαθέσιμο 24/7 σε όλη την
              Αττική. Από μικροεπισκευές και συντηρήσεις μέχρι πλήρεις
              ανακαινίσεις, οι εξειδικευμένοι επαγγελματίες μας (ηλεκτρολόγοι,
              υδραυλικοί, ξυλουργοί κ.ά.) προσφέρουν υψηλής ποιότητας λύσεις με
              εγγυημένα αποτελέσματα. Γλιτώστε χρόνο και κόπο – κλείστε ραντεβού
              άμεσα με ένα τηλεφώνημα και αφήστε μας να φροντίσουμε τον χώρο σας
              με επαγγελματισμό και συνέπεια.
            </p>

            <h2>Τεχνικός Αθήνα 24/7 – Όλες οι Τεχνικές Υπηρεσίες</h2>
            <ul>
              <li>
                <h3>Ηλεκτρολογικές εργασίες</h3>
                <p>
                  Πιστοποιημένος ηλεκτρολόγος Αθήνα για κάθε ηλεκτρολογική
                  ανάγκη, από αλλαγές φωτιστικών και επιδιορθώσεις βλαβών έως
                  νέες εγκαταστάσεις με ασφάλεια και υπευθυνότητα.
                </p>
              </li>
              <li>
                <h3>Υδραυλικές εργασίες</h3>
                <p>
                  Έμπειρος τεχνίτης για κάθε είδους υδραυλική βλάβη ή
                  εγκατάσταση (διαρροές, σωληνώσεις, θερμοσίφωνες κ.ά.).
                  Διαθέσιμος υδραυλικός άμεσα στο κέντρο και υδραυλικός στα
                  προάστια, ώστε να αποκαταστήσουμε τη ζημιά πριν εξελιχθεί.
                </p>
              </li>
              <li>
                <h3>Τοποθέτηση &amp; επισκευή πλακιδίων</h3>
                <p>
                  Εξειδικευμένοι τεχνίτες για άψογη τοποθέτηση πλακιδίων Αθήνα
                  σε δάπεδα, τοίχους, κουζίνα ή μπάνιο. Διορθώνουμε επίσης
                  ραγισμένα πλακάκια και φθορές στους αρμούς.
                </p>
              </li>
              <li>
                <h3>Βαψίματα εσωτερικών &amp; εξωτερικών χώρων</h3>
                <p>
                  Επαγγελματικό βάψιμο σπιτιού Αθήνα με χρήση ποιοτικών χρωμάτων
                  και προσοχή στη λεπτομέρεια, για άψογο και ανθεκτικό
                  αποτέλεσμα.
                </p>
              </li>
              <li>
                <h3>Ξυλουργικές κατασκευές</h3>
                <p>
                  Έμπειρος μαραγκός για κατασκευή και επισκευή σε έπιπλα,
                  πόρτες, ντουλάπια, ντουλάπες και κάθε είδους ξυλουργικές
                  εργασίες. Δημιουργούμε κατά παραγγελία λύσεις που ταιριάζουν
                  απόλυτα στο στυλ και τις ανάγκες σας.
                </p>
              </li>
              <li>
                <h3>Πλήρεις ανακαινίσεις</h3>
                <p>
                  Ολοκληρωμένες ανακαινίσεις σπιτιών και επαγγελματικών χώρων,
                  με συντονισμό όλων των συνεργείων από εμάς. Αναλαμβάνουμε
                  μικρές και μεγάλες εργασίες ανακαίνισης σε όλη την Αττική,
                  μεταμορφώνοντας τον χώρο σας όπως τον ονειρεύεστε.
                </p>
              </li>
              <li>
                <h3>Γενικές υπηρεσίες συντήρησης</h3>
                <p>
                  Τακτική συντήρηση και επιδιορθώσεις σε κτίρια και κατοικίες
                  για την πρόληψη σοβαρότερων προβλημάτων. Αναλαμβάνουμε
                  συντηρήσεις κτιρίων (πολυκατοικίες, επαγγελματικοί χώροι)
                  καθώς και επισκευές κατοικιών Αθήνα, εξασφαλίζοντας ότι ο
                  χώρος σας παραμένει πάντα λειτουργικός και ασφαλής.
                </p>
              </li>
            </ul>

            <h2>Γιατί να επιλέξετε το Handyman 24/7;</h2>
            <ul>
              <li>
                <strong>Άμεση εξυπηρέτηση:</strong> Τεχνική βοήθεια
                οποιαδήποτε ώρα, ακόμα και τα Σαββατοκύριακα και τις αργίες.
              </li>
              <li>
                <strong>Έμπειροι &amp; πιστοποιημένοι τεχνικοί:</strong> Η ομάδα
                μας αποτελείται από εκπαιδευμένους ηλεκτρολόγους, υδραυλικούς,
                ξυλουργούς κ.ά., με πολυετή εμπειρία στον χώρο.
              </li>
              <li>
                <strong>Επαγγελματισμός &amp; αξιοπιστία:</strong> Σεβόμαστε τον
                χώρο σας, τηρούμε τα συμφωνημένα χρονοδιαγράμματα και παρέχουμε
                εγγύηση ποιότητας για κάθε εργασία.
              </li>
              <li>
                <strong>Πλήρης κάλυψη Αττικής:</strong> Εξυπηρετούμε το κέντρο
                Αθήνας, τα βόρεια προάστια, τα νότια προάστια, καθώς και κάθε
                περιοχή της Αττικής – όπου κι αν βρίσκεστε.
              </li>
              <li>
                <strong>Δωρεάν εκτίμηση κόστους:</strong> Ζητήστε δωρεάν
                εκτίμηση πριν από κάθε έργο, χωρίς καμία υποχρέωση ή κρυφό
                κόστος.
              </li>
              <li>
                <strong>Όλες οι εργασίες με ένα τηλεφώνημα:</strong> Δεν
                χρειάζεται να ψάχνετε διαφορετικούς ειδικούς για κάθε δουλειά –
                με ένα μόνο τηλεφώνημα η ομάδα μας αναλαμβάνει τα πάντα.
              </li>
            </ul>
            <p>
              Καλέστε μας τώρα για άμεση τεχνική υποστήριξη στο χώρο σας και
              λύστε το πρόβλημα στη στιγμή!
            </p>
            <p class="about-seo">
              Εξυπηρέτηση από ηλεκτρολόγο όλο το 24ωρο, στις καλύτερες τιμές της αγοράς!
            </p>
            <div style="text-align: center">
              <button
                class="btn btn-outline btn-collapse"
                @click="expanded = false"
                type="button"
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

@media (max-width: 750px) {
  .about-container {
    padding: 0 6vw;
  }
  .about-title {
    font-size: 1.56rem;
    margin-bottom: 18px;
  }
  .about-root {
    padding: 42px 0 20px 0;
  }
  .about-content {
    font-size: 1.04rem;
  }
  .about-list {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 0 7vw;
  }
  .about-root {
    padding: 30px 0 10px 0;
  }
}
@media (max-width: 425px) {
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
