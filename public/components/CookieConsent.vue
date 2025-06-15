<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  const hasConsent = document.cookie.split('; ').find(row => row.startsWith('cookie_consent='))
  if (!hasConsent) visible.value = true
})

function acceptCookies() {
  const expires = new Date(Date.now() + 365*24*60*60*1000).toUTCString()
  document.cookie = `cookie_consent=true; expires=${expires}; path=/`
  visible.value = false
}
</script>

<template>
  <transition name="slide-up">
    <div v-if="visible" class="cookie-consent">
      <p>Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας.</p>
      <button class="cookie-btn" @click="acceptCookies">Αποδοχή</button>
    </div>
  </transition>
</template>

<style scoped>
.cookie-consent {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #e6e8eb;
  box-shadow: 0 4px 20px rgba(50,70,100,0.07);
  padding: 14px 18px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 90vw;
  z-index: 10000;
  text-align: center;
  font-size: 0.95rem;
}
.cookie-btn {
  align-self: center;
  background: #044877;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 18px;
  font-size: 1rem;
  cursor: pointer;
}
.cookie-btn:hover {
  background: #03365d;
}
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
