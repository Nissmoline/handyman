  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
  import { Phone as LucidePhone, MessageSquare as LucideMessageSquare } from 'lucide-vue-next'
  
  const props = defineProps({
    popupOpen: {
      type: Boolean,
      default: false
    }
  })
  
  // Debug logging
  watch(() => props.popupOpen, (newVal) => {
    console.log('AppBottomBar popupOpen changed:', newVal)
  })
  
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
    v-if="!props.popupOpen"
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
    position: fixed; 
    bottom: 0; 
    left: 0; 
    right: 0;
    display: flex; 
    justify-content: space-around; 
    align-items: center;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); 
    border-top: 1px solid rgba(0, 0, 0, 0.08); 
    z-index: 10000;
    height: 60px; 
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
    animation: slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transition: transform 0.3s ease;
    backdrop-filter: blur(10px);
  }
  
  .bar-btn {
    flex: 1; 
    display: flex; 
    justify-content: center; 
    align-items: center;
    background: none; 
    border: none; 
    height: 100%;
    font-size: 1.5rem; 
    color: #1179bf; 
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  
  .bar-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(17, 121, 191, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }
  
  .bar-btn:hover::before,
  .bar-btn:active::before {
    width: 60px;
    height: 60px;
  }
  
  .bar-btn:hover {
    color: #0c5a8a;
    transform: scale(1.05);
  }
  
  .bar-btn:active { 
    background: rgba(17, 121, 191, 0.1); 
    transform: scale(0.95);
  }
  
  @media (min-width: 1025px) {
    .bottom-bar { display: none; }
  }
  
  @media (max-width: 768px) {
    .bottom-bar {
      height: 65px;
      padding: 0 16px;
    }
    
    .bar-btn {
      font-size: 1.4rem;
      min-height: 44px;
    }
  }
  
  @media (max-width: 480px) {
    .bottom-bar {
      height: 60px;
      padding: 0 12px;
    }
    
    .bar-btn {
      font-size: 1.3rem;
    }
  }
  
  @keyframes slide-up { 
    from { 
      transform: translateY(100%); 
      opacity: 0;
    } 
    to { 
      transform: translateY(0); 
      opacity: 1;
    } 
  }
  </style>
  