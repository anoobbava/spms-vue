import store from '@/store'

export default (_to, _from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/login')
  }
}
