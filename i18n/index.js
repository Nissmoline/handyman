import { createI18n } from 'vue-i18n';
import el from './el.js';
import en from './en.js';

const STORAGE_KEY = 'handyman:locale';
export const supportedLocales = ['el', 'en'];

const detectBrowserLocale = () => {
  if (typeof window === 'undefined') return 'el';

  if (typeof window.location === 'object' && typeof window.location.search === 'string' && typeof URLSearchParams !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const queryLocale = params.get('lang');
    if (queryLocale && supportedLocales.includes(queryLocale)) {
      return queryLocale;
    }
  }

  if (typeof window.location === 'object' && typeof window.location.pathname === 'string') {
    const [pathLocale] = window.location.pathname.split('/').filter(Boolean);
    if (pathLocale && supportedLocales.includes(pathLocale)) {
      return pathLocale;
    }
  }

  if (typeof document !== 'undefined') {
    const documentLang = document.documentElement.getAttribute('lang');
    if (documentLang && supportedLocales.includes(documentLang)) {
      return documentLang;
    }
  }

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

