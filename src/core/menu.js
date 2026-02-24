export default [
  {
    name: 'dashboard',
    icon: 'home',
    label: 'Inicio',
    to: '/'
  },
  //Configuración Empresarial
  {
    name: 'configuration',
    icon: 'settings',
    label: 'Configuración Empresarial',
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
          }
        ]
      }
    ],
  },
  // Seguridad
  {
    name: 'security',
    icon: 'security', 
    label: 'Seguridad',
    children: [
      {
        name: 'users',
        icon: 'person',
        label: 'Usuarios',
        to: '/security/users'
      },
      {
        name: 'roles',
        icon: 'groups',
        label: 'Roles',
        to: '/security/roles'
      },
    ]
  },
  // Configuración Proveedores
  {
    name: 'supplierConfiguration',
    icon: 'diversity_3', 
    label: 'Configuración Proveedores',
    children: [
      {
        name: 'supplierFieldsConfiguration',
        icon: 'grading',
        label: 'Configuración de Campos',
        to: '/supplier-configuration/supplier-fields-configuration'
      },
      {
        name: 'supplierFields',
        icon: 'format_list_bulleted',
        label: 'Campos Proveedor',
        to: '/supplier-configuration/supplier-fields'
      },
    ]
  },
  // Gestión de Proveedores
  {
    name: 'supplierManagement',
    icon: 'diversity_3',
    label: 'Gestion de Proveedores',
    children: [
      {
        name: 'suppliers',
        icon: 'person_add',
        label: 'Alta Proveedores',
        to: '/supplier-management/suppliers'
      },
      {
        name: 'suppliers',
        icon: 'description',
        label: 'Actualizar Facturas',
        to: '/supplier-management/invoice-update',
      }
    ]
  },
  {
    name: 'viewInvoices',
    icon: 'invoice-text-plus-outline',
    label: 'Visualizar Facturas',
    to: '/',
  }
];
