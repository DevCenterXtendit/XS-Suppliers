<template>
  <q-page class="q-pa-md column no-wrap">
    <AppBreadcrumbs />
    <div class="text-h6">Configuración de campos</div>

    <q-card flat class="row q-pa-md q-mt-sm">
      <div class="col-8 col-sm-6 col-md-4">
        <q-select
          v-model="currentCustomer"
          @update:model-value="onSelectedCustomer"
          :options="customers"
          dense
          label="Seleccione Cliente"
          map-options
          outlined
          option-label="name"
        />
      </div>

      <div class="col-4 col-sm-6 col-md-8 flex justify-end">
        <q-btn
          @click="handleSave"
          unelevated no-caps
          color="primary"
          icon-right="save"
          label="Guardar"
        />
      </div>
    </q-card>

    <q-card flat class="q-pa-md q-my-md">
      <div class="row q-col-gutter-md">
        <div v-for="g in groups" :key="g.type" class="col-12">
          <q-card flat bordered class="q-pa-sm">
            <div class="row items-center justify-between q-mb-sm">
              <div class="text-subtitle2">{{ g.type }}</div>
            </div>

            <div class="row q-col-gutter-sm">
              <div v-for="field in g.items" :key="field.id" class="col-12 col-md-6 col-lg-4">
                <q-item dense class="q-pl-none q-pr-lg">
                  <q-item-section>
                    <q-item-label class="text-caption">{{ field.text }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <div class="flex items-center text-caption">
                      <q-toggle 
                        v-model="field.isVisible"
                        @update:model-value="onVisibleChange(field)"
                        size="xs" 
                        label="Ver" 
                        left-label
                      />
                      <q-toggle :disable="!field.isVisible" v-model="field.isRequired" size="xs" label="Req."  left-label/>
                    </div>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </q-card>

  </q-page>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import useSupplierFieldConfiguration from 'src/core/composables/supplierFieldConfiguration/useSupplierFieldConfiguration';
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';

const {
  customers,
  currentCustomer,
  supplierFields,
  getCustomers,
  getSupplierFields,
  getSupplierFieldsByCustomer,
  handleSave
} = useSupplierFieldConfiguration();

const onSelectedCustomer = async () => {
  await getSupplierFieldsByCustomer();
}

const groups = computed(() => {
  const map = new Map();
  (supplierFields.value ?? []).forEach(f => {
    const key = (f.fieldType || 'Otros').trim();
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(f);
  });
  return [...map.entries()]
    .sort(([a],[b]) => a.localeCompare(b))
    .map(([type, items]) => ({ type, items }));
});

const onVisibleChange = (field) => {
  if (!field.isVisible) {
    field.isRequired = false
  }
}

onMounted(async() => {
  await getCustomers();
  await getSupplierFields();
})

</script>
