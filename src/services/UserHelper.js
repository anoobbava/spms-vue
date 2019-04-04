import axios from 'axios'

export default {
  projects (payload) {
    return axios.get('my_projects', { Authorization: payload })
      .then(response => response.data)
  }
}
