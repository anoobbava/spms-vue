<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card >
          <v-img
            src="../img/123.png"
            class="grey darken-4"
          ></v-img>
        </v-card>
        <v-spacer></v-spacer>
        <v-btn
          round
          color="primary"
          @click="redirectToHome">
          Goto Dashboard</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    redirectToHome () {
      this.$router.push('/dashboard')
    }
  }
}
</script>
