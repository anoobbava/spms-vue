<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap v-if="projects.length > 0">

      <v-flex xs4
        v-for="project in projects"
        :key="project.id">

        <v-card>
          <v-img
            class="white--text"
            height="100px"
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{project.attributes.name}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>

          <v-card-title>
            <div>
              <span>{{project.attributes.client_name}}</span><br>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn left flat color="primary">activity</v-btn>
            <v-btn flat color="primary">Tickets</v-btn>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-avatar right
                  size="60px"
                  color="lighten-4">
                  <v-img
                    src="../img/user.png"
                    v-on="on"
                    alt="avatar">
                  </v-img>
                </v-avatar>
              </template>
              <span>Manager >> {{project.attributes.manager.data.attributes.name}}</span>
            </v-tooltip>
          </v-card-actions>

        </v-card>
      </v-flex>

    </v-layout>
    <div v-else-if="projects.length === 0"> {{displayNotification()}}</div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import SweetAlerts from '@/services/SweetAlerts'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['projects'])
  },
  methods: {
    displayNotification () {
      SweetAlerts.noProjects()
      this.$router.push('/')
    }
  }
}
</script>
