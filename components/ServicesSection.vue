<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ServiceItem from './ServiceItem.vue'
import { SwatchBook, InspectionPanel, Hammer, BrickWall, House, Plug, Droplets } from 'lucide-vue-next'

const serviceDefinitions = [
  { icon: Plug, titleKey: 'services.list.electrician.title', descriptionKey: 'services.list.electrician.description', link: '/electrician' },
  // { icon: Droplets, titleKey: 'services.list.plumber.title', descriptionKey: 'services.list.plumber.description', link: '/plumber' },
  // { icon: InspectionPanel, titleKey: 'services.list.tiling.title', descriptionKey: 'services.list.tiling.description', link: '/tiling' },
  // { icon: SwatchBook, titleKey: 'services.list.painting.title', descriptionKey: 'services.list.painting.description', link: '/painting' },
  { icon: Hammer, titleKey: 'services.list.carpentry.title', descriptionKey: 'services.list.carpentry.description', link: '/carpentry' },
  // { icon: BrickWall, titleKey: 'services.list.renovations.title', descriptionKey: 'services.list.renovations.description', link: '/renovations' },
  { icon: House, titleKey: 'services.list.maintenance.title', descriptionKey: 'services.list.maintenance.description', link: '/maintenance' }
]

const { t } = useI18n()

const services = computed(() =>
  serviceDefinitions.map((item) => ({
    icon: item.icon,
    link: item.link,
    title: t(item.titleKey),
    description: t(item.descriptionKey)
  }))
)
</script>

<template>
  <section class="services-section" id="services">
    <h2 class="services-heading">{{ t('services.heading') }}</h2>
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
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
.services-heading {
  text-align: center;
  color: #164087;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
}
.services-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 1.2rem;
  list-style: none;
  padding: 25px;
}
@media (max-width: 950px) {
  .services-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .services-section {
    padding: 2rem 1rem;
  }
  
  .services-heading {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    padding: 0 16px;
  }
  
  .services-list {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 8px;
  }
  
  .service-item {
    padding: 20px 16px;
    border-radius: 12px;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .service-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .service-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: linear-gradient(135deg, #eaf3f7 0%, #d4e9f4 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .service-title {
    font-size: 1.1rem;
    margin-bottom: 8px;
    color: #164087;
  }
  
  .service-description {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #4a5568;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 1.5rem 0.5rem;
  }
  
  .services-heading {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  
  .service-item {
    padding: 16px 12px;
  }
  
  .service-icon {
    width: 40px;
    height: 40px;
  }
  
  .service-title {
    font-size: 1rem;
  }
  
  .service-description {
    font-size: 0.9rem;
  }
}
</style>


