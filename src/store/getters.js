export default {

  isLoggedIn (state) {
    return state.token
  },

  status (state) {
    return state.status
  },

  user (state) {
    return state.user
  },

  projects (state) {
    return state.projects
  }
}
