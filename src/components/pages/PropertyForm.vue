<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <!-- Conditional rendering based on editing mode -->
        <div class="d-flex align-items-center mb-4" v-if="isEditing">
          <button class="btn btn-outline-secondary me-3" @click="$router.back()">
            <i class="bi bi-arrow-left"></i>
          </button>
          <div>
            <h2 class="h4 fw-bold mb-1">Edit Property</h2>
            <p class="text-muted mb-0">Update property information</p>
          </div>
        </div>
        <div v-else class="text-center mb-5">
          <h2 class="fw-bold">Add New Property</h2>
          <p class="text-muted">Fill in the details to list your property</p>
        </div>

        <div class="card shadow-sm border-0">
          <div class="card-body p-4">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <!-- Form with v-model binding -->
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label fw-bold">Property Name</label>
                    <input v-model="form.name" type="text" class="form-control" required 
                           placeholder="Enter property name">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label fw-bold">Monthly Rent (₱)</label>
                    <input v-model.number="form.rent" type="number" class="form-control" required 
                           placeholder="Enter monthly rent">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label fw-bold">Property Type</label>
                    <select v-model="form.type" class="form-select" required>
                      <option value="">Select type</option>
                      <option v-for="type in propertyTypes" :key="type" :value="type">
                        {{ type }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label fw-bold">Status</label>
                    <select v-model="form.status" class="form-select" required>
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Maintenance">Under Maintenance</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Address</label>
                <input v-model="form.address" type="text" class="form-control" 
                       placeholder="Enter full address">
              </div>

              <!-- Conditional fields based on status -->
              <div v-if="form.status === 'Occupied'" class="bg-light p-3 rounded mb-4">
                <h6 class="fw-bold mb-3">Tenant Information</h6>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Tenant Name</label>
                      <input v-model="form.tenant" type="text" class="form-control" 
                             :required="form.status === 'Occupied'">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Tenant Email</label>
                      <input v-model="form.tenantEmail" type="email" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Lease Start Date</label>
                      <input v-model="form.startDate" type="date" class="form-control"
                             :required="form.status === 'Occupied'">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Last Payment Date</label>
                      <input v-model="form.lastPaid" type="date" class="form-control">
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Description</label>
                <textarea v-model="form.description" class="form-control" rows="3"
                         placeholder="Describe the property features..."></textarea>
              </div>

              <div class="d-flex gap-2 justify-content-end">
                <router-link to="/properties" class="btn btn-secondary">Cancel</router-link>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isEditing ? 'Update Property' : 'Add Property' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- API Data Preview -->
        <div class="card mt-4" v-if="apiProperties.length > 0">
          <div class="card-header">
            <h6 class="mb-0">Sample Properties from API</h6>
          </div>
          <div class="card-body">
            <div class="row g-2">
              <div class="col-12" v-for="apiProp in apiProperties" :key="apiProp.id">
                <div class="d-flex justify-content-between align-items-center p-2 border rounded">
                  <div>
                    <strong>{{ apiProp.title }}</strong>
                    <br>
                    <small class="text-muted">Type: {{ apiProp.type }}</small>
                  </div>
                  <button class="btn btn-sm btn-outline-primary" 
                         @click="useApiProperty(apiProp)">
                    Use This
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Reactive data with ref()
const propertyList = ref(JSON.parse(localStorage.getItem('properties') || '[]'))
const loading = ref(false)
const apiProperties = ref([])

// Form data binding
const form = ref({
  id: null,
  name: '',
  rent: 0,
  type: '',
  status: 'Available',
  address: '',
  tenant: '',
  tenantEmail: '',
  startDate: '',
  lastPaid: '',
  description: ''
})

const isEditing = ref(false)

// Computed property for dropdown options
const propertyTypes = ref(['Apartment', 'House', 'Condo', 'Studio', 'Commercial'])

// Watch for route changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadPropertyForEdit()
  }
})

// Lifecycle hook
onMounted(() => {
  if (route.params.id) {
    loadPropertyForEdit()
  }
  fetchSampleProperties()
})

// CRUD Operations
function loadPropertyForEdit() {
  const property = propertyList.value.find(p => p.id == route.params.id)
  if (property) {
    form.value = { ...property }
    isEditing.value = true
  }
}

async function fetchSampleProperties() {
  try {
    // Using JSONPlaceholder API for demo
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
    const data = await response.json()
    
    // Transform API data to match our format
    apiProperties.value = data.map((item, index) => ({
      id: `api-${item.id}`,
      title: item.title.substring(0, 30),
      type: propertyTypes.value[index % propertyTypes.value.length],
      rent: (index + 1) * 10000
    }))
  } catch (error) {
    console.error('Failed to fetch sample properties:', error)
  }
}

function useApiProperty(apiProp) {
  form.value.name = apiProp.title
  form.value.type = apiProp.type
  form.value.rent = apiProp.rent
}

async function handleSubmit() {
  loading.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (isEditing.value) {
    // UPDATE operation
    const index = propertyList.value.findIndex(p => p.id === form.value.id)
    if (index !== -1) {
      propertyList.value[index] = { ...form.value }
    }
  } else {
    // CREATE operation
    form.value.id = Date.now().toString()
    form.value.createdAt = new Date().toISOString()
    propertyList.value.push({ ...form.value })
  }
  
  // Save to localStorage
  localStorage.setItem('properties', JSON.stringify(propertyList.value))
  loading.value = false
  
  // Navigate to properties list
  router.push('/properties')
}
</script>