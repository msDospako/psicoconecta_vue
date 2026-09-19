<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../auth'
import { demoUsers } from '../data/users'

const router = useRouter()
const { currentUser, logout } = useAuth()

function closeSession() {
  logout()
  router.push('/login')
}
</script>

<template>
  <section class="page-hero compact">
    <div class="container admin-heading">
      <div><span class="eyebrow">Administración</span><h1>Panel del proyecto</h1><p>Control demostrativo de usuarios y contenidos de PsicoConecta.</p></div>
      <button class="btn btn-ghost" type="button" @click="closeSession">Cerrar sesión</button>
    </div>
  </section>
  <section class="section-pad top-tight">
    <div class="container admin-layout">
      <aside class="card admin-profile">
        <span class="status-badge">Sesión activa</span><div class="admin-avatar">{{ currentUser?.name?.charAt(0) }}</div>
        <h2>{{ currentUser?.name }}</h2><p>{{ currentUser?.email }}</p><strong>{{ currentUser?.role }}</strong>
      </aside>
      <div>
        <div class="admin-stats">
          <article class="card"><strong>{{ demoUsers.length }}</strong><span>Usuarios registrados</span></article>
          <article class="card"><strong>7</strong><span>Secciones principales</span></article>
          <article class="card"><strong>Activo</strong><span>Tema responsivo</span></article>
        </div>
        <article class="card users-card">
          <div class="section-heading"><span class="eyebrow">Usuarios del sistema</span><h2>Responsable y asesoría</h2><p>Cuentas configuradas para el responsable individual del proyecto y la asesora encargada de revisarlo.</p></div>
          <div class="table-wrap"><table><thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th></tr></thead><tbody>
            <tr v-for="user in demoUsers" :key="user.id"><td>{{ user.name }}</td><td>{{ user.email }}</td><td>{{ user.role }}</td><td><span class="status-badge">{{ user.status }}</span></td></tr>
          </tbody></table></div>
        </article>
        <article class="card sprint-card"><span class="eyebrow">Sprint 2</span><h2>Avances implementados</h2><ul>
          <li>Identidad visual con logotipo, icono y favicon.</li><li>Tema personalizado y adaptable a computadora, tableta y teléfono.</li>
          <li>Menú principal con acceso a contenidos y funciones del proyecto.</li><li>Quiénes somos, misión, visión, política de calidad y ubicación.</li>
        </ul></article>
      </div>
    </div>
  </section>
</template>
