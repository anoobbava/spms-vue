import Vue from 'vue'
import Vuex from 'vuex'
// need to check whether the axios is needed here or not.??
import axios from 'axios'
import LoginHelper from '@/services/LoginHelper'

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
    },

    logoutMutation (state) {
      state.status = ''
      state.token = ''
      state.user = ''
    },

    // when page refreshed, system will call the validate token Api and it will fetch the user object
    // user object will be updated to the state.
    updateUserMutation (state, payload) {
      state.user = payload
      state.status = 'success'
    }
  },

  actions: {

    loginAction ({ commit }, payload) {
      // set the status to loading
      commit('loadingStatusMutation')
      // now call the api to get the auth token and save to the localStorage
      return new Promise((resolve, reject) => {
        LoginHelper.login(payload)

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
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      commit('logoutMutation')
    },

    validateTokenAction ({ commit }, payload) {
      debugger
      commit('loadingStatusMutation')
      if (payload !== '' || payload !== undefined) {
        return new Promise((resolve, reject) => {
          LoginHelper.validateToken(payload)

            .then(response => {
              if (response.success) {
                axios.defaults.headers.common['Authorization'] = payload
                const user = response.user.data
                const token = payload
                commit('successMutation', { token, user })
                resolve(response)
              } else if (response.error) {
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                commit('logoutMutation')
                resolve(response)
              }
            })

            .catch(error => {
              localStorage.removeItem('token')
              delete axios.defaults.headers.common['Authorization']
              commit('logoutMutation')
              reject(error)
            })
        })
      }
    }, 
  },

  getters: {

    isLoggedIn (state) {
      return state.token
    },

    status (state) {
      return state.status
    },

    user (state) {
      return state.user
    }
  }
})
