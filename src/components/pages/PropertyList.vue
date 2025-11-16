<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold text-dark mb-1">Property Portfolio</h2>
        <p class="text-muted">Manage all your rental properties</p>
      </div>
      <router-link to="/properties/add" class="btn btn-primary d-flex align-items-center">
        <i class="bi bi-plus-circle me-2"></i>
        Add Property
      </router-link>
    </div>

    <!-- Properties Grid -->
    <div v-if="propertyList.length === 0" class="text-center py-5">
      <i class="bi bi-inbox display-1 text-muted"></i>
      <h4 class="text-muted mt-3">No properties found</h4>
      <router-link to="/properties/add" class="btn btn-primary mt-3">
        Add Your First Property
      </router-link>
    </div>

    <div v-else class="row g-4">
      <div class="col-xl-4 col-lg-6" v-for="property in propertyList" :key="property.id">
        <div class="card h-100 border-0 shadow-sm property-card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h5 class="card-title fw-bold text-dark mb-0">{{ property.name }}</h5>
              <span class="badge" :class="getStatusClass(property.status)">
                {{ property.status }}
              </span>
            </div>
            
            <p class="text-muted mb-2">
              <i class="bi bi-geo-alt me-2"></i>
              {{ property.address || 'Address not specified' }}
            </p>
            
            <div class="property-details">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-muted">Monthly Rent:</span>
                <strong class="text-primary">₱{{ property.rent.toLocaleString() }}</strong>
              </div>
              
              <div class="d-flex justify-content-between align-items-center mb-2" v-if="property.type">
                <span class="text-muted">Type:</span>
                <span class="fw-medium">{{ property.type }}</span>
              </div>
              
              <div v-if="property.tenant" class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-muted">Tenant:</span>
                <span class="fw-medium">{{ property.tenant }}</span>
              </div>
            </div>
          </div>
          
          <div class="card-footer bg-transparent border-0 pt-0">
            <div class="d-flex gap-2">
              <router-link :to="`/properties/edit/${property.id}`" class="btn btn-outline-primary btn-sm flex-fill">
                <i class="bi bi-pencil me-1"></i>Edit
              </router-link>
              <button class="btn btn-outline-danger btn-sm" @click="deleteProperty(property.id)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Property Count -->
    <div v-if="propertyList.length > 0" class="d-flex justify-content-between align-items-center mt-4">
      <p class="text-muted mb-0">
        Showing {{ propertyList.length }} of {{ propertyList.length }} properties
      </p>
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
        'Maintenance': 'bg-warning'
      }
      return statusClasses[status] || 'bg-secondary'
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
      deleteProperty
    }
  }
}
</script>

<style scoped>
.property-card {
  transition: all 0.3s ease;
}

.property-card:hover {
  transform: translateY(-5px);
}

.property-details {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.375rem;
  margin: 1rem -1rem;
}
</style>