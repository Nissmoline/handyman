  
  <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Phone as LucidePhone, MessageSquare as LucideMessageSquare } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  popupOpen: {
    type: Boolean,
    default: false,
  },
  menuOpen: {
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
let footerObserver = null

onMounted(() => {
  const footer = document.querySelector('footer')
  if (!footer) return
  footerObserver = new window.IntersectionObserver(
    ([entry]) => {
      isFooterVisible.value = entry.isIntersecting
    },
    { threshold: 0.1 }
  )
  footerObserver.observe(footer)
})

onBeforeUnmount(() => {
  footerObserver?.disconnect()
})
</script>

<template>
  <nav
    v-if="!props.popupOpen && !props.menuOpen"
    class="bottom-bar"
    :style="{ transform: isFooterVisible ? 'translateY(100%)' : 'translateY(0)' }"
  >
    <a :href="telLink" class="bar-btn bar-btn--call" :aria-label="t('header.aria.call')">
      <span class="bar-btn__icon">
        <LucidePhone :size="28" />
      </span>
    </a>
    <button class="bar-btn" @click="openAppointment" :aria-label="t('common.buttons.requestAppointment')">
      <span class="bar-btn__icon">
        <LucideMessageSquare :size="28" />
      </span>
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

  .bar-btn svg {
    position: relative;
    z-index: 2;
  }

  .bar-btn__icon {
    position: relative;
    z-index: 2;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 999px;
  }

  .bar-btn--call .bar-btn__icon {
    background: rgba(17, 121, 191, 0.07);
    animation: call-icon-glow 2.2s ease-in-out infinite;
  }

  .bar-btn--call .bar-btn__icon::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: inherit;
    background: linear-gradient(45deg, #1179bf, #20ba7c, #1179bf);
    background-size: 200% 200%;
    animation: call-ring-shift 3s ease infinite;
    opacity: 0.55;
    z-index: -1;
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
    z-index: 0;
  }

  .bar-btn::after {
    content: '';
    position: absolute;
    top: -45%;
    left: -35%;
    width: 42%;
    height: 190%;
    background: linear-gradient(
      105deg,
      transparent 0%,
      rgba(17, 121, 191, 0) 28%,
      rgba(17, 121, 191, 0.16) 46%,
      rgba(255, 255, 255, 0.85) 50%,
      rgba(17, 121, 191, 0.18) 54%,
      rgba(17, 121, 191, 0) 72%,
      transparent 100%
    );
    transform: translateX(-180%) rotate(18deg);
    animation: button-shine 3.2s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  .bar-btn:nth-child(2)::after {
    animation-delay: 1.4s;
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

  @keyframes button-shine {
    0%,
    38% {
      transform: translateX(-180%) rotate(18deg);
      opacity: 0;
    }

    48% {
      opacity: 1;
    }

    64% {
      transform: translateX(420%) rotate(18deg);
      opacity: 0;
    }

    100% {
      transform: translateX(420%) rotate(18deg);
      opacity: 0;
    }
  }

  @keyframes call-icon-glow {
    0%,
    100% {
      box-shadow:
        0 4px 12px rgba(17, 121, 191, 0.18),
        0 0 0 rgba(17, 121, 191, 0);
      transform: scale(1);
    }

    50% {
      box-shadow:
        0 6px 16px rgba(17, 121, 191, 0.28),
        0 0 22px rgba(17, 121, 191, 0.28),
        0 0 34px rgba(32, 186, 124, 0.2);
      transform: scale(1.04);
    }
  }

  @keyframes call-ring-shift {
    0% {
      background-position: 0% 50%;
      opacity: 0.38;
    }

    50% {
      background-position: 100% 50%;
      opacity: 0.72;
    }

    100% {
      background-position: 0% 50%;
      opacity: 0.38;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bar-btn::after {
      animation: none;
      opacity: 0;
    }

    .bar-btn--call .bar-btn__icon,
    .bar-btn--call .bar-btn__icon::before {
      animation: none;
    }
  }
  </style>
  
