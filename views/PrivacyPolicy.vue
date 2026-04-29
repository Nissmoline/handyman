<template>
  <main class="service-page">
    <article class="service-container">
      <h1>Πολιτική Απορρήτου & Cookies | Handyman24</h1>

      <div class="service-intro">
        <p>
          Η παρούσα πολιτική εξηγεί πώς η Handyman24 συλλέγει και χρησιμοποιεί στοιχεία επικοινωνίας
          όταν ζητάτε τεχνική υπηρεσία, προσφορά ή ραντεβού μέσω της ιστοσελίδας.
        </p>
      </div>

      <section class="privacy-item">
        <h2>Ποια δεδομένα συλλέγουμε</h2>
        <ul>
          <li>Ονοματεπώνυμο, τηλέφωνο και email όταν συμπληρώνετε φόρμα ραντεβού.</li>
          <li>Πληροφορίες για την υπηρεσία που ζητάτε και την επιθυμητή ημερομηνία επίσκεψης.</li>
          <li>Βασικά τεχνικά δεδομένα χρήσης της ιστοσελίδας μέσω εργαλείων analytics, μόνο μετά από συγκατάθεση.</li>
        </ul>
      </section>

      <section class="privacy-item">
        <h2>Πώς χρησιμοποιούνται τα δεδομένα</h2>
        <p>
          Τα στοιχεία χρησιμοποιούνται για επικοινωνία, επιβεβαίωση ραντεβού, οργάνωση τεχνικής επίσκεψης,
          εξυπηρέτηση πελατών και νόμιμες λογιστικές ή επιχειρησιακές ανάγκες.
        </p>
        <p>
          Δεν πουλάμε προσωπικά δεδομένα. Στοιχεία μπορούν να κοινοποιηθούν μόνο σε συνεργαζόμενο τεχνικό
          όταν αυτό είναι απαραίτητο για την εκτέλεση της υπηρεσίας που ζητήσατε.
        </p>
      </section>

      <section class="privacy-item">
        <h2>Cookies και συγκατάθεση</h2>
        <p>
          Χρησιμοποιούμε απαραίτητα cookies για τη λειτουργία της ιστοσελίδας. Τα analytics και διαφημιστικά
          cookies παραμένουν απενεργοποιημένα μέχρι να δώσετε συγκατάθεση από το banner cookies.
        </p>
        <ul>
          <li><strong>Απαραίτητα cookies:</strong> λειτουργία ιστοσελίδας, ασφάλεια, γλωσσικές προτιμήσεις.</li>
          <li><strong>Analytics cookies:</strong> στατιστικά επισκεψιμότητας και βελτίωση περιεχομένου.</li>
          <li><strong>Διαφημιστικά cookies:</strong> μέτρηση καμπανιών Google Ads, όπου υπάρχει συγκατάθεση.</li>
        </ul>
      </section>

      <section class="privacy-item">
        <h2>Δικαιώματα χρήστη</h2>
        <p>
          Σύμφωνα με τον GDPR μπορείτε να ζητήσετε πρόσβαση, διόρθωση, διαγραφή, περιορισμό επεξεργασίας
          ή ενημέρωση για τα δεδομένα που τηρούνται για εσάς.
        </p>
      </section>

      <section class="privacy-item">
        <h2>Επικοινωνία</h2>
        <p>
          Για απορίες σχετικά με την πολιτική απορρήτου ή τα cookies, επικοινωνήστε με την Handyman24.
        </p>
        <div class="contact-info">
          <p><strong>Τηλέφωνο:</strong> <a href="tel:+306949214461">+30 694 921 4461</a></p>
          <p><strong>Email:</strong> <a href="mailto:handyman24gr@gmail.com">handyman24gr@gmail.com</a></p>
          <p><strong>Έδρα:</strong> Φυλής 153, 11251 Άγιος Παντελεήμονας, Αθήνα, Αττική</p>
        </div>
      </section>

      <p class="last-updated"><strong>Τελευταία ενημέρωση:</strong> 29 Απριλίου 2026</p>
    </article>
  </main>
</template>

<script setup>
</script>

<style scoped>
@import '@/assets/service-pages.css';

.privacy-item {
  margin: 28px 0;
  padding: 24px;
  background: #fff;
  border: 1px solid #dbe5ef;
  border-left: 4px solid #044877;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(4, 72, 119, 0.08);
}

.privacy-item h2 {
  margin-top: 0;
}

.contact-info {
  background: #f8fafc;
  padding: 18px;
  border-radius: 8px;
  margin-top: 16px;
}

.contact-info p {
  margin-bottom: 8px;
}

.contact-info a {
  color: #044877;
  font-weight: 700;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.last-updated {
  text-align: center;
  color: #475569;
}
</style>
