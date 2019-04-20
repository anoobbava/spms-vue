<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>Tickets & Activities for {{project(this.project_id).attributes.name}} Project </h2>
        <v-spacer></v-spacer>
        <v-expansion-panel popout v-if="projectTickets(this.project_id).length > 0">
          <v-expansion-panel-content
            v-for="(ticket, index) in projectTickets(this.project_id)"
            :key="index" >
            <template v-slot:header>
              <div class="capitalize">{{ticket.attributes.title}}</div>
            </template>
            <time-line :ticketActivityLogs="displaySingleTicketActivity(ticket.attributes.id)"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <div v-else >
          <h3 class="no-data-available">No tickets Added</h3>
        </div>
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
    },

    displaySingleTicketActivity (ticketId) {
      return this.$store.getters.ticketActivityLogs.filter(a => a.attributes.ticket_id === parseInt(ticketId))
    }
  }
}
</script>

<style scoped>
  .capitalize {
    text-transform: capitalize;
  }
  .no-data-available {
    text-align: center;
    margin-top: 2%;
    font-size: 20px;
    background-color: tomato;
  }
</style>
