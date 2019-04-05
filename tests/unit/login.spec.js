import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Login from '@/login/Login.vue'

describe('Login', () => {
  // const $route = {
  //   path: '/login'
  // }
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter()
  const wrapper = shallowMount(Login, {
    localVue, router
  })

  it('Login is a component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('display login header is there', () => {
    expect(wrapper.html()).toContain('<v-toolbar-title>Login</v-toolbar-title>')
  })

  it('checks the email and password are blank initially', () => {
    expect(wrapper.vm.email).toBe('')
    expect(wrapper.vm.password).toBe('')
  })

  it('assign the values to the fields', () => {
    wrapper.vm.email = 'test@test.com'
    wrapper.vm.password = 'test123'
    expect(wrapper.vm.email).toBe('test@test.com')
    expect(wrapper.vm.password).toBe('test123')
  })

  it('reset button clears the value', () => {
    wrapper.vm.email = 'test@test.com'
    wrapper.vm.password = 'test123'
    wrapper.find('v-btn.reset').trigger('click')
    expect(wrapper.vm.email).toBe('')
    expect(wrapper.vm.password).toBe('')
  })

  it('will in turn call the redirectToLogin', () => {
    wrapper.vm.email = 'test@test.com'
    wrapper.vm.password = '123456'
    wrapper.vm.redirectToLogin()
    expect(wrapper.vm.email).toBe('')
    expect(wrapper.vm.password).toBe('')
    router.push('/')
    expect(wrapper.html()).toContain('<v-toolbar-title>Login</v-toolbar-title>')
  })
})
