<!-- <template>
  <div class="window-height">
    <div class="full-height flex flex-center">
      <q-card
        flat
        class="q-pa-lg"
        style="min-width: 350px; max-width: 420px; width: 100%;"
      >

        <div class="flex flex-center q-mb-md non-selectable">
          <q-img
            :src="$q.dark.isActive ? logoDark : logoLight"
            style="max-width: 200px; max-height: 80px;"
            contain
            spinner-color="primary"
          />
        </div>

        <div class="text-h5 text-bold q-mb-lg">
          Iniciar sesión
        </div>

        <q-form @submit.prevent="handleLogin" class="q-gutter-sm">
          <q-input
            v-model="auth.email"
            :rules="authRules.email"
            dense
            type="text"
            label="Correo"
            no-error-icon=""
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            v-model="auth.password"
            :rules="authRules.password"
            :type="isPasswordVisible ? 'text' : 'password'"
            dense
            label="Contraseña"
            no-error-icon
            outlined
            autocomplete="new-password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                @click="isPasswordVisible = !isPasswordVisible"
                :name="isPasswordVisible ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                />
            </template>
          </q-input>

          <div class="row items-center q-mt-lg">
            <div class="col-12 col-sm-6">
              <q-btn
                color="primary"
                label="Iniciar"
                size="md"
                type="submit"
                unelevated
                icon-right="login"
              />
            </div>
            <div class="col-12 col-sm-6 flex justify-end">
              <q-btn
                flat
                label="¿Olvidaste tu contraseña?"
                class="text-orange-8"
                no-caps
                padding="none"
              />
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template> -->

<template>
  <!-- Alto de ventana y grid responsive -->
  <div class="window-height row items-stretch">

    <!-- Columna izquierda (solo md+). Oculta en pantallas pequeñas -->
    <div class="col-7 q-pa-xl q-hidden-sm-and-down flex flex-center">
      <q-img
        :src="supplierImage"
        style="max-width: 500px; width: 100%;"
        contain
        spinner-color="primary"
        class="non-selectable"
      />
    </div>

    <!-- Columna derecha: el formulario siempre visible -->
    <div class="col-12 col-md-5 q-pa-lg flex flex-center">
      <q-card flat class="q-pa-lg" style="min-width:350px; max-width:420px; width:100%;">
        <div class="flex flex-center q-mb-md non-selectable">
          <q-img
            :src="$q.dark.isActive ? logoDark : logoLight"
            style="max-width:200px; max-height:80px;"
            contain
            spinner-color="primary"
          />
        </div>

        <div class="text-h5 text-bold q-mb-lg">Iniciar sesión</div>

        <q-form @submit.prevent="handleLogin" class="q-gutter-sm">
          <q-input
            v-model="auth.email"
            :rules="authRules.email"
            dense
            type="text"
            label="Correo"
            no-error-icon
            outlined
          >
            <template #prepend><q-icon name="person" /></template>
          </q-input>

          <q-input
            v-model="auth.password"
            :rules="authRules.password"
            :type="isPasswordVisible ? 'text' : 'password'"
            dense
            label="Contraseña"
            no-error-icon
            outlined
            autocomplete="new-password"
          >
            <template #prepend><q-icon name="lock" /></template>
            <template #append>
              <q-icon
                class="cursor-pointer"
                :name="isPasswordVisible ? 'visibility' : 'visibility_off'"
                @click="isPasswordVisible = !isPasswordVisible"
              />
            </template>
          </q-input>

          <div class="row items-center q-mt-lg">
            <div class="col-12 col-sm-6">
              <q-btn
                color="primary"
                label="Iniciar"
                size="md"
                type="submit"
                unelevated
                icon-right="login"
              />
            </div>
            <div class="col-12 col-sm-6 flex justify-end">
              <q-btn flat no-caps padding="none" class="text-orange-8" label="¿Olvidaste tu contraseña?" />
            </div>
          </div>
        </q-form>
      </q-card>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import useAuth from 'src/core/composables/auth/useAuth';
import useAuthValidation from 'src/core/composables/auth/useAuthValidation';

//logos
import logoLight from 'src/assets/logo-xtendit.png';
import logoDark from 'src/assets/logo-xtendit-white.png';
import supplierImage from 'src/assets/supplier.png';

const { auth, handleLogin } = useAuth();
const { authRules } = useAuthValidation();

const isPasswordVisible = ref(false);

</script>
