import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },

  mutations: {

    // this will set the status to loading, success, failure
    statusMutation (state, payload) {
      state.status = payload
    },

    // will set the token to the state
    tokenMutation (state, payload) {
      state.token = payload
    },

    // set the user object to the state
    userMutation (state, payload) {
      state.user = payload
    }
  },

  actions: {

    loginAction ({ commit }, payload) {
      // set the status to loading
      commit('statusMutation', 'loading')
      // now call the api to get the auth token and save to the localStorage
      return new Promise((resolve, reject) => {
        axios({ url: 'http://localhost:3000/api/v1/login',
          data: { email: payload.email, password: payload.password },
          method: 'POST' })
          .then(response => {
            const token = response.data.auth_token
            const user = response.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('statusMutation', 'success')
            commit('tokenMutation', token)
            commit('userMutation', user)
            resolve(response)
          })

          .catch(error => {
            commit('statusMutation', 'failure')
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
