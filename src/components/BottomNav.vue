<template>
  <v-bottom-nav :value="true" :active.sync="e1" app>
    <v-btn flat color="blue" value="home" to="/">
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn flat color="blue" value="customer" to="/new">
      <span>Add customer</span>
      <v-icon>person</v-icon>
    </v-btn>
    <v-btn flat color="blue" value="groups" to="/newGroup">
      <span>Add group</span>
      <v-icon>group</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  name: 'BottomNav',
  data () {
    return {
      e1: 'home'
    }
  }
}
</script>
