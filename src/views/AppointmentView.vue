<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { services } from '../data/services'
import { psychologists } from '../data/psychologists'

const route = useRoute()
const selectedService = ref(Number(route.query.service) || services[0].id)
const selectedPsychologist = ref(Number(route.query.psychologist) || psychologists[0].id)
const modality = ref('Online')
const date = ref('')
const time = ref('10:00')
const name = ref('')
const email = ref('')
const confirmed = ref(false)
const error = ref('')

const service = computed(() => services.find((s) => s.id === Number(selectedService.value)))
const psychologist = computed(() => psychologists.find((p) => p.id === Number(selectedPsychologist.value)))
const times = ['09:00', '10:00', '12:00', '16:00', '18:00']

function confirm() {
  error.value = ''
  if (!date.value || name.value.trim().length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value = 'Completa fecha, nombre y un correo electrónico válido.'
    return
  }
  const item = {
    id: Date.now(),
    service: service.value?.title,
    psychologist: psychologist.value?.name,
    modality: modality.value,
    date: date.value,
    time: time.value,
    name: name.value.trim(),
    email: email.value.trim(),
  }
  const saved = JSON.parse(localStorage.getItem('psicoconectaAppointments') || '[]')
  saved.push(item)
  localStorage.setItem('psicoconectaAppointments', JSON.stringify(saved))
  confirmed.value = true
}
</script>

<template>
  <section class="page-hero compact">
    <div class="container"><span class="eyebrow">Agenda</span><h1>Programa una cita en pocos pasos</h1><p>Flujo completamente simulado para demostrar interacción, formularios y persistencia local en Vue.</p></div>
  </section>
  <section class="section-pad top-tight">
    <div class="container appointment-grid">
      <form class="appointment-form card" @submit.prevent="confirm">
        <div class="form-section"><span class="step-pill">1</span><div><h2>Elige tu atención</h2><p>Selecciona servicio, profesional y modalidad.</p></div></div>
        <div class="form-grid two">
          <label>Servicio<select v-model.number="selectedService"><option v-for="item in services" :key="item.id" :value="item.id">{{ item.title }}</option></select></label>
          <label>Profesional<select v-model.number="selectedPsychologist"><option v-for="item in psychologists" :key="item.id" :value="item.id">{{ item.name }}</option></select></label>
        </div>
        <label>Modalidad<div class="segmented"><button type="button" :class="{ active: modality === 'Online' }" @click="modality = 'Online'">Online</button><button type="button" :class="{ active: modality === 'Presencial' }" @click="modality = 'Presencial'">Presencial</button></div></label>

        <div class="form-section"><span class="step-pill">2</span><div><h2>Fecha y horario</h2><p>Selecciona un horario disponible del prototipo.</p></div></div>
        <label>Fecha<input v-model="date" type="date" /></label>
        <div class="time-grid"><button v-for="item in times" :key="item" type="button" :class="{ active: time === item }" @click="time = item">{{ item }}</button></div>

        <div class="form-section"><span class="step-pill">3</span><div><h2>Tus datos</h2><p>Se guardarán solo en LocalStorage de este dispositivo.</p></div></div>
        <div class="form-grid two"><label>Nombre<input v-model="name" type="text" placeholder="Nombre completo" /></label><label>Correo<input v-model="email" type="email" placeholder="correo@ejemplo.com" /></label></div>
        <p v-if="error" class="alert error">{{ error }}</p>
        <p v-if="confirmed" class="alert success">Cita simulada confirmada. Se guardó localmente en este navegador.</p>
        <button class="btn btn-primary btn-lg full" type="submit">Confirmar reservación</button>
      </form>

      <aside class="appointment-summary card">
        <span class="eyebrow">Resumen</span>
        <h2>Tu cita</h2>
        <div class="summary-icon">{{ service?.emoji }}</div>
        <h3>{{ service?.title }}</h3>
        <div class="summary-row"><span>Profesional</span><strong>{{ psychologist?.name }}</strong></div>
        <div class="summary-row"><span>Modalidad</span><strong>{{ modality }}</strong></div>
        <div class="summary-row"><span>Fecha</span><strong>{{ date || 'Por seleccionar' }}</strong></div>
        <div class="summary-row"><span>Hora</span><strong>{{ time }}</strong></div>
        <div class="summary-total"><span>Total simulado</span><strong>${{ service?.price.toLocaleString('es-MX') }} MXN</strong></div>
        <small>No se procesa ningún pago real.</small>
      </aside>
    </div>
  </section>
</template>
