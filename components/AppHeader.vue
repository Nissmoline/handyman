<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Menu as LucideMenu, X as LucideX, ChevronDown } from 'lucide-vue-next'
import { Phone } from 'lucide-vue-next'
import logoUrl from '/logoico.svg'
import { setLocale, supportedLocales } from '@/i18n'

const services = [
  { labelKey: 'header.servicesMenu.electrician', path: '/electrician' },
  { labelKey: 'header.servicesMenu.carpentry', path: '/carpentry' },
  { labelKey: 'header.servicesMenu.maintenance', path: '/maintenance' },
]

const socialLinksMobile = [
  { href: 'https://www.facebook.com/share/1FyUjq1AGd/', icon: ['fab', 'facebook'], label: 'Facebook' },
  { href: 'https://instagram.com/handyman24.gr', icon: ['fab', 'instagram'], label: 'Instagram' },
  { href: 'viber://chat?number=+306949214461', icon: ['fab', 'viber'], label: 'Viber' },
  { href: 'https://wa.me/+306949214461', icon: ['fab', 'whatsapp'], label: 'WhatsApp' },
  { href: 'https://t.me/+306949214461', icon: ['fab', 'telegram'], label: 'Telegram' },
]

const tel = '+30 694 921 4461'
const telLink = 'tel:+306949214461'

const menuOpen = ref(false)
const isMobile = ref(false)
const servicesMenuOpen = ref(false)
const isHeaderVisible = ref(true)
const lastScrollY = ref(0)

const { t, locale } = useI18n()
const availableLocales = supportedLocales

const onResize = () => {
  isMobile.value = window.innerWidth <= 1024
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // Показываем меню если скроллим вверх или находимся в самом верху
  if (currentScrollY < lastScrollY.value || currentScrollY < 10) {
    isHeaderVisible.value = true
  } 
  // Скрываем меню если скроллим вниз и прошли больше 100px
  else if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    isHeaderVisible.value = false
  }
  
  lastScrollY.value = currentScrollY
}

onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', handleScroll)
})

const route = useRoute()
const isActiveHash = (hash) => route.path === '/' && route.hash === hash

const closeMenu = () => {
  menuOpen.value = false
  servicesMenuOpen.value = false
}

const selectLanguage = (lang) => {
  if (locale.value === lang) return
  
  // Запускаем анимацию переключения
  const activeButton = document.querySelector(`.language-toggle__btn.active`)
  if (activeButton) {
    activeButton.style.animation = 'language-switch 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    setTimeout(() => {
      activeButton.style.animation = ''
    }, 600)
  }
  
  setLocale(lang)
  locale.value = lang
  
  if (isMobile.value) {
    // Добавляем задержку перед закрытием меню
    setTimeout(() => {
      closeMenu()
    }, 450)
  }
}

watch(isMobile, (mobile) => {
  if (!mobile) {
    menuOpen.value = false
    servicesMenuOpen.value = false
  }
})

watch(menuOpen, (open) => {
  if (!open) {
    servicesMenuOpen.value = false
  }
})
</script>

