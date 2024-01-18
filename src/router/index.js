import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/Auth/Login.vue')
    },
    {
      path: '/app',
      component: () => import('@/layouts/App.vue'),
      children : [
        {
          path : '',
          name : 'App',
          component : () => import('@/views/App/overview/index.vue'),
        },
        {
          path : 'payment',
          name : 'Payment',
          component : () => import('@/views/App/payment/index.vue'),
        },
        {
          path : 'student',
          name : 'StudentList',
          component : () => import('@/views/App/students/index.vue'),
        },
        {
          path : 'profile',
          name : 'Profile',
          component : () => import('@/views/App/profile/index.vue'),
        },
      ]
    },
  ]
})

export default router
