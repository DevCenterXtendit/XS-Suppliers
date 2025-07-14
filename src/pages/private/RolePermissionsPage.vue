<template>
  <q-page class="q-pa-md">
   <div class="row items-center q-mb-md">
      <div class="col">
        <div class="text-h6">
          Permisos de rol {{ roleName }}
        </div>
      </div>
      <div class="col-auto">
        <q-btn
          @click="router.go(-1)"
          color="secondary"
          dense
          icon="arrow_back"
          round
          size="sm"
          unelevated
        />
      </div>
    </div>
    <q-card flat class="q-pa-md q-mt-md">
      <!-- Checkbox "Marcar todos" -->
      <div class="row justify-end items-center">
        <q-checkbox
          @update:model-value="toggleAllPermissions"
          v-model="allChecked"
          color="primary"
          label="Marcar todos"
          size="sm"
          class="text-caption"
        />
      </div>
      <!--PERMISOS-->
      <div v-for="(module, idx) in modules" :key="idx"
        class="q-my-sm">
        <div class="q-pa-sm">
          <q-icon
            :name="module.icon"
            color="primary"
            size="sm"
            class="q-mr-sm"
          />
          <label class="text-weight-bold text-caption">{{ module.text }}</label>
        </div>
        <div class="row q-my-xs q-px-lg">
          <div
            v-for="perm in module.permissions"
            :key="perm.id"
            class="col-6 col-sm-4 col-md-2 col-lg-2 col-xl-2"
          >
            <div class="flex items-center q-pa-xs">
              <q-checkbox
                v-model="perm.enabled"
                size="sm"
              />
              <div class="text-caption">
                {{ perm.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          @click="updatePermissionsByRole(roleId)"
          unelevated no-caps
          color="primary"
          form="customerForm"
          icon-right="save"
          label="Guardar"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter} from 'vue-router';

import useRolePermission from 'src/core/composables/role/useRolePermission';

const route = useRoute();
const router = useRouter();

const roleId = Number(route.params.id);
const roleName = route.query.roleName;

const {
  modules,
  getModules,
  getPermissionsByRole,
  updatePermissionsByRole
} = useRolePermission();

const allChecked = ref(false);

function toggleAllPermissions(val) {
  modules.value.forEach(module => {
    module.permissions.forEach(perm => {
      perm.enabled = val
    })
  })
}

onMounted(async () => {
  await getModules();
  await getPermissionsByRole(roleId);
})

</script>
