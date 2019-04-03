export default {
  state: {
    projects: {}
  },
  actions: {

  },
  getters: {
    projects: state => Object.values(state.projects)
  },
  mutations: {
    projectsMutation: (state, payload) => {
      state.projects = payload
    }

  }
}
