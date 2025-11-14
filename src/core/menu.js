export default [
  {
    name: 'dashboard',
    icon: 'home',
    label: 'Inicio',
    to: '/'
  },
  {
    name: 'configuration',
    icon: 'settings',
    label: 'Configuración Empresarial',
    to: '/configuration',
    children: [
      {
        name: 'companyStructure',
        icon: 'apartment',
        label: 'Estructura de Empresa',
        to: '/configuration/company-structure',
        children: [
          {
            name: 'customers',
            icon: 'business',
            label: 'Clientes',
            to: '/configuration/company-structure/customers'
          },
          {
            name: 'societiesGL',
            icon: 'business',
            label: 'Sociedad GL',
            to: '/configuration/company-structure/societies-GL'
          },
          {
            name: 'societiesFI',
            icon: 'business',
            label: 'Sociedad FI',
            to: '/configuration/company-structure/societies-FI'
          },
          {
            name: 'branches',
            icon: 'business',
            label: 'Segmentos',
            to: '/configuration/company-structure/branches'
          },
          // {
          //   name: 'companyRoadmap',
          //   icon: 'business',
          //   label: 'Organigrama',
          //   to: '/configuration/company-structure/company-roadmap'
          // },
          {
            name: 'suppliers',
            icon: 'business',
            label: 'Proveedores',
            to: '/configuration/company-structure/suppliers'
          }
        ]
      },
      {
        name: 'users',
        icon: 'person',
        label: 'Usuarios',
        to: '/configuration/users'
      },
      {
        name: 'roles',
        icon: 'groups',
        label: 'Roles',
        to: '/configuration/roles'
      },
      {
        name: 'supplierFields',
        icon: 'format_list_bulleted',
        label: 'Campos proveedor',
        to: '/configuration/supplier-fields'
      },
      {
        name: 'supplierFieldsConfiguration',
        icon: 'grading',
        label: 'Configuración de campos',
        to: '/configuration/supplier-fields-configuration'
      },
    ],
  },
  {
    name: 'suppliers',
    icon: 'home',
    label: 'Proveedores',
    to: '/',
     children: [
      {
        name: 'suppliers',
        icon: 'home',
        label: 'Estatus facturas',
        to: '/',
      },
      {
        name: 'suppliers',
        icon: 'home',
        label: 'Cargar Factura',
        to: '/',
      }
     ]
  },
]
