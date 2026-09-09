<script setup>
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
import ChatWidget from './components/ChatWidget.vue'
</script>

<template>
  <div class="app-shell">
    <AppNavbar />
    <main>
      <RouterView />
    </main>
    <AppFooter />
    <ChatWidget />
  </div>
</template>
