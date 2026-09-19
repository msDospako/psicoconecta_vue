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
      </div>
    </div>
    <div class="container footer-bottom">© 2026 PsicoConecta · Proyecto académico</div>
  </footer>
</template>
