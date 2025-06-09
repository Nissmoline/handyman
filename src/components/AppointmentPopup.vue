<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser' 

const isOpen = defineModel('isOpen')
const name = ref('')
const email = ref('')
const phone = ref('')
const datetime = ref('')
const submitted = ref(false)
const loading = ref(false)
const error = ref(null)

const resetForm = () => {
  name.value = ''
  email.value = ''
  phone.value = ''
  datetime.value = ''
  submitted.value = false
  loading.value = false
  error.value = null
}

const formatDate = (isoString) => {
  if (!isoString) return '';
  const [year, month, day] = isoString.split('-');
  return `${day}.${month}.${year}`;
}

const submitForm = async () => {
  loading.value = true
  error.value = null

  try {
    // 1. Auto-reply to the client
    await emailjs.send(
      'service_9cknxdr',
      'template_h7kwe4j', 
      {
        name: name.value,
        email: email.value,
        phone: phone.value,
        datetime: formatDate(datetime.value)
      },
      'nOz5l7-e5eiIR9lpu'
    )

    // 2. Auto-reply to owner
    await emailjs.send(
      'service_9cknxdr',
      'template_dhmfdmy', 
      {
        name: name.value,
        email: email.value,
        phone: phone.value,
        datetime: formatDate(datetime.value)
      },
      'nOz5l7-e5eiIR9lpu'
    )

    submitted.value = true
  } catch (e) {
    error.value = 'Προέκυψε σφάλμα. Δοκιμάστε ξανά.'
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="popup-backdrop" @click.self="isOpen = false">
      <div class="popup-window">
        <h2>Κλείστε ραντεβού</h2>

        <div v-if="submitted">
          <p>
           Το αίτημά σας εστάλη.<br>
            Σύντομα θα επικοινωνήσουμε μαζί σας για να επιβεβαιώσουμε το ραντεβού.
          </p>
          <button class="btn btn-outline" @click="isOpen = false">Κλείσιμο</button>
        </div>

        <form v-else @submit.prevent="submitForm" autocomplete="off">
          <label>
            Ονοματεπώνυμο:
            <input v-model="name" type="text" required />
          </label>
          <label>
            Email:
            <input v-model="email" type="email" required />
          </label>
          <label>
            Τηλέφωνο:
            <input v-model="phone" type="tel" required />
          </label>
          <label>
            Επιθυμητή ημερομηνία ραντεβού:
            <input
                v-model="datetime"
                type="date"
                required
                @change="onDateSelect"
            />
            </label>
          <div class="popup-actions">
            <button type="submit" class="btn btn-outline" :disabled="loading">
              Επιβεβαίωση
            </button>
            <button type="button" class="btn btn-outline" @click="isOpen = false">Ακύρωση</button>
          </div>
          <div v-if="error" class="error">{{ error }}</div>
        </form>
      </div>
    </div>
  </transition>
</template>


<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
.popup-backdrop {
  position: fixed; left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(20,36,60,0.42);
  z-index: 5000;
  display: flex; align-items: center; justify-content: center;
}
.popup-window {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.14);
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
.btn-outline:hover {
  background: #044877;
  color: #fff;
}
</style>
