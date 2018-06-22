<template>
  <div>
    <h1>Bourbon Calculator <span style="color: red" v-show="promo">2x1</span></h1>
    <button @click="promoOff">{{buttonText}}</button>
    <br>
    <router-link to="/new">New</router-link>
    <ul v-for="customer in customers">
      <li><router-link :to="'/customer/'+customer.id">{{customer.name}} - {{customer.total | promoFilter(promo) | currency}}</router-link></li>
    </ul>
    Total: {{ total | currency }}
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
      total: 'getTotal'
    }),

    buttonText: function () {
      return this.promo === true ? 'Promo Off' : 'Promo On'
    },
  },

  methods: {
    ...mapActions({
      promoOff: 'togglePromo'
    })
  },

  filters: {
    promoFilter: function (value, promo) {
      var total = value
      if (promo) {
        total = value / 2
      }

      return total
    }
  }
}
</script>
