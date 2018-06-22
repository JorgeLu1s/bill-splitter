<template>
  <div>
    <h1>{{ customer.name }}</h1>
    <input v-model="customer.name">
    <br>
    <div v-for="(product, index) in customer.products">
      <ProductItem :product="product" :index="index" v-on:remove-product="removeProduct"></ProductItem>
    </div>
    <button @click="addProduct">Add</button>
    <br>
    Total: {{ total | currency }}
    <br>
    <button @click="save">Save</button>
    <router-link to="/">List</router-link>
  </div>
</template>

<script>
import ProductItem from '@/components/productItem'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Customer',
  components: { ProductItem },
  props: ['id'],
  data () {
    return {
      customer: {}
    }
  },

  computed: {
    ...mapGetters({
      promo: 'getPromo'
    }),

    total: function () {
      var total = 0

      if (this.customer.products) {
        this.customer.products.forEach(product => {
          total += parseInt(product.price)
        })
      }

      this.customer.total = total

      if (this.promo) {
        total = total / 2
      }

      return total
    }
  },

  methods: {
    save: function () {
      if (typeof this.id === 'undefined') {
        this.$store.dispatch('addCustomer', this.customer)
      }
      this.$router.push('/')
    },

    addProduct: function () {
      this.customer.products.push({id: Date.now(), name: '', price: 0})
    },

    removeProduct: function (index) {
      this.customer.products.splice(index, 1)
    }
  },

  mounted: function () {
    if (typeof this.id === 'undefined') {
      this.customer = { id: Date.now(), name: '', products: [], total: 0 }
    } else {
      this.customer = this.$store.getters.getCustomerById(parseInt(this.id))
    }
  }
}
</script>
