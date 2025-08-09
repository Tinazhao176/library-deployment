<template>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h1 class="mb-1">Firebase Registration</h1>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
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
              <div v-if="error" class="alert alert-danger">
                {{ error }}
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();
  const auth = getAuth();
  
  const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        console.log('Firebase Register Successful!');
        router.push('/FireLogin');
      })
      .catch((err) => {
       
        switch (err.code) {
          case 'auth/email-already-in-use':
            error.value = 'Email address is already in use.';
            break;
          case 'auth/invalid-email':
            error.value = 'Email address is invalid.';
            break;
          case 'auth/weak-password':
            error.value = 'Password should be at least 6 characters.';
            break;
          default:
            error.value = err.message;
        }
        console.error('Registration error:', err.code);
      });
  };
  </script>
  
  <style scoped>
  .card {
    margin-top: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .card-header {
    background-color: #0d6efd;
    color: white;
    border-radius: 10px 10px 0 0 !important;
  }
  .form-label {
    font-weight: 500;
  }
  .btn-primary {
    background-color: #0d6efd;
    border-color: #0d6efd;
    padding: 8px 20px;
    font-weight: 500;
  }
  </style>