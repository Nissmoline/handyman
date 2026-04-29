<script setup>
defineProps({
  icon: Object,
  title: String,
  description: String,
  cta: String,
  link: String,
})
</script>

<template>
  <li class="service-item">
    <router-link
      v-if="link"
      :to="link"
      class="service-item-link"
      :aria-label="title + '. ' + cta"
    >
      <span class="service-icon" aria-hidden="true">
        <component :is="icon" size="38" stroke-width="2.2" />
      </span>
      <div class="service-copy">
        <h3 class="service-title">{{ title }}</h3>
        <p class="service-description">{{ description }}</p>
        <span class="service-cta">{{ cta }}</span>
      </div>
    </router-link>
  </li>
</template>

<style scoped>
.service-item {
  min-height: 100%;
}

.service-item-link {
  display: flex;
  min-height: 100%;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
  border: 1px solid rgba(4, 72, 119, 0.1);
  border-radius: 8px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(22, 54, 77, 0.18);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.service-item-link:hover,
.service-item-link:focus-visible {
  border-color: #044877;
  box-shadow: 0 8px 22px rgba(22, 54, 77, 0.22);
  transform: translateY(-2px);
  outline: none;
}

.service-icon {
  flex: 0 0 44px;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #164087;
  border-radius: 8px;
  background: #eaf3f7;
}

.service-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 8px;
}

.service-title {
  margin: 0;
  color: #164087;
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.25;
}

.service-description {
  margin: 0;
  color: #233245;
  font-size: 0.98rem;
  line-height: 1.5;
}

.service-cta {
  color: #0b6ea8;
  font-size: 0.95rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .service-item-link {
    padding: 1.1rem;
  }

  .service-title {
    font-size: 1rem;
  }

  .service-description,
  .service-cta {
    font-size: 0.92rem;
  }
}
</style>
