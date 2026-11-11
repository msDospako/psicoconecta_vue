<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { api } from '../api'
import { useAuth } from '../auth'

const services = ref([])
const draft = ref(null)
const pending = ref(false)
const error = ref('')
const notice = ref('')
const router = useRouter()
const { logout } = useAuth()

async function run(operation) {
  pending.value = true
  error.value = ''
  notice.value = ''
  try {
    await operation()
  } catch (failure) {
    if (failure.status === 401) {
      await logout()
      await router.push({ name: 'login', query: { redirect: '/administracion' } })
      return
    }
    error.value = failure.status ? failure.message : 'No se pudo conectar con el servidor. Intenta de nuevo.'
  } finally {
    pending.value = false
  }
}

function load() {
  return run(async () => { services.value = await api('servicios') })
}

onMounted(load)

function open(service = { title: '', category: '', emoji: '🧠', price: 0, rating: 4, description: '', includes: [] }) {
  draft.value = { ...service, includes: service.includes.join('\n') }
  error.value = ''
  notice.value = ''
}

function save() {
  return run(async () => {
    const { id, includes, ...fields } = draft.value
    const body = { ...fields, includes: includes.split('\n').map((item) => item.trim()).filter(Boolean) }
    const saved = await api(id ? 'servicios/' + id : 'servicios', { method: id ? 'PUT' : 'POST', body })
    if (id) {
      services.value = services.value.map((service) => service.id === id ? saved : service)
    } else {
      services.value.push(saved)
    }
    draft.value = null
    notice.value = id ? 'Servicio actualizado.' : 'Servicio agregado.'
  })
}

function erase(service) {
  if (!window.confirm(`¿Eliminar «${service.title}» del catálogo?`)) return
  return run(async () => {
    await api('servicios/' + service.id, { method: 'DELETE' })
    services.value = services.value.filter((item) => item.id !== service.id)
    if (draft.value?.id === service.id) draft.value = null
    notice.value = 'Servicio eliminado.'
  })
}
</script>

<template>
  <article class="card users-card" id="catalogo">
    <div class="admin-heading">
      <h2>Catálogo de servicios</h2>
      <button class="btn btn-primary" type="button" :disabled="pending" @click="open()">Agregar servicio</button>
    </div>
    <p v-if="pending" role="status">Procesando…</p>
    <p v-if="error" class="alert error" role="alert">{{ error }}</p>
    <p v-if="notice" class="alert success" role="status">{{ notice }}</p>
    <form v-if="draft" class="service-form" @submit.prevent="save">
      <h3>{{ draft.id ? 'Editar servicio' : 'Nuevo servicio' }}</h3>
      <fieldset :disabled="pending">
        <label>Nombre<input v-model.trim="draft.title" maxlength="120" required /></label>
        <div class="form-grid two">
          <label>Categoría<input v-model.trim="draft.category" maxlength="60" required /></label>
          <label>Icono<input v-model.trim="draft.emoji" maxlength="32" required /></label>
          <label>Precio en MXN<input v-model.number="draft.price" type="number" min="0" max="1000000" required /></label>
          <label>Calificación<input v-model.number="draft.rating" type="number" min="1" max="5" required /></label>
        </div>
        <label>Descripción<textarea v-model.trim="draft.description" maxlength="2000" rows="3" required /></label>
        <label>Qué incluye (un elemento por línea)<textarea v-model="draft.includes" maxlength="2414" rows="3" required /></label>
        <div class="service-actions">
          <button class="btn btn-primary" type="submit">Guardar servicio</button>
          <button class="btn btn-ghost" type="button" @click="draft = null">Cancelar</button>
        </div>
      </fieldset>
    </form>
    <div v-if="services.length" class="table-wrap">
      <table>
        <thead><tr><th scope="col">Servicio</th><th scope="col">Categoría</th><th scope="col">Precio</th><th scope="col">Acciones</th></tr></thead>
        <tbody>
          <tr v-for="service in services" :key="service.id">
            <td>{{ service.title }}</td><td>{{ service.category }}</td><td>${{ service.price.toLocaleString('es-MX') }}</td>
            <td><div class="service-actions">
              <RouterLink class="btn btn-ghost" :to="'/servicios/' + service.id">Ver ficha</RouterLink>
              <button class="btn btn-ghost" type="button" :disabled="pending" @click="open(service)">Editar</button>
              <button class="btn btn-ghost delete-service" type="button" :disabled="pending" @click="erase(service)">Eliminar</button>
            </div></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else-if="!pending && !error">El catálogo está vacío.</p>
    <button v-if="error && !draft" class="btn btn-ghost" type="button" :disabled="pending" @click="load">Recargar catálogo</button>
  </article>
</template>

<style scoped>
.service-form { margin: 1rem 0; padding: 1rem; border: 1px solid #d6e2df; border-radius: 1rem; }
fieldset { display: grid; gap: 0.75rem; border: 0; padding: 0; min-width: 0; }
label { display: grid; gap: 0.3rem; font-weight: 600; }
.service-actions { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.delete-service { color: #9e2525; }
</style>
