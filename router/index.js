import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import OffersView from '@/views/OffersView.vue';
import ElectricianView from '@/views/ElectricianView.vue';
import ElectricianFAQ from '@/views/ElectricianFAQ.vue';
import ElectricianReviews from '@/views/ElectricianReviews.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';
import ImpressumView from '@/views/ImpressumView.vue';
// import PlumberView from '@/views/PlumberView.vue';
// import TilingView from '@/views/TilingView.vue';
// import PaintingView from '@/views/PaintingView.vue';
import CarpentryView from '@/views/CarpentryView.vue';
// import RenovationsView from '@/views/RenovationsView.vue';
import MaintenanceView from '@/views/MaintenanceView.vue';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      titleKey: 'seo.home.title',
      descriptionKey: 'seo.home.description',
    },
  },
  {
    path: '/offers',
    name: 'offers',
    component: OffersView,
    meta: {
      titleKey: 'seo.offers.title',
      descriptionKey: 'seo.offers.description',
    },
  },
  {
    path: '/electrician',
    name: 'electrician',
    component: ElectricianView,
    meta: {
      titleKey: 'seo.electrician.title',
      descriptionKey: 'seo.electrician.description',
    },
  },
  {
    path: '/electrician-faq',
    name: 'electrician-faq',
    component: ElectricianFAQ,
    meta: {
      titleKey: 'seo.electricianFaq.title',
      descriptionKey: 'seo.electricianFaq.description',
    },
  },
  {
    path: '/electrician-reviews',
    name: 'electrician-reviews',
    component: ElectricianReviews,
    meta: {
      titleKey: 'seo.electricianReviews.title',
      descriptionKey: 'seo.electricianReviews.description',
    },
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicy,
    meta: {
      titleKey: 'seo.privacy.title',
      descriptionKey: 'seo.privacy.description',
    },
  },
  // {
  //   path: '/plumber',
  //   name: 'plumber',
  //   component: PlumberView,
  //   meta: {
  //     titleKey: 'seo.plumber.title',
  //     descriptionKey: 'seo.plumber.description',
  //   },
  // },
  // {
  //   path: '/tiling',
  //   name: 'tiling',
  //   component: TilingView,
  //   meta: {
  //     titleKey: 'seo.tiling.title',
  //     descriptionKey: 'seo.tiling.description',
  //   },
  // },
  // {
  //   path: '/painting',
  //   name: 'painting',
  //   component: PaintingView,
  //   meta: {
  //     titleKey: 'seo.painting.title',
  //     descriptionKey: 'seo.painting.description',
  //   },
  // },
  {
    path: '/carpentry',
    name: 'carpentry',
    component: CarpentryView,
    meta: {
      titleKey: 'seo.carpentry.title',
      descriptionKey: 'seo.carpentry.description',
    },
  },
  // {
  //   path: '/renovations',
  //   name: 'renovations',
  //   component: RenovationsView,
  //   meta: {
  //     titleKey: 'seo.renovations.title',
  //     descriptionKey: 'seo.renovations.description',
  //   },
  // },
  {
    path: '/maintenance',
    name: 'maintenance',
    component: MaintenanceView,
    meta: {
      titleKey: 'seo.maintenance.title',
      descriptionKey: 'seo.maintenance.description',
    },
  },
  {
    path: '/impressum',
    name: 'impressum',
    component: ImpressumView,
    meta: {
      titleKey: 'seo.impressum.title',
      descriptionKey: 'seo.impressum.description',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

export const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }

  if (to.hash) {
    return { el: to.hash, behavior: 'smooth' };
  }

  return { top: 0, behavior: 'smooth' };
};

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior,
});

export default router;
