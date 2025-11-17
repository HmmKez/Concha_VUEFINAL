<template>
  <div class="dashboard-page">
    <div class="container-full py-4">
      <!-- Header -->
      <div class="row align-items-center mb-5">
        <div class="col">
          <h1 class="display-5 fw-bold text-dark mb-2">Dashboard Overview</h1>
          <p class="text-muted fs-5">Manage your rental properties efficiently</p>
        </div>
      </div>

      <!-- Stats Cards - Optimized for desktop -->
      <div class="row g-4 mb-5">
        <div class="col-xxl-3 col-xl-3 col-lg-6 col-md-6" v-for="stat in stats" :key="stat.label">
          <div class="card stat-card h-100 border-0 shadow-lg">
            <div class="card-body p-4">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h6 class="card-subtitle text-muted mb-2 fs-6">{{ stat.label }}</h6>
                  <h2 class="card-title fw-bold text-dark mb-0 display-6">{{ stat.value }}</h2>
                </div>
                <div class="stat-icon ms-4 text-white rounded-circle d-flex align-items-center justify-content-center"
                     :class="stat.iconBg" style="width: 70px; height: 70px;">
                  <i :class="stat.icon" class="fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="card border-0 shadow-lg">
            <div class="card-header bg-transparent py-4 border-bottom">
              <h3 class="card-title mb-0 fw-bold">Quick Actions</h3>
            </div>
            <div class="card-body p-4">
              <div class="row g-4">
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                  <router-link to="/properties/add" class="card action-card h-100 text-decoration-none border-0 shadow-sm">
                    <div class="card-body text-center p-5">
                      <div class="action-icon bg-primary text-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                        <i class="bi bi-plus-lg fs-4"></i>
                      </div>
                      <h5 class="fw-bold text-dark mb-2">Add New Property</h5>
                      <p class="text-muted mb-0">List a new rental property</p>
                    </div>
                  </router-link>
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                  <router-link to="/properties" class="card action-card h-100 text-decoration-none border-0 shadow-sm">
                    <div class="card-body text-center p-5">
                      <div class="action-icon bg-success text-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                        <i class="bi bi-list-ul fs-4"></i>
                      </div>
                      <h5 class="fw-bold text-dark mb-2">View All Properties</h5>
                      <p class="text-muted mb-0">Manage existing properties</p>
                    </div>
                  </router-link>
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                  <div class="card action-card h-100 border-0 shadow-sm">
                    <div class="card-body text-center p-5">
                      <div class="action-icon bg-info text-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                        <i class="bi bi-graph-up fs-4"></i>
                      </div>
                      <h5 class="fw-bold text-dark mb-2">View Reports</h5>
                      <p class="text-muted mb-0">See property analytics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Properties -->
      <div class="row">
        <div class="col-12">
          <div class="card border-0 shadow-lg">
            <div class="card-header bg-transparent py-4 border-bottom d-flex justify-content-between align-items-center">
              <h3 class="card-title mb-0 fw-bold">Recent Properties</h3>
              <router-link to="/properties" class="btn btn-primary btn-lg">View All Properties</router-link>
            </div>
            <div class="card-body p-4">
              <div v-if="recentProperties.length === 0" class="text-center py-5">
                <i class="bi bi-inbox display-1 text-muted mb-4"></i>
                <h4 class="text-muted mb-3">No properties added yet</h4>
                <router-link to="/properties/add" class="btn btn-primary btn-lg px-4">Add Your First Property</router-link>
              </div>
              <div v-else class="row g-4">
                <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6" v-for="property in recentProperties" :key="property.id">
                  <div class="card h-100 border-0 shadow-sm property-card">
                    <div class="card-body p-4">
                      <div class="d-flex justify-content-between align-items-start mb-3">
                        <h5 class="card-title fw-bold text-dark mb-0 fs-5">{{ property.name }}</h5>
                        <span class="badge fs-6" :class="property.status === 'Available' ? 'bg-success' : 'bg-primary'">
                          {{ property.status }}
                        </span>
                      </div>

                      <div class="property-info mb-3">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <span class="text-muted">Monthly Rent:</span>
                          <strong class="text-primary fs-5">₱{{ property.rent.toLocaleString() }}</strong>
                        </div>

                        <div v-if="property.tenant" class="d-flex justify-content-between align-items-center mb-2">
                          <span class="text-muted">Tenant:</span>
                          <span class="fw-medium">{{ property.tenant }}</span>
                        </div>

                        <div v-if="property.type" class="d-flex justify-content-between align-items-center">
                          <span class="text-muted">Type:</span>
                          <span class="fw-medium">{{ property.type }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer bg-transparent border-0 pt-0 px-4 pb-4">
                      <div class="d-flex gap-2">
                        <router-link :to="`/properties/edit/${property.id}`" class="btn btn-sm btn-outline-secondary flex-fill">
                        Edit
                        </router-link>
                        <button class="btn btn-outline-danger btn-lg px-3" @click="deleteProperty(property.id)">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'DashboardPage',
  setup() {
    const propertyList = ref(JSON.parse(localStorage.getItem('properties') || '[]'))

    const stats = computed(() => [
      {
        label: 'Total Properties',
        value: propertyList.value.length,
        icon: 'bi bi-building',
        iconBg: 'bg-primary'
      },
      {
        label: 'Available Properties',
        value: propertyList.value.filter(p => p.status === 'Available').length,
        icon: 'bi bi-check-circle',
        iconBg: 'bg-success'
      },
      {
        label: 'Monthly Income',
        value: '₱' + propertyList.value.reduce((total, property) => total + (property.rent || 0), 0).toLocaleString(),
        icon: 'bi bi-currency-dollar',
        iconBg: 'bg-info'
      },
      {
        label: 'Occupied Units',
        value: propertyList.value.filter(p => p.status === 'Occupied').length,
        icon: 'bi bi-people',
        iconBg: 'bg-warning'
      }
    ])

    const recentProperties = computed(() => {
      return propertyList.value.slice(-8).reverse()
    })

    function deleteProperty(id) {
      if (confirm('Are you sure you want to delete this property?')) {
        const index = propertyList.value.findIndex(p => p.id === id)
        if (index !== -1) {
          propertyList.value.splice(index, 1)
          localStorage.setItem('properties', JSON.stringify(propertyList.value))
        }
      }
    }

    return {
      stats,
      recentProperties,
      deleteProperty
    }
  }
}
</script>

<style scoped>
.dashboard-page {
  width: 100%;
}

.stat-card {
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-left-color: var(--bs-primary);
}

.action-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.action-card:hover {
  transform: translateY(-5px);
  border-color: var(--bs-primary);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.property-card {
  transition: all 0.3s ease;
}

.property-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.property-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
