<template>
  <v-layout row v-if="items.length > 0">
    <v-flex xs12>
      <v-list two-line>
        <v-subheader>{{title}}</v-subheader>
        <template v-for="item in items" >
          <v-divider inset></v-divider>
          <v-list-tile :key="item.id" :to="{ name: route, params: { id: item.id }}">
            <v-list-tile-avatar>
              <v-icon v-if="route === 'customer'" x-large>account_circle</v-icon>
              <v-icon v-else-if="route === 'group'" x-large>group_work</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
              <v-list-tile-sub-title v-if="route === 'customer'">
                {{totalIndividual(item) | currency}} -
                {{totalIndividual(item) + ((totalIndividual(item) * 10)/ 100) | currency}}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title v-else-if="route === 'group'">{{item.price | currency}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
      <br>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'ArrayList',
  props: ['items', 'title', 'route'],
  computed: {
    ...mapGetters({
      groups: 'getGroups',
      promo: 'getPromo',
    })
  },
  methods: {

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

      return total
    }
  }
}
</script>
