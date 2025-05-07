<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card v-bind:style="$q.screen.lt.sm ? { 'width': '26rem' } : { 'width': '35rem' }"
          flat class="q-px-xs q-py-md">
          <q-card-section class="text-h6 text-center">
             XS_SUPPLIERS
          </q-card-section>
          <q-card-section>
            <q-form  @submit.prevent="handleLogin" class="q-gutter-md">
              <q-input v-model="auth.email"
                :rules="authRules.email"
                type="text"
                placeholder="Email"
                dense
                >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input v-model="auth.password"
                :rules="authRules.password"
                type="password"
                placeholder="Contraseña"
                dense autocomplete="new-password"
                >
                <template v-slot:prepend>
                  <q-icon name="lock_open" />
                </template>
              </q-input>
              <div class="q-pt-md">
                <q-btn
                  color="primary"
                  label="Iniciar"
                  size="md"
                  type="submit"
                  class="full-width"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import useAuth from 'src/core/composables/auth/useAuth';
import useAuthValidation from 'src/core/composables/auth/useAuthValidation';

const { auth, handleLogin } = useAuth();
const { authRules } = useAuthValidation();

</script>
