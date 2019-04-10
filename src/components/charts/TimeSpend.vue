<template>
  <div>
    <div v-if="ticketActivityLogs.length > 0">
      <h2>Time Spend Chart</h2>
      <line-chart :data="this.dataValues"></line-chart>
    </div>

    <div v-else>
      <h2 text-xs-center>You are not spending on any projects</h2>
      <line-chart :data="this.sampleDataValues"></line-chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      sampleDataValues: [['2017-01-01', 1], ['2017-01-29', 1], ['2017-02-01', 2],
        ['2017-02-27', 3], ['2017-03-01', 5], ['2017-03-29', 8],
        ['2017-04-01', 13], ['2017-04-30', 21], ['2017-05-01', 34], ['2017-05-30', 55]]

    }
  },

  computed: {
    ...mapGetters(['ticketActivityLogs']),
    dataValues () {
      const a = this.createChartData()
      return a
    }
  },

  methods: {
    createChartData () {
      const dataArray = []
      for (let i = 0; i < this.ticketActivityLogs.length; i += 1) {
        const localArray = []
        localArray.push(this.ticketActivityLogs[i].attributes.log_date)
        localArray.push(this.ticketActivityLogs[i].attributes.log_time)
        dataArray.push(localArray)
      }
      // debugger
      return dataArray
    }
  }
}
</script>
