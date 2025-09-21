<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import emailjs from '@emailjs/browser'
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

const isOpen = defineModel('isOpen')
const name = ref('')
const email = ref('')
const phone = ref('')
const datetime = ref('')
const submitted = ref(false)
const loading = ref(false)
const error = ref('')
const selectedServices = ref([])
const multiselect = ref(null)

const { t } = useI18n()

const serviceDefinitions = [
  { value: 'electrician', labelKey: 'services.list.electrician.title' },
  /* { value: 'plumber', labelKey: 'services.list.plumber.title' },
  { value: 'tiling', labelKey: 'services.list.tiling.title' },
  { value: 'painting', labelKey: 'services.list.painting.title' }, */
  { value: 'carpentry', labelKey: 'services.list.carpentry.title' },
  /* { value: 'renovations', labelKey: 'services.list.renovations.title' }, */
  { value: 'maintenance', labelKey: 'services.list.maintenance.title' }
]

const serviceOptions = computed(() =>
  serviceDefinitions.map((item) => ({
    value: item.value,
    label: t(item.labelKey),
    labelKey: item.labelKey
  }))
)

const multipleLabel = (values) => {
  const count = Array.isArray(values) ? values.length : 0
  if (!count) return ''
  return t('appointment.form.multipleSelected', { count })
}

const handleChange = () => {
  setTimeout(() => {
    if (multiselect.value) {
      multiselect.value.close()
    }
  }, 1000)
}

const resetForm = () => {
  name.value = ''
  email.value = ''
  phone.value = ''
  datetime.value = ''
  submitted.value = false
  loading.value = false
  error.value = ''
  selectedServices.value = []
}

const closePopup = () => {
  isOpen.value = false
  resetForm()
}

const formatDate = (isoString) => {
  if (!isoString) return ''
  const [year, month, day] = isoString.split('-')
  return `${day}.${month}.${year}`
}

const resolveServiceLabel = (value) => {
  const match = serviceDefinitions.find((item) => item.value === value)
  return match ? t(match.labelKey) : value
}

