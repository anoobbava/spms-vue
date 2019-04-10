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
      commit('ticketActivityLogsMutation', payload)
    }
  },

  mutations: {

    ticketsMutation: (state, payload) => {
      state.tickets = payload.data
    },

    ticketActivityLogsMutation: (state, payload) => {
      state.ticketActivityLogs = payload.data
    }
  }
}
