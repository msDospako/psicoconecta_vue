<script setup>
defineProps({ psychologist: { type: Object, required: true } })
</script>

<template>
  <article class="professional-card card">
    <div class="avatar" :class="`avatar-${psychologist.accent}`">{{ psychologist.initials }}</div>
    <div class="professional-head">
      <div>
        <h3>{{ psychologist.name }}</h3>
        <p>{{ psychologist.title }}</p>
      </div>
      <span class="verified" title="Perfil verificado">✓</span>
    </div>
    <div class="rating-line">★ {{ psychologist.rating }} <span>({{ psychologist.reviews }} opiniones)</span></div>
    <div class="chip-row">
      <span class="chip" v-for="item in psychologist.specialties.slice(0, 3)" :key="item">{{ item }}</span>
    </div>
    <div class="availability"><span class="status-dot"></span> Próxima disponibilidad: <strong>{{ psychologist.nextAvailable }}</strong></div>
    <RouterLink class="btn btn-primary full" :to="`/psicologos/${psychologist.id}`">Ver perfil</RouterLink>
  </article>
</template>
