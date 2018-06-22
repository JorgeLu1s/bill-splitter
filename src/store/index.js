import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customers: []
  },

  getters: {
    getCustomers (state) {
      return state.customers
    },

    getCustomerById: (state) => (id) => {
      return state.customers.find(customer => customer.id === id)
    }
  },

  actions: {
    addCustomer ({commit}, customer) {
      commit('pushCustomer', customer)
    }
  },

  mutations: {
    pushCustomer (state, customer) {
      state.customers.push(customer)
    }
  }
})
