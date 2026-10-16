<script setup>
import { ref, onUnmounted } from 'vue'

const videos = [
  { id: 'inpok4MKVLM', title: 'Meditación guiada de cinco minutos', description: 'Una pausa breve para practicar la atención plena y la respiración consciente.', source: 'YouTube · Goodful' },
  { id: 'iCvmsMzlF7o', title: 'El poder de la vulnerabilidad', description: 'Charla de Brené Brown sobre conexión humana, empatía y vulnerabilidad (en inglés).', source: 'TEDxHouston · Brené Brown' },
]
const images = [
  { src: '/slider-escucha.svg', title: 'Escucha y empatía', detail: 'La escucha activa ayuda a establecer relaciones de confianza.' },
  { src: '/slider-online.svg', title: 'Acompañamiento accesible', detail: 'Las modalidades de atención permiten elegir alternativas según las necesidades.' },
  { src: '/slider-confianza.svg', title: 'Un espacio de confianza', detail: 'Buscar orientación es una forma de cuidar el bienestar emocional.' },
]
const active = ref(null)
function closeLightbox() { active.value = null }
function onKeydown(event) {
  if (event.key === 'Escape') closeLightbox()
  if (active.value === null) return
  if (event.key === 'ArrowRight') active.value = (active.value + 1) % images.length
  if (event.key === 'ArrowLeft') active.value = (active.value - 1 + images.length) % images.length
}
if (typeof window !== 'undefined') window.addEventListener('keydown', onKeydown)
onUnmounted(() => { if (typeof window !== 'undefined') window.removeEventListener('keydown', onKeydown) })
</script>

<template>
  <section class="page-hero compact"><div class="container">
    <span class="eyebrow">Biblioteca multimedia</span>
    <h1>Recursos para tu bienestar</h1>
    <p>Explora videos y una galería visual con ideas para fomentar la reflexión, la empatía y el autocuidado.</p>
  </div></section>

  <section class="section-pad multimedia-section" id="videos"><div class="container">
    <span class="eyebrow">Aprende a tu ritmo</span>
    <h2>Videos recomendados</h2>
    <p class="media-lead">Reproduce los materiales directamente desde esta página. Los videos pertenecen a sus respectivos autores y necesitan conexión a internet.</p>
    <div class="video-grid">
      <article v-for="video in videos" :key="video.id" class="card video-card">
        <div class="video-frame"><iframe :src="`https://www.youtube-nocookie.com/embed/${video.id}`" :title="video.title" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
        <div class="media-content"><span class="media-source">{{ video.source }}</span><h3>{{ video.title }}</h3><p>{{ video.description }}</p></div>
      </article>
    </div>
  </div></section>

  <section class="section-pad soft-section" id="galeria"><div class="container">
    <span class="eyebrow">Ideas que acompañan</span>
    <h2>Galería de imágenes</h2>
    <p class="media-lead">Haz clic en cualquier ilustración para verla en tamaño ampliado. Las imágenes forman parte del diseño original de PsicoConecta.</p>
    <div class="gallery-grid">
      <button v-for="(item, index) in images" :key="item.src" class="gallery-card card" type="button" :aria-label="`Ampliar imagen: ${item.title}`" @click="active = index">
        <img :src="item.src" :alt="item.title" loading="lazy" />
        <span class="gallery-copy"><strong>{{ item.title }}</strong><small>{{ item.detail }}</small><span class="gallery-open">Ver imagen ampliada ↗</span></span>
      </button>
    </div>
    <p class="media-disclaimer">Estos recursos son informativos y no sustituyen una valoración o atención profesional.</p>
  </div></section>

  <div v-if="active !== null" class="gallery-overlay" role="presentation" @click.self="closeLightbox">
    <div class="gallery-dialog" role="dialog" aria-modal="true" :aria-label="images[active].title">
      <button type="button" class="gallery-close" aria-label="Cerrar imagen" @click="closeLightbox">×</button>
      <img :src="images[active].src" :alt="images[active].title" />
      <div class="gallery-dialog-bottom"><button type="button" aria-label="Imagen anterior" @click="active = (active - 1 + images.length) % images.length">←</button><span>{{ images[active].title }} · {{ active + 1 }} / {{ images.length }}</span><button type="button" aria-label="Imagen siguiente" @click="active = (active + 1) % images.length">→</button></div>
    </div>
  </div>
</template>
