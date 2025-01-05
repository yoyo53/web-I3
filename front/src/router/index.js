import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { inject } from 'vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/admin/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('../views/TeacherView.vue'),
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
    /* {
      path: '/admin/templates/:id',
      name: 'templateDetail',
      component: () => import('../views/TemplateDetailView.vue'),
      props: true,
    }, */
    {
      path: '/admin/templates/create',
      name: 'createTemplate',
      component: () => import('../views/CreateTemplateView.vue'),
    },
    {
      path: '/admin/surveys/create',
      name: 'createSurvey',
      component: () => import('../views/CreateSurveyView.vue'),
    },
    {
      path: '/admin/templates/:id',
      name: 'test',
      component: () => import('../views/TestVue.vue'),
      props: true,
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('token');
  const userState = inject('userState');
  userState.userType = null;
  userState.userId = null;
  //localStorage.removeItem('token');
  if (!authRequired) {
    next();
  }
  else if (token) {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + 'auth/verifyToken', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      const data = await response.json();
      userState.userType = data.user_type;
      userState.userId = data.user_id;
      console.log(data, from, to);
      if (data.user_type === 'Admin') {
        if (to.path.startsWith('/admin')) {
          next();
        }
        else {
          next('/admin');
        }
      }
      else if (data.user_type === 'Teacher') {
        if (to.path.startsWith('/teacher')) {
          next();
        }
        else {
          next('/teacher');
        }
      }
      else if (data.user_type === 'Student') {
        if (to.path.startsWith('/student')) {
          next();
        }
        else {
          next('/student');
        }
      }
      else {
        if (to.path === '/login') {
          next();
        }
        else {
          next('/login');
        }
      }
    }
    catch (error) {
      console.error(error);
      if (to.path === '/login') {
        next();
      }
      else {
        next('/login');
      }
    }
  }
  else {
    if (to.path === '/login') {
      next();
    }
    else {
      next('/login');
    }
  }
});

export default router
