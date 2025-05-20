<template>
  <q-page class="q-pa-md flex flex-center">
    <!-- Saludo arriba a la izquierda -->
    <div
      class="text-h5"
      style="
        position: absolute;
        top: 24px;
        left: 32px;
        z-index: 10;
      "
    >
      Hola Sergio
    </div>
    <div class="row q-col-gutter-md" style="max-width: 1024px; width: 100%;">
      <!-- Card de bienvenida -->
      <div class="col-12">
        <q-card
          flat
          class="q-pa-lg bg-primary"
          style="border-radius: 20px;"
        >
          <div class="text-h6 text-white q-mb-sm text-center">
            Te damos la bienvenida al
          </div>
          <div class="text-h4 text-weight-bold text-white text-center">
            Portal de Gestión de Proveedores
          </div>
          <div class="text-h6 text-white q-mt-sm text-center">
            Soluciones que generan valor
          </div>
        </q-card>
      </div>

      <!-- Card: Accesos rápidos -->
      <div class="col-12 col-sm-12 col-md-6">
        <q-card
          flat
          class="q-pa-lg"
          style="border-radius: 20px; min-height: 270px"
        >
          <div class="text-h6 q-mb-sm">
            Accesos rápidos
          </div>
          <div class="q-mb-md flex items-start">
            <q-icon name="settings" size="24px" class="q-mr-md" />
            <div>
              <div class="text-subtitle1"><b>Configuración Empresarial</b></div>
              <div class="text-body2 text-grey-6">
                Administra la estructura organizacional
              </div>
            </div>
          </div>
          <div class="q-mb-md flex items-start">
            <q-icon name="business_center" size="24px" class="q-mr-md" />
            <div>
              <div class="text-subtitle1"><b>Gestión de Proveedores</b></div>
              <div class="text-body2 text-grey-6">
                Controla tus socios comerciales
              </div>
            </div>
          </div>
          <div class="flex items-start">
            <q-icon name="description" size="24px" class="q-mr-md" />
            <div>
              <div class="text-subtitle1"><b>Portal de Proveedores</b></div>
              <div class="text-body2 text-grey-6">
                Interfaz para proveedores, facturas
              </div>
            </div>
          </div>
        </q-card>
      </div>

      <!-- Card: Otras tareas -->
      <div class="col-12 col-sm-12 col-md-6">
        <q-card
          flat
          class="q-pa-lg q-mb-xl"
          style="border-radius: 20px; min-height: 270px;"
        >
          <div class="text-h6 q-mb-sm">
            Otras tareas
          </div>
          <ul class="q-pl-md q-mb-none">
            <li class="text-subtitle1 q-mb-sm">
              <b>Gestionar acceso de Proveedor</b>
            </li>
            <li class="text-subtitle1 q-mb-sm">
              <b>Autorizaciones</b>
            </li>
            <li class="text-subtitle1">
              <b>Soporte</b>
            </li>
          </ul>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script seutp>
</script>
