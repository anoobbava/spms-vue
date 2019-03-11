<template>

    <!-- display the navigation bar -->
    <v-toolbar>
      <v-toolbar-title>
      <!-- link for the home page -->
        <router-link
        to='/'
        tag='span'
        style='cursor: pointer'>
        SPMS
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- navigation bar links -->
      <v-toolbar-items class='hidden-xs-only' v-if="!isLoggedIn">
        <v-btn flat v-for="item in items" :key="item.title" :to="item.link">
          <v-icon right>{{item.icon}}</v-icon>{{item.title}}
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items class='hidden-xs-only' v-else>
        <v-btn
          v-if="isLoggedIn"
          flat @click="logout"
          >
          <v-icon right>delete_sweep</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  computed: {

    items () {
      return [
        {
          title: 'Register',
          icon: 'face',
          link: '/register'
        },
        {
          title: 'Login',
          icon: 'no_encryption',
          link: '/login'
        }
      ]
    },

    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('logoutAction')
      this.$router.push('/login')
    }
  }
}
</script>
