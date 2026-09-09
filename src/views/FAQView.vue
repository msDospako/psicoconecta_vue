<script setup>
import { ref } from 'vue'

const open = ref(0)
const faqs = [
  ['¿La atención es confidencial?', 'Sí. La confidencialidad forma parte de los principios fundamentales de la atención psicológica y del manejo responsable de la información.'],
  ['¿Puedo tomar terapia en línea?', 'Sí. Puedes seleccionar modalidad online o presencial al momento de agendar, según la disponibilidad del profesional.'],
  ['¿Cuánto dura una sesión?', 'La duración habitual de una sesión es de aproximadamente 50 minutos, aunque puede variar según el servicio seleccionado.'],
  ['¿Cómo elijo al psicólogo adecuado?', 'Puedes consultar el perfil de cada profesional, su especialidad, experiencia y modalidad de atención antes de agendar.'],
  ['¿Qué pasa en mi primera sesión?', 'La primera sesión permite conocer el motivo de consulta, aclarar objetivos y definir junto con el profesional una ruta inicial de atención.'],
  ['¿Puedo cambiar o cancelar una cita?', 'Sí. Te recomendamos realizar cualquier cambio con anticipación para facilitar la reorganización del horario del profesional.'],
  ['¿Qué modalidades de atención existen?', 'PsicoConecta contempla atención online y presencial. La modalidad disponible puede variar de acuerdo con cada profesional y servicio.'],
  ['¿Cómo sé qué servicio necesito?', 'Puedes explorar las especialidades disponibles o utilizar el chat de orientación para identificar opciones relacionadas con tu necesidad.'],
  ['¿La terapia es solo para situaciones graves?', 'No. La atención psicológica también puede ayudar en prevención, manejo del estrés, desarrollo personal, relaciones, toma de decisiones y bienestar emocional.'],
  ['¿Qué hago si estoy en una situación de emergencia?', 'PsicoConecta no sustituye los servicios de emergencia. Si existe riesgo inmediato para ti o para otra persona, busca apoyo de los servicios de emergencia de tu localidad.'],
]
</script>

<template>
  <section class="page-hero compact">
    <div class="container">
      <span class="eyebrow">FAQ</span>
      <h1>Preguntas frecuentes</h1>
      <p>Encuentra respuestas rápidas sobre nuestros servicios, modalidades y proceso de atención.</p>
    </div>
  </section>

  <section class="section-pad top-tight">
    <div class="container faq-layout">
      <div class="faq-list">
        <article v-for="(item, index) in faqs" :key="item[0]" class="faq-item card">
          <button type="button" @click="open = open === index ? -1 : index">
            <span>{{ item[0] }}</span>
            <strong>{{ open === index ? '−' : '+' }}</strong>
          </button>
          <p v-if="open === index">{{ item[1] }}</p>
        </article>
      </div>

      <aside class="faq-aside card">
        <span class="eyebrow">¿Necesitas orientación?</span>
        <h2>Estamos para ayudarte</h2>
        <p>Explora nuestros servicios, consulta los perfiles profesionales o envíanos un mensaje.</p>
        <RouterLink class="btn btn-primary full" to="/contacto">Contactar</RouterLink>
      </aside>
    </div>
  </section>
</template>
