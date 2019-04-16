<template>
  <v-timeline>
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

      <v-card class="elevation-2">

        <v-card-title class="headline accent">
          {{item.attributes.ticket_id}}-{{item.attributes.status}}
        </v-card-title>

        <v-card-text>
          {{item.attributes.activity}}
        </v-card-text>

      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>

export default {
  props: ['ticketActivityLogs'],
  computed: {
    colors () {
      return this.getRandomColor()
    }
  },

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
