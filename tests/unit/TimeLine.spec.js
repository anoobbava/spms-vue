import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import TimeLine from '@/components/charts/TimeLine.vue'
import Vuex from 'vuex'

describe('TimeLine', () => {
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
  const wrapper = shallowMount(TimeLine, { localVue, router, store })

  it('is a component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper.$el).toMatchSnapshot()
  })

  it('check the random color computed property', () => {
    expect(wrapper.vm.colors).toContain('#')
  })
})
