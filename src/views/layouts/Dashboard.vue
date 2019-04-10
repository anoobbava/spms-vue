<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <pie-chart class="card-style"
          ></pie-chart>
        </v-card>
      </v-flex>

      <v-flex xs6>
        <v-card>
          <time-spend class="card-style"
          ></time-spend>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import ApiHelper from '@/services/ApiHelper'
import PieChart from '@/components/charts/PieChart'
import TimeSpend from '@/components/charts/TimeSpend'

export default {
  components: {
    PieChart,
    TimeSpend
  },

  beforeMount () {
    this.callApi()
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
