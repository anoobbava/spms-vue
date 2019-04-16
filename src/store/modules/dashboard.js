export default {
  state: {
    dashboardTickets: '',
    ticketActivityLogs: ''
  },

  getters: {
    dashboardTickets: state => state.dashboardTickets,
    ticketActivityLogs: state => state.ticketActivityLogs
  },

  actions: {
    // fetch all the details from the dashboard API
    getDashBoard ({ dispatch }, payload) {
      dispatch('dashboardTicketsAction', payload.attributes.tickets)
      dispatch('ticketActivityLogsAction', payload.attributes.ticket_activity_logs)
    },

    dashboardTicketsAction ({ commit }, payload) {
      commit('dashboardTicketsMutation', payload)
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

    dashboardTicketsMutation: (state, payload) => {
      state.dashboardTickets = payload.data
    },

    ticketActivityLogsMutation: (state, payload) => {
      state.ticketActivityLogs = payload
    }
  }
}
