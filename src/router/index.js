import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Auth/Login.vue')
    },
    {
      path: '/test',
      name: 'ExamHall',
      component: () => import('@/views/Hall/index.vue')
    },
    {
      path: '/',
      component: () => import('@/layouts/App.vue'),
      children: [
        {
          path: '',
          name: 'App',
          component: () => import('@/views/App/overview/index.vue'),
        },
        {
          path: 'payment',
          name: 'Payment',
          component: () => import('@/views/App/payment/index.vue'),
        },
        {
          path: 'student',
          name: 'StudentList',
          component: () => import('@/views/App/students/index.vue'),
        },
        {
          path: 'student/add',
          name: 'StudentAdd',
          component: () => import('@/views/App/students/Add.vue'),
        },
        {
          path: 'teacher',
          name: 'TeacherList',
          component: () => import('@/views/App/teacher/index.vue'),
        },
        {
          path: 'teacher-list',
          name: 'UserTeacherList',
          component: () => import('@/views/App/staff/index.vue'),
        },
        {
          path: 'quiz',
          name: 'QuizList',
          component: () => import('@/views/App/quiz/index.vue'),
        },
        {
          path: 'test',
          name: 'testList',
          component: () => import('@/views/App/test/index.vue'),
        },
        {
          path: 'certificate',
          name: 'Certificate',
          component: () => import('@/views/App/certificate/index.vue'),
        },
        {
          path: 'result',
          name: 'Result',
          component: () => import('@/views/App/result/index.vue'),
        },
        {
          path: 'quiz/details',
          name: 'QuizDetails',
          component: () => import('@/views/App/quiz/Details.vue'),
        },
        {
          path: 'notice',
          name: 'noticeList',
          component: () => import('@/views/App/notice/index.vue'),
        },
        {
          path: 'notice/add',
          name: 'noticeAdd',
          component: () => import('@/views/App/notice/Add.vue'),
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/App/profile/index.vue'),
        },
      ]
    },
  ],
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  },
})

export default router
