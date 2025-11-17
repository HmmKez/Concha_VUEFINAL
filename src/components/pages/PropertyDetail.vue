<!--src/components/pages/PropertyDetail.vue -->

<template>
  <div class="container py-4" v-if="property">
    <div class="d-flex align-items-center mb-4">
      <button class="btn btn-outline-secondary me-3" @click="$router.back()">
        <i class="bi bi-arrow-left"></i>
      </button>
      <div>
        <h2 class="h4 fw-bold mb-1">{{ property.name }}</h2>
        <p class="text-muted mb-0">{{ property.address }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 mb-4">
          <div class="card-body">
            <h5 class="card-title fw-bold">Property Details</h5>
            <div class="row">
              <div class="col-md-6" v-for="detail in propertyDetails" :key="detail.label">
                <p><strong>{{ detail.label }}:</strong> {{ detail.value }}</p>
              </div>
            </div>

            <div v-if="property.description">
              <h6 class="fw-bold mt-4">Description</h6>
              <p class="text-muted">{{ property.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h6 class="fw-bold">Quick Actions</h6>
            <div class="d-grid gap-2">
              <router-link :to="`/properties/edit/${property.id}`"
                         class="btn btn-primary">
                <i class="bi bi-pencil me-2"></i>Edit Property
              </router-link>
              <button class="btn btn-outline-danger" @click="deleteProperty">
                <i class="bi bi-trash me-2"></i>Delete Property
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container py-4">
    <div class="text-center">
      <i class="bi bi-exclamation-triangle display-1 text-muted"></i>
      <h3 class="mt-3">Property Not Found</h3>
      <router-link to="/properties" class="btn btn-primary mt-3">Back to Properties</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const property = ref(null)

// Computed property for details
const propertyDetails = computed(() => {
  if (!property.value) return []

  return [
    { label: 'Monthly Rent', value: `₱${property.value.rent.toLocaleString()}` },
    { label: 'Property Type', value: property.value.type || 'Not specified' },
    { label: 'Status', value: property.value.status },
    { label: 'Tenant', value: property.value.tenant || 'No tenant' },
    { label: 'Lease Start', value: property.value.startDate || 'Not set' },
    { label: 'Last Payment', value: property.value.lastPaid || 'Not recorded' }
  ]
})

onMounted(() => {
  loadProperty()
})

function loadProperty() {
  const properties = JSON.parse(localStorage.getItem('properties') || '[]')
  property.value = properties.find(p => p.id == route.params.id)
}

function deleteProperty() {
  if (confirm('Are you sure you want to delete this property?')) {
    const properties = JSON.parse(localStorage.getItem('properties') || '[]')
    const updatedProperties = properties.filter(p => p.id != route.params.id)
    localStorage.setItem('properties', JSON.stringify(updatedProperties))
    router.push('/properties')
  }
}
</script>
