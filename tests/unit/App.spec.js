import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import Vuex from 'vuex'

describe('App', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  const router = new VueRouter()
  const store = new Vuex.Store()
  const wrapper = mount(App, { localVue, router, store })
  // const options = { localVue, router }

  it('App.vue is present', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it(' navbar', () => {
    expect(wrapper.html()).toContain('SPMS')
  })
})
