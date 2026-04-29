<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

const serviceLinks = [
  { key: 'electrician', path: '/electrician' },
  { key: 'yachtRepair', path: '/yacht-repair' },
  { key: 'carpentry', path: '/carpentry' },
  { key: 'maintenance', path: '/maintenance' },
  // SEO pages kept active, but hidden from public related-service cards for now:
  // { key: 'plumber', path: '/plumber' },
  // { key: 'tiling', path: '/tiling' },
  // { key: 'painting', path: '/painting' },
  // { key: 'renovations', path: '/renovations' },
]

const relatedLinks = computed(() =>
  serviceLinks
    .filter((item) => item.path !== route.path)
    .map((item) => ({
      path: item.path,
      title: t(`services.list.${item.key}.title`),
      description: t(`services.list.${item.key}.description`),
    }))
    .slice(0, 4)
)
</script>

<template>
  <section class="related-services" aria-labelledby="related-services-title">
    <h2 id="related-services-title">{{ t('relatedServices.title') }}</h2>
    <div class="related-services__grid">
      <router-link
        v-for="link in relatedLinks"
        :key="link.path"
        :to="link.path"
        class="related-services__card"
      >
        <h3>{{ link.title }}</h3>
        <p>{{ link.description }}</p>
        <span>{{ t('relatedServices.cta') }}</span>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.related-services {
  margin-top: 44px;
  padding-top: 28px;
  border-top: 1px solid #dbe5ef;
}

.related-services h2 {
  margin-top: 0;
}

.related-services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.related-services__card {
  display: flex;
  min-height: 180px;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #dbe5ef;
  border-radius: 8px;
  background: #f8fbfd;
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.related-services__card:hover,
.related-services__card:focus-visible {
  border-color: #044877;
  box-shadow: 0 10px 24px rgba(4, 72, 119, 0.12);
  transform: translateY(-2px);
  outline: none;
}

.related-services__card h3 {
  margin-top: 0;
}

.related-services__card p {
  margin-bottom: 18px;
  text-align: left;
}

.related-services__card span {
  color: #044877;
  font-weight: 700;
}
</style>
