<!--src/components/pages/LandingPage.vue -->

<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="bg-primary text-white">
      <div class="container-full">
        <div class="row align-items-center min-vh-70 py-5">
          <div class="col-xl-6 col-lg-6">
            <h1 class="display-4 fw-bold mb-4">Manage Your Rental Properties with Ease</h1>
            <p class="lead mb-4">Streamline your property management, track rentals, and grow your business with our comprehensive platform.</p>
            <div class="d-flex flex-wrap gap-3">
              <router-link to="/dashboard" class="btn btn-light btn-lg px-4 py-2">Get Started</router-link>
              <router-link to="/properties" class="btn btn-outline-light btn-lg px-4 py-2">View Properties</router-link>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 text-center">
            <i class="bi bi-house-heart display-1 opacity-75"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-5">
      <div class="container-full">
        <div class="row text-center mb-5">
          <div class="col-12">
            <h2 class="display-5 fw-bold mb-3">Why Choose PropertyRental Pro?</h2>
            <p class="text-muted fs-5">Everything you need to manage your rental business</p>
          </div>
        </div>
        <div class="row g-4 justify-content-center">
          <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6" v-for="feature in features" :key="feature.title">
            <div class="card border-0 shadow-lg h-100 text-center hover-lift">
              <div class="card-body p-5">
                <div class="feature-icon bg-primary text-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                  <i :class="feature.icon" class="fs-3"></i>
                </div>
                <h4 class="fw-bold mb-3">{{ feature.title }}</h4>
                <p class="text-muted mb-0">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      features: [
        {
          title: 'Easy Property Management',
          description: 'Add, edit, and manage all your properties in one place with our intuitive interface.',
          icon: 'bi bi-building'
        },
        {
          title: 'Tenant Tracking',
          description: 'Keep track of tenant information, lease dates, and payment history effortlessly.',
          icon: 'bi bi-people'
        },
        {
          title: 'Financial Overview',
          description: 'Monitor your rental income, expenses, and financial performance with detailed analytics.',
          icon: 'bi bi-graph-up'
        }
      ]
    }
  }
}
</script>

<style scoped>
.min-vh-70 {
  min-height: 70vh;
}

.hover-lift {
  transition: all 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.landing-page {
  width: 100%;
}
</style>
