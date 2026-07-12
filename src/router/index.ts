import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // Auth routes (no layout)
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { guest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { guest: true },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgetPasswordView.vue'),
      meta: { guest: true },
    },
    // App routes (with layout)
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'todos',
          name: 'todos',
          component: () => import('@/views/app/TodosView.vue'),
        },
        {
          path: 'todos/:id',
          name: 'todo-detail',
          component: () => import('@/views/app/TodoDetailView.vue'),
        },
        {
          path: 'posts',
          name: 'posts',
          component: () => import('@/views/app/PostsView.vue'),
        },
        {
          path: 'posts/:id',
          name: 'post-detail',
          component: () => import('@/views/app/PostDetailView.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/app/UsersView.vue'),
        },
        {
          path: 'users/:id',
          name: 'user-profile',
          component: () => import('@/views/user-profile/UserProfileView.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/user-profile/UserProfileView.vue'),
        },
      ],
    },
  ],
})

// Navigation guard
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
  } else if (to.meta.guest && token) {
    next({ name: 'todos' })
  } else {
    next()
  }
})

export default router
