import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/pages/LandingPage.vue';
import DashboardPage from '../components/pages/DashboardPage.vue';
import PropertyForm from '../components/pages/PropertyForm.vue';
import PropertyList from '../components/pages/PropertyList.vue';
import PropertyDetail from '../components/pages/PropertyDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: LandingPage },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage },
  { path: '/properties', name: 'PropertyList', component: PropertyList },
  { path: '/properties/add', name: 'AddProperty', component: PropertyForm },
  { path: '/properties/edit/:id', name: 'EditProperty', component: PropertyForm, props: true },
  { path: '/properties/:id', name: 'PropertyDetail', component: PropertyDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
