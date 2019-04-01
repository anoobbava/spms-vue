import Vue from 'vue'
import Vuex from 'vuex'
// need to check whether the axios is needed here or not.??
// import axios from 'axios'
// import LoginHelper from '@/services/LoginHelper'
// import UserHelper from '@/services/UserHelper'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    projects: {},
    errors: []
  },

  mutations,
  actions,
  getters
})
