<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const show = ref(false)
const status = ref('')

function login() {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) || password.value.length < 4) {
    status.value = 'error'; return
  }
  status.value = 'success'
  window.setTimeout(() => router.push('/'), 700)
}
</script>

<template>
  <section class="auth-page section-pad"><div class="auth-card card"><div class="auth-logo"><span class="brand-mark">P</span></div><span class="eyebrow">Área personal</span><h1>Bienvenido de nuevo</h1><p>Inicio de sesión simulado para demostrar formularios y validación en Vue.</p><form @submit.prevent="login"><label>Correo<input v-model="email" type="email" placeholder="correo@ejemplo.com" /></label><label>Contraseña<div class="password-field"><input v-model="password" :type="show ? 'text' : 'password'" placeholder="Mínimo 4 caracteres" /><button type="button" @click="show = !show">{{ show ? 'Ocultar' : 'Mostrar' }}</button></div></label><div class="login-links"><label class="check"><input type="checkbox" /> Recordarme</label><button type="button" class="link-button">Recuperar contraseña</button></div><p v-if="status === 'error'" class="alert error">Ingresa un correo válido y una contraseña de al menos cuatro caracteres.</p><p v-if="status === 'success'" class="alert success">Inicio de sesión simulado correctamente.</p><button class="btn btn-primary btn-lg full" type="submit">Iniciar sesión</button></form><small>Este prototipo no autentica usuarios reales.</small></div></section>
</template>
