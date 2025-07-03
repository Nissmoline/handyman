<template>
  <div class="service-page">
    <div class="service-container">
      <h1>Ηλεκτρολόγος Αθήνα 24 ώρες – Εξειδικευμένες Ηλεκτρολογικές Υπηρεσίες</h1>
      <p>
        Όταν χρειάζεστε ηλεκτρολόγο, η ομάδα μας είναι διαθέσιμη άμεσα,
        μέρα ή νύχτα. Ο πιστοποιημένος ηλεκτρολόγος μας καλύπτει όλες τις
        περιοχές της Αθήνας και της Αττικής, αντιμετωπίζοντας βλάβες και
        εγκαταστάσεις με ασφάλεια και ταχύτητα. Αναλαμβάνουμε εργασίες
        όπως <strong>σύνδεση κουζίνας</strong>,
        <strong>σύνδεση φούρνου</strong> και
        <strong>σύνδεση ηλεκτρικών συσκευών</strong>, καθώς και
        εγκατάσταση φωτιστικών, ηλεκτρικών πινάκων και κάθε άλλη
        ηλεκτρολογική εργασία. Με ένα σας τηλεφώνημα, αποκαθιστούμε κάθε
        ηλεκτρολογικό πρόβλημα πριν προλάβει να γίνει επικίνδυνο.
        <strong>Κλείστε ραντεβού σήμερα</strong> για μια επίσκεψη από
        εξειδικευμένο ηλεκτρολόγο και επωφεληθείτε από την άμεση λύση που
        προσφέρουμε.
      </p>
      
      <h2>Οι υπηρεσίες ηλεκτρολόγου που προσφέρουμε:</h2>
      <ul>
        <li>Επισκευή ηλεκτρολογικών βλαβών</li>
        <li>Εγκατάσταση και αλλαγή ηλεκτρολογικού πίνακα</li>
        <li>Σύνδεση ηλεκτρικής κουζίνας και εστιών</li>
        <li>Εγκατάσταση φωτιστικών σωμάτων</li>
        <li>Επισκευές σε πρίζες και διακόπτες</li>
        <li>Πιστοποιητικά ΔΕΗ</li>
        <li>Αντιμετώπιση βραχυκυκλωμάτων</li>
      </ul>

      <div class="contact-buttons">
        <a href="tel:+306949214461" class="btn btn-primary">Καλέστε μας για άμεση εξυπηρέτηση</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for this simple view
</script>

<style scoped>
.service-page {
  padding: 40px 20px;
  background: #f8fafb;
}
.service-container {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
h1 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #044877;
  margin-bottom: 20px;
}
h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #164087;
  margin-top: 30px;
  margin-bottom: 15px;
}
p, ul {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
}
ul {
  list-style: disc;
  padding-left: 25px;
}
li {
  margin-bottom: 10px;
}
.contact-buttons {
  text-align: center;
  margin-top: 30px;
}
.btn {
  display: inline-block;
  padding: 15px 30px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 700;
  transition: background-color 0.3s;
}
.btn-primary {
  background-color: #e92127;
  color: #fff;
}
.btn-primary:hover {
  background-color: #c1121c;
}
</style>
