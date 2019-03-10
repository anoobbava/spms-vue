import Vue from 'vue'
import Vuex from 'vuex'
// need to check whether the axios is needed here or not.??
import axios from 'axios'
import LoginLogoutHelper from '@/services/LoginLogoutHelper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },

  mutations: {

    successMutation (state, { token, user }) {
      state.status = 'success'
      state.token = token
      state.user = user
    },

    failureMutation (state) {
      state.status = 'failure'
      state.token = ''
      state.user = ''
    },

    loadingStatusMutation (state) {
      state.status = 'loading'
    }
  },

  actions: {

    loginAction ({ commit }, payload) {
      // set the status to loading
      commit('loadingStatusMutation')
      // now call the api to get the auth token and save to the localStorage
      return new Promise((resolve, reject) => {
        LoginLogoutHelper.login(payload)

          .then(response => {
            const token = response.auth_token
            const user = response.user.data
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('successMutation', { token, user })
            resolve(response)
          })

          .catch(error => {
            commit('failureMutation')
            localStorage.removeItem('token')
            reject(error)
          })
      })
    },

    logoutAction ({ commit }, payload) {
      commit('logoutMutation', payload)
    }
  },

  getters: {
  }
})
