<template>
  <div>
    <h1>Bourbon Calculator</h1>
    <router-link to="/new">New</router-link>
    <ul v-for="customer in customers">
      <li><router-link :to="'/customer/'+customer.id">{{customer.name}} - {{customer.total}}</router-link></li>
    </ul>
    Total: {{ total }}
  </div>
</template>
<script>
import Customer from '@/components/Customer'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Index',
  components: { Customer },
  computed: {
    ...mapGetters({
      customers: 'getCustomers'
    }),

    total: function () {
      var total = 0
      if (this.customers.length > 0) {
        this.customers.forEach(customer => {
          total += parseInt(customer.total)
        })
      }
      return total
    }
  }
}
</script>
