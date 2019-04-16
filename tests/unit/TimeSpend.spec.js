import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import TimeSpend from '@/components/charts/TimeSpend.vue'
import Vuex from 'vuex'

describe('TimeSpend', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  const router = new VueRouter()
  const store = new Vuex.Store({
    state: {
      ticketActivityLogs: [
        {
          attributes: {
            activity: 'Test Activity1',
            log_date: '2019-01-01',
            ticket_title: 'Test Ticket',
            ticket_id: 'test1',
            status: 'Testing'
          }
        }
      ]
    },

    getters: {
      ticketActivityLogs: (state) => state.ticketActivityLogs
    }
  })
  const wrapper = shallowMount(TimeSpend, { localVue, router, store })

  it('is a component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper.$el).toMatchSnapshot()
  })
})
