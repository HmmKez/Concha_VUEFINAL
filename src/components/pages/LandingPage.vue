<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center min-vh-50">
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold mb-4">Manage Your Rental Properties with Ease</h1>
            <p class="lead mb-4">Streamline your property management, track rentals, and grow your business with our comprehensive platform.</p>
            <div class="d-flex gap-3">
              <router-link to="/dashboard" class="btn btn-light btn-lg px-4">Get Started</router-link>
              <router-link to="/properties" class="btn btn-outline-light btn-lg px-4">View Properties</router-link>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <i class="bi bi-house-heart display-1"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-5">
      <div class="container">
        <div class="row text-center mb-5">
          <div class="col-12">
            <h2 class="fw-bold">Why Choose PropertyRental Pro?</h2>
            <p class="text-muted">Everything you need to manage your rental business</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-md-4" v-for="feature in features" :key="feature.title">
            <div class="card border-0 shadow-sm h-100 text-center">
              <div class="card-body p-4">
                <div class="feature-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                  <i :class="feature.icon"></i>
                </div>
                <h5 class="fw-bold">{{ feature.title }}</h5>
                <p class="text-muted">{{ feature.description }}</p>
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
.min-vh-50 {
  min-height: 50vh;
}
</style>