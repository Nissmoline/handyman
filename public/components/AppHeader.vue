<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { Menu as LucideMenu, X as LucideX, ChevronDown } from "lucide-vue-next";
import { Phone } from "lucide-vue-next";
import logoUrl from "@/assets/logoico.svg";

const services = [
  { name: "Ηλεκτρολόγος", path: "/electrician" },
  { name: "Υδραυλικός", path: "/plumber" },
  { name: "Τοποθέτηση Πλακιδίων", path: "/tiling" },
  { name: "Βαψίματα", path: "/painting" },
  { name: "Ξυλουργικές Εργασίες", path: "/carpentry" },
  { name: "Ανακαινίσεις", path: "/renovations" },
  { name: "Συντηρήσεις", path: "/maintenance" },
];

// Массив соцсетей для мобильного меню
const socialLinksMobile = [
  {
    href: "https://www.facebook.com/share/1FyUjq1AGd/",
    icon: ["fab", "facebook"],
    label: "Facebook",
  },
  {
    href: "https://instagram.com/ВАШ_АККАУНТ",
    icon: ["fab", "instagram"],
    label: "Instagram",
  },
  {
    href: "viber://chat?number=+306949214461",
    icon: ["fab", "viber"],
    label: "Viber",
  },
  {
    href: "https://wa.me/+306949214461",
    icon: ["fab", "whatsapp"],
    label: "WhatsApp",
  },
  {
    href: "https://t.me/ВАШ_АККАУНТ",
    icon: ["fab", "telegram"],
    label: "Telegram",
  },
];

const tel = "+30 694 921 4461";
const telLink = "tel:+306949214461";

const menuOpen = ref(false);
const isMobile = ref(window.innerWidth <= 1024);
const servicesMenuOpen = ref(false);

const onResize = () => (isMobile.value = window.innerWidth <= 1024);
onMounted(() => {
  window.addEventListener("resize", onResize);
  onResize(); // Call on mount to set initial state
});
onUnmounted(() => window.removeEventListener("resize", onResize));

const route = useRoute();
const isActiveHash = (hash) => route.path === "/" && route.hash === hash;

const closeMenu = () => {
  menuOpen.value = false;
  servicesMenuOpen.value = false; // Close submenu as well
};
</script>

<template>
  <header class="app-header">
    <div class="header-row">
      <!-- Logo -->
      <router-link
        to="/"
        class="logo-link"
        aria-label="Handyman home"
        @click="closeMenu"
      >
        <img
          :src="logoUrl"
          alt="Handyman logo"
          class="logo"
          width="42"
          height="42"
        />
      </router-link>

      <!-- Desktop nav -->
      <nav v-if="!isMobile" class="nav-desktop">
        <router-link
          :to="{ path: '/', hash: '#about' }"
          :class="{ active: isActiveHash('#about') }"
          >Σχετικά με εμάς</router-link
        >
        <div class="dropdown" @mouseenter="servicesMenuOpen = true" @mouseleave="servicesMenuOpen = false">
          <button class="dropdown-toggle">
            Υπηρεσίες <ChevronDown size="16" />
          </button>
          <transition name="fade">
            <div v-if="servicesMenuOpen" class="dropdown-menu">
              <router-link v-for="service in services" :key="service.path" :to="service.path" class="dropdown-item">
                {{ service.name }}
              </router-link>
            </div>
          </transition>
        </div>
        <router-link to="/offers" :class="{ active: route.path === '/offers' }"
          >Οι προσφορές μας</router-link
        >
      </nav>

      <!-- Phone: desktop and tablet, right -->
      <a :href="telLink" class="phone-link" aria-label="Call us">
        <Phone :size="21" class="phone-svg" />
        <span class="phone-text">{{ tel }}</span>
      </a>

      <!-- Burger -->
      <button
        v-if="isMobile"
        class="burger"
        @click="menuOpen = true"
        aria-label="Open menu"
      >
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
              <img
                :src="logoUrl"
                alt="Handyman logo"
                class="drawer-logo"
                width="36"
                height="36"
              />
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
          <div class="drawer-link" @click="servicesMenuOpen = !servicesMenuOpen">
            Υπηρεσίες <ChevronDown :class="{ 'rotate-180': servicesMenuOpen }" size="16" />
          </div>
          <transition name="fade">
            <div v-if="servicesMenuOpen" class="mobile-submenu">
              <router-link v-for="service in services" :key="service.path" :to="service.path" class="drawer-link submenu-item" @click="closeMenu">
                {{ service.name }}
              </router-link>
            </div>
          </transition>
          <router-link to="/offers" class="drawer-link" @click="closeMenu"
            >Οι προσφορές μας</router-link
          >

          <!-- Телефон — виден и в drawer! -->
          <a
            :href="telLink"
            class="phone-link-drawer"
            aria-label="Call us"
            @click="closeMenu"
          >
            <Phone :size="20" class="phone-svg" />
            <span class="phone-text">{{ tel }}</span>
          </a>

          <!-- Соц. иконки -->
          <div class="mobile-socials">
            <a
              v-for="soc in socialLinksMobile"
              :key="soc.label"
              :href="soc.href"
              target="_blank"
              rel="noopener"
              :aria-label="soc.label"
              class="mobile-social-link"
            >
              <font-awesome-icon :icon="soc.icon" :size="26" />
            </a>
          </div>
        </nav>
      </aside>
    </transition>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 3000;
  width: 100%;
  min-height: 66px;
  background: #fff;
  box-shadow: 0 2px 16px rgba(19, 40, 56, 0.07);
  padding: 0 48px;
  display: flex;
  flex-direction: column;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 66px;
}

