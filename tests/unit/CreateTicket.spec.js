import { shallowMount } from '@vue/test-utils'
import CreateTicket from '@/views/layouts/CreateTicket.vue'

describe('CreateTicket', () => {
  const wrapper = shallowMount(CreateTicket)

  it('check the TimeSpend component there', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('check the title is zero initially', () => {
    expect(wrapper.vm.title).toBe('')
  })
})
