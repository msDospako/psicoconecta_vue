<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../api'

const route = useRoute()
const service = ref(null)
const status = ref('')
watch(() => route.params.id, async (id, _, onCleanup) => {
  let active = true
  onCleanup(() => { active = false })
  service.value = null
  status.value = 'Cargando servicio…'
  try {
    const result = await api('servicios/' + encodeURIComponent(id))
    if (active) service.value = result
  } catch (error) {
    if (active) status.value = error.status === 404 ? 'Servicio no encontrado' : 'No se pudo cargar el servicio.'
  }
}, { immediate: true })
</script>

<template>
  <section v-if="service" class="section-pad">
    <div class="container detail-layout">
      <div class="detail-visual">
        <RouterLink class="back-link" to="/servicios">← Volver a servicios</RouterLink>
        <div class="service-detail-illustration card">
          <div class="detail-emoji">{{ service.emoji }}</div>
          <span class="chip">{{ service.category }}</span>
          <small>Servicio del catálogo PsicoConecta</small>
        </div>
      </div>
      <div class="detail-copy">
        <span class="eyebrow">Atención psicológica</span>
        <h1>{{ service.title }}</h1>
        <div class="detail-rating">★ {{ service.rating }}.0 <span>· Sesión de 50 minutos</span></div>
        <p class="lead small">{{ service.description }}</p>
        <div class="price-block"><strong>${{ service.price.toLocaleString('es-MX') }}</strong><span>MXN / sesión</span></div>
        <div class="includes card">
          <h3>¿Qué incluye?</h3>
          <ul><li v-for="item in service.includes" :key="item">✓ {{ item }}</li></ul>
        </div>
        <div class="detail-actions">
          <RouterLink class="btn btn-primary btn-lg" :to="{ path: '/agenda', query: { service: service.id } }">Agendar esta sesión</RouterLink>
          <RouterLink class="btn btn-ghost btn-lg" to="/psicologos">Ver psicólogos</RouterLink>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="section-pad"><div class="container empty-state card"><div role="status"><h2>{{ status }}</h2></div><RouterLink class="btn btn-primary" to="/servicios">Volver al catálogo</RouterLink></div></section>
</template>
