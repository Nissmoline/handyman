import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OffersView from '@/views/OffersView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/offers',
    name: 'offers',
    component: OffersView,
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
