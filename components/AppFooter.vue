<script setup lang="ts">
import logoUrl from "/logo.svg";
import { useRoute, useRouter } from "vue-router";
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import CookieSettings from './CookieSettings.vue';

type FooterLink =
  | { type: "hash"; value: string; labelKey: string }
  | { type: "route"; route: string; labelKey: string }
  | { type: "action"; action: "appointment" | "cookies"; labelKey: string };

type FooterGroup = {
  titleKey: string;
  links: FooterLink[];
};

const router = useRouter();
const route = useRoute();
const openAppointmentPopup = inject("openAppointmentPopup") as () => void;
const cookieSettingsRef = ref<InstanceType<typeof CookieSettings> | null>(null);
const { t } = useI18n();
const contactEmail = "handyman24gr@gmail.com";

const linkGroups: readonly FooterGroup[] = [
  {
    titleKey: "footer.company.title",
    links: [
      { type: "hash", value: "about", labelKey: "footer.company.about" },
      { type: "hash", value: "services", labelKey: "footer.company.services" },
    ],
  },
  {
    titleKey: "footer.services.title",
    links: [
      { type: "route", route: "/electrician", labelKey: "footer.services.electrician" },
      { type: "route", route: "/yacht-repair", labelKey: "footer.services.yachtRepair" },
      { type: "route", route: "/carpentry", labelKey: "footer.services.carpentry" },
      { type: "route", route: "/maintenance", labelKey: "footer.services.maintenance" },
      // SEO pages kept active, but hidden from the footer services list for now:
      // { type: "route", route: "/plumber", labelKey: "footer.services.plumber" },
      // { type: "route", route: "/tiling", labelKey: "footer.services.tiling" },
      // { type: "route", route: "/painting", labelKey: "footer.services.painting" },
      // { type: "route", route: "/renovations", labelKey: "footer.services.renovations" },
    ],
  },
  {
    titleKey: "footer.info.title",
    links: [
      { type: "action", action: "appointment", labelKey: "footer.info.contact" },
      { type: "route", route: "/electrician-faq", labelKey: "footer.info.faq" },
      { type: "route", route: "/privacy-policy", labelKey: "footer.info.privacy" },
      { type: "route", route: "/impressum", labelKey: "footer.info.impressum" },
      { type: "action", action: "cookies", labelKey: "footer.info.cookies" },
    ],
  },
];

const socialLinks = [
  { href: "https://www.facebook.com/share/1FyUjq1AGd/", icon: ["fab", "facebook"] as const, label: "Facebook" },
  { href: "https://instagram.com/handyman24.gr", icon: ["fab", "instagram"] as const, label: "Instagram" },
  { href: "viber://chat?number=+306949214461", icon: ["fab", "viber"] as const, label: "Viber" },
  { href: "https://wa.me/+306949214461", icon: ["fab", "whatsapp"] as const, label: "WhatsApp" },
  { href: "https://t.me/+306949214461", icon: ["fab", "telegram"] as const, label: "Telegram" },
];

const year = new Date().getFullYear();

function handleLogoClick(e: MouseEvent) {
  if (route.path === "/") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      history.replaceState(null, "", "/");
    }
  }
}

function goToHash(id: string) {
  if (route.path !== "/") {
    router.push({ path: "/", hash: `#${id}` });
  } else {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    history.replaceState(null, "", `#${id}`);
  }
}

function openCookieSettings() {
  cookieSettingsRef.value?.openSettings();
}
</script>

