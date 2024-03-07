import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Auth/Login.vue'),
    },
    {
      path: '/request-reset-password',
      name: 'RequestPassword',
      component: () => import('@/views/Auth/RequestPassword.vue'),
    },
    {
      path: '/reset-password/:token',
      name: 'ResetPassword',
      component: () => import('@/views/Auth/ResetPassword.vue'),
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: () => import('@/views/Auth/ChangePassword.vue'),
      meta: {
        requiresAuth: true,
        role_id: [0, 1, 2]
      },
    },
    {
      path: '/test',
      name: 'ExamHall',
      component: () => import('@/views/Hall/index.vue'),
      meta: {
        requiresAuth: true,
        role_id: [0, 1, 2]
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/404.vue'),
    },
    {
      path: '/',
      component: () => import('@/layouts/App.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'App',
          component: () => import('@/views/App/overview/index.vue'),
          meta: {
            role_id: [0, 1, 2]
          },
        },
        // {
        //   path: 'payment',
        //   name: 'Payment',
        //   component: () => import('@/views/App/payment/index.vue'),
        //   meta: {
        //     role_id: [0]
        //   },
        // },
        {
          path: 'student',
          name: 'StudentList',
          component: () => import('@/views/App/students/index.vue'),
          meta: {
            role_id: [0, 1]
          },
        },
        {
          path: 'student/add',
          name: 'StudentAdd',
          component: () => import('@/views/App/students/Add.vue'),
          meta: {
            role_id: [0]
          },
        },
        {
          path: 'teacher/add',
          name: 'TeacherAdd',
          component: () => import('@/views/App/teacher/Add.vue'),
          meta: {
            role_id: [0]
          },
        },
        {
          path: 'teacher',
          name: 'TeacherList',
          component: () => import('@/views/App/teacher/index.vue'),
          meta: {
            role_id: [0]
          },
        },
        {
          path: 'teacher-list',
          name: 'UserTeacherList',
          component: () => import('@/views/App/staff/index.vue'),
          meta: {
            role_id: [0, 1, 2]
          },
        },
        {
          path: 'quiz',
          name: 'QuizList',
          component: () => import('@/views/App/quiz/index.vue'),
          meta: {
            role_id: [0, 1]
          },
        },
        {
          path: 'test',
          name: 'testList',
          component: () => import('@/views/App/test/index.vue'),
          meta: {
            role_id: [2]
          },
        },
        {
          path: 'certificate',
          name: 'Certificate',
          component: () => import('@/views/App/certificate/index.vue'),
          meta: {
            role_id: [2]
          },
        },
        {
          path: 'result',
          name: 'Result',
          component: () => import('@/views/App/result/index.vue'),
          meta: {
            role_id: [2]
          },
        },
        {
          path: 'quiz/details',
          name: 'QuizDetails',
          component: () => import('@/views/App/quiz/Details.vue'),
          meta: {
            role_id: [0, 1]
          },
        },
        {
          path: 'notice',
          name: 'noticeList',
          component: () => import('@/views/App/notice/index.vue'),
          meta: {
            role_id: [0, 1, 2]
          },
        },
        {
          path: 'notice/add',
          name: 'noticeAdd',
          component: () => import('@/views/App/notice/Add.vue'),
          meta: {
            role_id: [0, 1]
          },
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/App/profile/index.vue'),
          meta: {
            role_id: [0, 1, 2]
          },
        },
        {
          path: 'profile/:id',
          name: 'UserProfile',
          component: () => import('@/views/App/profile/UserProfile.vue'),
          meta: {
            role_id: [0, 1]
          },
        },
        {
          path: 'profile/edit',
          name: 'ProfileEdit',
          component: () => import('@/views/App/profile/ProfileEdit.vue'),
          meta: {
            role_id: [0, 1]
          },
        },
        {
          path: 'profile/edit/:id',
          name: 'AuthProfilesEdit',
          component: () => import('@/views/App/profile/ProfilesEdit.vue'),
          meta: {
            role_id: [0]
          },
        },
      ]
    },
  ],
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  },
})

export default router
