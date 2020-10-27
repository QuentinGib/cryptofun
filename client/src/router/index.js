import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Comprendre from '@/views/Comprendre.vue'
import Graphiques from '@/views/Graphiques.vue'
import PorteMonnaie from '@/views/PorteMonnaie.vue'
import APropos from '@/views/APropos.vue'
import Cours from '@/views/Cours.vue'
import Blockchain from '@/views/Cours/Blockchain.vue'
import Cryptomonnaies from '@/views/Cours/Cryptomonnaies.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/comprendre',
    name: 'comprendre',
    component: Comprendre
  },
  {
    path: '/graphiques',
    name: 'graphiques',
    component: Graphiques
  },
  {
    path: '/porte_monnaie',
    name: 'porte_monnaie',
    component: PorteMonnaie
  },
  {
    path: '/a_propos',
    name: 'a_propos',
    component: APropos
  },
  {
    path: '/cours',
    name: 'cours',
    component: Cours,
    children: [
      {
        path: 'blockchain',
        name: 'blockchain',
        component: Blockchain
      },
      {
        path: 'crypto',
        name: 'crypto',
        compononent: Cryptomonnaies
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
