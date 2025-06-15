import { createRouter, createWebHistory } from 'vue-router';

import HomeView   from '@/views/HomeView.vue';
import OffersView from '@/views/OffersView.vue';

const routes = [
  { path: '/',       name: 'home',   component: HomeView  },
  { path: '/offers', name: 'offers', component: OffersView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  // ✓ Smooth scrolling and anchor support
  scrollBehavior(to, from, saved) {
    if (saved) return saved;                    // ← back/forward

    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }; // ← «/#about».
    }
    return { top: 0, behavior: 'smooth' };      // ←  normal transition
  },
});

export default router;
