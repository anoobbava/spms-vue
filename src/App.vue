<template>
  <v-app>
    <Loader></Loader>
    <!-- display the navigation bar -->
    <nav-bar></nav-bar>

    <!-- render the router pages -->
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from '@/components/shared/NavBar'
import Loader from '@/components/shared/loader'
export default {
  name: 'App',
  components: {
    'nav-bar': NavBar,
    'Loader': Loader
  }
}
</script>
