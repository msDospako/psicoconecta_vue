<script setup>
defineProps({ service: { type: Object, required: true } })
</script>

<template>
  <article class="service-card card">
    <div class="service-icon" aria-hidden="true">{{ service.emoji }}</div>
    <div class="service-tags">
      <span class="chip">{{ service.category }}</span>
      <span class="rating">★ {{ service.rating }}.0</span>
    </div>
    <h3>{{ service.title }}</h3>
    <p>{{ service.description }}</p>
    <div class="service-meta">
      <span><strong>${{ service.price.toLocaleString('es-MX') }}</strong> MXN</span>
      <span>50 min</span>
    </div>
    <RouterLink class="btn btn-soft full" :to="`/servicios/${service.id}`">Ver detalles</RouterLink>
  </article>
</template>
