// import main modules
import Vue from 'vue'
import Vuex from 'vuex'

// import store modules
import user from './modules/user'
import projects from './modules/projects'
import common from './modules/common'
import dashboard from './modules/dashboard'
import tickets from './modules/tickets'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    projects,
    common,
    dashboard,
    tickets
  },
  state: {
  },

  mutations: {
  },

  actions: {
  },

  getters: {
  }
})
