<script setup>
import ServiceCard from '../components/ServiceCard.vue'
import PsychologistCard from '../components/PsychologistCard.vue'
import { services } from '../data/services'
import { psychologists } from '../data/psychologists'

const featuredServices = services.slice(0, 4)
const featuredPsychologists = psychologists.slice(0, 3)
</script>

<template>
  <section class="hero section-pad">
    <div class="container hero-grid">
      <div class="hero-copy">
        <span class="eyebrow">Bienestar emocional, a tu ritmo</span>
        <h1>Encuentra apoyo psicológico en un espacio claro, cercano y confidencial.</h1>
        <p class="lead">Explora especialidades, conoce profesionales y agenda una cita en pocos pasos. Proyecto académico con atención online y presencial simulada.</p>
        <div class="hero-actions">
          <RouterLink class="btn btn-primary btn-lg" to="/psicologos">Encuentra a tu psicólogo</RouterLink>
          <RouterLink class="btn btn-ghost btn-lg" to="/servicios">Ver especialidades</RouterLink>
        </div>
        <div class="trust-row">
          <span>✓ Profesionales verificados</span>
          <span>✓ Atención confidencial</span>
          <span>✓ Horarios flexibles</span>
        </div>
      </div>

      <div class="hero-visual" aria-label="Ilustración decorativa de bienestar emocional">
        <div class="hero-orb orb-one"></div>
        <div class="hero-orb orb-two"></div>
        <div class="hero-card card floating-card main-card">
          <span class="hero-symbol">✦</span>
          <h2>Tu primera sesión</h2>
          <p>Elige modalidad, profesional y horario desde una sola vista.</p>
          <div class="mini-profile">
            <div class="avatar avatar-indigo">MG</div>
            <div><strong>Dra. María González</strong><small>Psicología clínica</small></div>
          </div>
          <div class="mini-slot"><span class="status-dot"></span>Mañana · 10:00 disponible</div>
        </div>
        <div class="floating-note note-one">★ 4.9 valoración</div>
        <div class="floating-note note-two">Online + Presencial</div>
      </div>
    </div>
  </section>

  <section class="stats-band">
    <div class="container stats-grid">
      <div><strong>20</strong><span>especialidades</span></div>
      <div><strong>6</strong><span>perfiles profesionales</span></div>
      <div><strong>2</strong><span>modalidades de atención</span></div>
      <div><strong>3</strong><span>pasos para agendar</span></div>
    </div>
  </section>

  <section class="section-pad">
    <div class="container">
      <div class="section-heading split-heading">
        <div><span class="eyebrow">Especialidades</span><h2>Empieza por lo que necesitas hoy</h2></div>
        <RouterLink class="text-link" to="/servicios">Ver los 20 servicios →</RouterLink>
      </div>
      <div class="card-grid four-col">
        <ServiceCard v-for="service in featuredServices" :key="service.id" :service="service" />
      </div>
    </div>
  </section>

  <section class="section-pad soft-section">
    <div class="container">
      <div class="section-heading centered">
        <span class="eyebrow">Así funciona</span>
        <h2>Una experiencia sencilla de principio a fin</h2>
        <p>La navegación fue rediseñada para que el usuario entienda qué hacer sin sentirse saturado.</p>
      </div>
      <div class="steps-grid">
        <article class="step-card"><span>01</span><div class="step-icon">⌕</div><h3>Explora</h3><p>Revisa especialidades o perfiles y encuentra la opción que mejor se ajuste a tu necesidad.</p></article>
        <article class="step-card"><span>02</span><div class="step-icon">◷</div><h3>Agenda</h3><p>Selecciona modalidad, fecha y horario disponible desde una agenda visual.</p></article>
        <article class="step-card"><span>03</span><div class="step-icon">✓</div><h3>Confirma</h3><p>Revisa el resumen de tu cita y guarda la confirmación local de este prototipo.</p></article>
      </div>
    </div>
  </section>

  <section class="section-pad">
    <div class="container">
      <div class="section-heading split-heading">
        <div><span class="eyebrow">Nuestro equipo</span><h2>Conoce a los profesionales</h2></div>
        <RouterLink class="text-link" to="/psicologos">Ver todos →</RouterLink>
      </div>
      <div class="card-grid three-col">
        <PsychologistCard v-for="psychologist in featuredPsychologists" :key="psychologist.id" :psychologist="psychologist" />
      </div>
    </div>
  </section>

  <section class="section-pad emergency-section">
    <div class="container emergency-card">
      <div>
        <span class="eyebrow light">Información importante</span>
        <h2>Este proyecto no sustituye atención de emergencia.</h2>
        <p>PsicoConecta es una simulación académica. Ante una emergencia real, se debe acudir a servicios de emergencia o instituciones de salud.</p>
      </div>
      <RouterLink class="btn btn-light" to="/contacto">Contacto</RouterLink>
    </div>
  </section>
</template>
