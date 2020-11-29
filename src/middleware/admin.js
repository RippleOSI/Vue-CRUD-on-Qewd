export default function admin ({ next, store }) {
  if (store.getters.user.role !== 'admin') {
    return next({
      name: 'Dashboard'
    })
  }

  return next()
}
