<script setup>
import { computed, ref } from 'vue'
import ServiceCard from '../components/ServiceCard.vue'
import { services } from '../data/services'

const query = ref('')
const category = ref('todos')
const sort = ref('featured')

const categories = ['todos', ...new Set(services.map((s) => s.category))]

const filtered = computed(() => {
  let list = services.filter((service) => {
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
    <div class="container"><span class="eyebrow">Catálogo</span><h1>Servicios psicológicos</h1><p>Explora las 20 especialidades heredadas del proyecto original y encuentra una opción por necesidad o precio.</p></div>
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

      <div class="results-head"><strong>{{ filtered.length }} resultados</strong><span>Sesiones simuladas de 50 minutos</span></div>
      <div class="card-grid four-col">
        <ServiceCard v-for="service in filtered" :key="service.id" :service="service" />
      </div>
      <div v-if="filtered.length === 0" class="empty-state card"><h3>No encontramos coincidencias</h3><p>Prueba con otra palabra o selecciona todas las categorías.</p></div>
    </div>
  </section>
</template>