.logo-link {
  display: flex;
  align-items: center;
  height: 64px;
  padding-right: 16px;
  text-decoration: none;
}
.logo {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  box-shadow: 0 2px 14px #00345526;
}

.nav-desktop {
  display: flex;
  gap: 32px;
  align-items: center;
}
.nav-desktop a,
.nav-desktop .active {
  font-size: 1.11rem;
  font-weight: 600;
  color: #044877;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 9px;
  transition: background 0.16s, color 0.19s;
  letter-spacing: 0.01em;
}
.nav-desktop a:hover,
.nav-desktop .active {
  background: #eaf3f7;
  color: #0c385e;
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 1.11rem;
  font-weight: 600;
  color: #044877;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 8px 0;
  min-width: 220px;
  z-index: 10;
}

.dropdown-item {
  display: block;
  padding: 10px 20px;
  color: #044877;
  text-decoration: none;
  font-size: 1rem;
}

.dropdown-item:hover {
  background: #eaf3f7;
}

.burger {
  background: none;
  border: none;
  padding: 7px 10px;
  cursor: pointer;
  border-radius: 8px;
}
.burger:hover {
  background: #f0f7fa;
}

.drawer-wrapper {
  position: fixed;
  inset: 0;
  z-index: 4000;
}
.menu-overlay {
  position: absolute;
  inset: 0;
  background: rgba(19, 40, 56, 0.54);
}

.mobile-drawer {
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 85vw;
  max-width: 380px;
  background: #fff;
  border-radius: 18px 0 0 18px;
  padding: 36px 32px 28px 24px;
  box-shadow: -16px 0 32px 8px rgba(4, 72, 119, 0.14),
    0 2px 24px rgba(19, 40, 56, 0.18);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  animation: drawer-slide-in 0.32s cubic-bezier(0.44, 0.7, 0.4, 1.1);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.drawer-logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  box-shadow: 0 1px 10px #00345518;
}

.close {
  background: none;
  border: none;
  padding: 3px 8px;
  cursor: pointer;
  color: #15364d;
  font-size: 2rem;
}
.close:hover {
  color: #e92127;
}

.drawer-link,
.drawer-link.active {
  display: block;
  margin-bottom: 20px;
  font-size: 1.17rem;
  font-weight: 600;
  color: #163d63;
  padding: 7px 0;
  text-decoration: none;
  border-radius: 8px;
  letter-spacing: 0.01em;
  transition: background 0.16s, color 0.18s;
}
.drawer-link:hover,
.drawer-link.active {
  background: #eaf3f7;
  color: #0c385e;
}

.mobile-submenu {
  padding-left: 20px;
}

.submenu-item {
  font-size: 1rem;
  margin-bottom: 15px;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s;
}

/* --- Телефон на десктопе и планшете --- */
.phone-link {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 1.16rem;
  font-weight: bold;
  color: #1179bf;
  text-decoration: none;
  background: #f4fcff;
  padding: 9px 16px 9px 14px;
  border-radius: 11px;
  box-shadow: 0 2px 8px #0090e021;
  margin-left: 26px;
  transition: background 0.17s, color 0.16s, box-shadow 0.15s;
}
.phone-link:hover,
.phone-link:focus {
  background: #e3f2fc;
  color: #08446e;
  box-shadow: 0 4px 16px #1179bf25;
}
.phone-link i {
  font-size: 1.18em;
}

/* --- Телефон в drawer (мобилка) --- */
.phone-link-drawer {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  font-size: 1.11rem;
  font-weight: 600;
  color: #1179bf;
  text-decoration: none;
  padding: 12px 4px;
  border-radius: 8px;
  background: #f4fcff;
  box-shadow: 0 2px 8px #0090e012;
  justify-content: center;
}
.phone-link-drawer:hover,
.phone-link-drawer:focus {
  background: #e3f2fc;
  color: #08446e;
  box-shadow: 0 4px 16px #1179bf1f;
}
.phone-link-drawer i {
  font-size: 1.14em;
}

.mobile-socials {
  display: flex;
  gap: 18px;
  justify-content: center;
  margin-top: 22px;
  margin-bottom: 2px;
}

.mobile-social-link {
  color: #1179bf;
  font-size: 1.45em;
  transition: color 0.18s, transform 0.18s;
  display: flex;
  align-items: center;
}
.mobile-social-link:hover {
  color: #25d366; /* WhatsApp/Viber зеленый, либо свой акцент */
  transform: scale(1.13);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .nav-desktop {
    display: none;
  }
  .app-header {
    padding: 0 10px;
  }
  .logo-link {
    height: 54px;
    padding-right: 6px;
  }
  .logo {
    width: 38px;
    height: 38px;
  }
  .burger {
    display: block;
  }
  .phone-link {
    margin-left: auto;
    padding: 7px 9px 7px 10px;
    font-size: 1.06rem;
  }
}

@media (max-width: 400px) {
  .mobile-drawer {
    max-width: 99vw;
    padding: 28px 5vw 18px;
  }
  .phone-link-drawer {
    font-size: 0.99rem;
    padding: 10px 3px;
  }
}
</style>