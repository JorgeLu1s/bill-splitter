import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customers: [],
    groups: [],
    promo: true
  },

  getters: {
    getCustomers (state) {
      return state.customers
    },

    getGroups (state) {
      return state.groups
    },

    getCustomerById: (state) => (id) => {
      return state.customers.find(customer => customer.id === id)
    },

    getGroupById: (state) => (id) => {
      return state.groups.find(group => group.id === id)
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

      state.groups.forEach(group => {
        total += parseInt(group.price)
      })

      return total
    },

    getTip (state, getters) {
      return (getters.getTotal * 10) / 100
    },

    getTotalAndTip (state, getters) {
      return getters.getTotal + getters.getTip
    }
  },

  actions: {
    addCustomer ({commit}, customer) {
      commit('pushCustomer', customer)
    },

    addGroup ({commit}, group) {
      commit('pushGroup', group)
    },

    togglePromo ({commit}) {
      commit('togglePromo')
    },

    updateGroupCustomers ({commit, getters}, {groupId, customers}) {
      var group = getters.getGroupById(groupId)
      group.customers = customers
      if (group.customers.length > 0) {
        group.individual = group.price / group.customers.length
      } else {
        group.individual = 0
      }
    }
  },

  mutations: {
    pushCustomer (state, customer) {
      state.customers.push(customer)
    },

    pushGroup (state, group) {
      state.groups.push(group)
    },

    togglePromo (state) {
      state.promo = !state.promo
    },
  }
})
