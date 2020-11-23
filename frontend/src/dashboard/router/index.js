import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/admin/home/', name: 'admin.home', component: async () => (await import('../views/admin/Home')) },
  { path: '/admin/schedules/', name: 'admin.schedules.index', component: async () => (await import('../views/admin/schedules')).Index },
  { path: '/admin/schedules/create', name: 'admin.schedules.create', component: async () => (await import('../views/admin/schedules')).Create },
  { path: '/admin/schedules/:id', name: 'admin.schedules.show', component: async () => (await import('../views/admin/schedules')).Show, props: route => ({ id: route.params.id }) },
  { path: '/admin/schedules/:id/edit', name: 'admin.schedules.edit', component: async () => (await import('../views/admin/schedules')).Edit, props: route => ({ id: route.params.id }) },
  { path: '/admin/services/', name: 'admin.services.index', component: async () => (await import('../views/admin/services')).Index },
  { path: '/admin/services/create', name: 'admin.services.create', component: async () => (await import('../views/admin/services')).Create },
  { path: '/admin/services/:id/edit', name: 'admin.services.edit', component: async () => (await import('../views/admin/services')).Edit, props: route => ({ id: route.params.id }) },
  { path: '/admin/users/', name: 'admin.users.index', component: async () => (await import('../views/admin/users')).Index },
  { path: '/admin/users/create', name: 'admin.users.create', component: async () => (await import('../views/admin/users')).Create },
  { path: '/admin/users/:id/edit', name: 'admin.users.edit', component: async () => (await import('../views/admin/users')).Edit, props: route => ({ id: route.params.id }) },

  { path: '/client/home/', name: 'client.home', component: async () => (await import('../views/client/Home')) },
  { path: '/client/schedules/', name: 'client.schedules.index', component: async () => (await import('../views/client/schedules')).Index },
  { path: '/client/schedules/create', name: 'client.schedules.create', component: async () => (await import('../views/client/schedules')).Create },
  { path: '/client/schedules/:id', name: 'client.schedules.show', component: async () => (await import('../views/client/schedules')).Show, props: route => ({ id: route.params.id }) },
  { path: '/client/schedules/:id/edit', name: 'client.schedules.edit', component: async () => (await import('../views/client/schedules')).Edit, props: route => ({ id: route.params.id }) },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicRoutes = []
  const requireAuth = !publicRoutes.includes(to.path)
  const token = JSON.parse(localStorage.getItem('token'))

  if (requireAuth && !token) {
    return location.href = '/login'
  }

  next()
})

export default router
