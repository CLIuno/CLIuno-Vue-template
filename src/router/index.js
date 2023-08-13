import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/pages/Auth/LoginView.vue'
import copRoute from '@/router/copRoute'
import managementRoute from '@/router/managementRoute'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ChatView from '@/views/pages/Chat/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {
            title: 'CLIuno'
          }
        },
        {
          path: 'chat',
          name: 'chat',
          component: ChatView,
          meta: {
            title: 'Chat Page'
          }
        },
        {
          path: '/user/profile',
          name: 'profile',
          component: () => import('@/views/UserProfile/ProfileView.vue'),
          meta: {
            title: 'Profile Page'
          }
        },
        {
          path: '/user/settings',
          name: 'settings',
          component: () => import('@/views/UserProfile/SettingsView.vue'),
          meta: {
            title: 'Settings Page'
          }
        },
        ...copRoute,
        ...managementRoute
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login Page'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
