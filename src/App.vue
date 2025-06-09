<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppBottomBar from '@/components/AppBottomBar.vue'
import AppointmentPopup from '@/components/AppointmentPopup.vue'

const popupOpen = ref(false)
function openPopup() { popupOpen.value = true }
function closePopup() { popupOpen.value = false }
</script>

<template>
  <AppHeader @contact="openPopup" />
  <router-view />
  <AppBottomBar @contact="openPopup" />
  <AppointmentPopup v-model:isOpen="popupOpen" />
</template>
