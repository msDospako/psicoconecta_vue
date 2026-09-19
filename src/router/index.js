import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesView from '../views/ServicesView.vue'
import ServiceDetailView from '../views/ServiceDetailView.vue'
import PsychologistsView from '../views/PsychologistsView.vue'
import PsychologistView from '../views/PsychologistView.vue'
import AppointmentView from '../views/AppointmentView.vue'
import AboutView from '../views/AboutView.vue'
import FAQView from '../views/FAQView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to) => (to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/servicios', name: 'services', component: ServicesView },
    { path: '/servicios/:id', name: 'service-detail', component: ServiceDetailView },
    { path: '/psicologos', name: 'psychologists', component: PsychologistsView },
    { path: '/psicologos/:id', name: 'psychologist', component: PsychologistView },
    { path: '/agenda', name: 'appointment', component: AppointmentView },
    { path: '/nosotros', name: 'about', component: AboutView },
    { path: '/preguntas', name: 'faq', component: FAQView },
    { path: '/contacto', name: 'contact', component: ContactView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/administracion', name: 'admin', component: AdminView, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !localStorage.getItem('psicoconecta-session')) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
