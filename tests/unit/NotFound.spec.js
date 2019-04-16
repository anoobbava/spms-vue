import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import NotFound from '@/views/layouts/NotFound.vue'
import Vuex from 'vuex'

describe('NotFound', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  const router = new VueRouter()
  const store = new Vuex.Store()
  const wrapper = mount(NotFound, { localVue, router, store })
  const options = { localVue, router }

  it('App.vue is present', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('checks it redirect to root path', () => {
    const routerPushSpy = jest.spyOn(options.router, 'push')
    wrapper.vm.redirectToHome()
    expect(routerPushSpy).toHaveBeenCalledWith('/')
  })

  it('renders correctly', () => {
    expect(wrapper.$el).toMatchSnapshot()
  })
})
