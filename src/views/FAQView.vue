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
const storageKey = 'psicoconecta-foro-v1'
function readQuestions() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || '[]')
    return Array.isArray(value) ? value.filter(item => item && typeof item.question === 'string').slice(0, 30) : []
  } catch { return [] }
}
const questions = ref(readQuestions())
const question = ref('')
const author = ref('')
function submitQuestion() {
  const text = question.value.trim()
  if (text.length < 10 || text.length > 500) return
  questions.value.unshift({ id: crypto.randomUUID(), question: text, author: author.value.trim().slice(0, 40) || 'Anónimo', date: new Date().toLocaleDateString('es-MX') })
  questions.value = questions.value.slice(0, 30)
  localStorage.setItem(storageKey, JSON.stringify(questions.value))
  question.value = ''
  author.value = ''
}
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
  <section class="section-pad top-tight forum-section" id="foro">
    <div class="container">
      <span class="eyebrow">Participa</span>
      <h2>Foro de preguntas</h2>
      <p class="forum-intro">Comparte una pregunta general sobre los servicios. Este foro es una demostración académica: las preguntas se guardan únicamente en este navegador y no reciben respuesta profesional.</p>
      <div class="forum-grid">
        <form class="card forum-form" @submit.prevent="submitQuestion">
          <h3>Publicar una pregunta</h3>
          <label for="forum-name">Nombre o alias</label>
          <input id="forum-name" v-model="author" maxlength="40" placeholder="Opcional" />
          <label for="forum-question">Tu pregunta</label>
          <textarea id="forum-question" v-model="question" minlength="10" maxlength="500" rows="5" required placeholder="Escribe una pregunta general, sin datos personales ni información clínica"></textarea>
          <small>{{ question.length }}/500 caracteres</small>
          <button class="btn btn-primary" type="submit">Publicar pregunta</button>
        </form>
        <div class="forum-posts" aria-live="polite">
          <h3>Preguntas compartidas</h3>
          <p v-if="!questions.length" class="card forum-empty">Aún no hay preguntas en este navegador. Puedes publicar la primera.</p>
          <article v-for="item in questions" :key="item.id" class="card forum-post">
            <p>{{ item.question }}</p>
            <small>{{ item.author }} · {{ item.date }}</small>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
