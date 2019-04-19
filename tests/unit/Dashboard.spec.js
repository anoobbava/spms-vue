import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Dashboard from '@/views/layouts/Dashboard'
import Vuex from 'vuex'

describe('Dashboard', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  const router = new VueRouter()
  const store = new Vuex.Store({
    state: {
      projects: { name: 'Project1' },
      projectNames: ['Project1'],
      ticketActivityLogs: [{
        attributes: {
          activity: 'Test Activity1',
          log_date: '2019-01-01',
          ticket_title: 'Test Ticket',
          ticket_id: 'test1',
          status: 'Testing'
        }
      }]
    },
    getters: {
      projects: (state) => state.projects,
      projectNames: state => state.projectNames,
      ticketActivityLogs: state => state.ticketActivityLogs
    }
  })
  const wrapper = shallowMount(Dashboard, { localVue, router, store })

  it('is a component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper.$el).toMatchSnapshot()
  })
})
