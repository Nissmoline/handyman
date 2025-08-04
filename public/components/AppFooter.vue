<script setup lang="ts">
import logoUrl from "@/assets/logo.svg";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";

const router = useRouter();
const route = useRoute();
const openAppointmentPopup = inject("openAppointmentPopup") as () => void;

const linkGroups = [
  {
    title: "Εταιρεία",
    links: [
      { label: "Σχετικά με εμάς", hash: "#about" },
      { label: "Υπηρεσίες", hash: "#services" },
    ],
  },
  {
    title: "Πληροφορίες",
    links: [
      { label: "Επικοινωνήστε μαζί μας", action: "appointment" },
      { label: "FAQ", hash: "#faq" },
    ],
  },
];

// Массив соцсетей через FontAwesome
const socialLinks = [
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
    window.location.hash = `#${id}`;
  }
}
</script>

<template>
  <footer class="footer">
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
      </div>
      <nav class="footer__nav" aria-label="Footer navigation">
        <ul
          v-for="(group, idx) in linkGroups"
          :key="idx"
          class="footer__nav-group"
        >
          <li class="footer__nav-title">{{ group.title }}</li>
          <li v-for="(link, li) in group.links" :key="li">
            <a
              v-if="link.hash"
              :href="link.hash"
              @click.prevent="goToHash(link.hash.slice(1))"
              >{{ link.label }}</a
            >
            <button
              v-else-if="link.action === 'appointment'"
              type="button"
              @click.prevent="openAppointmentPopup"
            >
              {{ link.label }}
            </button>
          </li>
        </ul>
      </nav>
      <!-- соцсети теперь через FontAwesome -->
      <div class="footer__social">
        <a
          v-for="(soc, i) in socialLinks"
          :key="i"
          :href="soc.href"
          target="_blank"
          rel="noopener"
          :aria-label="soc.label"
        >
          <font-awesome-icon :icon="soc.icon" :size="22" />
        </a>
      </div>
    </div>
    <div class="footer__bottom">
      © {{ year }} Handyman. All rights reserved.
    </div>
  </footer>
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
  align-items: center;
  gap: 12px;
  min-width: 150px;
  margin-bottom: 14px;
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
  text-align: center;
  font-size: 0.99em;
  opacity: 0.8;
  margin-top: 32px;
  border-top: 1px solid var(--color-border, #294054);
  padding-top: 14px;
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1rem 0;
  }
  
  .footer__container {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 0 1rem;
  }
  
  .footer__brand {
    justify-content: center;
    margin-bottom: 0;
  }
  
  .footer__logo {
    width: 100px !important;
    height: auto !important;
  }
  
  .footer__nav {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    text-align: center;
  }
  
  .footer__nav-group {
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .footer__nav-title {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  .footer__nav-group a,
  .footer__nav-group button {
    font-size: 0.95rem;
    padding: 0.25rem 0;
  }
  
  .footer__social {
    justify-content: center;
    width: 100%;
    gap: 1.5rem;
    margin: 0.5rem 0 0 0;
  }
  
  .footer__social a {
    font-size: 1.3em;
  }
  
  .footer__bottom {
    font-size: 0.9rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 0 0.75rem 0;
  }
  
  .footer__container {
    padding: 0 0.75rem;
    gap: 1rem;
  }
  
  .footer__logo {
    width: 90px !important;
  }
  
  .footer__nav-title {
    font-size: 1rem;
  }
  
  .footer__nav-group a,
  .footer__nav-group button {
    font-size: 0.9rem;
  }
  
  .footer__social {
    gap: 1.25rem;
  }
  
  .footer__social a {
    font-size: 1.2em;
  }
  
  .footer__bottom {
    font-size: 0.85rem;
    margin-top: 1rem;
    padding-top: 0.75rem;
  }
}
</style>
