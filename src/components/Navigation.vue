<template>
  <nav class="navbar navbar-expand-lg" :class="navClass">
    <div class="container">
      <router-link class="navbar-brand fw-bold d-flex align-items-center" to="/" :class="textClass">
        <i class="bi bi-house-door-fill me-2"></i>
        {{ brandName }}
      </router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item mx-2" v-for="item in menuItems" :key="item.name">
            <router-link class="nav-link d-flex align-items-center" :to="item.path" :class="textClass">
              <i :class="item.icon" class="me-1"></i>
              {{ item.name }}
            </router-link>
          </li>
        </ul>
        
        <div class="d-flex align-items-center" v-if="showStats">
          <div class="rounded-pill px-3 py-1" :class="statsClass">
            <small>
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
import { computed } from 'vue' // ADD THIS IMPORT

// Define props with configuration
const props = defineProps({
  variant: {
    type: String,
    default: 'light' // 'light' or 'dark'
  },
  brandName: {
    type: String,
    default: 'PropertyRental Pro'
  },
  showStats: {
    type: Boolean,
    default: true
  },
  menuItems: {
    type: Array,
    default: () => [
      { name: 'Dashboard', path: '/dashboard', icon: 'bi bi-speedometer2' },
      { name: 'Properties', path: '/properties', icon: 'bi bi-building' },
      { name: 'Add Property', path: '/properties/add', icon: 'bi bi-plus-circle' }
    ]
  }
})

// Computed properties for dynamic classes
const navClass = computed(() => ({
  'navbar-light bg-white shadow-sm': props.variant === 'light',
  'navbar-dark bg-primary': props.variant === 'dark'
}))

const textClass = computed(() => ({
  'text-dark': props.variant === 'light',
  'text-white': props.variant === 'dark'
}))

const statsClass = computed(() => ({
  'bg-light text-dark': props.variant === 'light',
  'bg-white text-primary': props.variant === 'dark'
}))

const propertyCount = computed(() => {
  const properties = JSON.parse(localStorage.getItem('properties') || '[]')
  return properties.length
})
</script>

<style scoped>
.nav-link {
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem !important;
}

.nav-link:hover, .nav-link.router-link-active {
  background-color: rgba(13, 110, 253, 0.1);
}
</style>