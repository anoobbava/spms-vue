<template>

    <!-- display the navigation bar -->
    <v-toolbar>
      <v-toolbar-items>
        <v-btn
          flat @click="redirectToPage"
            tag='span'
            style='cursor: pointer'
            >
          SPMS
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <!-- navigation bar links -->
      <v-toolbar-items class='hidden-xs-only' v-if="!isLoggedIn">
        <v-btn flat v-for="item in items" :key="item.title" :to="item.link">
          <v-icon right>{{item.icon}}</v-icon>{{item.title}}
        </v-btn>
        <v-spacer></v-spacer>
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
    },

    redirectToPage () {
      if (this.isLoggedIn === '' || this.isLoggedIn === undefined) {
        this.$router.push('/login')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
