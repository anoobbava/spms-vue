import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/register/Register.vue'
import Login from '@/login/Login.vue'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import Projects from '@/user/Projects.vue'

Vue.use(Router)

export default new Router({
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
      meta: { requiresLogin: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    }
  ]
})
