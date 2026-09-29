<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <div class="footer-brand"><img class="brand-logo" src="/logo-psicoconecta.svg" alt="" /><strong>PsicoConecta</strong></div>
        <p>Proyecto académico de una plataforma de servicios de bienestar emocional en Guadalajara, Jalisco.</p>
      </div>
      <div>
        <h3>Explora</h3>
        <RouterLink to="/servicios">Servicios</RouterLink>
        <RouterLink to="/psicologos">Psicólogos</RouterLink>
        <RouterLink to="/preguntas">Preguntas frecuentes</RouterLink>
      </div>
      <div>
        <h3>Información</h3>
        <RouterLink to="/nosotros">Quiénes somos</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
        <RouterLink to="/nosotros#ubicacion">Ubicación</RouterLink>
        <span>Guadalajara, Jalisco</span>
      </div>
      <div class="footer-note">
        <h3>Importante</h3>
        <p>PsicoConecta es una simulación académica. No sustituye atención de emergencia ni servicios médicos reales.</p>
        <h3>Comparte el proyecto</h3>
        <div class="social-links" aria-label="Compartir en redes sociales">
          <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`" target="_blank" rel="noopener noreferrer" aria-label="Compartir en Facebook">Facebook ↗</a>
          <a :href="`https://wa.me/?text=${encodeURIComponent('Conoce PsicoConecta: ' + shareUrl)}`" target="_blank" rel="noopener noreferrer" aria-label="Compartir en WhatsApp">WhatsApp ↗</a>
          <button type="button" @click="copyLink">{{ copied ? 'Enlace copiado' : 'Copiar enlace' }}</button>
        </div>
      </div>
    </div>
    <div class="container footer-bottom">© 2026 PsicoConecta · Proyecto académico</div>
  </footer>
</template>
<script setup>
import { ref } from 'vue'
const shareUrl = window.location.origin + import.meta.env.BASE_URL
const copied = ref(false)
async function copyLink() {
  try { await navigator.clipboard.writeText(shareUrl); copied.value = true }
  catch { window.prompt('Copia el enlace del proyecto:', shareUrl) }
}
</script>
