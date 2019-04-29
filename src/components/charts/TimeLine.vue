<template>
  <div>
    <v-timeline v-if="ticketActivityLogs.length > 0">
      <v-timeline-item
        v-for="item in ticketActivityLogs"
        :key="item.id"
        large
        :color="getRandomColor()">

        <template v-slot:opposite>
          <span>
            <h3>
              {{moment(item.attributes.log_date).format("MMM Do YY")}}
            </h3>
          </span>
        </template>

        <v-card class="elevation-2 primary">

          <v-card-title class="headline">
            {{item.attributes.ticket_id}}-{{item.attributes.status}}
          </v-card-title>

          <v-card-text>
            {{item.attributes.activity}}
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <h3 v-else class="no-activity">
      No Activity available
    </h3>
  </div>
</template>

<script>

export default {
  props: ['ticketActivityLogs'],
  methods: {
    getRandomColor () {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  }
}
</script>
<style scoped>
.no-activity {
  text-align: center;
  background-color: red;
}
</style>
