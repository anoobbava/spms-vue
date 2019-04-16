<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md10>
        <v-data-table v-if="tickets.length > 0"
          :headers="headers"
          :items="tickets"
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
            <td class="capitalize">{{ item.attributes.title }}</td>
            <td class="capitalize">{{ item.attributes.start_date }}</td>
            <td class="capitalize">{{ item.attributes.end_date}}</td>
          </template>
        </v-data-table>
        <div v-else-if="tickets.length === 0"> {{displayNotification()}}</div>
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
          text: 'Ticket Name',
          value: 'Ticket Name'
        },
        {
          sortable: false,
          text: 'Start Date',
          value: 'Start Date'
        },
        {
          sortable: false,
          text: 'End Date',
          value: 'end Date'
        }
      ]
    }
  },

  computed: {
    ...mapGetters(['tickets'])
  },

  methods: {
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
