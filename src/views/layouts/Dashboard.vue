<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <time-spend
          ></time-spend>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <h2>TimeLine</h2>
          <time-line :ticketActivityLogs="ticketActivityLogs"/>
        </v-card>
      </v-flex>

      <v-flex xs6>
        <v-card mb-3>
          <pie-chart class="card-style"
          ></pie-chart>
        </v-card>
      </v-flex>


    </v-layout>
  </v-container>
</template>

<script>
import ApiHelper from '@/services/ApiHelper'
import PieChart from '@/components/charts/PieChart'
import TimeSpend from '@/components/charts/TimeSpend'
import TimeLine from '@/components/charts/TimeLine'
import { mapGetters } from 'vuex'

export default {
  components: {
    PieChart,
    TimeSpend,
    TimeLine
  },

  beforeMount () {
    this.callApi()
  },

  computed: {
    ...mapGetters(['ticketActivityLogs'])
  },

  methods: {
    callApi () {
      ApiHelper.ViewDashBoard()
        .then(response => {
          this.$store.dispatch('getDashBoard', response.dashboard.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
  .card-style {
    transition: transform .2s;
  }
  .card-style:hover {
    transform: scale(1.02);
  }
</style>
