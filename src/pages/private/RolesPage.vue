<template>
  <q-page class="q-pa-md column no-wrap">
    <app-breadcrumbs/>
    <div class="text-h6">Roles</div>
    <q-card
      flat
      class="row q-pa-md q-mt-sm"
      v-if="userLogged.companyType == COMPANY_TYPE.XTENDIT"
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
        :pagination="initialPagination"
        :rows="roles"
        color="secondary"
        flat
        row-key="id"
        class="col"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-toggle
              @update:model-value="val => setRoleStatus(val, props.row)"
              :model-value="props.row.isActive"
              color="secondary"
              size="sm"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn @click="getRole(props.row.id)"
              color="grey-7"
              dense
              flat
              icon="edit"
            />
            <q-btn @click="configurePermissions(props.row)"
              color="grey-7"
              dense
              flat
              icon="settings"
              class="q-ml-sm"
            />
            <q-btn @click="removeRole(props.row)"
              color="grey-7"
              dense
              flat
              icon="delete"
              class="q-ml-sm"
            />
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

//composables
import useAuth from 'src/core/composables/auth/useAuth';

//constants
import { COMPANY_TYPE } from 'src/core/constants/company-type';

const {
  userLogged
} = useAuth()

const {
  roleType,
  roles,
  getRoles,
  getRole,
  addRole,
  configurePermissions,
  setRoleStatus,
  removeRole
} = useRole();

const initialPagination = {
  rowsPerPage: 10,
};

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
