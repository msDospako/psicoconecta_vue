<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
const closeMenu = () => { menuOpen.value = false }
</script>

<template>
  <header class="site-header">
    <div class="container nav-wrap">
      <RouterLink class="brand" to="/" @click="closeMenu">
        <span class="brand-mark" aria-hidden="true">P</span>
        <span>
          <strong>PsicoConecta</strong>
          <small>Bienestar emocional</small>
        </span>
      </RouterLink>

      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-label="Abrir menú" @click="menuOpen = !menuOpen">
        <span></span><span></span><span></span>
      </button>

      <nav class="main-nav" :class="{ open: menuOpen }" aria-label="Navegación principal">
        <RouterLink to="/" @click="closeMenu">Inicio</RouterLink>
        <RouterLink to="/servicios" @click="closeMenu">Servicios</RouterLink>
        <RouterLink to="/psicologos" @click="closeMenu">Psicólogos</RouterLink>
        <RouterLink to="/nosotros" @click="closeMenu">Nosotros</RouterLink>
        <RouterLink to="/preguntas" @click="closeMenu">FAQ</RouterLink>
        <RouterLink to="/contacto" @click="closeMenu">Contacto</RouterLink>
      </nav>

      <div class="nav-actions">
        <RouterLink class="btn btn-ghost" to="/login">Iniciar sesión</RouterLink>
        <RouterLink class="btn btn-primary" to="/agenda">Agendar cita</RouterLink>
      </div>
    </div>
  </header>
</template>
