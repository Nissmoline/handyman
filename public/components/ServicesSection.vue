<script setup>
import ServiceItem from './ServiceItem.vue'
import { RouterLink } from 'vue-router'
import { Wrench, SwatchBook, InspectionPanel, Hammer, BrickWall, House, Plug, Droplets } from 'lucide-vue-next'

const services = [
  {
    icon: Plug,
    title: 'ΗΛΕΚΤΡΟΛΟΓΙΚΕΣ ΕΡΓΑΣΙΕΣ',
    description: 'Εγκαταστάσεις, βλάβες. Άμεση εξυπηρέτηση όλο το 24ωρο.',
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
@media (max-width: 768px) {
  .services-section {
    padding: 2rem 1rem;
  }
  
  .services-heading {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    padding: 0 16px;
  }
  
  .services-list {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 8px;
  }
  
  .service-item {
    padding: 20px 16px;
    border-radius: 12px;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .service-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .service-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: linear-gradient(135deg, #eaf3f7 0%, #d4e9f4 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .service-title {
    font-size: 1.1rem;
    margin-bottom: 8px;
    color: #164087;
  }
  
  .service-description {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #4a5568;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 1.5rem 0.5rem;
  }
  
  .services-heading {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  
  .service-item {
    padding: 16px 12px;
  }
  
  .service-icon {
    width: 40px;
    height: 40px;
  }
  
  .service-title {
    font-size: 1rem;
  }
  
  .service-description {
    font-size: 0.9rem;
  }
}
</style>
