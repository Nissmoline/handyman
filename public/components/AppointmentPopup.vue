<script setup>
import { ref } from "vue";
import emailjs from "@emailjs/browser";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

const isOpen = defineModel("isOpen");
const name = ref("");
const email = ref("");
const phone = ref("");
const datetime = ref("");
const submitted = ref(false);
const loading = ref(false);
const error = ref(null);
const selectedServices = ref([]);
const multipleLabel = (values) => `${values.length} επιλεγμένες υπηρεσίες`;

const services = [
  "ΗΛΕΚΤΡΟΛΟΓΙΚΕΣ ΕΡΓΑΣΙΕΣ",
  "ΥΔΡΑΥΛΙΚΕΣ ΕΡΓΑΣΙΕΣ",
  "ΥΠΗΡΕΣΙΕΣ ΠΛΑΚΑΚΙΩΝ",
  "ΒΑΨΙΜΟ & ΧΡΩΜΑΤΙΣΜΟΙ",
  "ΥΠΗΡΕΣΙΕΣ ΞΥΛΟΥΡΓΟΥ",
  "ΚΑΤΑΣΚΕΥΕΣ & ΑΝΑΚΑΙΝΙΣΕΙΣ",
  "ΓΕΝΙΚΕΣ ΕΡΓΑΣΙΕΣ ΣΥΝΤΗΡΗΣΗΣ",
];

const multiselect = ref(null);
const handleChange = () => {
  setTimeout(() => {
    if (multiselect.value) multiselect.value.close();
  }, 1000);
};

const resetForm = () => {
  name.value = "";
  email.value = "";
  phone.value = "";
  datetime.value = "";
  submitted.value = false;
  loading.value = false;
  error.value = null;
  selectedServices.value = [];
};

const formatDate = (isoString) => {
  if (!isoString) return "";
  const [year, month, day] = isoString.split("-");
  return `${day}.${month}.${year}`;
};

const submitForm = async () => {
  loading.value = true;
  error.value = null;

  try {
    // 1. Auto-reply to the client
    await emailjs.send(
      "service_4iwmnq9",
      "template_h7kwe4j",
      {
        name: name.value,
        email: email.value,
        phone: phone.value,
        datetime: formatDate(datetime.value),
      },
      "nOz5l7-e5eiIR9lpu"
    );

    // 2. Auto-reply to owner
    await emailjs.send(
      "service_4iwmnq9",
      "template_dhmfdmy",
      {
        name: name.value,
        email: email.value,
        phone: phone.value,
        datetime: formatDate(datetime.value),
        services: selectedServices.value.join(", "),
      },
      "nOz5l7-e5eiIR9lpu"
    );

    submitted.value = true;
  } catch (e) {
    error.value = "Προέκυψε σφάλμα. Δοκιμάστε ξανά.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="popup-backdrop" @click.self="isOpen = false">
      <div class="popup-window">
        <h2>Το αίτημά σας εστάλη</h2>

        <div v-if="submitted" class="popup-success">
          <!-- Animated green check mark -->
          <svg class="success-check" viewBox="0 0 52 52">
            <circle
              class="success-check-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path class="success-check-mark" fill="none" d="M14 27l7 7 17-17" />
          </svg>
          <p>
            Σύντομα θα επικοινωνήσουμε μαζί σας για να επιβεβαιώσουμε το
            ραντεβού.
          </p>
          <button class="btn btn-outline" @click="isOpen = false">
            Κλείσιμο
          </button>
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
            <!-- Επιλέξτε τις -->
            Υπηρεσίες που σας ενδιαφέρουν:
            <Multiselect
              v-model="selectedServices"
              :options="services"
              mode="multiple"
              placeholder="Επιλογή υπηρεσιών"
              :multiple-label="multipleLabel"
              @change="handleChange"
            />
          </label>

          <label>
            Επιθυμητή ημερομηνία ραντεβού:
            <input v-model="datetime" type="date" required />
          </label>
          <div class="popup-actions">
            <button type="submit" class="btn btn-outline" :disabled="loading">
              <template v-if="loading">
                <span class="spinner"></span> Αποστολή...
              </template>
              <template v-else> Αποστολή </template>
            </button>
            <button
              type="button"
              class="btn btn-outline"
              @click="isOpen = false"
              :disabled="loading"
            >
              Ακύρωση
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
