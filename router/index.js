import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('@/views/HomeView.vue');
const OffersView = () => import('@/views/OffersView.vue');
const ElectricianView = () => import('@/views/ElectricianView.vue');
const ElectricianFAQ = () => import('@/views/ElectricianFAQ.vue');
const ElectricianReviews = () => import('@/views/ElectricianReviews.vue');
const PrivacyPolicy = () => import('@/views/PrivacyPolicy.vue');
const ImpressumView = () => import('@/views/ImpressumView.vue');
const PlumberView = () => import('@/views/PlumberView.vue');
const TilingView = () => import('@/views/TilingView.vue');
const PaintingView = () => import('@/views/PaintingView.vue');
const CarpentryView = () => import('@/views/CarpentryView.vue');
const RenovationsView = () => import('@/views/RenovationsView.vue');
const MaintenanceView = () => import('@/views/MaintenanceView.vue');
const YachtRepairView = () => import('@/views/YachtRepairView.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');

// Local electrician landing pages are intentionally disabled until each page
// has enough genuinely unique local content. Their public URLs are permanently
// redirected to /electrician by vercel.json so search signals are consolidated.
// import ElectricianAreaView from '@/views/ElectricianAreaView.vue';
// import EmergencyElectricianView from '@/views/EmergencyElectricianView.vue';
// import { electricianAreas } from '@/data/electricianAreas';

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
  // All /ilektrologos-* routes are disabled and redirected at the CDN layer.
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
    path: '/plumber',
    name: 'plumber',
    component: PlumberView,
    meta: {
      titleKey: 'seo.plumber.title',
      descriptionKey: 'seo.plumber.description',
    },
  },
  {
    path: '/tiling',
    name: 'tiling',
    component: TilingView,
    meta: {
      titleKey: 'seo.tiling.title',
      descriptionKey: 'seo.tiling.description',
    },
  },
  {
    path: '/painting',
    name: 'painting',
    component: PaintingView,
    meta: {
      titleKey: 'seo.painting.title',
      descriptionKey: 'seo.painting.description',
    },
  },
  {
    path: '/carpentry',
    name: 'carpentry',
    component: CarpentryView,
    meta: {
      titleKey: 'seo.carpentry.title',
      descriptionKey: 'seo.carpentry.description',
    },
  },
  {
    path: '/renovations',
    name: 'renovations',
    component: RenovationsView,
    meta: {
      titleKey: 'seo.renovations.title',
      descriptionKey: 'seo.renovations.description',
    },
  },
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
    path: '/yacht-repair',
    name: 'yacht-repair',
    component: YachtRepairView,
    meta: {
      titleKey: 'seo.yachtRepair.title',
      descriptionKey: 'seo.yachtRepair.description',
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
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: '404 | Handyman24',
      description: 'Η σελίδα που ζητήσατε δεν βρέθηκε.',
      robots: 'noindex, follow',
      indexable: false,
    },
  },
];

export const createAppRouter = ({ ssr = false } = {}) =>
  createRouter({
    history: ssr ? createMemoryHistory('/') : createWebHistory('/'),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }

      if (to.hash) {
        return { el: to.hash, behavior: 'smooth' };
      }

      return { top: 0, behavior: 'smooth' };
    },
  });

const router = typeof window === 'undefined' ? undefined : createAppRouter();

export default router;
