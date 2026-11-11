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

const pending = ref(false)

async function submitLogin() {
  pending.value = true
  status.value = ''
  try {
    await login(email.value, password.value)
    await router.push(typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/administracion')
      ? route.query.redirect
      : '/administracion')
  } catch (error) {
    status.value = error.status === 401 ? error.message : 'No se pudo iniciar sesión. Intenta de nuevo.'
  } finally {
    pending.value = false
  }
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
        <p v-if="status" class="alert error" role="alert">{{ status }}</p>
        <button class="btn btn-primary btn-lg full" type="submit" :disabled="pending">Iniciar sesión</button>
      </form>
    </div>
  </section>
</template>
