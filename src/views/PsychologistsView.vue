<script setup>
import { computed, ref } from 'vue'
import PsychologistCard from '../components/PsychologistCard.vue'
import { psychologists } from '../data/psychologists'

const query = ref('')
const modality = ref('Todas')

const filtered = computed(() => psychologists.filter((p) => {
  const q = query.value.trim().toLocaleLowerCase('es-MX')
  const matchQuery = !q || `${p.name} ${p.title} ${p.specialties.join(' ')}`.toLocaleLowerCase('es-MX').includes(q)
  const matchModality = modality.value === 'Todas' || p.modalities.includes(modality.value)
  return matchQuery && matchModality
}))
</script>

<template>
  <section class="page-hero compact">
    <div class="container"><span class="eyebrow">Profesionales</span><h1>Encuentra un perfil que conecte contigo</h1><p>Perfiles simulados con especialidad, modalidad y próxima disponibilidad.</p></div>
  </section>
  <section class="section-pad top-tight">
    <div class="container">
      <div class="filter-bar card two-controls">
        <label class="search-box"><span>⌕</span><input v-model="query" type="search" placeholder="Buscar por nombre o especialidad" /></label>
        <select v-model="modality"><option>Todas</option><option>Online</option><option>Presencial</option></select>
      </div>
      <div class="card-grid three-col">
        <PsychologistCard v-for="psychologist in filtered" :key="psychologist.id" :psychologist="psychologist" />
      </div>
    </div>
  </section>
</template>
