<script setup>
import { ref } from 'vue'
import { useAuth } from '../auth'

const menuOpen = ref(false)
const closeMenu = () => { menuOpen.value = false }
const { isAuthenticated } = useAuth()
</script>

<template>
  <header class="site-header">
    <div class="container nav-wrap">
      <RouterLink class="brand" to="/" @click="closeMenu">
        <img class="brand-logo" src="/logo-psicoconecta.svg" alt="" aria-hidden="true" />
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
        <RouterLink v-if="isAuthenticated" to="/administracion" @click="closeMenu">Administración</RouterLink>
      </nav>

      <div class="nav-actions">
        <RouterLink class="btn btn-ghost" :to="isAuthenticated ? '/administracion' : '/login'">{{ isAuthenticated ? 'Mi panel' : 'Iniciar sesión' }}</RouterLink>
        <RouterLink class="btn btn-primary" to="/agenda">Agendar cita</RouterLink>
      </div>
    </div>
  </header>
</template>