<template>
  <footer id="footer" class="footer">
    <div class="footer__container">
      <div class="footer__brand">
        <router-link to="/" class="footer__logo-link" @click="handleLogoClick">
          <img
            :src="logoUrl"
            alt="Handyman logo"
            class="footer__logo"
            width="122"
            height="59"
            loading="lazy"
          />
        </router-link>
        <address class="footer__contact">
          <a href="tel:+306949214461">{{ t('footer.contact.phone') }}</a>
          <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
          <span>{{ t('footer.contact.address') }}</span>
        </address>
      </div>
      <nav class="footer__nav" aria-label="Footer navigation">
        <ul
          v-for="(group, idx) in linkGroups"
          :key="group.titleKey ?? idx"
          class="footer__nav-group"
        >
          <li class="footer__nav-title">{{ t(group.titleKey) }}</li>
          <li v-for="link in group.links" :key="link.labelKey">
            <a
              v-if="link.type === 'hash'"
              :href="'#' + link.value"
              @click.prevent="goToHash(link.value)"
            >
              {{ t(link.labelKey) }}
            </a>
            <router-link
              v-else-if="link.type === 'route'"
              :to="link.route"
            >
              {{ t(link.labelKey) }}
            </router-link>
            <button
              v-else-if="link.type === 'action' && link.action === 'appointment'"
              type="button"
              @click.prevent="openAppointmentPopup"
            >
              {{ t(link.labelKey) }}
            </button>
            <button
              v-else-if="link.type === 'action' && link.action === 'cookies'"
              type="button"
              @click.prevent="openCookieSettings"
            >
              {{ t(link.labelKey) }}
            </button>
          </li>
        </ul>
      </nav>
      <div class="footer__social">
        <a
          v-for="(soc, i) in socialLinks"
          :key="i"
          :href="soc.href"
          target="_blank"
          rel="noopener"
          :aria-label="soc.label"
        >
          <font-awesome-icon :icon="soc.icon" class="footer__social-icon" />
        </a>
      </div>
    </div>
    <div class="footer__bottom">
      <span>{{ t('footer.bottom', { year }) }}</span>
      <span class="footer__credit">
        {{ t('footer.creditPrefix') }}
        <a href="https://impacttech.gr/" target="_blank" rel="noopener">ImpactTech.gr</a>
      </span>
    </div>
  </footer>
  
  <CookieSettings ref="cookieSettingsRef" />
</template>

