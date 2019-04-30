<template>
  <div>
    <div v-if="projectNames.length > 0">
      <h2 text-xs-center>Assigned Projects</h2>
      <pie-chart
        :data="dataValues">
      </pie-chart>
    </div>
    <div v-else>
      <h2 text-xs-center>You are not assigned to Any Projects</h2>
      <pie-chart
        :data="sampleDataValues">
      </pie-chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      sampleDataValues: [['Blueberry', 44], ['Strawberry', 23],
        ['Apple', 30], ['Orange', '20']]
    }
  },

  computed: {
    ...mapGetters(['projects', 'projectNames']),
    dataValues () {
      const dataArray = []
      for (let i = 0; i < this.projectNames.length; i += 1) {
        const localArray = []
        localArray.push(this.projectNames[i])
        localArray.push(1)
        dataArray.push(localArray)
      }
      return dataArray
    }
  }
}
</script>
