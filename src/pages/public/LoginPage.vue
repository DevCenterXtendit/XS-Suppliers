<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card
          flat
          class="q-pa-lg"
          style="min-width: 350px; max-width: 420px; width: 100%;"
        >

          <div class="flex flex-center q-mb-md">
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
              type="text"
              label="Correo"
              dense
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              v-model="auth.password"
              :rules="authRules.password"
              type="password"
              label="Contraseña"
              dense
              outlined
              autocomplete="new-password"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <div class="row items-center q-mt-md">
              <div class="col-12 col-sm-6">
                <q-btn
                  color="primary"
                  label="Iniciar"
                  size="md"
                  type="submit"
                  unelevated
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import useAuth from 'src/core/composables/auth/useAuth';
import useAuthValidation from 'src/core/composables/auth/useAuthValidation';

//logos
import logoLight from 'src/assets/logo-xtendit.png'
import logoDark from 'src/assets/logo-xtendit-white.png'

const { auth, handleLogin } = useAuth();
const { authRules } = useAuthValidation();

</script>
