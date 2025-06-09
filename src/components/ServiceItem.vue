<script setup>
defineProps({
  icon: Object,
  title: String,
  description: String,
})
</script>

<template>
  <li class="service-item">
    <span class="service-icon">
      <component :is="icon" size="38" stroke-width="2.2" />
    </span>
    <div>
      <h3 class="service-title">{{ title }}</h3>
      <p class="service-description">{{ description }}</p>
    </div>
  </li>
</template>


<style scoped>
.service-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(22, 54, 77, 0.412);
  transition: box-shadow 0.2s;
}
.service-item:hover {
  box-shadow: 0 4px 18px rgba(22, 54, 77, 0.811);
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