<template>
  <header class="app-header" :class="{ 'header-hidden': !isHeaderVisible }">
    <div class="header-row">
      <router-link to="/" class="logo-link" aria-label="Handyman home" @click="closeMenu">
        <img :src="logoUrl" alt="Handyman logo" class="logo" width="42" height="42" />
      </router-link>

      <nav v-if="!isMobile" class="nav-desktop">
        <router-link :to="{ path: '/', hash: '#about' }" :class="{ active: isActiveHash('#about') }">
          {{ t('header.nav.about') }}
        </router-link>
        <div class="dropdown" @mouseenter="servicesMenuOpen = true" @mouseleave="servicesMenuOpen = false">
          <button class="dropdown-toggle">
            {{ t('header.nav.services') }}
            <ChevronDown size="16" />
          </button>
          <transition name="fade">
            <div v-if="servicesMenuOpen" class="dropdown-menu">
              <router-link
                v-for="service in services"
                :key="service.path"
                :to="service.path"
                class="dropdown-item"
              >
                {{ t(service.labelKey) }}
              </router-link>
            </div>
          </transition>
        </div>
        <router-link to="/offers" :class="{ active: route.path === '/offers' }">
          {{ t('header.nav.offers') }}
        </router-link>
      </nav>

      <div class="header-actions">
        <div class="language-toggle" role="group" :aria-label="t('header.languageLabel')">
          <button
            v-for="lang in availableLocales"
            :key="lang"
            type="button"
            class="language-toggle__btn"
            :class="{ active: locale === lang }"
            @click="selectLanguage(lang)"
          >
            {{ t('common.locale.' + lang) }}
          </button>
        </div>
        <a :href="telLink" class="phone-link" :aria-label="t('header.aria.call')">
          <Phone :size="21" class="phone-svg" />
          <span class="phone-text">{{ tel }}</span>
        </a>
      </div>

      <button
        v-if="isMobile"
        class="burger"
        @click="menuOpen = true"
        :aria-label="t('header.aria.openMenu')"
      >
        <LucideMenu :size="30" />
      </button>
    </div>

    <transition name="drawer-slide" appear>
      <aside v-if="isMobile && menuOpen" class="drawer-wrapper">
        <div class="menu-overlay" @click="closeMenu" />
        <nav class="mobile-drawer">
          <div class="drawer-header">
            <router-link to="/" class="drawer-logo-link" @click="closeMenu">
              <img :src="logoUrl" alt="Handyman logo" class="drawer-logo" width="36" height="36" />
            </router-link>
            <button class="close" @click="closeMenu" :aria-label="t('header.aria.closeMenu')">
              <LucideX :size="32" />
            </button>
          </div>

          <div class="drawer-language" :class="{ 'animate-in': menuOpen }">
            <h3 class="drawer-language__title">{{ t('header.languageLabel') }}</h3>
            <div class="language-toggle language-toggle--drawer" role="group" :aria-label="t('header.languageLabel')">
              <button
                v-for="(lang, index) in availableLocales"
                :key="`drawer-${lang}`"
                type="button"
                class="language-toggle__btn"
                :class="{ active: locale === lang }"
                :style="{ 'animation-delay': `${index * 0.1}s` }"
                @click="selectLanguage(lang)"
              >
                {{ t('common.locale.' + lang) }}
              </button>
            </div>
          </div>

          <router-link
            :to="{ path: '/', hash: '#about' }"
            class="drawer-link"
            :class="{ active: isActiveHash('#about') }"
            @click="closeMenu"
          >
            {{ t('header.nav.about') }}
          </router-link>
          <div class="drawer-link" @click="servicesMenuOpen = !servicesMenuOpen">
            {{ t('header.nav.services') }}
            <ChevronDown :class="{ 'rotate-180': servicesMenuOpen }" size="16" />
          </div>
          <transition name="fade">
            <div v-if="servicesMenuOpen" class="mobile-submenu">
              <router-link
                v-for="service in services"
                :key="service.path"
                :to="service.path"
                class="drawer-link submenu-item"
                @click="closeMenu"
              >
                {{ t(service.labelKey) }}
              </router-link>
            </div>
          </transition>
          <router-link to="/offers" class="drawer-link" :class="{ active: route.path === '/offers' }" @click="closeMenu">
            {{ t('header.nav.offers') }}
          </router-link>

          <a :href="telLink" class="phone-link-drawer" :aria-label="t('header.aria.call')" @click="closeMenu">
            <Phone :size="20" class="phone-svg" />
            <span class="phone-text">{{ tel }}</span>
          </a>

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
  position: fixed !important;
  top: 0 !important;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  min-height: 66px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(17, 121, 191, 0.08);
  padding: 0 48px;
  display: flex;
  flex-direction: column;
  transform: translateY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-hidden {
  transform: translateY(-100%);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 66px;
  max-width: 1180px;
  margin: 0 auto;
  width: 100%;
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
  box-shadow: 0 2px 14px rgba(0, 52, 85, 0.15);
}

