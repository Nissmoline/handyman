<script setup>
import ServiceItem from './ServiceItem.vue'
import { RouterLink } from 'vue-router'
import { Wrench, SwatchBook, InspectionPanel, Hammer, BrickWall, House, Plug, Droplets } from 'lucide-vue-next'

const services = [
  {
    icon: Plug,
    title: 'ΗΛΕΚΤΡΟΛΟΓΙΚΕΣ ΕΡΓΑΣΙΕΣ',
    description: 'Εγκαταστάσεις, βλάβες, πιστοποιητικά. Άμεση εξυπηρέτηση όλο το 24ωρο.',
    link: '/electrician'
  },
  {
    icon: Droplets,
    title: 'ΥΔΡΑΥΛΙΚΕΣ ΕΡΓΑΣΙΕΣ',
    description: 'Διαρροές, αποφράξεις, εγκαταστάσεις. Εξειδικευμένοι τεχνικοί στη διάθεσή σας.',
    link: '/plumber'
  },
  {
    icon: InspectionPanel,
    title: 'ΥΠΗΡΕΣΙΕΣ ΠΛΑΚΑΚΙΩΝ',
    description: 'Τοποθέτηση, επισκευή, αντικατάσταση πλακιδίων για κάθε χώρο.',
    link: '/tiling'
  },
  {
    icon: SwatchBook ,
    title: 'ΒΑΨΙΜΟ & ΧΡΩΜΑΤΙΣΜΟΙ',
    description: 'Εσωτερικοί και εξωτερικοί χρωματισμοί, σοβάτισμα και τεχνοτροπίες.',
    link: '/painting'
  },
  {
    icon: Hammer,
    title: 'ΥΠΗΡΕΣΙΕΣ ΞΥΛΟΥΡΓΟΥ',
    description: 'Κατασκευή και επισκευή επίπλων, ντουλαπιών, κουφωμάτων και ξυλοκατασκευών.',
    link: '/carpentry'
  },
  {
    icon: BrickWall,
    title: 'ΚΑΤΑΣΚΕΥΕΣ & ΑΝΑΚΑΙΝΙΣΕΙΣ',
    description: 'Πλήρης ανακαίνιση χώρων από μηδενική βάση, οικοδομικές εργασίες μέχρι παράδοση κλειδιών στο χέρι.',
    link: '/renovations'
  },
  {
    icon: House,
    title: 'ΓΕΝΙΚΕΣ ΕΡΓΑΣΙΕΣ ΣΥΝΤΗΡΗΣΗΣ',
    description: 'Συντήρηση κτιρίων, γενικές επισκευές και περιοδική συντήρηση εγκαταστάσεων.',
    link: '/maintenance'
  }
]

</script>

<template>
    <section class="services-section" id="services">
      <h2 class="services-heading">ΟΙ ΥΠΗΡΕΣΙΕΣ ΜΑΣ</h2>
      <ul class="services-list">
        <ServiceItem
          v-for="(service, i) in services"
          :key="i"
          v-bind="service"
        />
      </ul>
    </section>
  </template>

<style scoped>
.services-section {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
.services-heading {
  text-align: center;
  color: #164087;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
}
.services-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 1.2rem;
  list-style: none;
  padding: 25px;
}
@media (max-width: 950px) {
  .services-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 650px) {
  .services-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .services-section {
    padding: 1rem 0.4rem;
  }
  .services-heading {
    font-size: 1.25rem;
  }
}
</style>
