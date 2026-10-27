<script setup>
import { ref } from 'vue'
const playing = ref(true)
</script>
<template>
  <section class="section-pad wellness-section" aria-labelledby="wellness-title">
    <div class="container wellness-grid">
      <div class="wellness-visual card" :class="{ 'animation-paused': !playing }">
        <img src="/animacion-bienestar.svg" alt="Ilustración animada de una persona respirando tranquilamente, acompañada de círculos que se expanden y hojas flotantes" />
      </div>
      <div>
        <span class="eyebrow">Animación original · SPRINT</span>
        <h2 id="wellness-title">Un momento para reconectar contigo</h2>
        <p class="lead small">La respiración consciente puede ayudarte a crear un momento de calma. Sigue el ritmo visual: inhala suavemente y exhala sin forzarte.</p>
        <p class="wellness-note">Ilustración SVG diseñada para PsicoConecta y animada con CSS. No sustituye orientación profesional.</p>
        <div class="hero-actions"><button class="btn btn-soft" type="button" :aria-pressed="!playing" @click="playing = !playing">{{ playing ? 'Pausar animación' : 'Reanudar animación' }}</button><RouterLink to="/tienda" class="btn btn-primary">Explorar tiendita</RouterLink></div>
      </div>
    </div>
  </section>
</template>
