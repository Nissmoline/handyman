<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { Menu as LucideMenu, X as LucideX } from 'lucide-vue-next';

import logoUrl from '@/assets/logoico.svg';

const menuOpen = ref(false);
const isMobile = ref(window.innerWidth <= 1024);

const onResize = () => (isMobile.value = window.innerWidth <= 1024);
onMounted(() => window.addEventListener('resize', onResize));
onUnmounted(() => window.removeEventListener('resize', onResize));

const route = useRoute();
const isActiveHash = hash => route.path === '/' && route.hash === hash;

const closeMenu = () => (menuOpen.value = false);
</script>

<template>
  <header class="app-header">
    <div class="header-row">
      <!-- Logo -->
      <router-link to="/" class="logo-link" aria-label="Handyman home" @click="closeMenu">
        <img :src="logoUrl" alt="Handyman logo" class="logo" width="42" height="42" />
      </router-link>

      <!-- Desktop nav -->
      <nav v-if="!isMobile" class="nav-desktop">
        <router-link
          :to="{ path: '/', hash: '#about' }"
          :class="{ active: isActiveHash('#about') }"
          >Σχετικά με εμάς</router-link
        >

        <router-link
          :to="{ path: '/', hash: '#services' }"
          :class="{ active: isActiveHash('#services') }"
          >Υπηρεσίες</router-link
        >

        <router-link
          to="/offers"
          :class="{ active: route.path === '/offers' }"
          >Οι προσφορές μας</router-link
        >
      </nav>

      <!-- Burger -->
      <button v-if="isMobile" class="burger" @click="menuOpen = true" aria-label="Open menu">
        <LucideMenu :size="30" />
      </button>
    </div>

    <!-- Mobile drawer -->
    <transition name="slide-fade">
      <aside v-if="isMobile && menuOpen" class="drawer-wrapper">
        <div class="menu-overlay" @click="closeMenu" />

        <nav class="mobile-drawer">
          <div class="drawer-header">
            <router-link to="/" class="drawer-logo-link" @click="closeMenu">
              <img :src="logoUrl" alt="Handyman logo" class="drawer-logo" width="36" height="36" />
            </router-link>
            <button class="close" @click="closeMenu" aria-label="Close menu">
              <LucideX :size="32" />
            </button>
          </div>

          <router-link
            :to="{ path: '/', hash: '#about' }"
            class="drawer-link"
            @click="closeMenu"
            >Σχετικά με εμάς</router-link
          >

          <router-link
            :to="{ path: '/', hash: '#services' }"
            class="drawer-link"
            @click="closeMenu"
            >Υπηρεσίες</router-link
          >

          <router-link
            to="/offers"
            class="drawer-link"
            @click="closeMenu"
            >Οι προσφορές μας</router-link
          >
        </nav>
      </aside>
    </transition>
  </header>
</template>

<style scoped>


html { scroll-behavior: smooth; }

.app-header {
  position: sticky; top: 0; left: 0; z-index: 3000;
  width: 100%; min-height: 66px; background: #fff;
  box-shadow: 0 2px 16px rgba(19,40,56,.07);
  padding: 0 48px; display: flex; flex-direction: column;
}

.header-row { display: flex; justify-content: space-between; align-items: center; min-height: 66px; }

.logo-link { display: flex; align-items: center; height: 64px; padding-right: 16px; text-decoration: none; }
.logo      { width: 42px; height: 42px; border-radius: 12px; box-shadow: 0 2px 14px #00345526; }

.nav-desktop { display: flex; gap: 32px; }
.nav-desktop a,
.nav-desktop .active {
  font-size: 1.11rem; font-weight: 600; color: #044877;
  text-decoration: none; padding: 8px 14px; border-radius: 9px;
  transition: background .16s, color .19s; letter-spacing: .01em;
}
.nav-desktop a:hover,
.nav-desktop .active { background: #eaf3f7; color: #0c385e; }

.burger { background: none; border: none; padding: 7px 10px; cursor: pointer; border-radius: 8px; }
.burger:hover { background: #f0f7fa; }

.drawer-wrapper { position: fixed; inset: 0; z-index: 4000; }
.menu-overlay  { position: absolute; inset: 0; background: rgba(19,40,56,.54); }

.mobile-drawer {
  position: absolute; top: 0; right: 0; height: 100vh; width: 85vw; max-width: 380px;
  background: #fff; border-radius: 18px 0 0 18px; padding: 36px 32px 28px 24px;
  box-shadow: -16px 0 32px 8px rgba(4,72,119,.14), 0 2px 24px rgba(19,40,56,.18);
  display: flex; flex-direction: column; overflow-y: auto;
  animation: drawer-slide-in .32s cubic-bezier(.44,.7,.4,1.1);
}

.drawer-header  { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.drawer-logo    { width: 36px; height: 36px; border-radius: 10px; box-shadow: 0 1px 10px #00345518; }

.close { background: none; border: none; padding: 3px 8px; cursor: pointer; color: #15364d; font-size: 2rem; }
.close:hover { color: #e92127; }

.drawer-link,
.drawer-link.active {
  display: block; margin-bottom: 20px; font-size: 1.17rem; font-weight: 600;
  color: #163d63; padding: 7px 0; text-decoration: none;
  border-radius: 8px; letter-spacing: .01em;
  transition: background .16s, color .18s;
}
.drawer-link:hover,
.drawer-link.active { background: #eaf3f7; color: #0c385e; }

/* animations */
@keyframes drawer-slide-in {
  from { transform: translateX(110%); opacity: .72; }
  to   { transform: translateX(0);    opacity: 1;   }
}
.slide-fade-enter-active,
.slide-fade-leave-active { transition: opacity .25s; }
.slide-fade-enter-from,
.slide-fade-leave-to     { opacity: 0; }

/* responsive */
@media (max-width: 1024px) {
  .nav-desktop { display: none; }
  .app-header  { padding: 0 10px; }
  .logo-link   { height: 54px; padding-right: 6px; }
  .logo        { width: 38px; height: 38px; }
  .burger      { display: block; }
}
@media (max-width: 400px) {
  .mobile-drawer { max-width: 99vw; padding: 28px 5vw 18px; }
}
</style>
