<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const linkItems = computed(() => {
  const value = tm('electrician.links.items')
  return Array.isArray(value) ? value : []
})
</script>\n<template>
  <div class="electrician-links">
    <h2>{{ t('electrician.links.title') }}</h2>
    <div class="links-grid">
      <router-link
        v-for="(item, index) in linkItems"
        :key="item.path || index"
        :to="item.path"
        class="link-card"
      >
        <h3>{{ item.heading }}</h3>
        <p>{{ item.body }}</p>
      </router-link>
    </div>
  </div>
</template>\n<style scoped>
.electrician-links {
  margin: 40px 0;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 8px;
}
h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #164087;
  margin-bottom: 25px;
  text-align: center;
}
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.link-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: block;
}
.link-card:hover {
  border-color: #044877;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.link-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #044877;
  margin-bottom: 10px;
}
.link-card p {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
  margin: 0;
}
@media (max-width: 768px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
  .electrician-links {
    padding: 20px;
  }
}
</style> 

