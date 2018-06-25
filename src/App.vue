<template>
  <v-app id="app" text-center dark>
    <v-toolbar>
      <v-toolbar-title>Bourbon Calculator</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer>
      <BottomNav></BottomNav>
    </v-footer>
  </v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav'

export default {
  name: 'App',
  components: { BottomNav }
}
</script>
