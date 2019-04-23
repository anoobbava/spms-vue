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

            <v-btn flat
              color="primary"
              @click="displayTickets(project.id)"
              >
              Tickets & Activity
            </v-btn>

            <!-- display the modal -->
            <template>
              <div>
                <v-dialog
                  v-model="displayAddTicketModal"
                  persistent
                  width="800"
                >

                  <template
                    v-slot:activator="{ on }">
                      <v-btn
                        color="primary"
                        dark flat
                        @click="openCreateTicketModal(
                          project.id, project.attributes.name)"
                        >
                        Add Ticket
                      </v-btn>
                  </template>

                  <v-card>

                    <v-card-title
                      class="headline">
                      Create ticket for {{projectName}}
                    </v-card-title>

                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>

                          <!-- ticket title -->
                          <v-flex xs12>
                            <v-text-field
                              v-model="title"
                              v-validate="'required|max:60'"
                              :counter="60"
                              :error-messages="errors.collect('title')"
                              label="
                              Ticket Title"
                              data-vv-name="title"
                              required
                              ></v-text-field>
                          </v-flex>

                            <!-- description -->
                            <v-flex xs12>
                              <v-text-field
                                v-model="description"
                                v-validate="'required|max:60'"
                                :counter="60"
                                :error-messages="errors.collect('description')"
                                label="
                                Ticket description"
                                data-vv-name="description"
                                required
                                ></v-text-field>
                            </v-flex>

                            <!-- ticket Number -->
                            <v-flex xs6>
                              <v-text-field
                                v-model="ticketNumber"
                                v-validate="'required|numeric|max:10'"
                                :counter="10"
                                :error-messages="errors.collect('ticketNumber')"
                                label="
                                Ticket Number"
                                data-vv-name="ticketNumber"
                                required
                                ></v-text-field>
                            </v-flex>

                            <!-- ticket category -->
                            <v-flex xs6>
                              <v-autocomplete
                                v-model="category"
                                v-validate="'required'"
                                :items="ticketCategory"
                                :error-messages="errors.collect('category')"
                                label="Ticket category"
                                data-vv-name="category"
                                required
                              ></v-autocomplete>
                            </v-flex>

                            <!-- ticket status -->
                            <v-flex xs6>
                              <v-autocomplete
                                v-model="status"
                                v-validate="'required'"
                                :items="ticketStatus"
                                :error-messages="errors.collect('ticketStatus')"
                                label="Ticket Status"
                                data-vv-name="ticketStatus"
                                required
                              ></v-autocomplete>
                            </v-flex>

                            <!-- permitted time -->
                            <v-flex xs-12>
                              <v-text-field
                                v-model="permittedTime"
                                v-validate="'required|numeric|max:4'"
                                :counter="4"
                                :error-messages="errors.collect('permittedTime')"
                                label="Permitted Time"
                                data-vv-name="permittedTime"
                                required
                                ></v-text-field>
                            </v-flex>

                            <!-- start date-->
                            <v-flex xs-12>
                              <v-menu
                                v-model="startDateMenu"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  lazy
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="startDate"
                                    label="select the start date"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on">
                                  </v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="startDate"
                                  @input="startDateMenu = false">
                                </v-date-picker>
                              </v-menu>
                            </v-flex>

                            <!-- end date  -->
                            <v-flex xs-12>
                              <v-menu
                                v-model="endDateMenu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px">
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="endDate"
                                    label="select the end date"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on">
                                  </v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="endDate"
                                  @input="endDateMenu = false">
                                </v-date-picker>
                              </v-menu>
                            </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <!-- cancel button -->
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            v-on="on"
                            flat @click="cancelAddTicket"
                            >
                            <v-icon>cancel</v-icon>
                          </v-btn>
                        </template>
                        <span>cancel</span>
                      </v-tooltip>

                      <!-- reset button -->
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            v-on="on"
                            flat
                            @click="resetAddTicket"
                          >
                          <v-icon>clear</v-icon>
                          </v-btn>
                        </template>
                        <span>clear Form</span>
                      </v-tooltip>

                      <!-- Add ticket button -->
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            v-on="on"
                            flat
                            @click="validateTicketData"
                          >
                            <v-icon>add</v-icon>
                          </v-btn>
                        </template>
                        <span>Add Ticket</span>
                      </v-tooltip>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </template>

            <!-- close the modal -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-avatar right
                  size="60px"
                  color="lighten-4">
                  <v-img
                    class="elevation-6"
                    v-on="on"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&
                      accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&
                      clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
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
import ApiHelper from '@/services/ApiHelper'
export default {
  data () {
    return {
      displayAddTicketModal: false,
      projectId: '',
      projectName: '',
      valid: true,
      title: '',
      ticketNumber: '',
      description: '',
      category: '',
      status: '',
      permittedTime: '',
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      fieldRules: [v => !!v || 'required field'],
      select: null,
      ticketCategory: ['Feature', 'Chore', 'Support', 'Bug'],
      ticketStatus: ['idea', 'In-Progress', 'Completed', 'Accepted', 'Released'],
      checkbox: false,
      startDateMenu: false,
      endDateMenu: false
    }
  },
  computed: {
    ...mapGetters(['projects', 'userId'])
  },
  methods: {
    displayNotification () {
      SweetAlerts.noProjects()
      this.$router.push('/')
    },

    displayTickets (projectId) {
      this.$router.push('/project/' + projectId)
    },

    createTicket () {
      this.$router.push('/create_ticket')
    },

    openCreateTicketModal (id, name) {
      this.displayAddTicketModal = true
      this.projectId = id
      this.projectName = name
    },

    cancelAddTicket () {
      this.displayAddTicketModal = false
      this.clearData()
      this.$validator.reset()
    },

    clearData () {
      this.title = ''
      this.ticketNumber = ''
      this.description = ''
      this.category = ''
      this.status = ''
      this.permittedTime = ''
      this.startDate = new Date().toISOString().substr(0, 10)
      this.endDate = new Date().toISOString().substr(0, 10)
    },

    resetAddTicket () {
      this.clearData()
      this.$validator.reset()
    },

    validateTicketData () {
      this.$validator.validateAll()
        .then(status => {
          if (status === true) {
            this.displayAddTicketModal = false
            this.submitData()
          }
        })
    },

    submitData () {
      const ticketObject = {
        title: this.title,
        ticket_no: this.ticketNumber,
        description: this.description,
        category: this.category,
        status: this.status,
        maximum_permitted_time: this.permittedTime,
        start_date: this.startDate,
        end_date: this.endDate,
        project_id: this.projectId,
        created_user_id: this.userId,
        assigned_user_id: this.userId,
        created_user_type: 'User'
      }
      // call API to update the new Activity
      ApiHelper.createTicket(ticketObject)
        .then(response => {
          SweetAlerts.success(response.status)
          this.clearData()
          this.$store.dispatch('addTicketAction', response)
        })
        .catch(error => {
          SweetAlerts.failure(error.response.data.errors)
          console.log(error)
          this.clearData()
        })
    }
  }
}
</script>
