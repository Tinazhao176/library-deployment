import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    currentUser: null
  }),
  actions: {
    login(user) {
      this.isAuthenticated = true;
      this.currentUser = user;
    },
    logout() {
      const auth = getAuth();
      return signOut(auth).then(() => {
        this.isAuthenticated = false;
        this.currentUser = null;
      });
    },
    init() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.login(user);
        } else {
          this.isAuthenticated = false;
          this.currentUser = null;
        }
      });
    }
  }
});