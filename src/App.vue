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
  },
  data () {
    return {
    }
  },
  created () {
    if (this.$store.getters.isLoggedIn === '' || this.$store.getters.isLoggedIn === undefined) {
      this.$router.push('/login')
    } else {
      this.$store.dispatch('validateTokenAction', localStorage.getItem('token'))
    }
  }
}
</script>
