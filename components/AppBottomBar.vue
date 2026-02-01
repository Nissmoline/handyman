  
  <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Phone as LucidePhone, MessageSquare as LucideMessageSquare } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  popupOpen: {
    type: Boolean,
    default: false,
  },
})

const { t } = useI18n()

const telLink = 'tel:+306949214461'
const emit = defineEmits(['contact'])

const openAppointment = () => {
  emit('contact')
}

const isFooterVisible = ref(false)

onMounted(() => {
  const footer = document.querySelector('footer')
  if (!footer) return
  const observer = new window.IntersectionObserver(
    ([entry]) => {
      isFooterVisible.value = entry.isIntersecting
    },
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
    <a :href="telLink" class="bar-btn" :aria-label="t('header.aria.call')">
      <LucidePhone :size="28" />
    </a>
    <button class="bar-btn" @click="openAppointment" :aria-label="t('common.buttons.requestAppointment')">
      <LucideMessageSquare :size="28" />
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
    background: linear-gradient(120deg, #044877 0%, #0b6fa5 45%, #20ba7c 100%);
    background-size: 200% 200%;
    border-top: 1px solid rgba(255, 255, 255, 0.35);
    z-index: 10000;
    height: 60px; 
    box-shadow: 0 -6px 30px rgba(3, 40, 66, 0.35);
    animation: slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1), bar-shimmer 10s ease infinite;
    transition: transform 0.3s ease;
    backdrop-filter: blur(12px);
    overflow: hidden;
    isolation: isolate;
  }

  .bottom-bar::before {
    content: '';
    position: absolute;
    inset: -40% 0 0 0;
    background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.35), transparent 55%);
    opacity: 0.7;
    pointer-events: none;
  }

  .bottom-bar::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.18) 45%, transparent 70%);
    transform: translateX(-40%);
    animation: bar-sheen 4.5s ease-in-out infinite;
    pointer-events: none;
  }
  
  .bar-btn {
    flex: 1; 
    display: flex; 
    justify-content: center; 
    align-items: center;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.08));
    border: 1px solid rgba(255, 255, 255, 0.35);
    height: calc(100% - 16px);
    margin: 8px 10px;
    border-radius: 14px;
    font-size: 1.5rem; 
    color: #f8fbff;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 10px 24px rgba(2, 30, 50, 0.25);
  }

  .bar-btn:first-child {
    background: linear-gradient(160deg, rgba(32, 186, 124, 0.5), rgba(255, 255, 255, 0.15));
  }

  .bar-btn:last-child {
    background: linear-gradient(160deg, rgba(11, 111, 165, 0.55), rgba(255, 255, 255, 0.15));
  }
  
  .bar-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
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
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 16px 30px rgba(2, 30, 50, 0.3);
  }
  
  .bar-btn:active { 
    background: rgba(255, 255, 255, 0.2); 
    transform: scale(0.98);
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
      margin: 9px 10px;
    }
  }
  
  @media (max-width: 480px) {
    .bottom-bar {
      height: 60px;
      padding: 0 12px;
    }
    
    .bar-btn {
      font-size: 1.3rem;
      margin: 8px 8px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bottom-bar {
      animation: none;
    }

    .bottom-bar::after {
      animation: none;
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

  @keyframes bar-sheen {
    0% {
      transform: translateX(-60%);
      opacity: 0;
    }
    30% {
      opacity: 0.8;
    }
    60% {
      transform: translateX(60%);
      opacity: 0;
    }
    100% {
      transform: translateX(60%);
      opacity: 0;
    }
  }

  @keyframes bar-shimmer {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  </style>
  
