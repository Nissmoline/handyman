<script setup lang="ts">
import { ref, provide } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppBottomBar from '@/components/AppBottomBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppointmentPopup from '@/components/AppointmentPopup.vue'

const popupOpen = ref(false)
function openPopup() { popupOpen.value = true }
function closePopup() { popupOpen.value = false }

provide('openAppointmentPopup', openPopup)
</script>

<template>
  <AppHeader @contact="openPopup" />
  <router-view />
  <AppBottomBar @contact="openPopup" />
  <AppFooter />
  <AppointmentPopup v-model:isOpen="popupOpen" />
</template>

<style>
.app-main {
  min-height: 100vh;
  padding-bottom: 56px;
}
</style>
