// import main modules
import Vue from 'vue'
import Vuex from 'vuex'

// import store modules
import user from './modules/user'
import projects from './modules/projects'
import common from './modules/common'
import dashboard from './modules/dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    projects,
    common,
    dashboard
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
