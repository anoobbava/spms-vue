export default {
  state: {
    tickets: '',
    ticketActivityLogs: ''
  },

  getters: {
    tickets: state => state.tickets,
    ticketActivityLogs: state => state.ticketActivityLogs
  },

  actions: {
    // fetch all the details from the dashboard API
    getDashBoard ({ dispatch }, payload) {
      dispatch('ticketsAction', payload.attributes.tickets)
      dispatch('ticketActivityLogsAction', payload.attributes.ticket_activity_logs)
    },

    ticketsAction ({ commit }, payload) {
      commit('ticketsMutation', payload)
    },

    ticketActivityLogsAction ({ commit }, payload) {
      // sort the data based on date.
      let data = payload.data.sort((a, b) => {
        return new Date(b.attributes.log_date) - new Date(a.attributes.log_date)
      })
      commit('ticketActivityLogsMutation', data)
    }
  },

  mutations: {

    ticketsMutation: (state, payload) => {
      state.tickets = payload.data
    },

    ticketActivityLogsMutation: (state, payload) => {
      state.ticketActivityLogs = payload
    }
  }
}
