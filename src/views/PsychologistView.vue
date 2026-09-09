<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { psychologists } from '../data/psychologists'

const route = useRoute()
const psychologist = computed(() => psychologists.find((p) => p.id === Number(route.params.id)))
</script>

<template>
  <section v-if="psychologist" class="section-pad">
    <div class="container profile-layout">
      <aside class="profile-side card">
        <div class="avatar profile-avatar" :class="`avatar-${psychologist.accent}`">{{ psychologist.initials }}</div>
        <h1>{{ psychologist.name }}</h1>
        <p>{{ psychologist.title }}</p>
        <div class="rating-line center">★ {{ psychologist.rating }} <span>({{ psychologist.reviews }} opiniones)</span></div>
        <div class="profile-info"><span>Experiencia</span><strong>{{ psychologist.experience }} años</strong></div>
        <div class="profile-info"><span>Modalidad</span><strong>{{ psychologist.modalities.join(' · ') }}</strong></div>
        <div class="profile-info"><span>Idiomas</span><strong>{{ psychologist.languages.join(' · ') }}</strong></div>
        <RouterLink class="btn btn-primary full" :to="{ path: '/agenda', query: { psychologist: psychologist.id } }">Agendar con este profesional</RouterLink>
      </aside>
      <div class="profile-main">
        <RouterLink class="back-link" to="/psicologos">← Volver a psicólogos</RouterLink>
        <span class="eyebrow">Perfil profesional</span>
        <h2>Sobre {{ psychologist.name }}</h2>
        <p class="lead small">{{ psychologist.bio }}</p>
        <div class="card profile-section"><h3>Especialidades</h3><div class="chip-row"><span class="chip" v-for="item in psychologist.specialties" :key="item">{{ item }}</span></div></div>
        <div class="card profile-section"><h3>Próxima disponibilidad</h3><div class="next-available"><span class="status-dot"></span><strong>{{ psychologist.nextAvailable }}</strong><span>· Horario simulado para fines académicos</span></div></div>
        <div class="card profile-section"><h3>Enfoque de atención</h3><p>Las fichas de este proyecto se presentan como prototipo académico. No representan profesionales reales ni una recomendación clínica.</p></div>
      </div>
    </div>
  </section>
</template>
