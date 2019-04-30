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
      commit('setLoading', true)
    },

    stopLoading ({ commit }) {
      commit('setLoading', false)
    }
  },

  getters: {
    loading: state => state.loading
  }
}
