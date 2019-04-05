import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Register from '@/register/Register.vue'

describe('Login', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter()
  
  const wrapper = shallowMount(Register, {
    localVue, router
  })
  const options = { localVue, router }

  it('Register is a component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('display login header is there', () => {
    expect(wrapper.html()).toContain('Register')
  })

  it('checks the names are blank initially', () => {
    expect(wrapper.vm.firstName).toBe('')
    expect(wrapper.vm.LastName).toBe('')
  })

  it('checks the email and password are blank initially', () => {
    expect(wrapper.vm.email).toBe('')
    expect(wrapper.vm.password).toBe('')
  })

  // it('assign the values to the fields', () => {
  //   wrapper.vm.email = 'test@test.com'
  //   wrapper.vm.password = 'test123'
  //   expect(wrapper.vm.email).toBe('test@test.com')
  //   expect(wrapper.vm.password).toBe('test123')
  // })

  // it('reset button clears the value', () => {
  //   wrapper.vm.email = 'test@test.com'
  //   wrapper.vm.password = 'test123'
  //   wrapper.find('v-btn.reset').trigger('click')
  //   expect(wrapper.vm.email).toBe('')
  //   expect(wrapper.vm.password).toBe('')
  // })

  // it('will in turn call the redirectToLogin', () => {
  //   wrapper.vm.email = 'test@test.com'
  //   wrapper.vm.password = '123456'
  //   // const options = { localVue, router }
  //   const routerPushSpy = jest.spyOn(options.router, 'push')
  //   wrapper.vm.redirectToLogin()
  //   expect(routerPushSpy).toHaveBeenCalledWith('/login')
  // })

  it('renders correctly', () => {
    expect(wrapper.$el).toMatchSnapshot()
  })
})
