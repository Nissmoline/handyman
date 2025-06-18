  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { Phone as LucidePhone, MessageSquare as LucideMessageSquare } from 'lucide-vue-next'
  
  const telLink = 'tel:+306949214461'
  const emit = defineEmits(['contact'])
  
  function openAppointment() { emit('contact') }
  
  const isFooterVisible = ref(false)
  
  onMounted(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new window.IntersectionObserver(
      ([entry]) => { isFooterVisible.value = entry.isIntersecting },
      { threshold: 0.1 }
    )
    observer.observe(footer)
    onBeforeUnmount(() => observer.disconnect())
  })
  
  </script>

<template>
  <nav
    class="bottom-bar"
    :style="{ transform: isFooterVisible ? 'translateY(100%)' : 'translateY(0)' }"
  >
    <a :href="telLink" class="bar-btn" aria-label="Κλήση">
      <lucide-phone :size="28"/>
    </a>
    <button class="bar-btn" @click="openAppointment" aria-label="Επαφή">
      <lucide-message-square :size="28"/>
    </button>
  </nav>
</template>

  
  <style>
  .bottom-bar {
    position: fixed; bottom: 0; left: 0; right: 0;
    display: flex; justify-content: space-around; align-items: center;
    background: #fff; border-top: 1px solid #eee; z-index: 10000;
    height: 56px; box-shadow: 0 -2px 12px #0002;
    animation: slide-up 0.4s;
    .bottom-bar {
    transition: transform 0.3s;
}

  }
  .bar-btn {
    flex: 1; display: flex; justify-content: center; align-items: center;
    background: none; border: none; height: 100%;
    font-size: 1.5rem; color: #333; transition: background 0.2s;
  }
  .bar-btn:active { background: #f0f0f0; }
  @media (min-width: 1025px) {
    .bottom-bar { display: none; }
  }
  @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
  </style>
  