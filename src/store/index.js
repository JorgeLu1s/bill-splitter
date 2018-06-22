import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customers: [],
    promo: true
  },

  getters: {
    getCustomers (state) {
      return state.customers
    },

    getCustomerById: (state) => (id) => {
      return state.customers.find(customer => customer.id === id)
    },

    getPromo (state) {
      return state.promo
    },

    getTotal (state) {
      var total = 0

      state.customers.forEach(customer => {
        total += parseInt(customer.total)
      })

      if (state.promo) {
        total = total / 2
      }

      return total
    },
  },

  actions: {
    addCustomer ({commit}, customer) {
      commit('pushCustomer', customer)
    },

    togglePromo ({commit}) {
      commit('togglePromo')
    }
  },

  mutations: {
    pushCustomer (state, customer) {
      state.customers.push(customer)
    },

    togglePromo (state) {
      state.promo = !state.promo
    }
  }
})
