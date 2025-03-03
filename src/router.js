import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './Views/HomeView.vue'
import AboutView from './Views/AboutView.vue'
import Teoria from './Views/Teoria.vue'

const routes = [
  { path: '/', component: Teoria },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router