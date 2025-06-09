<script setup>
</script>

<template>
  <section class="about-root" id="about">
    <div class="about-container">
      <h2 class="about-title">Σχετικά με εμάς</h2>
      <div class="about-content">
        <p>
          Η ομάδα της <strong>Handyman 24/7</strong> παρέχει ολοκληρωμένες υπηρεσίες τεχνικής υποστήριξης και ανακαίνισης σε Αθήνα και προάστια. Με πολυετή εμπειρία στον χώρο, ειδικευόμαστε σε <strong>ηλεκτρολογικές και υδραυλικές εργασίες</strong>, βαψίματα, τοποθετήσεις πλακιδίων, ξυλουργικές κατασκευές και γενικές επισκευές.
        </p>
        <p>
          Η αξιοπιστία, η άμεση εξυπηρέτηση και η ποιοτική εργασία αποτελούν για εμάς προτεραιότητα. Αναλαμβάνουμε μικρές και μεγάλες εργασίες για κατοικίες και επαγγελματικούς χώρους, προσφέροντας λύσεις “κλειδί στο χέρι”. Η ομάδα μας αποτελείται από εξειδικευμένους τεχνίτες που φροντίζουν για κάθε λεπτομέρεια με επαγγελματισμό και υπευθυνότητα.
        </p>
        <ul class="about-list">
          <li>Ηλεκτρολογικές &amp; Υδραυλικές εργασίες</li>
          <li>Γενικές επισκευές και συντηρήσεις</li>
          <li>Τοποθέτηση πλακιδίων και βαψίματα</li>
          <li>Ξυλουργικές κατασκευές</li>
          <li>Ανακαινίσεις και ολοκληρωμένες λύσεις</li>
        </ul>
        <p class="about-seo">
          Καλέστε μας όλο το 24ωρο στο <a href="tel:+306973858321">+30 697 385 8321</a> για άμεση εξυπηρέτηση και προσφορά στις καλύτερες τιμές!
        </p>
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
  padding: 0 28px;
}
.about-title {
  font-size: 2.12rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: #044877;
  letter-spacing: 0.02em;
}
.about-content {
  font-size: 1.14rem;
  color: #243648;
  font-weight: 400;
  line-height: 1.65;
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
}
.about-seo a {
  color: #044877;
  text-decoration: underline;
  transition: color 0.2s;
}
.about-seo a:hover {
  color: #e92127;
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
    padding: 0 2vw;
  }
  .about-root {
    padding: 30px 0 10px 0;
  }
}
</style>
