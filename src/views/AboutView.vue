<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">
          <h1 class="mb-1">About Our Library</h1>
          <p class="mb-0 text-success" v-if="isAuthenticated">
            Welcome, member! You have full access.
          </p>
        </div>
        <div class="card-body">
          <p>
            Welcome to our digital library! We're dedicated to providing a vast collection of books and 
            resources to our community.
          </p>
          
          <div v-if="isAuthenticated">
            <h2 class="h4 mt-4">Members Only Content</h2>
            <p>
              As a registered member, you have access to our exclusive collection of rare books and 
              special resources.
            </p>
            <ul>
              <li>Rare book collection</li>
              <li>Premium research databases</li>
              <li>Exclusive member events</li>
              <li>24/7 virtual librarian assistance</li>
            </ul>
          </div>
          
          <div v-else class="alert alert-info mt-4">
            <p>To access all features, please <router-link to="/login">login</router-link>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
</script>