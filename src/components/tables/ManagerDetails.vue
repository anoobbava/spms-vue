<template>
  <v-data-table
    :headers="headers"
    :items="projectManagers"
    hide-actions>

    <template
      slot="headerCell"
      slot-scope="{ header }">
      <span
        class="font-weight-light text-warning text--darken-3"
        v-text="header.text"
      />
    </template>

    <template
      slot="items"
      slot-scope="{ index, item }">
      <td class="text-xs-left">{{ item.name }}</td>
      <td class="text-xs-left">{{ item.manager }}</td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Project Name',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Manager',
          value: 'manager',
          sortable: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['projectManagers'])
  }
}
</script>