.nav-desktop {
  display: flex;
  gap: 32px;
  align-items: center;
}
.nav-desktop a,
.nav-desktop .active {
  font-size: 1.05rem;
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
  font-size: 1.05rem;
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

.language-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px;
  border-radius: 999px;
  background: #f4fcff;
  border: 1px solid rgba(17, 121, 191, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.language-toggle:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 12px rgba(17, 121, 191, 0.15);
}
.language-toggle__btn {
  border: none;
  background: transparent;
  color: #1179bf;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 4px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1);
  position: relative;
  overflow: hidden;
}

.language-toggle__btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(17, 121, 191, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  z-index: 0;
}

.language-toggle__btn:active::before {
  width: 300px;
  height: 300px;
}
.language-toggle__btn:hover,
.language-toggle__btn:focus {
  background: #e3f2fc;
  color: #0c385e;
  transform: scale(1.05) translateY(-1px);
  box-shadow: 0 4px 12px rgba(17, 121, 191, 0.2), 0 0 20px rgba(17, 121, 191, 0.1);
  animation: hover-bounce 0.3s ease-out;
}
.language-toggle__btn.active {
  background: #1179bf;
  color: #fff;
  box-shadow: 0 4px 12px rgba(17, 121, 191, 0.3);
  transform: scale(1.02);
  animation: pulse-glow 2s ease-in-out infinite;
  position: relative;
}

.language-toggle__btn.active::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 999px;
  background: linear-gradient(45deg, #1179bf, #0c5a8a, #1179bf);
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
  z-index: -1;
}
.language-toggle__btn:active {
  transform: scale(0.98);
}

.language-toggle__btn span {
  position: relative;
  z-index: 1;
}

.phone-link {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 1.05rem;
  font-weight: 600;
  color: #1179bf;
  text-decoration: none;
  background: #f4fcff;
  padding: 9px 16px;
  border-radius: 11px;
  box-shadow: 0 2px 8px rgba(0, 144, 224, 0.13);
  transition: background 0.17s, color 0.16s, box-shadow 0.15s;
}
.phone-link:hover,
.phone-link:focus {
  background: #e3f2fc;
  color: #08446e;
  box-shadow: 0 4px 16px rgba(17, 121, 191, 0.15);
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
  box-shadow: -16px 0 32px 8px rgba(4, 72, 119, 0.14), 0 2px 24px rgba(19, 40, 56, 0.18);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  transform: translateX(0);
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
  box-shadow: 0 1px 10px rgba(0, 52, 85, 0.1);
}
.close {
  background: none;
  border: none;
  padding: 3px 8px;
  cursor: pointer;
  color: #15364d;
  font-size: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1);
  border-radius: 50%;
}
.close:hover {
  color: #e92127;
  transform: scale(1.1);
  background: rgba(233, 33, 39, 0.1);
}
.close:active {
  transform: scale(0.95);
}
.drawer-language {
  margin-bottom: 24px;
}
.drawer-language__title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #0c385e;
}
.language-toggle--drawer {
  width: fit-content;
}
.drawer-link,
.drawer-link.active {
  display: block;
  margin-bottom: 20px;
  font-size: 1.17rem;
  font-weight: 600;
  color: #163d63;
  padding: 12px 16px;
  text-decoration: none;
  border-radius: 8px;
  letter-spacing: 0.01em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(0);
  opacity: 1;
}
.drawer-link:hover,
.drawer-link.active {
  background: #eaf3f7;
  color: #0c385e;
  transform: translateX(4px);
}
.drawer-link.submenu-item {
  font-size: 1.05rem;
  font-weight: 500;
  padding: 10px 16px 10px 28px;
}
.mobile-submenu {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.rotate-180 {
  transform: rotate(180deg);
}

.phone-link-drawer {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  font-size: 1.05rem;
  font-weight: 600;
  color: #1179bf;
  text-decoration: none;
  padding: 12px 4px;
  border-radius: 8px;
  background: #f4fcff;
  box-shadow: 0 2px 8px rgba(0, 144, 224, 0.1);
  justify-content: center;
}
.phone-link-drawer:hover,
.phone-link-drawer:focus {
  background: #e3f2fc;
  color: #08446e;
  box-shadow: 0 4px 16px rgba(17, 121, 191, 0.12);
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
  color: #25d366;
  transform: scale(1.13);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Улучшенная анимация для мобильного меню */
.drawer-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.drawer-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}
.drawer-slide-enter-from {
  opacity: 0;
}
.drawer-slide-enter-from .mobile-drawer {
  transform: translateX(100%);
  opacity: 0;
}
.drawer-slide-leave-to {
  opacity: 0;
}
.drawer-slide-leave-to .mobile-drawer {
  transform: translateX(100%);
  opacity: 0;
}
.drawer-slide-enter-to .mobile-drawer,
.drawer-slide-leave-from .mobile-drawer {
  transform: translateX(0);
  opacity: 1;
}

/* Анимация появления элементов меню */
.animate-in .language-toggle__btn {
  animation: slideInFromRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* Анимация пульсации для активного языка */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(17, 121, 191, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(17, 121, 191, 0.5), 0 0 30px rgba(17, 121, 191, 0.2);
  }
}

/* Анимация переключения языка */
@keyframes language-switch {
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(-5deg);
  }
  50% {
    transform: scale(0.95) rotate(5deg);
  }
  75% {
    transform: scale(1.05) rotate(-2deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

/* Анимация hover эффекта */
@keyframes hover-bounce {
  0% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1.08) translateY(-2px);
  }
  100% {
    transform: scale(1.05) translateY(-1px);
  }
}

/* Анимация градиента для активного языка */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media (max-width: 1024px) {
  .nav-desktop {
    display: none;
  }
  .language-toggle:not(.language-toggle--drawer) {
    display: none;
  }
  .header-actions {
    margin-left: auto;
  }
  .app-header {
    position: fixed !important;
    top: 0 !important;
    padding: 0 16px;
    transform: translateY(0);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .header-hidden {
    transform: translateY(-100%);
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
    padding: 8px 12px;
    font-size: 1rem;
    border-radius: 8px;
    background: linear-gradient(135deg, #f4fcff 0%, #e3f2fc 100%);
  }
}

@media (max-width: 768px) {
  .app-header {
    position: fixed !important;
    top: 0 !important;
    padding: 0 12px;
    min-height: 60px;
    transform: translateY(0);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .header-hidden {
    transform: translateY(-100%);
  }
  .header-row {
    min-height: 60px;
  }
  .logo-link {
    height: 50px;
  }
  .logo {
    width: 36px;
    height: 36px;
  }
  .phone-link {
    padding: 8px 10px;
    font-size: 0.95rem;
  }
  .burger {
    padding: 8px;
    border-radius: 8px;
  }
}

@media (max-width: 400px) {
  .mobile-drawer {
    max-width: 95vw;
    padding: 24px 20px 20px;
  }
  .phone-link-drawer {
    font-size: 0.95rem;
    padding: 12px 16px;
  }
}

</style>













