import { createRouter, createWebHistory } from 'vue-router'
//import Home from '../views/Home.vue'
import { HTTP404 } from '../views/errors/'

const routes = [
  //{ path: '/', name: 'Home', component: Home },
  { path: '/', name: 'Home', beforeEnter: () => location.href = '/login' },

  { path: '/:pathMath(.*)*', component: HTTP404 },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
