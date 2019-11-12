import Vue from 'vue'
import VueRouter from 'vue-router'
import Customers from '../views/Customers.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'customers',
    component: Customers
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
