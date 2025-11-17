<!-- src/components/NavBar.vue -->

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container-full">
      <router-link class="navbar-brand fw-bold text-primary" to="/">
        <i class="bi bi-house-door-fill me-2"></i>
        PropertyRental Pro
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-2">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link" to="/properties">Properties</router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link" to="/properties/add">Add Property</router-link>
          </li>
        </ul>

        <!-- Property Count Display -->
        <div class="ms-4">
          <div class="bg-light rounded-pill px-3 py-2">
            <small class="text-muted">
              <i class="bi bi-building me-1"></i>
              {{ propertyCount }} Properties
            </small>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

// Computed property for property count
const propertyCount = computed(() => {
  const properties = JSON.parse(localStorage.getItem('properties') || '[]')
  return properties.length
})
</script>

<style scoped>
.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: #e7f1ff;
  color: #0d6efd !important;
  font-weight: 600;
}
</style>
