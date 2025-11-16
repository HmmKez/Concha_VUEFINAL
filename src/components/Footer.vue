<template>
  <footer :class="footerClass">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5 class="fw-bold" :class="textClass">{{ brandName }}</h5>
          <p :class="textClass" class="mb-0">{{ tagline }}</p>
        </div>
        <div class="col-md-6 text-md-end">
          <p :class="textClass" class="mb-0">&copy; 2024 {{ brandName }}. All rights reserved.</p>
          <div class="mt-2">
            <a v-for="link in socialLinks" :key="link.name" :href="link.url" class="text-decoration-none me-3" :class="textClass">
              <i :class="link.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue' // ADD THIS IMPORT

// Define props for configuration
const props = defineProps({
  variant: {
    type: String,
    default: 'dark' // 'dark' or 'light'
  },
  brandName: {
    type: String,
    default: 'PropertyRental Pro'
  },
  tagline: {
    type: String,
    default: 'Professional property management made simple'
  },
  socialLinks: {
    type: Array,
    default: () => [
      { name: 'Facebook', url: '#', icon: 'bi bi-facebook' },
      { name: 'Twitter', url: '#', icon: 'bi bi-twitter' },
      { name: 'Instagram', url: '#', icon: 'bi bi-instagram' }
    ]
  }
})

// Computed properties
const footerClass = computed(() => ({
  'bg-dark py-4': props.variant === 'dark',
  'bg-light py-4 border-top': props.variant === 'light'
}))

const textClass = computed(() => ({
  'text-light': props.variant === 'dark',
  'text-dark': props.variant === 'light'
}))
</script>