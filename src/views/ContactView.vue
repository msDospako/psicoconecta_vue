<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const status = ref('')

function send() {
  if (name.value.trim().length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) || message.value.trim().length < 10) {
    status.value = 'error'
    return
  }
  status.value = 'success'
  name.value = ''; email.value = ''; message.value = ''
}
</script>

<template>
  <section class="page-hero compact"><div class="container"><span class="eyebrow">Contacto</span><h1>Estamos para orientarte</h1><p>Formulario de demostración. No envía información a un servidor real.</p></div></section>
  <section class="section-pad top-tight"><div class="container contact-grid"><form class="card contact-form" @submit.prevent="send"><h2>Envíanos un mensaje</h2><label>Nombre<input v-model="name" type="text" placeholder="Tu nombre" /></label><label>Correo electrónico<input v-model="email" type="email" placeholder="correo@ejemplo.com" /></label><label>Mensaje<textarea v-model="message" rows="6" placeholder="¿Cómo podemos ayudarte?"></textarea></label><p v-if="status === 'error'" class="alert error">Completa correctamente todos los campos.</p><p v-if="status === 'success'" class="alert success">Mensaje enviado correctamente (simulación).</p><button class="btn btn-primary btn-lg" type="submit">Enviar mensaje</button></form><aside class="contact-side"><div class="card contact-info"><span>📍</span><div><strong>Guadalajara, Jalisco</strong><p>Ubicación de referencia del proyecto académico.</p></div></div><div class="card contact-info"><span>◷</span><div><strong>Horario del prototipo</strong><p>Lunes a sábado · 09:00 a 19:00</p></div></div><div class="card contact-info"><span>🔒</span><div><strong>Privacidad</strong><p>No envíes información clínica o sensible en esta demostración.</p></div></div></aside></div></section>
</template>
