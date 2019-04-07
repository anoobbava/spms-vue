export default {
  state: {
    loading: false
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    startLoading ({ commit }) {
      debugger
      commit('setLoading', true)
    },

    stopLoading ({ commit }) {
      debugger
      commit('setLoading', false)
    }
  },

  getters: {
    loading: state => state.loading
  }
}
