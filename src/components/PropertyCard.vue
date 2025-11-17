<template>
  <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
    <div class="card h-100 border-0 shadow-lg property-card">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-start mb-4">
          <h4 class="card-title fw-bold text-dark mb-0 fs-4">{{ property.name }}</h4>
          <span class="badge fs-6 py-2 px-3" :class="statusClass">
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
        </div>
      </div>
      <div class="card-footer bg-transparent border-0 pt-0 px-4 pb-4">
        <div class="d-flex gap-3">
          <button class="btn btn-primary btn-lg flex-fill" @click="handleEdit">
            <i class="bi bi-pencil me-2"></i>Edit
          </button>
          <button class="btn btn-outline-danger btn-lg px-3" @click="handleDelete">
            <i class="bi bi-trash"></i>
          </button>
          <button class="btn btn-outline-info btn-lg px-3" @click="handleView">
            <i class="bi bi-eye"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Define props
const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})

// Define emits with validation
const emit = defineEmits({
  // No validation
  'edit': null,
  'delete': null,
  'view': null,

  // With validation
  'property-updated': (payload) => {
    // Validate that payload has required fields
    return payload && typeof payload === 'object' &&
           'id' in payload && 'action' in payload
  }
})

// Computed property for status class
const statusClass = computed(() => {
  const statusClasses = {
    'Available': 'bg-success',
    'Occupied': 'bg-primary',
    'Maintenance': 'bg-warning text-dark'
  }
  return statusClasses[props.property.status] || 'bg-secondary'
})

// Event handlers
const handleEdit = () => {
  // Emit the edit event to parent component
  emit('edit', props.property.id)
  emit('property-updated', {
    id: props.property.id,
    action: 'edit',
    timestamp: new Date().toISOString()
  })
  router.push(/properties/edit/${props.property.id})
}

const handleDelete = () => {
  // Emit the delete event to parent component
  emit('delete', props.property.id)
  emit('property-updated', {
    id: props.property.id,
    action: 'delete',
    timestamp: new Date().toISOString()
  })
}

const handleView = () => {
  // Emit the view event to parent component
  emit('view', props.property.id)
  emit('property-updated', {
    id: props.property.id,
    action: 'view',
    timestamp: new Date().toISOString()
  })
  router.push(/properties/${props.property.id})
}
</script>

<style scoped>
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
</style>
