<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { services } from '../data/services'

const route = useRoute()
const service = computed(() => services.find((s) => s.id === Number(route.params.id)))
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
  <section v-else class="section-pad"><div class="container empty-state card"><h2>Servicio no encontrado</h2><RouterLink class="btn btn-primary" to="/servicios">Volver al catálogo</RouterLink></div></section>
</template>
