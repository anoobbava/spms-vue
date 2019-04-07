import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import projects from './modules/projects'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    projects,
    common
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
