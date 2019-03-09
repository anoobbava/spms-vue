import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = process.env.RAILS_APP_API_URL
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
