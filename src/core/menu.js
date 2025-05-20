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
            name: 'societyGL',
            icon: 'business',
            label: 'Sociedad GL',
            to: '/configuration/company-structure/societyGL'
          },
          {
            name: 'societyFI',
            icon: 'business',
            label: 'Sociedad FI',
            to: '/configuration/company-structure/societyFI'
          },
          {
            name: 'branches',
            icon: 'business',
            label: 'Segmentos',
            to: '/configuration/company-structure/branches'
          },
        ]
      },
      {
        name: 'users',
        icon: 'person',
        label: 'Usuarios',
        to: '/configuration/users'
      },
    ],
  }
]
