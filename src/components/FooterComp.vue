<template>
  <footer class="bg-dark text-light py-4 mt-auto">
    <div class="container-full">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h5 class="fw-bold mb-2">PropertyRental Pro</h5>
          <p class="mb-0 text-light">Professional property management made simple</p>
        </div>
        <div class="col-md-6 text-md-end">
          <p class="mb-0">&copy; 2024 PropertyRental Pro. All rights reserved.</p>
          <div class="mt-2">
            <button
              v-for="link in socialLinks"
              :key="link.name"
              class="btn btn-outline-light btn-sm me-2"
              @click="handleSocialClick(link.name)"
            >
              <i :class="link.icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socialLinks = [
  { name: 'facebook', icon: 'bi bi-facebook', url: '#' },
  { name: 'twitter', icon: 'bi bi-twitter', url: '#' },
  { name: 'instagram', icon: 'bi bi-instagram', url: '#' }
]

// Method to handle social media clicks
const handleSocialClick = (platform) => {
  // You can add actual social media links here
  const socialUrls = {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com'
  }

  if (socialUrls[platform]) {
    window.open(socialUrls[platform], '_blank')
  }
}
</script>

<style scoped>
.btn-outline-light:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
</style>
