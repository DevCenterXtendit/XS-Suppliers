<template>
  <q-breadcrumbs class="q-mb-md">
    <template v-for="(crumb, i) in breadcrumbs" :key="i">
      <q-breadcrumbs-el
        v-if="crumb.to && i < breadcrumbs.length - 1"
        :label="crumb.label"
        :icon="crumb.icon"
        :to="crumb.to"
        :exact="crumb.exact"
        clickable
      />
      <q-breadcrumbs-el
        v-else
        :label="crumb.label"
        :icon="crumb.icon"
        :class="crumb.class"
      />
    </template>
  </q-breadcrumbs>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Opcional: mapa de rutas a nombres amigables e iconos
const breadcrumbLabels = {
  '':      { label: 'Home', icon: 'home' }
}

const route = useRoute();

const breadcrumbs = computed(() => {
  // Divide el path y filtra vacíos
  console.log('aquí inicia el filtrado de paths');
  const paths = route.path.split('/').filter(Boolean)
  let acc = ''
  return paths.map((segment, idx) => {
    acc += '/' + segment
    const meta = breadcrumbLabels[segment] || { label: segment }
    return {
      label: meta.label || segment,
      icon: meta.icon,
      to: idx < paths.length - 1 ? acc : undefined, // definimos el ultimo como lable
      exact: true
    }
  }).length
    ? [
        // Agregar inicio
        {
          label: breadcrumbLabels[''].label,
          icon: breadcrumbLabels[''].icon,
          to: '/',
          exact: true
        },
        ...paths.map((segment, idx) => {
          acc = '/' + paths.slice(0, idx + 1).join('/')
          const meta = breadcrumbLabels[segment] || { label: segment }
          return {
            label: meta.label || segment,
            icon: meta.icon,
            to: idx < paths.length - 1 ? acc : undefined,
            exact: true
          }
        })
      ]
    : [
        {
          label: breadcrumbLabels[''].label,
          icon: breadcrumbLabels[''].icon
        }
      ]
})
</script>
