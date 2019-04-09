<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <pie-chart class="card-style"
          ></pie-chart>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PieChart from '@/components/charts/PieChart'
export default {
  components: {
    PieChart
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
