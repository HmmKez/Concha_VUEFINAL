<template>
  <div id="app">
    <Navigation
      :show-property-count="true"
      @menu-toggle="handleMenuToggle"
      @navigation-change="handleNavigationChange"
    />

    <main class="flex-grow-1">
      <router-view />
    </main>

    <Footer
      :brand-name="brandName"
      :tagline="tagline"
      :social-links="socialLinks"
      @social-click="handleSocialClick"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navigation from './components/NavBar.vue'
import Footer from './components/FooterComp.vue'

const brandName = ref('PropertyRental Pro')
const tagline = ref('Professional property management made simple')

const socialLinks = ref([
  { name: 'facebook', icon: 'bi bi-facebook', url: '#' },
  { name: 'twitter', icon: 'bi bi-twitter', url: '#' },
  { name: 'instagram', icon: 'bi bi-instagram', url: '#' }
])

// Handle events from components
const handleMenuToggle = (isOpen) => {
  console.log('Menu toggled:', isOpen)
}

const handleNavigationChange = (route) => {
  console.log('Navigation changed to:', route)
}

const handleSocialClick = (platform) => {
  console.log('Social media clicked:', platform)
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
