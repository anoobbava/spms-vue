<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>

        <v-expansion-panel
          popout focusable
          v-if="projectTickets(this.project_id).length > 0">
          <v-expansion-panel-content
            v-for="ticket in projectTickets(this.project_id)"
            :key="ticket.id" >
            <template v-slot:header>
              <div class="capitalize">{{ticket.attributes.ticket_no}}</div>
              <!-- Add activity list -->
              <div class="text-xs-center"
                >
                <!-- display activity dialog -->
                <v-dialog
                  v-model="dialog"
                  persistent
                  width="800"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="primary"
                      flat
                      v-on="on"
                    >
                      Add Activity
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title
                      class="headline grey lighten-2"
                      primary-title
                    >
                      Add Activity for ticket - {{ticket.id}}
                    </v-card-title>

                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <!-- activity add text form -->
                            <v-flex xs12>
                              <v-text-field
                                v-model="activity"
                                v-validate="'required|max:60'"
                                :counter="60"
                                :error-messages="errors.collect('activity')"
                                label="Activity Name*"
                                data-vv-name="activity"
                                required
                              ></v-text-field>
                            </v-flex>
                            <!-- date picker form -->
                            <v-flex xs12>
                              <v-date-picker
                                v-model="logDate"
                                color="green lighten-1"
                                header-color="primary"
                              >
                              </v-date-picker>
                            </v-flex>
                            <!-- Log time form -->
                            <v-flex xs12 sm6>
                              <v-text-field
                                v-model="logTime"
                                v-validate="'required|numeric|max:4'"
                                :error-messages="errors.collect('logTime')"
                                label="Log Time*"
                                data-vv-name="logTime"
                                required
                              ></v-text-field>
                            </v-flex>
                            <!-- Ticket status -->
                            <v-flex xs12 sm6>
                              <v-autocomplete
                                v-model="status"
                                v-validate="'required'"
                                :items="ticketStatus"
                                :error-messages="errors.collect('status')"
                                label="Select ticket status*"
                                data-vv-name="status"
                                required
                              ></v-autocomplete>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                    <v-divider></v-divider>
                    <!-- actions in the modal -->
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <!-- cancel button -->
                      <v-btn
                        color="primary"
                        flat
                        @click="cancelForm"
                      >
                        cancel
                      </v-btn>
                      <!-- reset form -->
                      <v-btn
                        color="primary"
                        flat
                        @click="resetForm"
                      >
                        clear
                      </v-btn>
                      <!-- submit acitivity form -->
                      <v-btn
                        color="primary"
                        flat
                        :disabled="!requiredValueGiven"
                        @click="addActivity(ticket.attributes.id)"
                      >
                        submit
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </template>
            <time-line :ticketActivityLogs="displaySingleTicketActivity(ticket.attributes.id)"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <div v-else >
          <h3 class="no-data-available">No tickets Added</h3>
        </div>
        <v-spacer></v-spacer>
        <v-btn round class="primary"
        @click="goToDashboard"> Dashboard</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import ApiHelper from '@/services/ApiHelper'
import TimeLine from '@/components/charts/TimeLine'
import SweetAlerts from '@/services/SweetAlerts'

export default {
  data () {
    return {
      dialog: false,
      activity: '',
      logTime: '',
      logDate: new Date().toISOString().substr(0, 10),
      status: '',
      ticketStatus: ['idea', 'In-Progress', 'Completed', 'Accepted', 'Released']
    }
  },
  props: ['project_id'],
  components: {
    TimeLine
  },
  computed: {
    ...mapGetters(['tickets', 'ticketActivityLogs', 'project', 'userId',
      'projectTickets']),

    requiredValueGiven () {
      return this.activity !== '' && this.logTime !== ''
    }
  },

  methods: {

    displaySingleTicketActivity (ticketId) {
      return this.$store.getters.ticketActivityLogs.filter(a => a.attributes.ticket_id === parseInt(ticketId))
    },

    clearData () {
      this.activity = ''
      this.logTime = ''
      this.logDate = new Date().toISOString().substr(0, 10)
      this.status = ''
    },

    resetForm () {
      this.clearData()
      this.$validator.reset()
    },

    cancelForm () {
      this.dialog = false
      this.clearData()
      this.$validator.reset()
    },

    addActivity (ticketId) {
      this.$validator.validateAll()
        .then(status => {
          if (status === true) {
            this.submitForm(ticketId)
          }
        })
    },

    goToDashboard () {
      this.$router.push('/')
    },

    submitForm (ticketId) {
      this.dialog = false
      const ActivityData = {
        'ticket_id': ticketId,
        'log_time': this.logTime,
        'log_date': this.logDate,
        'activity': this.activity,
        'user_id': this.$store.getters.userId,
        'status': this.status
      }
      // call API to update the new Activity
      ApiHelper.createActivity(ActivityData)
        .then(response => {
          SweetAlerts.success(response.status)
          this.clearData()
          this.$store.dispatch('addTicketActivityLogAction', response)
        })
        .catch(error => {
          SweetAlerts.failure('Error on adding Activity')
          console.log(error)
          this.clearData()
        })
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