<style scoped>
.footer {
  background: var(--color-bg-secondary, #044877);
  color: var(--color-text-primary, #fff);
  font-size: 16px;
  padding: 36px 0 12px 0;
}

.footer__container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 32px;
  box-sizing: border-box;
}

.footer__brand {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 220px;
  margin-bottom: 14px;
}

.footer__contact {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-style: normal;
  line-height: 1.35;
  max-width: 240px;
}

.footer__contact a,
.footer__contact span {
  color: inherit;
  text-decoration: none;
  opacity: 0.9;
  font-size: 0.95rem;
}

.footer__contact a:hover {
  opacity: 1;
  text-decoration: underline;
}
.footer__logo {
  border-radius: 12px;
  box-shadow: 0 0 12px 2px #fff, 0 6px 24px 0 rgba(0, 0, 0, 0.18);
  background: #044877;
  transition: box-shadow 0.18s;
}
.footer__logo:hover {
  box-shadow: 0 0 20px 4px #fff, 0 8px 28px 0 rgba(0, 0, 0, 0.22);
  transform: scale(1.03);
}

.footer__brand-name {
  font-weight: bold;
  font-size: 1.12em;
}

.footer__nav {
  display: flex;
  gap: 40px;
  flex: 2 1 320px;
  min-width: 180px;
}
.footer__nav-group {
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.footer__nav-title {
  font-weight: 600;
  margin-bottom: 3px;
  color: var(--color-accent, #20ba7c);
  font-size: 1em;
}
.footer__nav-group a,
.footer__nav-group button {
  color: inherit;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  opacity: 0.88;
  transition: opacity 0.18s;
}
.footer__nav-group a:hover,
.footer__nav-group button:hover {
  opacity: 1;
  text-decoration: underline;
}

.footer__social {
  display: flex;
  gap: 18px;
  min-width: 120px;
  margin-top: 8px;
}
.footer__social a {
  color: var(--color-accent, #269b7c);
  transition: color 0.18s, transform 0.18s;
  display: flex;
  align-items: center;
  font-size: 1.45em;
}
.footer__social a:hover {
  color: var(--color-accent-hover, #20ba7c);
  transform: scale(1.17);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px 18px;
  text-align: center;
  font-size: 0.99em;
  opacity: 0.8;
  margin-top: 32px;
  border-top: 1px solid var(--color-border, #294054);
  padding-top: 14px;
}

.footer__credit a {
  color: var(--color-accent, #20ba7c);
  font-weight: 700;
  text-decoration: none;
}

.footer__credit a:hover,
.footer__credit a:focus-visible {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .footer {
    padding: 24px 0 14px;
  }
  
  .footer__container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 16px;
  }
  
  .footer__brand {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    gap: 12px;
    margin-bottom: 0;
    padding: 18px 16px 16px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.07);
    box-shadow: 0 10px 28px rgba(3, 34, 57, 0.18);
    box-sizing: border-box;
  }

  .footer__logo-link {
    display: inline-flex;
    line-height: 0;
  }

  .footer__contact {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    max-width: 440px;
    gap: 8px;
  }
  
  .footer__contact a,
  .footer__contact span {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 38px;
    padding: 8px 10px;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.065);
    font-size: 0.9rem;
    font-weight: 650;
    line-height: 1.25;
    overflow-wrap: anywhere;
    opacity: 0.96;
    box-sizing: border-box;
  }

  .footer__contact span {
    grid-column: 1 / -1;
  }

  .footer__logo {
    width: 110px !important;
    height: auto !important;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.72), 0 6px 18px rgba(0, 0, 0, 0.16);
  }
  
  .footer__nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    width: 100%;
    min-width: 0;
    text-align: left;
  }
  
  .footer__nav-group {
    min-width: 0;
    align-items: stretch;
    gap: 7px;
    margin-bottom: 0;
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.055);
    box-sizing: border-box;
  }

  .footer__nav-group:nth-child(3) {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .footer__nav-group:nth-child(3) .footer__nav-title {
    grid-column: 1 / -1;
    margin-bottom: 0;
  }

  .footer__nav-group:nth-child(3) li:not(.footer__nav-title) {
    display: flex;
  }

  .footer__nav-group:nth-child(3) a,
  .footer__nav-group:nth-child(3) button {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 8px 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.055);
  }
  
  .footer__nav-title {
    font-size: 1.1rem;
    margin-bottom: 4px;
    line-height: 1.2;
  }
  
  .footer__nav-group a,
  .footer__nav-group button {
    font-size: 0.95rem;
    width: 100%;
    padding: 4px 0;
    line-height: 1.25;
    text-align: left;
    overflow-wrap: anywhere;
  }
  
  .footer__social {
    justify-content: center;
    width: 100%;
    gap: 12px;
    margin: 2px 0 0;
  }
  
  .footer__social a {
    width: 40px;
    height: 40px;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    font-size: 1.12em;
  }
  
  .footer__bottom {
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.9rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 20px 0 12px;
  }
  
  .footer__container {
    padding: 0 12px;
    gap: 14px;
  }

  .footer__brand {
    padding: 14px 12px;
  }

  .footer__contact {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .footer__logo {
    width: 104px !important;
  }

  .footer__nav {
    gap: 10px;
  }

  .footer__nav-group {
    padding: 12px;
  }
  
  .footer__nav-title {
    font-size: 1rem;
  }
  
  .footer__nav-group a,
  .footer__nav-group button {
    font-size: 0.88rem;
  }
  
  .footer__social {
    gap: 10px;
  }
  
  .footer__social a {
    width: 38px;
    height: 38px;
    font-size: 1.06em;
  }
  
  .footer__bottom {
    font-size: 0.85rem;
    margin-top: 1rem;
    padding-top: 0.75rem;
  }
}

@media (max-width: 380px) {
  .footer__nav-group:nth-child(3) {
    grid-template-columns: 1fr;
  }
}
</style>
