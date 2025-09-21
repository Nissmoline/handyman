<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  icon: Object,
  title: String,
  description: String,
  link: String,
})
</script>

<template>
  <component :is="link ? RouterLink : 'li'" :to="link" class="service-item-component">
    <li class="service-item">
      <span class="service-icon">
        <component :is="icon" size="38" stroke-width="2.2" />
      </span>
      <div>
        <h3 class="service-title">{{ title }}</h3>
        <p class="service-description">{{ description }}</p>
      </div>
    </li>
  </component>
</template>


<style scoped>
.service-item-component {
  text-decoration: none;
  color: inherit;
  display: block;
}
.service-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(22, 54, 77, 0.412);
  transition: all 0.3s ease;
  height: 100%; /* Ensure all items have the same height */
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.service-item:hover {
  box-shadow: 0 4px 18px rgba(22, 54, 77, 0.811);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .service-item {
    padding: 1.5rem 1rem;
    border-radius: 12px;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
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
  .service-item {
    padding: 1rem 0.75rem;
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
.service-icon {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #164087;
}
.service-title {
  font-size: 1.05rem;
  font-weight: bold;
  color: #164087;
  margin-bottom: 0.3em;
}
.service-description {
  color: #233245;
  font-size: 0.97rem;
}
</style>
