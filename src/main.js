// import main imports
import Vue from 'vue'
import App from './App.vue'

// import plugins
import './plugins/vuetify'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'
import moment from 'moment'

Vue.use(VueChartkick, { adapter: Chart })

Vue.config.productionTip = false
Vue.prototype.moment = moment

const token = localStorage.getItem('token')
axios.defaults.baseURL = process.env.VUE_APP_RAILS_API_URL

if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // need to move this code to some where common files
    if (this.$store.getters.isLoggedIn === '' || this.$store.getters.isLoggedIn === undefined) {
      this.$router.push('/login')
    } else {
      this.$store.dispatch('validateTokenAction', localStorage.getItem('token'))
    }
  }
}).$mount('#app')
