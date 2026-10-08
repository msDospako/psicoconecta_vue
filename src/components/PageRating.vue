<script setup>
import { ref, computed, onMounted } from 'vue'
const props = defineProps({ pageId: { type: String, required: true }, pageTitle: { type: String, default: 'esta página' } })
const rating = ref(0)
const hover = ref(0)
const storageKey = computed(() => `psicoconecta:rating:${props.pageId}`)
onMounted(() => { try { const value = Number(localStorage.getItem(storageKey.value)); rating.value = value >= 1 && value <= 5 ? value : 0 } catch { rating.value = 0 } })
const rate = (value) => { rating.value = value; try { value === 0 ? localStorage.removeItem(storageKey.value) : localStorage.setItem(storageKey.value, String(value)) } catch { /* El voto permanece durante esta visita si el almacenamiento está deshabilitado. */ } }
</script>

<template>
  <section class="rating-section section-pad" :aria-label="`Valoración de ${pageTitle}`">
    <div class="container rating-panel card"><div><span class="eyebrow">Tu opinión importa</span><h2>¿Qué te pareció {{ pageTitle }}?</h2><p>Califica la claridad y utilidad de esta página. Esta valoración se guarda únicamente en tu navegador como parte del proyecto académico.</p></div>
      <div class="rating-control"><div class="rating-stars" role="group" aria-label="Califica de una a cinco estrellas"><button v-for="star in 5" :key="star" type="button" :class="{ selected: star <= (hover || rating) }" :aria-label="`${star} ${star === 1 ? 'estrella' : 'estrellas'}`" :aria-pressed="rating === star" @mouseenter="hover = star" @mouseleave="hover = 0" @focus="hover = star" @blur="hover = 0" @click="rate(star)">★</button></div><p class="rating-feedback" aria-live="polite">{{ rating ? `Gracias por tu valoración: ${rating} de 5 estrellas.` : 'Selecciona de 1 a 5 estrellas.' }}</p><button v-if="rating" type="button" class="rating-reset" @click="rate(0)">Cambiar / quitar mi valoración</button></div>
    </div>
  </section>
</template>
