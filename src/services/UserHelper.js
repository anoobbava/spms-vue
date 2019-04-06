import axios from 'axios'

export default {
  async projects (payload) {
    const response = await axios.get('my_projects', { Authorization: payload })
    return response.data
  }
}