const submitForm = async () => {
  loading.value = true
  error.value = ''

  try {
    await emailjs.send(
      'service_4iwmnq9',
      'template_h7kwe4j',
      {
        name: name.value,
        email: email.value,
        phone: phone.value,
        datetime: formatDate(datetime.value)
      },
      'nOz5l7-e5eiIR9lpu'
    )

    await emailjs.send(
      'service_4iwmnq9',
      'template_dhmfdmy',
      {
        name: name.value,
        email: email.value,
        phone: phone.value,
        datetime: formatDate(datetime.value),
        services: selectedServices.value.map(resolveServiceLabel).join(', ')
      },
      'nOz5l7-e5eiIR9lpu'
    )

    submitted.value = true
  } catch (e) {
    error.value = t('appointment.errors.generic')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="popup-backdrop" @click.self="closePopup">
      <div class="popup-window">
        <h2>{{ submitted ? t('appointment.success.title') : t('appointment.form.title') }}</h2>

        <div v-if="submitted" class="popup-success">
          <svg class="success-check" viewBox="0 0 52 52">
            <circle class="success-check-circle" cx="26" cy="26" r="25" fill="none" />
            <path class="success-check-mark" fill="none" d="M14 27l7 7 17-17" />
          </svg>
          <p>{{ t('appointment.success.message') }}</p>
          <button class="btn btn-outline" @click="closePopup" :aria-label="t('appointment.success.close')">
            {{ t('appointment.success.close') }}
          </button>
        </div>

        <form v-else @submit.prevent="submitForm" autocomplete="off">
          <label>
            {{ t('appointment.form.nameLabel') }}
            <input v-model="name" type="text" :placeholder="t('appointment.form.namePlaceholder')" required />
          </label>
          <label>
            {{ t('appointment.form.emailLabel') }}
            <input v-model="email" type="email" :placeholder="t('appointment.form.emailPlaceholder')" required />
          </label>
          <label>
            {{ t('appointment.form.phoneLabel') }}
            <input v-model="phone" type="tel" :placeholder="t('appointment.form.phonePlaceholder')" required />
          </label>

          <label>
            {{ t('appointment.form.servicesLabel') }}
            <Multiselect
              ref="multiselect"
              v-model="selectedServices"
              :options="serviceOptions"
              mode="multiple"
              :placeholder="t('appointment.form.servicesPlaceholder')"
              :multiple-label="multipleLabel"
              @change="handleChange"
            />
          </label>

          <label>
            {{ t('appointment.form.dateLabel') }}
            <input v-model="datetime" type="date" required />
          </label>

          <div class="popup-actions">
            <button type="submit" class="btn btn-outline" :disabled="loading">
              <template v-if="loading">
                <span class="spinner"></span> {{ t('appointment.form.submitting') }}
              </template>
              <template v-else>{{ t('appointment.form.submit') }}</template>
            </button>
            <button
              type="button"
              class="btn btn-outline"
              @click="closePopup"
              :disabled="loading"
              :aria-label="t('appointment.form.cancel')"
            >
              {{ t('appointment.form.cancel') }}
            </button>
          </div>
          <div v-if="error" class="error">{{ error }}</div>
        </form>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-backdrop {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(20, 36, 60, 0.42);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-window {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.14);
  padding: 34px 28px 18px 28px;
  min-width: 320px;
  max-width: 92vw;
  color: #022e44;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 1.08rem;
}
.popup-window h2 {
  font-size: 1.28rem;
  margin-bottom: 16px;
  font-weight: 700;
  text-align: center;
}

/* Animated green check mark */
.popup-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}
.success-check {
  width: 62px;
  height: 62px;
  display: block;
  margin-bottom: 4px;
}
.success-check-circle {
  stroke: #16bb45;
  stroke-width: 3;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: checkmark-circle 0.7s ease forwards;
}
.success-check-mark {
  stroke: #16bb45;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: checkmark-draw 0.4s 0.5s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
@keyframes checkmark-circle {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes checkmark-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.popup-window label {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 11px;
  font-size: 1rem;
}
.popup-window input {
  padding: 7px 10px;
  border-radius: 5px;
  border: 1.2px solid #c9d6e1;
  font-size: 1.05rem;
}
.popup-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 18px;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-decoration: none;
  min-width: 180px;
  padding: 12px 0;
  border-radius: 5px;
  font-size: 1.07rem;
  border: 2px solid #fff;
  background: transparent;
  color: #044877;
  cursor: pointer;
  font-weight: 500;
  transition: 0.19s;
  letter-spacing: 0.01em;
  font-family: inherit;
  line-height: 1.1;
  box-sizing: border-box;
}
.btn-outline {
  background: transparent;
  border: 2px solid #044877;
}
.btn-outline:hover:enabled {
  background: #044877;
  color: #fff;
}
.btn:disabled {
  opacity: 0.68;
  pointer-events: none;
}

.spinner {
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 2.5px solid #044877;
  border-top: 2.5px solid #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin-right: 9px;
  vertical-align: middle;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #e92127;
  font-size: 1.02em;
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .popup-backdrop {
    padding: 16px;
  }
  
  .popup-window {
    width: 100%;
    max-width: 400px;
    padding: 24px 20px;
    border-radius: 16px;
    font-size: 1rem;
  }
  
  .popup-window h2 {
    font-size: 1.4rem;
    margin-bottom: 20px;
  }
  
  .popup-window label {
    margin-bottom: 16px;
    font-size: 0.95rem;
  }
  
  .popup-window input {
    padding: 12px 16px;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #c9d6e1;
  }
  
  .popup-actions {
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
  }
  
  .popup-actions .btn {
    width: 100%;
    padding: 14px 20px;
    font-size: 1rem;
    border-radius: 8px;
    font-weight: 600;
  }
  
  .success-check {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .popup-backdrop {
    padding: 12px;
  }
  
  .popup-window {
    padding: 20px 16px;
    border-radius: 12px;
  }
  
  .popup-window h2 {
    font-size: 1.3rem;
  }
  
  .popup-window label {
    font-size: 0.9rem;
  }
  
  .popup-window input {
    padding: 10px 14px;
    font-size: 0.95rem;
  }
  
  .popup-actions .btn {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
  
  .success-check {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 425px) {
  .popup-actions {
    flex-direction: column;
    gap: 10px;
  }
  .popup-actions .btn {
    min-width: 0;
    width: 100%;
  }
}

@media (max-width: 400px) {
  .popup-window {
    width: 100vw;
    max-width: 100vw;
    min-width: 0;
    min-height: 480px;
    padding: 36px 4vw 32px 4vw;
    font-size: 1.07rem;
  }
  .popup-window h2 {
    font-size: 1rem;
  }
}

</style>

