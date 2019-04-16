export default {
  state: {
    projects: {},
    projectNames: []
  },
  actions: {
    projectsAction: ({ commit }, payload) => {
      commit('projectsMutation', payload.data)
      const names = Object.values(payload.data).map(el => el.attributes.name)
      commit('projectNamesMutation', names)
    }
  },

  getters: {
    projects: state => Object.values(state.projects),
    projectNames: state => state.projectNames,
    project: state => projectID => state.projects.find(project => project.id === projectID)
  },

  mutations: {
    projectsMutation: (state, payload) => {
      state.projects = payload
    },

    projectNamesMutation: (state, payload) => {
      state.projectNames = payload
    }
  }
}
