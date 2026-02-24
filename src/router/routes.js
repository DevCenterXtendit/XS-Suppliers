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
        name: 'configuration',
        path: 'configuration',
        redirect: { name: 'companyStructure' },
        children: [
          {
            name: 'companyStructureLayout',
            path: 'company-structure',
            component: () => import('layouts/RouterLayout.vue'),
            children: [
              {
                name: 'companyStructure',
                path: '',
                component: () => import ('pages/private/CompanyStructurePage.vue')
              },
              {
                name: 'customers',
                path: 'customers',
                component: () => import ('pages/private/CustomersPage.vue'),
              },
              {
                name: 'societiesGL',
                path: 'societies-GL',
                component: () => import ('pages/private/SocietyGlPage.vue'),
              },
              {
                name: 'societiesFI',
                path: 'societies-FI',
                component: () => import ('src/pages/private/SocietyFiPage.vue'),
              },
              {
                name: 'branches',
                path: 'branches',
                component: () => import ('src/pages/private/BranchPage.vue'),
              },
            ]
          }
        ]
      },
      {
        name: 'security',
        path: 'security',
        redirect: { name: 'users' },
        children: [
          {
            name: 'users',
            path: 'users',
            component:() => import ('src/pages/private/UsersPage.vue'),
          },
          {
            name: 'roles',
            path: 'roles',
            component:() => import ('src/pages/private/RolesPage.vue'),
          },
          {
            name: 'rolePermissions',
            path: 'roles-permissions/:id',
            component:() => import ('src/pages/private/RolePermissionsPage.vue'),
          },
        ],
      },
      {
        name: 'supplierConfiguration',
        path: 'supplier-configuration',
        redirect: { name: 'supplierFieldsConfiguration' },
        children: [
          {
            name: 'supplierFieldsConfiguration',
            path: 'supplier-fields-configuration',
            component: () => import ('src/pages/private/SupplierFieldConfigurationPage.vue'),
          },
          {
            name: 'supplierFields',
            path: 'supplier-fields',
            component: () => import ('src/pages/private/SupplierFieldsPage.vue'),
          },
        ],
      },
      {
        name: 'SupplierManagement',
        path: 'supplier-management',
        redirect: { name: 'suppliers' },
        children: [
          {
            name: 'suppliers',
            path: 'suppliers',
            component: () => import ('src/pages/private/SuppliersPage.vue'),
          },
          {
            name: 'invoiceUpdate',
            path: 'invoice-update',
            component: () => import ('src/pages/private/CustomerInvoicesPage.vue'),
          },
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
