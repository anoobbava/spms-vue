export default {

  isLoggedIn: state => (state.token),
  status: state => (state.status),
  user: state => (state.user),
  projects: state => (Object.values(state.projects))
}
