import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/register/Register.vue'
import Login from '@/login/Login.vue'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import Projects from '@/user/Projects.vue'
import Tickets from '@/user/Tickets'
import CreateTicket from '@/user/CreateTicket'
import AuthGuard from '@/services/AuthGuard'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      beforeEnter: AuthGuard
    },
    {
      path: '/tickets',
      name: 'Tickets',
      component: Tickets
    },
    {
      path: '/create_ticket',
      name: 'CreateTicket',
      component: CreateTicket
    }
  ]
})

router.beforeResolve((to, _from, next) => {
  // const store = require('./store')
  if (to.name) {
    // alert('called me')
    debugger
    store.dispatch('startLoading')
  }
  next()
})
router.afterEach((to, from) => {
  // alert('ended me')
  store.dispatch('stopLoading')
})

export default router
