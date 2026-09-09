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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
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
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
