<template>
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item">
          <router-link 
            to="/about" 
            class="nav-link" 
            active-class="active"
          >
            About
            <span v-if="!isAuthenticated" class="ms-1" title="Login required">🔒</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        
        <li class="nav-item" v-else>
          <a href="#" class="nav-link" @click.prevent="handleLogout">Logout</a>
        </li>
        <li class="nav-item">
          <router-link to="/add-book" class="nav-link" active-class="active">
            Add Book
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">
            Firebase Register
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">
            Firebase Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">
            Count Book API
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">
            Get Weather
          </router-link>
        </li>
        
      </ul>
    </header>
  </template>
  
  <script setup>
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia'; 
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  const { isAuthenticated, currentUser } = storeToRefs(authStore);
  
  const handleLogout = async () => {
    try {
      await authStore.logout();
      router.push('/');
    } catch (error) {
      console.error('登出失败:', error);
    }
  };
  </script>