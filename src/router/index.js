import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: import('@/views/Auth/Login.vue')
    },
    {
      path: '/app',
      name: 'App',
      component: import('@/views/App/index.vue')
    },
  ]
})

export default router
