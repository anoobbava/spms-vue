import axios from 'axios'
export default {

  successMutation (state, {
    token,
    user
  }) {
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
    axios.defaults.headers.common['Authorization'] = payload
  },

  projectsMutation (state, payload) {
    state.projects = payload
  }
}
