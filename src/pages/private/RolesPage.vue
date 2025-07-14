<template>
  <q-page class="q-pa-md column no-wrap">
    <app-breadcrumbs/>
    <div class="text-h6">Roles</div>
    <q-card
      flat
      class="row q-pa-md q-mt-md"
    >
      <div class="col-12 col-sm-6 col-md-4">
        <q-select
            v-model="roleType"
            @update:model-value="getRoles"
            :options="roleTypeList"
            dense
            label="Seleccione tipo de rol"
            map-options
            outlined
            option-label="name"
          >
        </q-select>
      </div>
    </q-card>
    <q-card
      flat
      class="row q-pa-md q-my-md"
    >
      <div class="col-4 col-sm-6">
        <q-btn
          @click="addRole"
          :disable="roleType==null"
          color="primary"
          icon="add_circle_outline"
          label="Añadir"
          no-caps
          unelevated
        />
      </div>
      <div class="col-8 col-sm-6">
        <q-input
          dense
          clearable
          outlined
          placeholder="Buscar"
          v-model="filter"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </q-card>
    <q-card
      flat
      class="col column no-wrap q-px-sm"
    >
      <q-table
        :columns="columns"
        :filter="filter"
        :rows="roles"
        color="secondary"
        flat
        row-key="id"
        class="col"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-toggle
              v-model="props.row.isActive"
              color="secondary"
              size="sm"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense
              flat
              color="grey-7"
              icon="edit"
              @click="getRole(props.row.id)"
            >
            </q-btn>
              <q-btn dense
              flat
              color="grey-7"
              class="q-ml-sm"
              icon="settings"
              @click="configurePermissions(props.row)"
            >
            </q-btn>
            <q-btn dense
              flat
              color="grey-7"
              class="q-ml-sm"
              icon="delete"
            >
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
  <role-form/>
</template>

<script setup>
import { ref } from 'vue';
import roleTypeList from 'src/core/constants/role-type-list';
import useRole from 'src/core/composables/role/useRole';
import { onBeforeRouteLeave } from 'vue-router';

//componenents
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
import roleForm from 'src/components/role/roleForm.vue';

const {
  getRoles,
  getRole,
  addRole,
  configurePermissions,
  roleType,
  roles
} = useRole();

const filter = ref('');

const columns = [
  { name: 'name', label: 'NOMBRE', align: 'left', field: 'name'},
  { name: 'description', label: 'DESCRIPCION', align: 'left', field: 'description'},
  { name: 'status', label: 'ESTATUS', align: "center", field: 'isActive' },
  { name: 'actions', label: 'ACCIONES', align: 'center' , field: 'actions'},
]

onBeforeRouteLeave((to, from, next) => {
  console.log(to.name);
  if (to.name !== 'rolePermissions') {
    roleType.value = null
    roles.value = []
  }
  next()
})

</script>
