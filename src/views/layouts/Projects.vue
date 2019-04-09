<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md10>
        <v-data-table v-if="projects.length > 0"
          :headers="headers"
          :items="projects"
          hide-actions>
          <template slot="headerCell" slot-scope="{ header }">
            <span
              class="subheading font-weight-light text-success text--darken-3"
              v-text="header.text"
            />
          </template>
          <template
            slot="items"
            slot-scope="{ item }">
            <td class="capitalize">{{ item.attributes.name }}</td>
            <td class="capitalize">{{ item.attributes.client_name }}</td>
            <td class="capitalize">{{ item.attributes.manager.data.attributes.name}}</td>
            <td>
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition">
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="secondary"
                    dark
                    v-on="on"
                    >
                    options
                  </v-btn>
                </template>
                <v-list>
                  <v-list-tile
                    v-for="(option, i) in options"
                    :key="i"
                    @click= "handleFunctionCall(option.method)">
                    <v-list-tile-title>{{ option.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </td>
          </template>
        </v-data-table>
        <div v-else-if="projects.length === 0"> {{displayNotification()}}</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import SweetAlerts from '@/services/SweetAlerts'
export default {
  data () {
    return {
      headers: [
        {
          sortable: false,
          text: 'Project',
          value: 'project'
        },
        {
          sortable: false,
          text: 'client',
          value: 'client'
        },
        {
          sortable: false,
          text: 'Manager',
          value: 'manager'
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions'
        }
      ],
      options: [
        { title: 'Tickets', method: 'displayTickets' },
        { title: 'Add Ticket', method: 'addTicket' },
        { title: 'Add Activity', method: 'AddActivity' }
      ]
    }
  },

  computed: {
    ...mapGetters(['projects'])
  },

  methods: {
    handleFunctionCall (name) {
      this[name]()
    },

    displayTickets () {
      this.$router.push('/tickets')
    },

    addTicket () {
      this.$router.push('/create_ticket')
    },

    AddActivity () {
      alert('AddActivity')
    },

    displayNotification () {
      SweetAlerts.noProjects()
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .capitalize {
    text-transform: capitalize;
}
</style>
