const routes = [
  {
    name: 'mainLayout',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth:true,
    },
    children: [
      {
        name: 'dashboard',
        path: '',
        component: () => import('src/pages/private/IndexPage.vue')
      },
      {
        name: 'configurationLayout',
        path: 'configuration',
        component: () => import('layouts/ConfigurationLayout.vue'),
        children: [
          {
            path: '',
            name: 'configurationPage',
            component: () => import('pages/private/ConfigurationPage.vue')
          },
          {
            path: 'company-structure',
            name: 'companyStructureLayout',
            component: () => import ('layouts/CompanyStructureLayout.vue'),
            children: [
              {
                path: '',
                name: 'companyStructurePage',
                component: () => import('pages/private/CompanyStructurePage.vue')
              },
              {
                path: 'customers',
                name: 'customers',
                component: () => import ('pages/private/CustomersPage.vue'),
              },
              {
                path: 'societyGL',
                name: 'societyGL',
                component: () => import ('pages/private/SocietyGlPage.vue'),
              },
              {
                path: 'societyFI',
                name: 'societyFI',
                component: () => import ('src/pages/private/SocietyFiPage.vue'),
              },
              {
                path: 'branches',
                name: 'branches',
                component: () => import ('src/pages/private/BranchPage.vue'),
              }
            ]
          },
          {
            path: 'users',
            name: 'users',
            component:() => import ('src/pages/private/UsersPage.vue'),
          },
          {
            path: 'supplierFieldsConfiguration',
            name: 'supplierFieldsConfiguration',
            component: () => import ('src/pages/private/SupplierFieldConfiguration.vue'),
          },
          {
            path: 'supplierFields',
            name: 'supplierFields',
            component: () => import ('src/pages/private/SupplierFields.vue'),
          }
        ]
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
