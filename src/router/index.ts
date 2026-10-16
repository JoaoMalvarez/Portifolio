import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import CidadeView from '@/views/CidadeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'castelo', component: WelcomeView },
    { path: '/cidade', name: 'cidade', component: CidadeView },
  ],
  // cada cena nova começa no topo
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router