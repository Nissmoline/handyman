<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Zap, Plug, Building2, CircleHelp, ArrowRight } from 'lucide-vue-next'

const { locale } = useI18n()
const copy = computed(() => locale.value === 'en' ? {
  title: 'Electrical services in Athens and Piraeus',
  description: 'Electrical work is Handyman24’s main service, from fault finding to sockets, lighting and electrical panels. We serve homes and business premises across Attica.',
  labels: ['Emergency electrical faults', 'Electrical installations and panels', 'Electrical services for businesses', 'Frequently asked electrical questions'],
  details: ['Power outages, tripping breakers and urgent repairs.', 'Sockets, lighting and electrical panel installation.', 'Electrical support for shops, offices and shared premises.', 'Useful answers before arranging your visit.'],
  cta: 'View all electrical services',
  other: 'Explore our other technical services',
} : {
  title: 'Ηλεκτρολογικές εργασίες σε Αθήνα και Πειραιά',
  description: 'Η κύρια υπηρεσία της Handyman24 είναι η ηλεκτρολογική υποστήριξη: από τον εντοπισμό μιας βλάβης μέχρι την εγκατάσταση πριζών, φωτισμού και ηλεκτρικών πινάκων. Εξυπηρετούμε κατοικίες και επαγγελματικούς χώρους στην Αττική.',
  labels: ['Επείγουσες ηλεκτρολογικές βλάβες', 'Ηλεκτρολογικές εγκαταστάσεις και πίνακες', 'Ηλεκτρολόγος για επαγγελματικούς χώρους', 'Συχνές ερωτήσεις για ηλεκτρολογικές εργασίες'],
  details: ['Διακοπές ρεύματος, ασφάλειες που πέφτουν και επείγουσες επισκευές.', 'Πρίζες, φωτισμός και εγκατάσταση ηλεκτρικών πινάκων.', 'Ηλεκτρολογική υποστήριξη για καταστήματα, γραφεία και κοινόχρηστους χώρους.', 'Χρήσιμες απαντήσεις πριν προγραμματίσετε την επίσκεψή σας.'],
  cta: 'Δείτε όλες τις υπηρεσίες ηλεκτρολόγου',
  other: 'Δείτε τις υπόλοιπες τεχνικές υπηρεσίες μας',
})
const paths = ['/electrician#emergency', '/electrician#installations', '/electrician#business', '/electrician-faq']
const icons = [Zap, Plug, Building2, CircleHelp]
</script>

<template>
  <section class="electrician-summary" aria-labelledby="home-electrician-title">
    <div class="summary-heading">
      <h2 id="home-electrician-title">{{ copy.title }}</h2>
      <p>{{ copy.description }}</p>
    </div>
    <ul class="summary-grid">
      <li v-for="(path, index) in paths" :key="path">
        <router-link :to="path" class="summary-card">
          <span class="summary-icon"><component :is="icons[index]" :size="26" :stroke-width="2" aria-hidden="true" /></span>
          <h3>{{ copy.labels[index] }}</h3>
          <p>{{ copy.details[index] }}</p>
          <ArrowRight class="card-arrow" :size="20" aria-hidden="true" />
        </router-link>
      </li>
    </ul>
    <div class="summary-actions">
      <router-link class="summary-primary" to="/electrician">{{ copy.cta }} <ArrowRight :size="19" aria-hidden="true" /></router-link>
      <a class="summary-secondary" href="#services">{{ copy.other }}</a>
    </div>
  </section>
</template>

<style scoped>
.electrician-summary {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 64px;
  color: #243648;
}
.summary-heading { max-width: 850px; margin: 0 auto 32px; text-align: center; }
.summary-heading h2 { margin: 0 0 18px; color: #044877; font-size: clamp(1.65rem, 2.6vw, 2.12rem); font-weight: 800; line-height: 1.25; }
.summary-heading p { margin: 0; font-size: 1.05rem; line-height: 1.7; }
.summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; padding: 0; margin: 0; list-style: none; }
.summary-card { display: flex; flex-direction: column; align-items: flex-start; height: 100%; padding: 24px; border: 1px solid #dce7ed; border-radius: 8px; background: #fff; text-decoration: none; box-shadow: 0 3px 12px rgba(22, 54, 77, .08); transition: border-color .2s, box-shadow .2s, transform .2s; }
.summary-icon { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; margin-bottom: 20px; border-radius: 8px; background: #eaf3f7; color: #044877; }
.summary-card h3 { margin: 0 0 12px; color: #164087; font-size: 1.08rem; line-height: 1.4; font-weight: 700; }
.summary-card p { margin: 0 0 22px; color: #4b5d6b; font-size: .98rem; line-height: 1.6; }
.card-arrow { color: #0b6ea8; margin-top: auto; }
.summary-card:hover { border-color: #044877; box-shadow: 0 8px 22px rgba(22, 54, 77, .14); transform: translateY(-3px); }
.summary-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 16px 24px; margin-top: 32px; }
.summary-primary, .summary-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 12px; min-height: 48px; padding: 12px 20px; border-radius: 5px; font-size: 1rem; font-weight: 700; line-height: 1.4; text-align: center; text-decoration: none; transition: background .2s, color .2s; }
.summary-primary { background: #044877; color: #fff; border: 2px solid #044877; }
.summary-primary:hover { background: #16364d; border-color: #16364d; }
.summary-secondary { color: #044877; border: 2px solid #dce7ed; }
.summary-secondary:hover { background: #eaf3f7; }
a:focus-visible { outline: 3px solid #0b6ea8; outline-offset: 4px; }
@media (max-width: 1024px) {
  .summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 600px) {
  .electrician-summary { padding: 24px 20px 40px; }
  .summary-heading { margin-bottom: 24px; }
  .summary-heading p { font-size: 1rem; }
  .summary-grid { grid-template-columns: 1fr; gap: 12px; }
  .summary-card { display: grid; grid-template-columns: 44px minmax(0, 1fr) 18px; column-gap: 14px; padding: 20px 16px; align-items: start; }
  .summary-icon { width: 44px; height: 44px; grid-row: 1 / 3; margin: 0; }
  .summary-card h3 { font-size: 1rem; margin: 0 0 8px; }
  .summary-card p { grid-column: 2; font-size: .94rem; margin: 0; }
  .card-arrow { grid-column: 3; grid-row: 1; margin-top: 3px; width: 18px; }
  .summary-actions { gap: 12px; margin-top: 24px; }
  .summary-primary, .summary-secondary { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .summary-card, .summary-primary, .summary-secondary { transition: none; }
  .summary-card:hover { transform: none; }
}
</style>
