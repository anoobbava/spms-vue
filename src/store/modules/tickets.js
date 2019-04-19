
export default {
  state: {
    tickets: {}
  },

  actions: {
    ticketsAction ({ commit }, payload) {
      commit('ticketsMutation', payload)
    }
  },

  mutations: {
    ticketsMutation (state, payload) {
      state.tickets = payload.tickets.data
    }
  },

  getters: {
    tickets: state => state.tickets,
    projectTickets (state) {
      return projectId => state.tickets.filter(ticket => {
        return ticket.attributes.project_id === parseInt(projectId)
      })
    }
    // ,
    // userTickets: state => userId => state.projects.find(project => project.id === projectID)
  }
}
