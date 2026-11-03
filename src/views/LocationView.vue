<script setup>
const mapUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=-103.390%2C20.645%2C-103.315%2C20.705&layer=mapnik&marker=20.6767%2C-103.3475'
</script>

<template>
  <section class="page-hero compact">
    <div class="container">
      <span class="eyebrow">Ubicación</span>
      <h1>Encuéntranos en Guadalajara</h1>
      <p>Conoce la ciudad de referencia de PsicoConecta y nuestros canales de atención.</p>
    </div>
  </section>
  <section class="section-pad top-tight">
    <div class="container location-layout">
      <div class="card location-map-card">
        <h2>Mapa de referencia</h2>
        <p>Guadalajara, Jalisco, México. El marcador indica una zona central de la ciudad, no una oficina física.</p>
        <iframe class="location-map" :src="mapUrl" title="Mapa de referencia de Guadalajara, Jalisco" loading="lazy" referrerpolicy="no-referrer"></iframe>
        <a href="https://www.openstreetmap.org/?mlat=20.6767&mlon=-103.3475#map=13/20.6767/-103.3475" target="_blank" rel="noopener noreferrer">Abrir mapa en OpenStreetMap</a>
      </div>
      <aside class="card location-info-card">
        <h2>Información de atención</h2>
        <p><strong>Ciudad de referencia:</strong> Guadalajara, Jalisco.</p>
        <p><strong>Modalidad del proyecto:</strong> prototipo académico con servicios de orientación en línea.</p>
        <p><strong>Horario de demostración:</strong> lunes a sábado, de 09:00 a 19:00.</p>
        <p class="location-notice">No contamos con un domicilio físico verificado para recibir visitantes. Evita acudir al marcador del mapa.</p>
        <RouterLink class="btn btn-primary" to="/contacto">Ir al formulario de contacto</RouterLink>
      </aside>
    </div>
  </section>
</template>
