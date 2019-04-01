import axios from 'axios'
import LoginHelper from '@/services/LoginHelper'
export default {
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

  logoutAction ({ commit }) {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    commit('logoutMutation')
  },

  validateTokenAction ({ commit }, payload) {
    commit('loadingStatusMutation')
    if (payload !== '' || payload !== undefined) {
      return new Promise((resolve, reject) => {
        LoginHelper.validateToken(payload)
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
}
