import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import CidadeView from '@/views/CidadeView.vue'
import LugarView from '@/views/LugarView.vue'
import AlquimistaView from '@/views/AlquimistaView.vue'
import BibliotecaView from '@/views/BibliotecaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'castelo', component: WelcomeView },
    { path: '/cidade', name: 'cidade', component: CidadeView },
    { path: '/cidade/:lugar', name: 'lugar', component: LugarView },
    { path: '/cidade/alquimista', name: 'alquimista', component: AlquimistaView }, 
    { path: '/cidade/biblioteca', name: 'biblioteca', component: BibliotecaView },
    { path: '/cidade/:lugar', name: 'lugar', component: LugarView },

  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router