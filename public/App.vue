<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppBottomBar from '@/components/AppBottomBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppointmentPopup from '@/components/AppointmentPopup.vue'
import CookieConsent from '@/components/CookieConsent.vue'
import { SpeedInsights } from '@vercel/speed-insights/vue';

const popupOpen = ref(false)
function openPopup() { popupOpen.value = true }
function closePopup() { popupOpen.value = false }

provide('openAppointmentPopup', openPopup)

// --- SEO Meta Tags Management ---
const route = useRoute();

const defaultTitle = 'Ηλεκτρολόγος & Υδραυλικός 24/7 Αθήνα – Handyman24';
const defaultDescription = '24ωρες ηλεκτρολογικές & υδραυλικές υπηρεσίες σε Αθήνα-Πειραιά. Πιστοποιημένοι τεχνικοί для βλάβες, εγκαταστάσεις, επισκευές.';
const defaultOgImage = 'https://handyman24.gr/metaimg.jpg';

const seoMeta = {
  '/': {
    title: defaultTitle,
    description: defaultDescription,
    ogImage: defaultOgImage,
    twitterImage: defaultOgImage
  },
  '/offers': {
    title: 'Προσφορές Ηλεκτρολόγου & Υδραυλικού - Handyman24',
    description: 'Δείτε τις τρέχουσες προσφορές μας για ηλεκτρολογικές και υδραυλικές εργασίες στην Αθήνα. Επωφεληθείτε από τις ειδικές τιμές μας.',
    ogImage: defaultOgImage,
    twitterImage: defaultOgImage
  },
  '/electrician': {
    title: 'Ηλεκτρολόγος Αθήνα 24/7 | Άμεση Εξυπηρέτηση - Handyman24',
    description: 'Εξειδικευμένος ηλεκτρολόγος στην Αθήνα διαθέσιμος 24/7. Αναλαμβάνουμε βλάβες, εγκαταστάσεις, πιστοποιητικά ΔΕΗ. Καλέστε μας τώρα.',
    ogImage: defaultOgImage,
    twitterImage: defaultOgImage
  },
  '/plumber': {
    title: 'Υδραυλικός Αθήνα 24/7 | Επισκευές & Εγκαταστάσεις - Handyman24',
    description: 'Άμεση εξυπηρέτηση από έμπειρο υδραυλικό στην Αθήνα, 24 ώρες το 24ωρο. Διαρροές, αποφράξεις, εγκαταστάσεις θερμοσίφωνα.',
    ogImage: defaultOgImage,
    twitterImage: defaultOgImage
  },
  '/tiling': {
    title: 'Τοποθέτηση Πλακιδίων Αθήνα - Handyman24',
    description: 'Επαγγελματική τοποθέτηση и επισκευή πλακιδίων σε δάπεδα и τοίχους. Άριστη ποιότητα εργασίας σε μπάνιο, κουζίνα, και εξωτερικούς χώρους.',
    ogImage: defaultOgImage,
    twitterImage: defaultOgImage
  },
  '/painting': {
    title: 'Βάψιμο Σπιτιού & Χρωματισμοί Αθήνα - Handyman24',
    description: 'Αναλαμβάνουμε επαγγελματικούς χρωματισμούς και βάψιμο σπιτιού στην Αθήνα. Χρησιμοποιούμε ποιοτικά υλικά για άψογο αποτέλεσμα.',
    ogImage: defaultOgImage,
    twitterImage: defaultOgImage
  },
  '/carpentry': {
    title: 'Ξυλουργικές Εργασίες & Επισκευές Αθήνα - Handyman24',
    description: 'Έμπειρος ξυλουργός για επισκευές επίπλων και ειδικές κατασκευές στην Αθήνα. Ντουλάπες, έπιπνα κουζίνας, και μερεμέτια.',
    ogImage: defaultOgImage,
    twitterImage: defaultOgImage
  },
  '/renovations': {
    title: 'Ανακαινίσεις Σπιτιών & Χώρων Αθήνα - Handyman24',
    description: "Ολική ή μερική ανακαίνιση σπιτιού και επαγγελματικών χώρων στην Αθήνα. Παραδίδουμε τον χώρο σας ανανεωμένο, 'με το κλειδί στο χέρι'.",
    ogImage: defaultOgImage,
    twitterImage: defaultOgImage
  },
  '/maintenance': {
    title: 'Συντήρηση Κτιρίων & Επισκευές Αθήνα - Handyman24',
    description: 'Πακέτα συντήρησης για κτίρια και κατοικίες στην Αθήνα. Προληπτικοί έλεγχοι и άμεσες επισκευές για να διατηρήσετε την αξία της περιουσίας σας.',
    ogImage: defaultOgImage,
    twitterImage: defaultOgImage
  }
};

