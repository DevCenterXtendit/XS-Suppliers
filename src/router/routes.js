const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth:true,
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('pages/private/UsersPage.vue')
      }
    ]


  },
  {
    path: '/login',
    name: 'login',
    component: () => import('/src/pages/public/LoginPage.vue'),
    meta: {
      name: 'login',
      requiresAuth:false
    }
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
