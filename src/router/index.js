import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Customer from '@/components/Customer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/new',
      name: 'newCustomer',
      component: Customer,
    },
    {
      path: '/customer/:id',
      name: 'Customer',
      component: Customer,
      props: true
    },
  ]
})
