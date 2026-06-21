<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
  <main class="not-found" aria-labelledby="not-found-title">
    <p class="not-found__code">404</p>
    <h1 id="not-found-title">
      {{ locale === 'el' ? 'Η σελίδα δεν βρέθηκε' : 'Page not found' }}
    </h1>
    <p>
      {{ locale === 'el'
        ? 'Η διεύθυνση μπορεί να έχει αλλάξει ή να μην υπάρχει πλέον.'
        : 'The address may have changed or may no longer exist.' }}
    </p>
    <router-link to="/" class="not-found__link">
      {{ locale === 'el' ? 'Επιστροφή στην αρχική' : 'Return home' }}
    </router-link>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 16px;
  padding: 80px 24px;
  text-align: center;
  color: #243648;
}

.not-found__code {
  margin: 0;
  color: #1179bf;
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 900;
  line-height: 1;
}

.not-found h1,
.not-found p {
  margin: 0;
}

.not-found__link {
  display: inline-flex;
  margin-top: 12px;
  padding: 12px 20px;
  border-radius: 10px;
  background: #044877;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
}
</style>
