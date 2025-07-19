<template>
  <q-page class="q-pa-md">
    <AppBreadcrumbs />
    <div class="text-h6 q-mb-md">Configuración Empresarial</div>

    <div style="max-width: 800px">
      <div class="row q-col-gutter-md q-mx-sm justify-start">
        <div
          v-for="item in configurationItems"
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
              <div class="text-subtitle1 text-bold q-mb-md self-start">
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
import { computed } from 'vue';
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
import useAuth from 'src/core/composables/auth/useAuth';
import { useRouter } from 'vue-router'

const { filteredMenu } = useAuth();
const router = useRouter()

const goTo = (to) => {
  if (to) router.push(to)
}

const configurationItems = computed(() => {
  const configuration = filteredMenu.find(item => item.name?.toLowerCase() === 'configuration');
  if (!configuration || !configuration.children) return [];

  return configuration.children;
});

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
