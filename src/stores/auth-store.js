// stores/auth.js
import { defineStore } from 'pinia';
import { storageService } from '../core/services/storageService';
import { KEYS } from '../core/constants/storageKeys';


export const useAuthStore = defineStore('authStore', {
  state: () => ({
    userLogged: storageService.getItem(KEYS.user),
    token : storageService.getItem(KEYS.token)
  }),
  getters: {
    isLoggedIn: (state) => !!state.userLogged && !!state.token,
  },
  actions: {
    login(userLogged, token) {
      this.userLogged = userLogged;
      this.token = token;

      storageService.setItem( KEYS.user, userLogged)
      storageService.setItem( KEYS.token, token);
    },
    logOut() {
      this.userLogged = null;
      this.token = null;

      storageService.removeItem(KEYS.user);
      storageService.removeItem(KEYS.token);
      storageService.removeItem(KEYS.theme);
    }
  },
});
