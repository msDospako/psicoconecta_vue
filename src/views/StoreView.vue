<script setup>
import { computed, ref, watch } from 'vue'
import PageRating from '../components/PageRating.vue'
const products = [
  { id: 1, name: 'Diario de gratitud digital', category: 'Digital', price: 99, icon: '📔', description: 'Plantilla de reflexión y registro personal para uso educativo.' },
  { id: 2, name: 'Tarjetas de afirmaciones', category: 'Imprimible', price: 79, icon: '💌', description: 'Tarjetas con mensajes de autocuidado para imprimir.' },
  { id: 3, name: 'Cuaderno de emociones', category: 'Digital', price: 129, icon: '🌈', description: 'Ejercicios de identificación y seguimiento de emociones.' },
  { id: 4, name: 'Póster de respiración', category: 'Imprimible', price: 59, icon: '🌿', description: 'Guía visual de respiración tranquila para espacios personales.' },
  { id: 5, name: 'Planificador de bienestar', category: 'Digital', price: 149, icon: '🗓️', description: 'Organiza pausas, hábitos y metas de autocuidado.' },
  { id: 6, name: 'Kit de bienestar emocional', category: 'Paquete', price: 249, icon: '🎁', description: 'Selección demostrativa de diario, tarjetas y planificador.' }
]
const storageKey = 'psicoconecta:tienda:carrito'
function loadCart() { try { const data = JSON.parse(localStorage.getItem(storageKey) || '{}'); return data && typeof data === 'object' && !Array.isArray(data) ? data : {} } catch { return {} } }
const cart = ref(loadCart())
const category = ref('Todos')
const search = ref('')
const showCart = ref(false)
const completed = ref(false)
const filters = ['Todos', 'Digital', 'Imprimible', 'Paquete']
const visibleProducts = computed(() => products.filter(p => (category.value === 'Todos' || p.category === category.value) && p.name.toLowerCase().includes(search.value.toLowerCase().trim())))
const lines = computed(() => products.filter(p => Number(cart.value[p.id]) > 0).map(p => ({ ...p, qty: Math.max(1, Math.min(20, Number(cart.value[p.id]) || 1)) })))
const count = computed(() => lines.value.reduce((sum, p) => sum + p.qty, 0))
const total = computed(() => lines.value.reduce((sum, p) => sum + p.price * p.qty, 0))
const money = n => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)
watch(cart, value => { try { localStorage.setItem(storageKey, JSON.stringify(value)) } catch { /* modo privado */ } }, { deep: true })
function add(id) { cart.value = { ...cart.value, [id]: Math.min(20, (Number(cart.value[id]) || 0) + 1) }; completed.value = false }
function change(id, diff) { const qty = Math.max(0, Math.min(20, (Number(cart.value[id]) || 0) + diff)); const updated = { ...cart.value }; if (qty) updated[id] = qty; else delete updated[id]; cart.value = updated; completed.value = false }
function checkout() { if (!lines.value.length) return; completed.value = true; cart.value = {}; showCart.value = false }
</script>
<template>
  <main class="section-pad shop-page">
    <div class="container">
      <div class="shop-heading"><div><span class="eyebrow">Proyecto académico · comercio electrónico simulado</span><h1>Tiendita de bienestar</h1><p class="lead small">Recursos ilustrativos de autocuidado. Explora el catálogo y practica una compra simulada, sin pagos ni envíos reales.</p></div><button type="button" class="btn btn-primary shop-cart-trigger" @click="showCart = !showCart" :aria-expanded="showCart" aria-controls="shop-cart">🛒 Carrito ({{ count }}) · {{ money(total) }}</button></div>
      <div v-if="completed" class="shop-success" role="status">✓ Pedido de demostración confirmado. No se ha realizado ningún cobro ni enviado un pedido real.</div>
      <div class="shop-controls"><label class="shop-search">Buscar artículos <input v-model="search" type="search" placeholder="Buscar en el catálogo" /></label><div class="shop-filters" role="group" aria-label="Filtrar por categoría"><button v-for="filter in filters" :key="filter" type="button" class="shop-filter" :class="{ active: category === filter }" :aria-pressed="category === filter" @click="category = filter">{{ filter }}</button></div></div>
      <div class="shop-layout"><div><div v-if="visibleProducts.length" class="shop-products"><article v-for="product in visibleProducts" :key="product.id" class="shop-product card"><div class="shop-product-image" aria-hidden="true">{{ product.icon }}</div><div class="shop-product-copy"><span class="chip">{{ product.category }}</span><h2>{{ product.name }}</h2><p>{{ product.description }}</p><div class="shop-product-actions"><strong>{{ money(product.price) }}</strong><button class="btn btn-soft" type="button" @click="add(product.id)">Agregar al carrito</button></div></div></article></div><p v-else class="card shop-empty">No encontramos artículos para esa búsqueda.</p></div>
      <aside id="shop-cart" class="shop-cart card" :class="{ 'shop-cart-open': showCart }" aria-label="Resumen del carrito"><h2>Tu carrito <span>({{ count }})</span></h2><p v-if="!lines.length" class="shop-empty">Aún no has añadido productos.</p><div v-for="item in lines" :key="item.id" class="shop-cart-line"><div><strong>{{ item.name }}</strong><small>{{ money(item.price) }} por unidad</small></div><div class="shop-qty"><button type="button" :aria-label="`Quitar una unidad de ${item.name}`" @click="change(item.id, -1)">−</button><span>{{ item.qty }}</span><button type="button" :aria-label="`Añadir una unidad de ${item.name}`" @click="change(item.id, 1)">+</button></div><strong>{{ money(item.price * item.qty) }}</strong></div><div class="shop-total"><span>Total estimado</span><strong>{{ money(total) }}</strong></div><button type="button" class="btn btn-primary full" :disabled="!lines.length" @click="checkout">Confirmar pedido de prueba</button><p class="shop-disclaimer">Simulación académica. Sin pasarela de pago, entregas ni almacenamiento de datos bancarios.</p></aside></div>
    </div>
  </main>
  <PageRating page-id="tienda" page-title="la tiendita virtual" />
</template>
