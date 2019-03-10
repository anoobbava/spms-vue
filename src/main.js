import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'

Vue.config.productionTip = false
const token = localStorage.getItem('token')
axios.defaults.baseURL = 'http://localhost:3000/'

if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
