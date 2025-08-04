<template>
  <div class="electrician-links">
    <h2>🔗 Σχετικές Σελίδες - Ηλεκτρολόγος Αθήνα</h2>
    <div class="links-grid">
      <router-link to="/electrician" class="link-card">
        <h3>Ηλεκτρολόγος Αθήνα 24/7</h3>
        <p>Επείγον ηλεκτρολόγος κοντά μου, διαθέσιμος ηλεκτρολόγος 24/7</p>
      </router-link>
      <router-link to="/electrician-faq" class="link-card">
        <h3>Συχνές Ερωτήσεις</h3>
        <p>FAQ για ηλεκτρολόγο Αθήνα, άμεση εξυπηρέτηση ηλεκτρολόγου</p>
      </router-link>
      <router-link to="/electrician-reviews" class="link-card">
        <h3>Κριτικές Πελατών</h3>
        <p>Αξιολογήσεις για ηλεκτρολόγο Αθήνα, επείγον ηλεκτρολόγος κοντά μου</p>
      </router-link>
      <router-link to="/offers" class="link-card">
        <h3>Προσφορές Ηλεκτρολόγου</h3>
        <p>Ειδικές προσφορές για ηλεκτρολογικές εργασίες</p>
      </router-link>
      <!-- <a href="/plumber" class="link-card">
        <h3>Υδραυλικός Αθήνα</h3>
        <p>Συμπληρωματικές υπηρεσίες υδραυλικού</p>
      </a> -->
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.electrician-links {
  margin: 40px 0;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 8px;
}
h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #164087;
  margin-bottom: 25px;
  text-align: center;
}
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.link-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: block;
}
.link-card:hover {
  border-color: #044877;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.link-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #044877;
  margin-bottom: 10px;
}
.link-card p {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
  margin: 0;
}
@media (max-width: 768px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
  .electrician-links {
    padding: 20px;
  }
}
</style> 