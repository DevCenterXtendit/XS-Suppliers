<template>
  <div class="row q-col-gutter-sm">
    <div class="col-4">
      <q-input
        v-model="addressFromFather.postalCode"
        @update:model-value="onTypedPostalCode"
        :rules="addressRules.postalCode"
        dense
        label="Código postal*"
        maxlength="5"
        no-error-icon
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="location_on" />
        </template>
      </q-input>
    </div>
    <div class="col-8">
      <q-select
        v-model="addressFromFather.neighborhoodId"
        :disable="neighborhoods.length == 0"
        :options="neighborhoods"
        :rules="addressRules.neighborhoodId"
        dense
        emit-value
        label="Seleccione Colonia*"
        map-options
        option-label="name"
        option-value="id"
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="maps_home_work" />
        </template>
      </q-select>
    </div>
    <div class="col-12 col-sm-6">
      <q-input
        v-model="address.state"
        dense
        disable
        hint
        label="Estado"
        outlined
      >
      </q-input>
    </div>
    <div class="col-12 col-sm-6">
      <q-input
        v-model="address.municipality"
        dense
        disable
        hint
        label="Municipio"
        outlined
      >
      </q-input>
    </div>
    <div class="col-12">
      <q-input
        v-model="addressFromFather.street"
        :rules="addressRules.street"
        dense
        label="Calle*"
        no-error-icon
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="directions" />
        </template>
      </q-input>
    </div>
    <div class="col-6">
      <q-input
        v-model="addressFromFather.exteriorNumber"
        :rules="addressRules.exteriorNumber"
        dense
        label="Número exterior*"
        maxlength="8"
        no-error-icon
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="numbers" />
        </template>
      </q-input>
    </div>
    <div class="col-6">
      <q-input
        v-model="addressFromFather.interiorNumber"
        :rules="addressRules.interiorNumber"
        dense
        label="Numero interior"
        maxlength="8"
        no-error-icon
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="numbers" />
        </template>
      </q-input>
    </div>

    <div class="col-12 flex">
      <q-chip v-if="noAddressesFound"
        dense
        square color="negative"
        text-color="white"
        icon="place"
        label="No se encontraron colonias con el código postal"
        class="self-center"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import useAddress from 'src/core/composables/address/useAddress';
import useAddressValidation from 'src/core/composables/address/useAddressValidation';

const {
  address,
  neighborhoods,
  noAddressesFound,
  getAddressesByPostalCode
} = useAddress();

const {
  addressRules
} = useAddressValidation();

const addressFromFather = defineModel('address', {
  required: true,
  default: {
    postalCode: null,
    street: '',
    exteriorNumber: '',
    interiorNumber: null,
    neighborhoodId : '',
  }
})

const onTypedPostalCode = (value) => {
  if (value.length == 5) {
    getAddressesByPostalCode(value);
  }
}

onMounted(() => {
  if(addressFromFather.value.postalCode != null){
    getAddressesByPostalCode(addressFromFather.value.postalCode);
  }
})

</script>