watch(
  () => route.path,
  (newPath: string) => {
    const meta = seoMeta[newPath] || { title: defaultTitle, description: defaultDescription, ogImage: defaultOgImage, twitterImage: defaultOgImage };
    
    if (!document || !document.head) {
      console.error('Document or document.head is not available.');
      return;
    }

    // Update Title
    document.title = meta.title;

    // Update Meta Description
    let descriptionTag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (descriptionTag) {
      descriptionTag.setAttribute('content', meta.description);
    } else {
      descriptionTag = document.createElement('meta');
      descriptionTag.name = 'description';
      descriptionTag.content = meta.description;
      document.head.appendChild(descriptionTag);
    }

    // Update Canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const canonicalUrl = `https://handyman24.gr${newPath === '/' ? '' : newPath}`;
    if (canonicalTag) {
      canonicalTag.setAttribute('href', canonicalUrl);
    } else {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      canonicalTag.href = canonicalUrl;
      document.head.appendChild(canonicalTag);
    }

    // Update Open Graph Title
    let ogTitleTag = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', meta.title);
    } else {
      ogTitleTag = document.createElement('meta');
      ogTitleTag.setAttribute('property', 'og:title');
      ogTitleTag.content = meta.title;
      document.head.appendChild(ogTitleTag);
    }

    // Update Open Graph Description
    let ogDescriptionTag = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
    if (ogDescriptionTag) {
      ogDescriptionTag.setAttribute('content', meta.description);
    } else {
      ogDescriptionTag = document.createElement('meta');
      ogDescriptionTag.setAttribute('property', 'og:description');
      ogDescriptionTag.content = meta.description;
      document.head.appendChild(ogDescriptionTag);
    }

    // Update Open Graph URL
    let ogUrlTag = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (ogUrlTag) {
      ogUrlTag.setAttribute('content', canonicalUrl);
    } else {
      ogUrlTag = document.createElement('meta');
      ogUrlTag.setAttribute('property', 'og:url');
      ogUrlTag.content = canonicalUrl;
      document.head.appendChild(ogUrlTag);
    }

    // Update Open Graph Image
    let ogImageTag = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null;
    if (meta.ogImage) {
      if (ogImageTag) {
        ogImageTag.setAttribute('content', meta.ogImage);
      } else {
        ogImageTag = document.createElement('meta');
        ogImageTag.setAttribute('property', 'og:image');
        ogImageTag.content = meta.ogImage;
        document.head.appendChild(ogImageTag);
      }
    } else if (ogImageTag) {
      ogImageTag.remove();
    }

    // Update Twitter Image
    let twitterImageTag = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement | null;
    if (meta.twitterImage) {
      if (twitterImageTag) {
        twitterImageTag.setAttribute('content', meta.twitterImage);
      } else {
        twitterImageTag = document.createElement('meta');
        twitterImageTag.setAttribute('name', 'twitter:image');
        twitterImageTag.content = meta.twitterImage;
        document.head.appendChild(twitterImageTag);
      }
    } else if (twitterImageTag) {
      twitterImageTag.remove();
    }
  },
  { immediate: true } // Run on component mount
);
</script>

<template>
  <AppHeader @contact="openPopup" />
  <router-view />
  <AppBottomBar @contact="openPopup" />
  <AppFooter />
  <CookieConsent />
  <AppointmentPopup v-model:isOpen="popupOpen" />
  <SpeedInsights />
</template>

<style>
.app-main {
  min-height: 100vh;
  padding-bottom: 56px;
}
</style>
