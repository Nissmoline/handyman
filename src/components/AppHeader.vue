<script setup>
import logoUrl from "@/assets/logoico.svg";
import { ref, onMounted, onUnmounted } from "vue";
import { Menu as LucideMenu, X as LucideX } from "lucide-vue-next";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const menuOpen = ref(false);
const isMobile = ref(window.innerWidth <= 1024);

const resizeHandler = () => (isMobile.value = window.innerWidth <= 1024);
onMounted(() => window.addEventListener("resize", resizeHandler));
onUnmounted(() => window.removeEventListener("resize", resizeHandler));

function handleLogoClick(e) {
  closeMenu();
  if (route.path === "/") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      history.replaceState(null, "", "/");
    }
  }
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
function closeMenu() {
  menuOpen.value = false;
}

function isActiveHash(hash) {
  return route.path === "/" && route.hash === hash;
}

function goToHash(id) {
  closeMenu();
  if (route.path !== "/") {
    router.push({ path: "/", hash: `#${id}` });
  } else {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    window.location.hash = `#${id}`;
  }
}
</script>

<template>
  <header class="app-header">
    <div class="header-row">
      <!-- Логотип -->
      <router-link
        to="/"
        class="logo-link"
        aria-label="Handyman Home"
        @click="handleLogoClick"
      >
        <img
          :src="logoUrl"
          alt="Handyman logo"
          class="logo"
          width="42"
          height="42"
        />
      </router-link>

      <!-- Desktop menu -->
      <nav class="nav-desktop" v-if="!isMobile">
        <a
          href="#about"
          :class="{ 'router-link-active': isActiveHash('#about') }"
          @click.prevent="goToHash('about')"
          >Σχετικά με εμάς</a
        >
        <a
          href="#services"
          :class="{ 'router-link-active': isActiveHash('#services') }"
          @click.prevent="goToHash('services')"
          >Υπηρεσίες</a
        >
        <router-link
          to="/offers"
          :class="{ 'router-link-active': route.path === '/offers' }"
          @click.native="closeMenu"
          >Οι προσφορές μας</router-link
        >
      </nav>

      <!-- Burger menu -->
      <button
        class="burger"
        @click="toggleMenu"
        v-if="isMobile"
        aria-label="Open menu"
      >
        <LucideMenu :size="30" />
      </button>
    </div>

    <!-- Mobile drawer -->
    <transition name="slide-fade">
      <div v-if="menuOpen && isMobile">
        <div class="menu-overlay" @click="closeMenu"></div>
        <nav class="mobile-drawer" @click.stop>
          <div class="drawer-logo-row">
            <router-link
              to="/"
              class="drawer-logo-link"
              @click.native="closeMenu"
            >
              <img
                :src="logoUrl"
                alt="Handyman logo"
                class="drawer-logo"
                width="36"
                height="36"
              />
            </router-link>
            <button class="close" @click="closeMenu">
              <LucideX :size="32" />
            </button>
          </div>
          <a
            href="#about"
            :class="{ 'router-link-active': isActiveHash('#about') }"
            @click.prevent="goToHash('about')"
            >Σχετικά με εμάς</a
          >
          <a
            href="#services"
            :class="{ 'router-link-active': isActiveHash('#services') }"
            @click.prevent="goToHash('services')"
            >Υπηρεσίες</a
          >
          <router-link
            to="/offers"
            :class="{ 'router-link-active': route.path === '/offers' }"
            @click.native="closeMenu"
            >Οι προσφορές μας</router-link
          >
        </nav>
      </div>
    </transition>
  </header>
</template>

<style>
.app-header {
  width: 100%;
  background: #fff;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 3000;
  box-shadow: 0 2px 16px 0 rgba(19, 40, 56, 0.07);
  min-height: 66px;
  padding: 0 48px;
  display: flex;
  flex-direction: column;
}

/* Линия с логотипом, меню и бургером */
.header-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 66px;
}

/* ЛОГО (десктоп и мобилка) */
.logo-link {
  display: flex;
  align-items: center;
  height: 64px;
  padding-right: 16px;
  text-decoration: none;
}
.logo {
  height: 42px;
  width: 42px;
  border-radius: 12px;
  box-shadow: 0 2px 14px 0 #00345526;
  background: #fff;
}

/* Десктоп-меню */
.nav-desktop {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-desktop a,
.nav-desktop .router-link-active {
  font-size: 1.11rem;
  color: #044877;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 9px;
  transition: background 0.16s, color 0.19s;
  letter-spacing: 0.01em;
}
.nav-desktop a:hover,
.nav-desktop .router-link-active {
  background: #eaf3f7;
  color: #0c385e;
}

/* Бургер */
.burger {
  display: none;
  background: none;
  border: none;
  margin-left: 8px;
  cursor: pointer;
  transition: background 0.16s;
  border-radius: 8px;
  padding: 7px 10px;
}
.burger:hover {
  background: #f0f7fa;
}

/* Мобильный оверлей */
.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(19, 40, 56, 0.54);
  z-index: 4000;
  animation: overlay-fade-in 0.25s;
}
@keyframes overlay-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Drawer */
.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 85vw;
  max-width: 380px;
  height: 100vh;
  background: #fff;
  border-radius: 18px 0 0 18px;
  box-shadow: -16px 0 32px 8px rgba(4, 72, 119, 0.14),
    0 2px 24px 0 rgba(19, 40, 56, 0.18);
  padding: 36px 32px 28px 24px;
  display: flex;
  flex-direction: column;
  z-index: 4100;
  animation: drawer-slide-in 0.32s cubic-bezier(0.44, 0.7, 0.4, 1.1);
  overflow-y: auto;
}
@keyframes drawer-slide-in {
  from {
    transform: translateX(110%);
    opacity: 0.72;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Лого и close в drawer */
.drawer-logo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  min-height: 36px;
}
.drawer-logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  box-shadow: 0 1px 10px 0 #00345518;
  background: #fff;
}

/* Close-кнопка в drawer */
.mobile-drawer .close {
  position: static;
  margin-left: auto;
  background: none;
  border: none;
  font-size: 2rem;
  color: #15364d;
  z-index: 4200;
  cursor: pointer;
  transition: color 0.18s;
  padding: 3px 8px;
}
.mobile-drawer .close:hover {
  color: #e92127;
}

/* Пункты меню внутри drawer */
.mobile-drawer a,
.mobile-drawer .drawer-link {
  font-size: 1.17rem;
  color: #163d63;
  margin-bottom: 20px;
  text-decoration: none;
  font-weight: 600;
  padding: 7px 0;
  border-radius: 8px;
  transition: background 0.16s, color 0.18s;
  letter-spacing: 0.01em;
  display: block;
}
.mobile-drawer a:hover,
.mobile-drawer .drawer-link:hover {
  background: #eaf3f7;
  color: #0c385e;
}

/* Мобильные медиа-запросы */
@media (max-width: 1024px) {
  .nav-desktop {
    display: none;
  }
  .app-header {
    padding: 0 10px;
  }
  .burger {
    display: block;
  }
  .logo-link {
    height: 54px;
    padding-right: 6px;
  }
  .logo {
    width: 38px;
    height: 38px;
  }
}

@media (max-width: 400px) {
  .mobile-drawer {
    max-width: 99vw;
    padding: 28px 5vw 18px 5vw;
  }
}
</style>
