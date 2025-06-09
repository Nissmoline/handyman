<script setup lang="ts">
import logoUrl from '@/assets/logo.svg'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-vue-next'

const linkGroups = [
  {
    title: 'Εταιρεία',
    links: [
      { label: 'Σχετικά με εμάς', href: '/about' },
      { label: 'Υπηρεσίες', href: '/ServicesSection' },
    ],
  },
  {
    title: 'Πληροφορίες',
    links: [
      { label: 'Επικοινωνήστε μαζί μας', href: '/contacts' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      
        <!-- logo -->
        <div class="footer__brand">
    <img
      :src="logoUrl"
      alt="Handyman logo"
      class="footer__logo"
      width="122"
      height="59"
      loading="lazy"
    />
    <span class="footer__brand-name"></span>
  </div>
      
      <nav class="footer__nav" aria-label="Footer navigation">
        <ul
          v-for="(group, idx) in linkGroups"
          :key="idx"
          class="footer__nav-group"
        >
          <li class="footer__nav-title">{{ group.title }}</li>
          <li v-for="(link, li) in group.links" :key="li">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </nav>
      
      <!-- Social media -->
      <div class="footer__social">
        <a
          v-for="(soc, i) in socialLinks"
          :key="i"
          :href="soc.href"
          target="_blank"
          rel="noopener"
          :aria-label="soc.label"
        >
          <component :is="soc.icon" :size="22" />
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
  box-shadow:
    0 0 12px 2px #fff,
    0 6px 24px 0 rgba(0,0,0,0.18);
  background: #044877;
  transition: box-shadow 0.18s;
}
.footer__logo:hover {
  box-shadow:
    0 0 20px 4px #fff,
    0 8px 28px 0 rgba(0,0,0,0.22);
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
.footer__nav-group a {
  color: inherit;
  text-decoration: none;
  opacity: 0.88;
  transition: opacity 0.18s;
}
.footer__nav-group a:hover {
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

@media (max-width: 900px) {
  .footer__container {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 0 20px;
  }
  .footer__nav {
    gap: 26px;
    margin-bottom: 8px;
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .footer {
    padding: 30px 0 8px 0;
  }
  .footer__container {
    flex-direction: column;
    align-items: center;
    gap: 26px;
    padding: 10px 10px;
    max-width: 100%;
  }
  .footer__brand {
    justify-content: center;
    margin-bottom: 2px;
  }
  .footer__logo {
    width: 92px !important;
    height: auto !important;
    margin-bottom: 6px;
  }
  .footer__nav {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-width: 0;
    margin-bottom: 2px;
  }
  .footer__nav-group {
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
  }
  .footer__social {
    justify-content: center;
    width: 100%;
    gap: 22px;
    margin: 10px 0 0 0;
  }
}
</style>
