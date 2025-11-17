<template>
  <div id="app">
    <!-- Navigation -->
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
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-light py-4 mt-auto">
      <div class="container-full">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h5 class="fw-bold mb-2">PropertyRental Pro</h5>
            <p class="mb-0 text-light">yipee hapit na bakasyon et al.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-0">&copy; Concha, Kent. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
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
