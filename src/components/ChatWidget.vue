<script setup>
import { nextTick, ref } from 'vue'

const open = ref(false)
const input = ref('')
const body = ref(null)
const messages = ref([
  { sender: 'bot', text: 'Hola 👋 Soy el asistente de PsicoConecta. ¿Buscas información sobre precios, ansiedad o citas?' },
])

async function send() {
  const text = input.value.trim()
  if (!text) return
  messages.value.push({ sender: 'user', text })
  input.value = ''

  const normalized = text.toLocaleLowerCase('es-MX')
  let answer = 'Gracias por tu mensaje. En este prototipo puedo orientarte sobre servicios, precios y citas.'
  if (normalized.includes('precio') || normalized.includes('costo')) answer = 'Las sesiones del catálogo van de $650 a $1,200 MXN.'
  if (normalized.includes('ansiedad')) answer = 'Puedes revisar Terapia Cognitivo-Conductual para Ansiedad y Ansiedad Social en el catálogo.'
  if (normalized.includes('cita') || normalized.includes('agenda')) answer = 'Selecciona un servicio o psicólogo y presiona “Agendar cita”.'
  if (normalized.includes('online')) answer = 'El prototipo contempla modalidades online y presencial según el profesional.'
  window.setTimeout(async () => {
    messages.value.push({ sender: 'bot', text: answer })
    await nextTick()
    if (body.value) body.value.scrollTop = body.value.scrollHeight
  }, 450)
}
</script>

<template>
  <div class="chat-widget">
    <section v-if="open" class="chat-panel" aria-label="Chat de ayuda">
      <header>
        <div><strong>Asistente PsicoConecta</strong><small>Respuesta automática del prototipo</small></div>
        <button type="button" aria-label="Cerrar chat" @click="open = false">×</button>
      </header>
      <div ref="body" class="chat-body">
        <div v-for="(message, index) in messages" :key="index" class="chat-message" :class="message.sender">
          {{ message.text }}
        </div>
      </div>
      <form class="chat-form" @submit.prevent="send">
        <input v-model="input" type="text" placeholder="Escribe tu mensaje…" aria-label="Mensaje" />
        <button type="submit">Enviar</button>
      </form>
    </section>
    <button class="chat-launcher" type="button" @click="open = !open" :aria-label="open ? 'Cerrar chat' : 'Abrir chat'">
      {{ open ? '×' : '💬' }}
    </button>
  </div>
</template>
