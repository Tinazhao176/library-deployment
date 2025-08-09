<template>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h1 class="mb-1">Firebase Login</h1>
          </div>
          <div class="card-body">
            <form @submit.prevent="signin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                />
              </div>
              <div v-if="loginError" class="alert alert-danger">
                {{ loginError }}
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const loginError = ref('');
const router = useRouter();
const authStore = useAuthStore();
const auth = getAuth();

const signin = () => {
  loginError.value = '';
  
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log('Firebase Login Successful!', userCredential.user);
      
      
      authStore.login(userCredential.user);
      
    
      const redirect = router.currentRoute.value.query.redirect || '/';
      router.push(redirect);
    })
    .catch((err) => {
      console.error('error:', err.code, err.message);
      switch (err.code) {
        case 'auth/user-not-found':
          loginError.value = 'user not exist';
          break;
        case 'auth/wrong-password':
          loginError.value = 'password error';
          break;
        case 'auth/invalid-email':
          loginError.value = 'invalid email format';
          break;
        default:
          loginError.value = `login failure: ${err.message}`;
      }
    });
};
</script>
