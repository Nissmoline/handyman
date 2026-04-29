<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const areas = computed(() => {
  const value = tm('servicedAreas.areas')
  return Array.isArray(value) ? value : []
})
</script>

<template>
  <section class="serviced-areas" id="service-areas" aria-labelledby="service-areas-heading">
    <h2 id="service-areas-heading">{{ t('servicedAreas.title') }}</h2>
    <p v-html="t('servicedAreas.intro')" />
    <ul class="areas-list">
      <li v-for="area in areas" :key="area">
        {{ area }}
      </li>
    </ul>
    <p v-html="t('servicedAreas.outro')" />
  </section>
</template>

<style scoped>
.serviced-areas {
  padding: 40px 20px;
  background: #f1f5f9;
  text-align: center;
}

h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #044877;
  margin-bottom: 20px;
}

p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  max-width: 800px;
  margin: 0 auto 20px auto;
}

.areas-list {
  list-style: none;
  padding: 0;
  margin: 0 auto 20px;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.areas-list li {
  background: #fff;
  color: #044877;
  padding: 10px 18px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  font-weight: 600;
}

@media (max-width: 768px) {
  .serviced-areas {
    padding: 2rem 1rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>
