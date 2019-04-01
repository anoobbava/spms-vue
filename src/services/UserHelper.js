import axios from 'axios'

export default {
  projects (payload) {
    debugger
    return axios.get('my_projects', { Authorization: payload })
      .then(response => response.data)
  }
}
