import { createI18n } from 'vue-i18n';
import el from './el.js';
import en from './en.js';

const STORAGE_KEY = 'handyman:locale';
export const supportedLocales = ['el', 'en'];

const detectBrowserLocale = () => {
  if (typeof navigator === 'undefined') return 'el';
  const preferred = (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language || 'el').toLowerCase();
  if (preferred.startsWith('en')) return 'en';
  if (preferred.startsWith('el')) return 'el';
  return 'el';
};

const resolveInitialLocale = () => {
  if (typeof window === 'undefined') return 'el';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && supportedLocales.includes(stored)) return stored;
  return detectBrowserLocale();
};

const initialLocale = resolveInitialLocale();

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: initialLocale,
  fallbackLocale: 'el',
  messages: { el, en },
});

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', initialLocale);
}

export const setLocale = (locale) => {
  if (!supportedLocales.includes(locale)) return;
  if (i18n.global.locale.value === locale) return;
  i18n.global.locale.value = locale;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', locale);
  }
};

export default i18n;
