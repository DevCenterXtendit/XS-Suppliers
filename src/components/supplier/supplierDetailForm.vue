<template>
  <dialog-form v-model="openSupplierDetailForm" :width="1000">
    <template #header>
      Campos proveedor
    </template>
    <template #content>
      <q-stepper
        v-model="step"
        animated
        color="primary"
        flat
        ref="stepper"
      >
        <q-step
          v-for="group in groupedFields"
          :icon="group.icon"
          :key="group.id"
          :name="group.id"
          :step="group.order"
          :title="group.text"
        >
          <q-form :ref="el => setFormRef(group.order, el)">
            <div class="row q-col-gutter-sm">
              <div
                v-for="field in group.items"
                :key="field.fieldId"
                class="col-12 col-sm-4 col-md-4"
              >
                <q-input
                  v-model="field.value"
                  :maxlength="field.length"
                  :label="formatLabel(field.text, field.isRequired)"
                  dense
                  outlined
                  :rules="getRulesForField(field)"
                />
              </div>
            </div>
          </q-form>
        </q-step>
        <template v-slot:navigation>
          <div class="row justify-end q-px-md">
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Regresar"
            />
            <q-btn
              @click="onNext"
              color="primary"
              :label="step === groupedFields[groupedFields.length-1].order ? 'Guardar' : 'Continuar'"
            />
          </div>
        </template>
      </q-stepper>
    </template>
  </dialog-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import DialogForm from 'src/components/common/DialogForm.vue';
import useSupplier from 'src/core/composables/supplier/useSupplier';
import supplierFieldTypeList from 'src/core/constants/supplierField-type-list';
import useFieldValidation from 'src/core/composables/supplier/useFieldValidation';

const {
  supplierDetail,
  openSupplierDetailForm,
  setFieldValues,
} = useSupplier();

const {
  getRulesForField
} = useFieldValidation();

const step = ref(1);
const stepper = ref(null);
const formRefs = ref({});

const onNext = async () => {
  if (!currentForm.value) return;

  const valid = await currentForm.value.validate(true);
  if (!valid) return;

  // try {
  //   await setFieldValues();
  //   stepper.value.next();
  // } catch (error) {
  //   console.log('ERROR', error);
  //   return;
  // }

  if(step.value == groupedFields.value[groupedFields.value.length-1].order)
    await setFieldValues();
  else
    stepper.value.next();
};

const formatLabel = (text, isRequired) => {
  return isRequired ? `${text} *` : text;
};

const setFormRef = (order, el) => {
  if (el) formRefs.value[order] = el;
}

const groupedFields = computed(() => {
  const detailList = supplierDetail.value ?? [];

  // Creamos un mapa con cada tipo y sus campos
  const map = new Map();

  detailList.forEach(field => {
    const typeInfo = supplierFieldTypeList.find(t => t.id === field.fieldTypeId);
    const key = typeInfo ? typeInfo.name : 'Otros';

    if (!map.has(key)) {
      map.set(key, {
        id: typeInfo?.id ?? 0,
        name: typeInfo.name ?? 'Otros',
        text: typeInfo?.text ?? 'Otros',
        icon: typeInfo?.icon ?? 'Unknow',
        order: typeInfo?.order ?? 99,
        items: []
      });
    }

    map.get(key).items.push(field);
  });
  // Respetar el order para mejorar la customización
 return Array.from(map.values()).sort((a, b) => a.order - b.order);
});

const currentForm = computed(() => {
  const currentGroup = groupedFields.value.find(g => g.order === step.value)
  if (!currentGroup) return null

  // usar optional chaining y fallback
  return formRefs.value?.[currentGroup.order] ?? null
})


</script>