<template>
  <dialog-form v-model="openUserForm" :width="650">
    <template #header>
      {{ `${user.id > 0 ? "Editar" : "Agregar"} Usuario` }}
    </template>
    <template #content>
      <q-form id="customerForm" @submit.prevent="handleSaveUser">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-12 col-md-12">
            <q-input
              v-model="user.name"
              :rules="userRules.name"
              dense
              label="Nombre(s)"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-md-6">
            <q-input
              v-model="user.middleName"
              :rules="userRules.middleName"
              dense
              label="Apellido Paterno"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-md-6">
            <q-input
              v-model="user.lastName"
              :rules="userRules.lastName"
              dense
              label="Apellido Materno"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-12 col-md-12">
            <q-input
              v-model="user.email"
              :rules="userRules.email"
              dense
              label="Email"
              outlined
            >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
            </q-input>
          </div>

          <div v-if="companyType?.name != COMPANY_TYPE.XTENDIT
                    && userLogged.companyType == COMPANY_TYPE.XTENDIT"
            class="col-12 col-sm-6 col-md-6">
            <q-select
              v-model="customerId"
              @update:model-value="onSelectedCustomer"
              :options="customers"
              :rules="userRules.companyId"
              dense
              emit-value
              label="Seleccione cliente"
              map-options
              outlined
              option-label="name"
              option-value="id"
            >
              <template v-slot:prepend>
                <q-icon name="business" />
              </template>
            </q-select>
          </div>
          <!--filtro para proveedores solamente-->
          <div v-if="companyType?.name != COMPANY_TYPE.XTENDIT
            && userLogged.companyType == COMPANY_TYPE.XTENDIT
            && companyType?.name == COMPANY_TYPE.SUPPLIER"
            class="col-12 col-sm-6 col-md-6">
            <q-select
              v-model="supplierId"
              :disable ="!customerId"
              :options="suppliers"
              :rules="userRules.supplierId"
              dense
              emit-value
              label="Seleccione proveedor"
              map-options
              outlined
              option-label="name"
              option-value="id"
            >
              <template v-slot:prepend>
                <q-icon name="business" />
              </template>
            </q-select>
          </div>
          <div class="col-12 col-sm-12 col-md-12">
            <q-select
              v-model="user.roleIds"
              :options="roles"
              :rules="userRules.roleIds"
              multiple
              emit-value
              map-options
              outlined
              label="Seleccione roles"
              option-label="name"
              option-value="id"
              dense
              use-chips
            >
              <template v-slot:prepend>
                <q-icon name="groups" />
              </template>
            </q-select>
          </div>
        </div>
      </q-form>
    </template>
    <template #actions>
      <q-btn unelevated no-caps
        color="primary"
        form="customerForm"
        label="Guardar"
        type="submit"
      />
    </template>
  </dialog-form>
</template>

<script setup>
import DialogForm from '../common/DialogForm.vue';
import useUser from 'src/core/composables/user/useUser';
import useAuth from 'src/core/composables/auth/useAuth';
import useUserValidation from 'src/core/composables/user/useUserValidation';

import { COMPANY_TYPE } from 'src/core/constants/company-type';

const {
  companyType,
  user,
  customers,
  suppliers,
  roles,
  openUserForm,
  customerId,
  supplierId,
  getSuppliers,
  handleSaveUser
} = useUser();

const {
  userLogged
} = useAuth()

const { userRules } = useUserValidation(companyType, userLogged);

const onSelectedCustomer = async (customerId) => {
  if (companyType.value?.name !== COMPANY_TYPE.SUPPLIER) return;
  await getSuppliers(customerId);
};

</script>
