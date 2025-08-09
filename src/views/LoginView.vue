<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h1 class="mb-1">Library Login</h1>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="credentials.username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="credentials.password"
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
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const credentials = ref({
  username: '',
  password: ''
});

const loginError = ref('');

const handleLogin = () => {
  if (credentials.value.username === 'admin' && credentials.value.password === 'password') {
    authStore.login();
    
    
    const redirect = router.currentRoute.value.query.redirect || '/';
    router.push(redirect);
  } else {
    loginError.value = 'Invalid username or password';
  }
};
</script>