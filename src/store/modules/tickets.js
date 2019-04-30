
export default {
  state: {
    tickets: {}
  },

  actions: {
    ticketsAction ({ commit }, payload) {
      commit('ticketsMutation', payload)
    },

    addTicketAction ({ commit }, payload) {
      commit('addNewTicketMutation', payload.ticket.data)
    }
  },

  mutations: {
    ticketsMutation (state, payload) {
      state.tickets = payload.tickets.data
    },

    addNewTicketMutation (state, payload) {
      state.tickets = [payload, ...state.tickets]
    }
  },

  getters: {
    tickets: state => state.tickets,
    projectTickets (state) {
      return projectId => Object.values(state.tickets).filter(ticket => {
        return ticket.attributes.project_id === parseInt(projectId)
      })
    }
  }
}
