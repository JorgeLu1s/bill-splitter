<template>
  <v-menu bottom>
    <v-btn slot="activator" icon dark>
      <v-icon>more_vert</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile @click="reset">
        <v-list-tile-title>{{ text }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Options',
  data: function () {
    return {
      text: 'Reset'
    }
  },
  methods: {
    ...mapActions({
      reset: 'resetData'
    })
  }
}
</script>
