<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h3>Tickets  & Activities for {{project(this.project_id).attributes.name}} Project </h3>
        <v-spacer></v-spacer>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(ticket, index) in projectTickets(this.project_id)"
            :key="index" >
            <template v-slot:header>
              <div class="capitalize">{{ticket.attributes.title}}</div>
            </template>

            <time-line :ticketActivityLogs="ticketActivityLogs"/>

          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import ApiHelper from '@/services/ApiHelper'
import TimeLine from '@/components/charts/TimeLine'

export default {
  props: ['project_id'],
  components: {
    TimeLine
  },
  computed: {
    ...mapGetters(['tickets', 'ticketActivityLogs', 'project', 'userId',
      'projectTickets'])
  },

  beforeMount () {
    this.fetchTickets()
  },

  methods: {
    fetchTickets () {
      ApiHelper.fetchTickets()
        .then(response => {
          this.$store.dispatch('ticketsAction', response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
  .capitalize {
    text-transform: capitalize;
}
</style>
