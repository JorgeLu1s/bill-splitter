<template>
  <div>
    <h1>{{ group.name }} - {{ group.price | currency }}</h1>
    <input v-model="group.name">
    <input v-model="group.price">
    <br>
    <ul>
      <li v-for="customer in customers">
        <label>
        <input type="checkbox" v-model="selected" :id="customer.id" :value="customer.id">
        {{ customer.name }}
        </label>
      </li>
    </ul>
    <br>
    <button @click="save">Save</button>
    <router-link to="/">Index</router-link>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Group',
  props: ['id'],

  data: function () {
    return {
      group: {},
      selected: [],
    }
  },

  computed: {
    ...mapGetters({
      customers: 'getCustomers',
    }),
  },

  methods: {
    save: function () {
      if (typeof this.id === 'undefined') {
        this.group.customers = this.selected

        if (this.selected.length > 0) {
          this.group.individual = this.group.price / this.selected.length
        }

        this.$store.dispatch('addGroup', this.group)
      } else {
        this.$store.dispatch('updateGroupCustomers', {groupId: parseInt(this.id), customers: this.selected})
      }
      this.$router.push('/')
    },
  },

  mounted: function () {
    if (typeof this.id === 'undefined') {
      this.group = { id: Date.now(), name: '', price: 0, individual: 0, customers: [] }
    } else {
      this.group = this.$store.getters.getGroupById(parseInt(this.id))
      this.selected = this.group.customers
    }
  }
}
</script>
