<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ServiceItem from './ServiceItem.vue'
import { Anchor, Hammer, House, Plug } from 'lucide-vue-next'

const serviceDefinitions = [
  { icon: Plug, key: 'electrician', link: '/electrician' },
  { icon: Anchor, key: 'yachtRepair', link: '/yacht-repair' },
  { icon: Hammer, key: 'carpentry', link: '/carpentry' },
  { icon: House, key: 'maintenance', link: '/maintenance' },
  // SEO pages kept active, but hidden from the homepage services grid for now:
  // { key: 'plumber', link: '/plumber' },
  // { key: 'tiling', link: '/tiling' },
  // { key: 'painting', link: '/painting' },
  // { key: 'renovations', link: '/renovations' },
]

const { t } = useI18n()

const services = computed(() =>
  serviceDefinitions.map((item) => ({
    icon: item.icon,
    link: item.link,
    title: t(`services.list.${item.key}.title`),
    description: t(`services.list.${item.key}.description`),
    cta: t(`services.list.${item.key}.cta`),
  }))
)
</script>

<template>
  <section class="services-section" id="services" aria-labelledby="services-heading">
    <h2 id="services-heading" class="services-heading">{{ t('services.heading') }}</h2>
    <p class="services-intro">{{ t('services.intro') }}</p>
    <ul class="services-list">
      <ServiceItem
        v-for="(service, i) in services"
        :key="service.link ?? i"
        v-bind="service"
      />
    </ul>
  </section>
</template>

<style scoped>
.services-section {
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.services-heading {
  text-align: center;
  color: #164087;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.services-intro {
  max-width: 760px;
  margin: 0 auto 2rem;
  color: #334155;
  font-size: 1.05rem;
  line-height: 1.6;
  text-align: center;
}

.services-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

@media (max-width: 1100px) {
  .services-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 2.25rem 1rem;
  }

  .services-heading {
    font-size: 1.75rem;
  }

  .services-intro {
    font-size: 0.98rem;
  }

  .services-list {
    grid-template-columns: 1fr;
  }
}
</style>
