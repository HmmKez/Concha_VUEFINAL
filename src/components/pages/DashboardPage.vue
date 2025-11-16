<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="row align-items-center mb-5">
      <div class="col">
        <h1 class="h2 fw-bold text-dark mb-1">Dashboard Overview</h1>
        <p class="text-muted">Manage your rental properties efficiently</p>
      </div>
    </div>

    <!-- Simplified Stats Cards -->
    <div class="row g-4 mb-5">
      <div class="col-xl-4 col-md-6" v-for="stat in stats" :key="stat.label">
        <div class="card stat-card h-100 border-0 shadow-sm">
          <div class="card-body p-4">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <h6 class="card-subtitle text-muted mb-2">{{ stat.label }}</h6>
                <h3 class="card-title fw-bold text-dark mb-0">{{ stat.value }}</h3>
              </div>
              <div class="stat-icon ms-3 text-white rounded-circle d-flex align-items-center justify-content-center" 
                   :class="stat.iconBg" style="width: 50px; height: 50px;">
                <i :class="stat.icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-transparent py-3">
            <h5 class="card-title mb-0 fw-bold">Quick Actions</h5>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-4">
                <router-link to="/properties/add" class="card action-card h-100 text-decoration-none">
                  <div class="card-body text-center p-4">
                    <div class="action-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                      <i class="bi bi-plus-lg"></i>
                    </div>
                    <h6 class="fw-bold text-dark">Add New Property</h6>
                    <p class="text-muted small">List a new rental property</p>
                  </div>
                </router-link>
              </div>
              <div class="col-md-4">
                <router-link to="/properties" class="card action-card h-100 text-decoration-none">
                  <div class="card-body text-center p-4">
                    <div class="action-icon bg-success text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                      <i class="bi bi-list-ul"></i>
                    </div>
                    <h6 class="fw-bold text-dark">View All Properties</h6>
                    <p class="text-muted small">Manage existing properties</p>
                  </div>
                </router-link>
              </div>
              <div class="col-md-4">
                <div class="card action-card h-100">
                  <div class="card-body text-center p-4">
                    <div class="action-icon bg-info text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                      <i class="bi bi-graph-up"></i>
                    </div>
                    <h6 class="fw-bold text-dark">View Reports</h6>
                    <p class="text-muted small">See property analytics</p>
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
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-transparent py-3 d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0 fw-bold">Recent Properties</h5>
            <router-link to="/properties" class="btn btn-sm btn-outline-primary">View All</router-link>
          </div>
          <div class="card-body">
            <div v-if="recentProperties.length === 0" class="text-center py-5">
              <i class="bi bi-inbox display-1 text-muted"></i>
              <p class="text-muted mt-3">No properties added yet</p>
              <router-link to="/properties/add" class="btn btn-primary">Add Your First Property</router-link>
            </div>
            <div v-else class="row g-3">
              <div class="col-md-6 col-lg-4" v-for="property in recentProperties" :key="property.id">
                <div class="card h-100 border">
                  <div class="card-body">
                    <h6 class="card-title fw-bold">{{ property.name }}</h6>
                    <p class="card-text mb-1">
                      <small class="text-muted">Rent: ₱{{ property.rent.toLocaleString() }}</small>
                    </p>
                    <p class="card-text mb-2">
                      <span class="badge" :class="property.status === 'Available' ? 'bg-success' : 'bg-primary'">
                        {{ property.status }}
                      </span>
                    </p>
                    <p class="card-text mb-0">
                      <small class="text-muted">Tenant: {{ property.tenant || '—' }}</small>
                    </p>
                  </div>
                  <div class="card-footer bg-transparent">
                    <div class="d-flex gap-2">
                      <router-link :to="`/properties/edit/${property.id}`" class="btn btn-sm btn-outline-secondary flex-fill">
                        Edit
                      </router-link>
                      <button class="btn btn-sm btn-outline-danger" @click="deleteProperty(property.id)">
                        Delete
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
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'DashboardPage',
  setup() {
    const propertyList = ref(JSON.parse(localStorage.getItem('properties') || '[]'))

    // Simplified stats - only show what actually works
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
      }
    ])

    const recentProperties = computed(() => {
      return propertyList.value.slice(-6).reverse()
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
.stat-card {
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.action-card {
  transition: all 0.3s ease;
  border: 1px solid #dee2e6;
}

.action-card:hover {
  border-color: #0d6efd;
  transform: translateY(-2px);
}
</style>