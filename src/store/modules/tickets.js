
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
    tickets: state => state.tickets
  }
}
