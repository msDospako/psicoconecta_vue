<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const slides = [
  { image: '/slider-escucha.svg', alt: 'Ilustración de conversación empática en un espacio tranquilo', eyebrow: 'Un espacio para escucharte', title: 'Tu bienestar merece atención', description: 'Conoce alternativas de acompañamiento psicológico a tu ritmo.', url: '/servicios', action: 'Explorar servicios' },
  { image: '/slider-online.svg', alt: 'Ilustración de sesión de orientación psicológica en línea', eyebrow: 'Cerca de ti, estés donde estés', title: 'Atención online y presencial', description: 'Elige la modalidad que mejor se adapte a tus necesidades.', url: '/psicologos', action: 'Conocer profesionales' },
  { image: '/slider-confianza.svg', alt: 'Ilustración de personas acompañadas en un entorno seguro', eyebrow: 'Un paso a la vez', title: 'Empieza con confianza', description: 'Consulta perfiles, especialidades y opciones para agendar.', url: '/agenda', action: 'Agendar una cita' }
]
const active = ref(0)
let timer
const goTo = (index) => { active.value = (index + slides.length) % slides.length }
const next = () => goTo(active.value + 1)
const previous = () => goTo(active.value - 1)
const start = () => { stop(); timer = window.setInterval(next, 6000) }
const stop = () => { if (timer) window.clearInterval(timer) }
onMounted(start)
onUnmounted(stop)
</script>

<template>
  <section class="showcase-section section-pad" aria-label="Destacados de PsicoConecta" @mouseenter="stop" @mouseleave="start" @focusin="stop" @focusout="start">
    <div class="container">
      <div class="section-heading split-heading"><div><span class="eyebrow">Descubre PsicoConecta</span><h2>Un acompañamiento para cada momento</h2></div><span class="showcase-counter">{{ active + 1 }} / {{ slides.length }}</span></div>
      <div class="showcase-frame" aria-roledescription="carrusel">
        <div v-for="(slide, index) in slides" :key="slide.image" class="showcase-slide" :class="{ 'is-active': active === index }" :aria-hidden="active !== index">
          <img :src="slide.image" :alt="slide.alt" loading="lazy" />
          <div class="showcase-content"><span class="eyebrow">{{ slide.eyebrow }}</span><h3>{{ slide.title }}</h3><p>{{ slide.description }}</p><RouterLink v-if="active === index" :to="slide.url" class="btn btn-primary">{{ slide.action }} →</RouterLink></div>
        </div>
        <button class="showcase-arrow showcase-prev" aria-label="Imagen anterior" @click="previous">‹</button>
        <button class="showcase-arrow showcase-next" aria-label="Imagen siguiente" @click="next">›</button>
      </div>
      <div class="showcase-dots" aria-label="Seleccionar imagen"><button v-for="(slide, index) in slides" :key="index" :class="{ 'is-active': active === index }" :aria-label="`Mostrar imagen ${index+1}: ${slide.title}`" :aria-current="active === index ? 'true' : undefined" @click="goTo(index)"></button></div>
    </div>
  </section>
</template>
