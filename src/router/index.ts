import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'PostList',
      component: () => import('@/views/PostList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/posts/:id',
      name: 'PostDetail',
      component: () => import('@/views/PostDetail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/posts/create',
      name: 'PostCreate',
      component: () => import('@/views/PostEdit.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/posts/:id/edit',
      name: 'PostEdit',
      component: () => import('@/views/PostEdit.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/categories',
      name: 'CategoryManage',
      component: () => import('@/views/CategoryManage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/tags',
      name: 'TagManage',
      component: () => import('@/views/TagManage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/Search.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // 如果路由需要认证
  if (to.meta.requiresAuth) {
    if (authStore.isAuthenticated) {
      next()
    } else {
      // 未登录，跳转到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    // 如果已登录，访问登录页或注册页时跳转到首页
    if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
