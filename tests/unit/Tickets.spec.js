import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Tickets from '@/views/layouts/Tickets.vue'
import Vuex from 'vuex'

describe('Tickets', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  const router = new VueRouter()
  const store = new Vuex.Store({
    state: {
      tickets: [{
        'id': '1',
        'type': 'ticket',
        'attributes': {
          'id': 1,
          'title': 'this is my first Tappy Ticket',
          'ticket_no': '1',
          'project_id': 2,
          'description': 'this is my first ticket',
          'category': 'feature',
          'status': 'idea',
          'maximum_permitted_time': 1,
          'start_date': '2019-04-01',
          'end_date': '2019-04-30',
          'assigned_user': {
            'data': {
              'id': '6',
              'type': 'user',
              'attributes': {
                'name': 'anoob bava'
              }
            }
          },
          'project': {
            'data': {
              'id': '2',
              'type': 'project',
              'attributes': {
                'name': 'Tappy'
              }
            }
          }
        }
      }],

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
      tickets: (state) => state.tickets,
      ticketActivityLogs: state => state.ticketActivityLogs,
      projectTickets (state) {
        return projectId => Object.values(state.tickets).filter(ticket => {
          return ticket.attributes.project_id === parseInt(projectId)
        })
      }
    }
  })
  const wrapper = shallowMount(Tickets, { localVue, router, store })

  it('is a component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper.$el).toMatchSnapshot()
  })
})
