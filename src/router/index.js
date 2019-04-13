// import common files
import Vue from 'vue'
import Router from 'vue-router'

// import routes
import RegisterView from '@/views/layouts/Register'
import LoginView from '@/views/layouts/Login'
import DashboardView from '@/views/layouts/Dashboard'
import ProfileView from '@/views/layouts/Profile'
import ProjectsView from '@/views/layouts/Projects'
import TicketsView from '@/views/layouts/Tickets'
import CreateTicketView from '@/views/layouts/CreateTicket'
import NotFoundView from '@/views/layouts/NotFound'

// import helpers
import AuthGuard from '@/services/AuthGuard'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      // name: 'Register',
      component: RegisterView
    },
    {
      path: '/login',
      // name: 'Login',
      component: LoginView
    },
    {
      path: '/',
      // name: 'Home',
      component: DashboardView,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      // name: 'Profile',
      component: ProfileView,
      beforeEnter: AuthGuard
    },
    {
      path: '/projects',
      // name: 'Projects',
      component: ProjectsView,
      beforeEnter: AuthGuard
    },
    {
      path: '/tickets',
      // name: 'Tickets',
      component: TicketsView
    },
    {
      path: '/create_ticket',
      // name: 'CreateTicket',
      component: CreateTicketView
    },
    {
      path: '*',
      component: NotFoundView
    }
  ]
})

router.beforeResolve((to, _from, next) => {
  if (to.name) {
    store.dispatch('startLoading')
  }
  next()
})

router.afterEach((to, from) => {
  store.dispatch('stopLoading')
})

export default router
