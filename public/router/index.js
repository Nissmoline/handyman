import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import OffersView from '@/views/OffersView.vue';
import ElectricianView from '@/views/ElectricianView.vue';
import PlumberView from '@/views/PlumberView.vue';
import TilingView from '@/views/TilingView.vue';
import PaintingView from '@/views/PaintingView.vue';
import CarpentryView from '@/views/CarpentryView.vue';
import RenovationsView from '@/views/RenovationsView.vue';
import MaintenanceView from '@/views/MaintenanceView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Handyman24.gr – Τεχνικός για όλες τις εργασίες στην Αθήνα: Ηλεκτρολόγος, Υδραυλικός, Ανακαινίσεις 24/7',
      description: 'Χρειάζεστε τεχνικό στην Αθήνα; Παρέχουμε 24/7 υπηρεσίες από έμπειρους ηλεκτρολόγους, υδραυλικούς, τεχνίτες για ανακαινίσεις, μερεμέτια, βάψιμο και επισκευές. Άμεση εξυπηρέτηση σε όλη την Αττική.'
    }
  },
  {
    path: '/offers',
    name: 'offers',
    component: OffersView,
    meta: {
      title: 'Προσφορές Υπηρεσιών Τεχνικού – Handyman24.gr',
      description: 'Δείτε τις τρέχουσες προσφορές μας για ηλεκτρολογικές, υδραυλικές και άλλες τεχνικές εργασίες στην Αθήνα. Επωφεληθείτε από τις ανταγωνιστικές τιμές μας.'
    }
  },
  {
    path: '/electrician',
    name: 'electrician',
    component: ElectricianView,
    meta: {
      title: 'Ηλεκτρολόγος Αθήνα 24/7 – Άμεση Εξυπηρέτηση | Handyman24.gr',
      description: 'Έμπειρος ηλεκτρολόγος στην Αθήνα διαθέσιμος 24/7. Αναλαμβάνουμε ηλεκτρολογικές βλάβες, εγκαταστάσεις, πιστοποιητικά ΔΕΗ και επισκευές. Καλέστε μας για άμεση επέμβαση.'
    }
  },
  {
    path: '/plumber',
    name: 'plumber',
    component: PlumberView,
    meta: {
      title: 'Υδραυλικός Αθήνα 24/7 – Αποφράξεις & Διαρροές | Handyman24.gr',
      description: 'Άμεση εξυπηρέτηση από υδραυλικό στην Αθήνα, 24 ώρες το 24ωρο. Αναλαμβάνουμε διαρροές, αποφράξεις, εγκαταστάσεις και επισκευές υδραυλικών. Εγγυημένη ποιότητα.'
    }
  },
  {
    path: '/tiling',
    name: 'tiling',
    component: TilingView,
    meta: {
      title: 'Τοποθέτηση Πλακιδίων Αθήνα – Επισκευές | Handyman24.gr',
      description: 'Επαγγελματική τοποθέτηση πλακιδίων σε δάπεδα και τοίχους στην Αθήνα. Αναλαμβάνουμε μπάνια, κουζίνες και εξωτερικούς χώρους. Ζητήστε προσφορά.'
    }
  },
  {
    path: '/painting',
    name: 'painting',
    component: PaintingView,
    meta: {
      title: 'Βάψιμο Σπιτιού Αθήνα – Ελαιοχρωματιστής | Handyman24.gr',
      description: 'Αναλαμβάνουμε το βάψιμο του σπιτιού σας ή του επαγγελματικού σας χώρου στην Αθήна. Επαγγελματίες ελαιοχρωματιστές με εγγύηση ποιότητας.'
    }
  },
  {
    path: '/carpentry',
    name: 'carpentry',
    component: CarpentryView,
    meta: {
      title: 'Ξυλουργός Αθήνα – Επισκευή & Κατασκευή Επίπλων | Handyman24.gr',
      description: 'Ξυλουργικές εργασίες παντός τύπου στην Αθήνα. Αναλαμβάνουμε επισκευές επίπλων, ειδικές κατασκευές, ντουλάπες, πόρτες και ό,τι άλλο χρειάζεστε.'
    }
  },
  {
    path: '/renovations',
    name: 'renovations',
    component: RenovationsView,
    meta: {
      title: 'Ανακαινίσεις Σπιτιών Αθήνα – Ολική & Μερική | Handyman24.gr',
      description: 'Ολοκληρωμένες λύσεις για την ανακαίνιση του σπιτιού σας στην Αθήνα. Αναλαμβάνουμε από την αρχή μέχρι το τέλος την ανακαίνιση μπάνιου, κουζίνας και άλλων χώρων.'
    }
  },
  {
    path: '/maintenance',
    name: 'maintenance',
    component: MaintenanceView,
    meta: {
      title: 'Συντήρηση Κτιρίων & Γενικές Επισκευές Αθήνα | Handyman24.gr',
      description: 'Παρέχουμε υπηρεσίες συντήρησης κτιρίων και γενικές επισκευές στην Αθήνα. Κρατήστε την περιουσία σας σε άριστη κατάσταση με την τακτική μας φροντίδα.'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  // ✓ Smooth scrolling and anchor support
  scrollBehavior(to, from, saved) {
    if (saved) return saved; // ← back/forward

    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }; // ← «/#about».
    }
    return { top: 0, behavior: 'smooth' }; // ←  normal transition
  },
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Handyman24';
  document.querySelector('meta[name="description"]').setAttribute('content', to.meta.description || '');
});

export default router;
