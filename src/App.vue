<template>
  <v-app>

    <!-- display the navigation bar -->
    <nav-bar></nav-bar>

    <!-- render the router pages -->
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from '@/views/NavBar'
export default {
  name: 'App',
  components: {
    'nav-bar': NavBar
  }
}
</script>
