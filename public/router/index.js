import { createRouter, createWebHistory } from 'vue-router';

import HomeView   from '@/views/HomeView.vue';
import OffersView from '@/views/OffersView.vue';
import ElectricianView from '@/views/ElectricianView.vue';
import PlumberView from '@/views/PlumberView.vue';
import TilingView from '@/views/TilingView.vue';
import PaintingView from '@/views/PaintingView.vue';
import CarpentryView from '@/views/CarpentryView.vue';
import RenovationsView from '@/views/RenovationsView.vue';
import MaintenanceView from '@/views/MaintenanceView.vue';

const routes = [
  { path: '/',               name: 'home',        component: HomeView },
  { path: '/offers',         name: 'offers',      component: OffersView },
  { path: '/electrician',    name: 'electrician', component: ElectricianView },
  { path: '/plumber',        name: 'plumber',     component: PlumberView },
  { path: '/tiling',          name: 'tiling',      component: TilingView },
  { path: '/painting',        name: 'painting',    component: PaintingView },
  { path: '/carpentry',      name: 'carpentry',   component: CarpentryView },
  { path: '/renovations',   name: 'renovations', component: RenovationsView },
  { path: '/maintenance',   name: 'maintenance', component: MaintenanceView },
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
