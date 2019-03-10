import axios from 'axios'

// axios.defaults.baseURL = process.env.RAILS_APP_API_URL

export default {

  login (payload) {
    return axios.post('api/v1/login', { email: payload.email, password: payload.password })
      .then(response => response.data)
  }
}
