<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
          <v-data-table
            :headers="headers"
            :items="projects"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.attributes.name }}</td>
              <td>{{ item.attributes.client_name }}</td>
              <td>{{ item.attributes.manager }}</td>
            </template>
          </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
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
      }
    ]
  }),
  computed: {
    projects () {
      // debugger
      return this.$store.getters.projects
    }
  }
}
</script>
