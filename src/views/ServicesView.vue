<script setup>
import { computed, onMounted, ref } from 'vue'
import ServiceCard from '../components/ServiceCard.vue'
import { api } from '../api'

const services = ref([])
const loading = ref(true)
const error = ref('')
onMounted(async () => {
  try { services.value = await api('servicios') }
  catch { error.value = 'No se pudo cargar el catálogo. Actualiza la página para reintentar.' }
  finally { loading.value = false }
})

const query = ref('')
const category = ref('todos')
const sort = ref('featured')

const categories = computed(() => ['todos', ...new Set(services.value.map((s) => s.category))])

const filtered = computed(() => {
  let list = services.value.filter((service) => {
    const text = `${service.title} ${service.description} ${service.category}`.toLocaleLowerCase('es-MX')
    const q = query.value.trim().toLocaleLowerCase('es-MX')
    return (!q || text.includes(q)) && (category.value === 'todos' || service.category === category.value)
  })
  if (sort.value === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sort.value === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
  if (sort.value === 'name') list = [...list].sort((a, b) => a.title.localeCompare(b.title, 'es'))
  return list
})
</script>

<template>
  <section class="page-hero compact">
    <div class="container"><span class="eyebrow">Catálogo</span><h1>Servicios psicológicos</h1><p>Encuentra un servicio por categoría o precio.</p></div>
  </section>

  <section class="section-pad top-tight">
    <div class="container">
      <div class="filter-bar card">
        <label class="search-box"><span>⌕</span><input v-model="query" type="search" placeholder="Buscar ansiedad, estrés, pareja…" /></label>
        <select v-model="category" aria-label="Filtrar por categoría">
          <option v-for="item in categories" :key="item" :value="item">{{ item === 'todos' ? 'Todas las categorías' : item }}</option>
        </select>
        <select v-model="sort" aria-label="Ordenar servicios">
          <option value="featured">Orden recomendado</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name">Nombre A–Z</option>
        </select>
      </div>

      <p v-if="loading" role="status">Cargando servicios…</p>
      <p v-else-if="error" class="alert error" role="alert">{{ error }}</p>
      <div v-else class="results-head"><strong>{{ filtered.length }} resultados</strong><span>Sesiones simuladas de 50 minutos</span></div>
      <div class="card-grid four-col">
        <ServiceCard v-for="service in filtered" :key="service.id" :service="service" />
      </div>
      <div v-if="!loading && !error && filtered.length === 0" class="empty-state card"><h3>No encontramos coincidencias</h3><p>Prueba con otra palabra o selecciona todas las categorías.</p></div>
    </div>
  </section>
</template>
