<template>
  <div>
    <h1>{{ group.name }} - {{ group.price | currency }}</h1>
    <v-text-field v-model="group.name" label="Name"></v-text-field>
    <v-text-field v-model="group.price" label="Price"></v-text-field>
    <br>

    <v-list>
      <v-subheader>Customers</v-subheader>
      <v-list-tile v-for="customer in customers">
        <v-list-tile-content>
          <v-checkbox :label="customer.name" type="checkbox" v-model="selected" :id="customer.id" :value="customer.id"></v-checkbox>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <br>
    <v-btn color="success" @click="save">Save</v-btn>
    <v-btn color="error" to="/">Cancel</v-btn>
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
