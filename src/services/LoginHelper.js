import axios from 'axios'

export default {

  async login (payload) {
    const response = await axios.post('login', { email: payload.email, password: payload.password });
    return response.data
  },

  async validateToken (payload) {
    const response = await axios.post('validate_token', { Authorization: payload.auth_token })
    return response.data
  }
}
