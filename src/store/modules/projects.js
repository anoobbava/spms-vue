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
    project: state => projectID => state.projects.find(project => project.id === projectID),
    projectManagers: (state) => {
      const projects = state.projects
      let projectManagerHash = []
      for (let i = 0; i < projects.length; i += 1) {
        projectManagerHash.push({ id: i,
          name: projects[i].attributes.name,
          manager: projects[i].attributes.manager.data.attributes.name })
      }
      return projectManagerHash
    }
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
