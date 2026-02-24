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
  <div class="window-height bg-white">
    <div class="row full-height">
      <div class="gt-sm col-md-8 col-lg-8 flex flex-center bg-grey-3">
        <q-img
          :src="supplierImage"
          contain
          spinner-color="primary"
          style="max-width: 600px; max-height: 80vh;"
        />
      </div>
      <div class="col-12 col-md-4 col-lg-4 flex flex-center bg-grey-2">
        <q-card
          flat
          no-shadow
          class="q-pa-lg full-width bg-grey-2"
          style="max-width: 500px;"
        >
          <q-card-section>
            <div class="q-mb-md flex flex-center non-selectable">
              <q-img
                :src="logoLight"
                style="max-width: 160px;"
                contain
                spinner-color="primary"
              />
            </div>

            <div class="text-h5 text-weight-medium text-grey-9 q-py-xs">
              ¡Bienvenido!
            </div>
            <div class="text-body2 text-grey-7">
              Inicia sesión en tu cuenta y comienza a optimizar
            </div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="handleLogin">
              <div class="q-col-gutter-md">
                <q-input
                  v-model="auth.email"
                  :rules="authRules.email"
                  dense
                  type="text"
                  label="Correo o Usuario"
                  placeholder="Ingresa tu correo o usuario"
                  no-error-icon
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
                  placeholder="Ingresa tu contraseña"
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
              </div>

              <div class="flex justify-end q-my-md">
                <q-btn
                  flat
                  label="¿Olvidaste tu contraseña?"
                  class="text-primary"
                  no-caps
                  padding="none"
                  dense
                />
              </div>

              <q-btn
                color="primary"
                label="INICIAR SESIÓN"
                size="md"
                type="submit"
                unelevated
                class="full-width"
              />

              <div class="text-center q-mt-md">
                <span class="text-caption text-grey-6">¿Nuevo en nuestra plataforma? </span>
                <q-btn
                  flat
                  label="Crear una cuenta"
                  class="text-primary"
                  no-caps
                  padding="none"
                  dense
                />
              </div>

              <div class="row items-center q-my-md">
                <div class="col">
                  <q-separator />
                </div>
                <div class="col-auto q-px-md text-grey-6">
                  o
                </div>
                <div class="col">
                  <q-separator />
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useAuth from 'src/core/composables/auth/useAuth';
import useAuthValidation from 'src/core/composables/auth/useAuthValidation';

//logos
import logoLight from 'src/assets/logo-xtendit.png';
import supplierImage from 'src/assets/cover.svg';

const { auth, handleLogin } = useAuth();
const { authRules } = useAuthValidation();

const isPasswordVisible = ref(false);

</script>
