import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicRoutes = ['/login', '/register']
  const requireAuth = !publicRoutes.includes(to.path)
  const token = JSON.parse(localStorage.getItem('token'))

  if (requireAuth && !token) {
    return next('/login')
  }

  next()
})

export default router
