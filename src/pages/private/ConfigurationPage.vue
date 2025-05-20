<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">Configuración Empresarial</div>

    <div style="max-width: 800px">
      <div class="row q-col-gutter-md justify-start">
        <div
          v-for="item in items"
          :key="item.label"
          class="col-12 col-sm-6"
        >
          <q-card
            @click="goTo(item.to)"
            flat
            bordered
            class="bg-primary text-white cursor-pointer q-pa-md rounded-borders"
            style="height: 200px;"
          >
            <div class="column full-height flex flex-center">
              <div class="text-subtitle1 text-bold q-mb-md">
                {{ item.label }}
              </div>
              <q-icon :name="item.icon" size="85px" class="q-my-auto" />
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = (to) => {
  if (to) router.push(to)
}

const items = [
  {
    label: 'Estructura de Empresa',
    icon: 'apartment',
    to: '/configuration/company-structure'
  },
  {
    label: 'Configuración de campos',
    icon: 'list_alt',
    to: '/configuration/fields'
  },
  {
    label: 'Usuarios',
    icon: 'manage_accounts',
    to: '/configuration/users'
  }
]
</script>

<style scoped>
.rounded-borders {
  border-radius: 24px;
  transition: transform 0.2s ease;
}
.rounded-borders:hover {
  transform: scale(1.03);
}
</style>
