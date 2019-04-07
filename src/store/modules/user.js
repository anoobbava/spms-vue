import axios from 'axios'
import ApiHelper from '@/services/ApiHelper'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || '',
    status: '',
    errors: []
  },

  actions: {
    loginAction ({ commit }, payload) {
      // set the status to loading
      commit('loadingStatusMutation')
      // now call the api to get the auth token and save to the localStorage
      return new Promise((resolve, reject) => {
        ApiHelper.login(payload)
          .then(response => {
            const token = response.auth_token
            const user = response.user.data
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('successMutation', {
              token,
              user
            })
            commit('projectsMutation',
              user.attributes.projects.data)
            resolve(response)
          })
          .catch(error => {
            commit('failureMutation')
            localStorage.removeItem('token')
            reject(error)
          })
      })
    },

    logoutAction ({
      commit
    }) {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      commit('logoutMutation')
    },

    validateTokenAction ({
      commit
    }, payload) {
      commit('loadingStatusMutation')
      if (payload !== '' || payload !== undefined) {
        return new Promise((resolve, reject) => {
          ApiHelper.validateToken(payload)
            .then(response => {
              if (response.success) {
                axios.defaults.headers.common['Authorization'] = payload
                const user = response.user.data
                const token = payload
                commit('successMutation', {
                  token,
                  user
                })
                commit('projectsMutation',
                  user.attributes.projects.data)
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
    }
  },

  getters: {
    isLoggedIn: state => state.token,
    status: state => state.status,
    user: state => state.user
  },

  mutations: {
    successMutation: (state, {
      token,
      user
    }) => {
      state.status = 'success'
      state.token = token
      state.user = user
    },

    failureMutation: state => {
      state.status = 'failure'
      state.token = ''
      state.user = ''
    },

    loadingStatusMutation: state => (state.status = 'loading'),

    logoutMutation: state => {
      state.status = ''
      state.token = ''
      state.user = ''
    },

    // when page refreshed, system will call the validate token Api and it will fetch the user object
    // user object will be updated to the state.
    updateUserMutation: (state, payload) => {
      state.user = payload
      state.status = 'success'
      axios.defaults.headers.common['Authorization'] = payload
    }
  }
}
