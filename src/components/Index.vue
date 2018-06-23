<template>
  <div>
    <h1>Bourbon Calculator <span style="color: red" v-show="promo">2x1</span></h1>
    Total: {{ total | currency }} <br>
    Tip: {{ tip | currency }} <br>
    Total + Tip: {{ totalTip | currency }} <br>
    <br>
    <button @click="promoOff">{{buttonText}}</button>
    <br>
    <router-link to="/new">Add Customer</router-link>
    -
    <router-link to="/newGroup">Group</router-link>
    <ul v-for="customer in customers">
      <li><router-link :to="'/customer/'+customer.id">{{customer.name}} - {{totalIndividual(customer) | currency}}</router-link></li>
    </ul>

    <hr>

    <ul v-for="group in groups">
      <li><router-link :to="'/group/'+group.id">{{group.name}} - {{group.price | currency}}</router-link></li>
    </ul>
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
      customers: 'getCustomers',
      promo: 'getPromo',
      total: 'getTotal',
      groups: 'getGroups',
      tip: 'getTip',
      totalTip: 'getTotalAndTip'
    }),

    buttonText: function () {
      return this.promo === true ? 'Promo Off' : 'Promo On'
    },
  },

  methods: {
    ...mapActions({
      promoOff: 'togglePromo'
    }),

    isInGroup: function (customer, groupId) {

      this.group.customers.find(c => c.id === customer.id)
    },

    totalIndividual: function (customer) {
      var total = customer.total

      if (this.promo) {
        total = total / 2
      }

      this.groups.forEach(group => {
        if (group.customers.find(id => id === customer.id)) {
          total += group.individual
        }
      })

      return total + ((total * 10)/ 100)
    }
  },
}
</script>
