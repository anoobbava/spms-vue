<template>
  <v-container>
    <v-layout>
      <v-flex xs-8>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="title"
            :rules="fieldRules"
            label="Title"
            required>
          </v-text-field>

          <v-text-field
            v-model="ticketNumber"
            :rules="fieldRules"
            label="Ticket Number"
            required>
          </v-text-field>

          <v-text-field
            v-model="description"
            :rules="fieldRules"
            label="Description"
            required>
          </v-text-field>

          <v-select
            v-model="category"
            :items="ticketCategory"
            :rules="[v => !!v || 'Please select ticket category']"
            label="Ticket category"
            required
          ></v-select>

          <v-select
            v-model="status"
            :items="ticketStatus"
            :rules="[v => !!v || 'Please select ticket status']"
            label="Ticket Status"
            required>
          </v-select>

          <v-text-field
            v-model="permittedTime"
            label="Description">
          </v-text-field>
          <!-- start date-->
          <v-menu
            v-model="startDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDate"
                label="select the start date"
                prepend-icon="event"
                readonly
                v-on="on">
              </v-text-field>
            </template>
            <v-date-picker
              v-model="startDate"
              @input="startDateMenu = false">
            </v-date-picker>
          </v-menu>
          <!-- end date  -->
          <v-menu
            v-model="endDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDate"
                label="select the end date"
                prepend-icon="event"
                readonly
                v-on="on">
              </v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              @input="endDateMenu = false">
            </v-date-picker>
          </v-menu>
          <v-btn
            :disabled="!valid"
            color="success"
            @click="validate">
            Create Ticket
          </v-btn>
          <v-btn
            color="error"
            @click="reset">
            Reset Form
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      title: '',
      ticketNumber: '',
      description: '',
      category: '',
      status: '',
      permittedTime: '',
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      fieldRules: [v => !!v || 'required field'],
      select: null,
      ticketCategory: ['Feature', 'Chore', 'Support', 'Bug'],
      ticketStatus: ['idea', 'In-Progress', 'Completed', 'Accepted', 'Released'],
      checkbox: false,
      startDateMenu: false,
      endDateMenu: false
    }
  },

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.submitData()
      }
    },

    reset () {
      this.$refs.form.reset()
    },

    submitData () {
      const ticketObject = {
        title: this.title,
        ticketNumber: this.ticketNumber,
        description: this.description,
        category: this.category,
        status: this.status,
        permittedTime: this.permittedTime,
        startDate: this.startDate,
        endDate: this.endDate
      }
      console.log(ticketObject)
      alert('success when creating ticket')
    }
  }
}
</script>
<style>

</style>
