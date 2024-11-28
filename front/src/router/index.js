import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import { config } from '../../config.js'

const router = createRouter({
  history: createWebHashHistory(process.env.NODE_ENV === 'production' ? config.base_url : '/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },
    {
      path: '/admin/templates',
      name: 'templates',
      component: () => import('../views/TemplateView.vue')
    },
    {
      path: '/admin/templates/:id',
      name: 'templateDetail',
      component: () => import('../views/TemplateDetailView.vue'),
      props: true,
    },
    {
      path: '/admin/templates/create',
      name: 'createTemplate',
      component: () => import('../views/CreateTemplateView.vue'),
    }
  ],
})

export default router
