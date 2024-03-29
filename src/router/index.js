import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pedidos from '../views/Pedidos.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/pedidos',
        name: 'Pedidos',
        component: Pedidos
      }
    ]
  })
export default router