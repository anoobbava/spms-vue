import axios from 'axios'
import localStore from 'store'
const token = localStore.get('token')

axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
axios.defaults.baseURL = process.env.VUE_APP_RAILS_API_URL
axios.defaults.headers.common = {
  Authorization: `bearer ${token}`
}

export default {

  async login (userObject) {
    const response = await axios.post('login', {
      email: userObject.email,
      password: userObject.password
    })
    return response.data
  },

  async validateToken () {
    const response = await axios.post('validate_token', {
      Authorization: `bearer ${token}`
    })
    return response.data
  },

  async ViewDashBoard () {
    const response = await axios.get('dashboard', {
      Authorization: `bearer ${token}`
    })
    return response.data
  },

  async fetchTickets () {
    const response = await axios.get('tickets', { Authorization: `bearer ${token}` })
    return response.data
  },

  async createTicket (ticketObject) {
    const response = await axios.post('tickets', { ticket: ticketObject })
    return response.data
  },

  async createActivity (activityObject) {
    const response = await axios.post('ticket_activity_logs', { ticket_activity_log: activityObject })
    return response.data
  }
}
