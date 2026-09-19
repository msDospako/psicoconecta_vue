<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../auth'

const route = useRoute()
const router = useRouter()
const { login } = useAuth()
const email = ref('')
const password = ref('')
const show = ref(false)
const status = ref('')

function submitLogin() {
  if (!login(email.value, password.value)) {
    status.value = 'error'
    return
  }
  status.value = 'success'
  window.setTimeout(() => router.push(route.query.redirect || '/administracion'), 500)
}

function fillAdvisorAccess() {
  email.value = 'asesor@psicoconecta.mx'
  password.value = 'Asesor2026!'
}
</script>

<template>
  <section class="auth-page section-pad">
    <div class="auth-card card">
      <div class="auth-logo"><img src="/logo-psicoconecta.svg" alt="PsicoConecta" /></div>
      <span class="eyebrow">Acceso administrativo</span>
      <h1>Bienvenido</h1>
      <p>Ingresa con uno de los usuarios autorizados para consultar el panel del proyecto.</p>
      <form @submit.prevent="submitLogin">
        <label>Correo<input v-model="email" type="email" autocomplete="username" placeholder="correo@psicoconecta.mx" required /></label>
        <label>Contraseña<div class="password-field"><input v-model="password" :type="show ? 'text' : 'password'" autocomplete="current-password" placeholder="Contraseña" required /><button type="button" @click="show = !show">{{ show ? 'Ocultar' : 'Mostrar' }}</button></div></label>
        <p v-if="status === 'error'" class="alert error">El correo o la contraseña no coinciden con un usuario autorizado.</p>
        <p v-if="status === 'success'" class="alert success">Acceso correcto. Abriendo el panel…</p>
        <button class="btn btn-primary btn-lg full" type="submit">Iniciar sesión</button>
      </form>
      <button class="demo-access" type="button" @click="fillAdvisorAccess">Completar acceso de demostración para la asesoría</button>
      <small>Acceso simulado con LocalStorage para fines académicos; no debe utilizarse en producción.</small>
    </div>
  </section>
</template>
