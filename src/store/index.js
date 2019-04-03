import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import projects from './modules/projects'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    projects
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
