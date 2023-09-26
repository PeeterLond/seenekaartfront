import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import locationView from "@/views/LocationView.vue";
import errorView from "@/views/ErrorView.vue";

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/location',
    name: 'locationRoute',
    component: locationView
  },
  {
    path: '/error',
    name: 'errorRoute',
    component: errorView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
