<template>
  <div class="col-md-4 mb-3">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">{{ property.name }}</h5>
        <p class="card-text"><strong>Rent:</strong> ₱{{ property.rent.toLocaleString() }}</p>
        <p class="card-text">
          <strong>Status:</strong> 
          <span :class="statusClass">{{ property.status }}</span>
        </p>
        <p v-if="property.tenant" class="card-text"><strong>Tenant:</strong> {{ property.tenant }}</p>
        <p v-if="property.startDate" class="card-text"><strong>Start Date:</strong> {{ property.startDate }}</p>
        <p v-if="property.lastPaid" class="card-text"><strong>Last Paid:</strong> {{ property.lastPaid }}</p>
      </div>
      <div class="card-footer">
        <router-link :to="`/properties/edit/${property.id}`" class="btn btn-warning btn-sm me-2">Edit</router-link>
        <button class="btn btn-danger btn-sm" @click="$emit('delete', property.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue' // ADD THIS IMPORT

const props = defineProps({
  property: Object
})

const statusClass = computed(() => {
  return props.property.status === 'Available' ? 'text-success' : 'text-primary'
})
</script>