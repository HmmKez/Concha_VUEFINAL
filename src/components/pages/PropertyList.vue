<template>
  <div class="property-list-page">
    <div class="container-full py-4">
      <!-- Header -->
      <div class="row align-items-center mb-5">
        <div class="col">
          <h1 class="display-5 fw-bold text-dark mb-2">Property Portfolio</h1>
          <p class="text-muted fs-5">Manage all your rental properties</p>
        </div>
        <div class="col-auto">
          <router-link to="/properties/add" class="btn btn-primary btn-lg d-flex align-items-center px-4 py-2">
            <i class="bi bi-plus-circle me-2 fs-5"></i>
            Add New Property
          </router-link>
        </div>
      </div>

      <!-- Properties Grid -->
      <div v-if="propertyList.length === 0" class="text-center py-5">
        <i class="bi bi-inbox display-1 text-muted mb-4"></i>
        <h3 class="text-muted mb-3">No properties found</h3>
        <p class="text-muted mb-4">Get started by adding your first rental property</p>
        <router-link to="/properties/add" class="btn btn-primary btn-lg px-4">
          Add Your First Property
        </router-link>
      </div>

      <div v-else class="row g-4">
        <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6" v-for="property in propertyList" :key="property.id">
          <div class="card h-100 border-0 shadow-lg property-card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-start mb-4">
                <h4 class="card-title fw-bold text-dark mb-0 fs-4">{{ property.name }}</h4>
                <span class="badge fs-6 py-2 px-3" :class="getStatusClass(property.status)">
                  {{ property.status }}
                </span>
              </div>

              <div class="property-meta mb-3">
                <div class="d-flex align-items-center mb-3">
                  <i class="bi bi-geo-alt text-muted me-2 fs-5"></i>
                  <span class="text-muted">{{ property.address || 'Address not specified' }}</span>
                </div>
              </div>

              <div class="property-details bg-light rounded-3 p-3 mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="text-muted fs-6">Monthly Rent:</span>
                  <strong class="text-primary fs-4">₱{{ property.rent.toLocaleString() }}</strong>
                </div>

                <div class="d-flex justify-content-between align-items-center mb-3" v-if="property.type">
                  <span class="text-muted fs-6">Property Type:</span>
                  <span class="fw-bold text-dark">{{ property.type }}</span>
                </div>

                <div class="d-flex justify-content-between align-items-center" v-if="property.tenant">
                  <span class="text-muted fs-6">Current Tenant:</span>
                  <span class="fw-bold text-dark">{{ property.tenant }}</span>
                </div>

                <div class="d-flex justify-content-between align-items-center mt-3" v-if="property.startDate">
                  <span class="text-muted fs-6">Lease Start:</span>
                  <small class="text-muted">{{ formatDate(property.startDate) }}</small>
                </div>
              </div>

              <div v-if="property.description" class="property-description mb-4">
                <p class="text-muted mb-0">{{ truncateText(property.description, 100) }}</p>
              </div>
            </div>

            <div class="card-footer bg-transparent border-0 pt-0 px-4 pb-4">
              <div class="d-flex gap-3">
                <router-link :to="`/properties/edit/${property.id}`" class="btn btn-outline-primary btn-sm flex-fill">
                <i class="bi bi-pencil me-1"></i>Edit
                </router-link>
                <button class="btn btn-outline-danger btn-lg px-3" @click="deleteProperty(property.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Property Count -->
      <div v-if="propertyList.length > 0" class="row mt-5">
        <div class="col-12">
          <div class="text-center">
            <p class="text-muted fs-5 mb-0">
              Showing <strong>{{ propertyList.length }}</strong> propert{{ propertyList.length === 1 ? 'y' : 'ies' }} in your portfolio
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PropertyList',
  setup() {
    const propertyList = ref(JSON.parse(localStorage.getItem('properties') || '[]'))

    function getStatusClass(status) {
      const statusClasses = {
        'Available': 'bg-success',
        'Occupied': 'bg-primary',
        'Maintenance': 'bg-warning text-dark'
      }
      return statusClasses[status] || 'bg-secondary'
    }

    function formatDate(dateString) {
      if (!dateString) return 'Not set'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    function truncateText(text, length) {
      if (!text) return ''
      return text.length > length ? text.substring(0, length) + '...' : text
    }

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
      propertyList,
      getStatusClass,
      formatDate,
      truncateText,
      deleteProperty
    }
  }
}
</script>

<style scoped>
.property-list-page {
  width: 100%;
}

.property-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.property-card:hover {
  transform: translateY(-8px);
  border-color: var(--bs-primary);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.property-details {
  border-left: 4px solid var(--bs-primary);
}

.property-meta {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1rem;
}

.property-description {
  border-top: 1px solid #e9ecef;
  padding-top: 1rem;
}
</style>
