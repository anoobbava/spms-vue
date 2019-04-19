import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import ManagerDetails from '@/components/tables/ManagerDetails.vue'
import Vuex from 'vuex'

describe('ManagerDetails', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  const router = new VueRouter()
  const store = new Vuex.Store({
    state: {
      projects: { name: 'Project1' },
      projectNames: ['Project1']
    },
    getters: {
      projects: (state) => state.projects,
      projectNames: state => state.projectNames
    }
  })
  const wrapper = shallowMount(ManagerDetails, { localVue, router, store })

  it('is a component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper.$el).toMatchSnapshot()
  })
})
